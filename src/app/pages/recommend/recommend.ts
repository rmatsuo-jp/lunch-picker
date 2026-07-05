import { Component, WritableSignal, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Restaurant } from '../../models/restaurant';
import { RestaurantStore } from '../../services/restaurant-store';
import { GoogleMapsLoader } from '../../services/google-maps-loader';

type SortMode = 'random' | 'near' | 'rating';

/** ホーム：エリア/ジャンル/気分で絞り込み、一覧表示＋ランダム抽選でおすすめする。 */
@Component({
  selector: 'app-recommend',
  imports: [
    RouterLink,
    MatChipsModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    GoogleMap,
    MapMarker,
  ],
  templateUrl: './recommend.html',
  styleUrl: './recommend.scss',
})
export class Recommend {
  private store = inject(RestaurantStore);
  private mapsLoader = inject(GoogleMapsLoader);

  /** Google Maps スクリプトの読み込みが完了したか（未完了時は地図を描画しない）。 */
  readonly mapsReady = signal(false);

  constructor() {
    this.mapsLoader
      .load()
      .then(() => this.mapsReady.set(true))
      .catch(() => this.mapsReady.set(false));
  }

  readonly areas = this.store.areas;
  readonly genres = this.store.genres;
  readonly moods = this.store.moods;
  readonly total = computed(() => this.store.restaurants().length);

  readonly selectedAreas = signal<string[]>([]);
  readonly selectedGenres = signal<string[]>([]);
  readonly selectedMoods = signal<string[]>([]);

  /** ランダム抽選で選ばれた1件 */
  readonly picked = signal<Restaurant | null>(null);

  /** 一覧の並び順。現在地取得に成功した場合のみ「近い順」を使える。 */
  readonly sortMode = signal<SortMode>('random');
  /** 現在地（取得できた場合のみ設定）。 */
  readonly currentPos = signal<{ lat: number; lng: number } | null>(null);
  readonly locating = signal(false);
  readonly locationDenied = signal(false);

  /** フィルタ結果を並び順に応じて並び替えたもの（一覧表示用）。 */
  readonly sorted = computed(() => {
    const list = this.filtered();
    const mode = this.sortMode();
    if (mode === 'rating') {
      return [...list].sort((a, b) => (b.places?.rating ?? -1) - (a.places?.rating ?? -1));
    }
    if (mode === 'near') {
      const pos = this.currentPos();
      if (!pos) return list;
      return [...list].sort((a, b) => this.distance(pos, a) - this.distance(pos, b));
    }
    return list;
  });

  /** 選択中の条件すべてに一致する店（各軸内は OR、軸どうしは AND） */
  readonly filtered = computed(() => {
    const a = this.selectedAreas();
    const g = this.selectedGenres();
    const m = this.selectedMoods();
    return this.store.restaurants().filter((r) => {
      const okArea = a.length === 0 || a.includes(r.area);
      const okGenre = g.length === 0 || r.genres.some((x) => g.includes(x));
      const okMood = m.length === 0 || r.moods.some((x) => m.includes(x));
      return okArea && okGenre && okMood;
    });
  });

  readonly hasFilter = computed(
    () =>
      this.selectedAreas().length > 0 ||
      this.selectedGenres().length > 0 ||
      this.selectedMoods().length > 0,
  );

  toggle(sig: WritableSignal<string[]>, value: string): void {
    sig.update((list) =>
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
    this.picked.set(null);
    this.pickedReason.set(null);
  }

  isSelected(sig: WritableSignal<string[]>, value: string): boolean {
    return sig().includes(value);
  }

  clearFilters(): void {
    this.selectedAreas.set([]);
    this.selectedGenres.set([]);
    this.selectedMoods.set([]);
    this.picked.set(null);
    this.pickedReason.set(null);
  }

  /** 選定理由の簡易サマリー（おすすめボタンで選ばれた場合のみ表示）。 */
  readonly pickedReason = signal<string | null>(null);

  /** 絞り込み結果からランダムに1件選ぶ。 */
  pickRandom(): void {
    const list = this.filtered();
    this.pickedReason.set(null);
    if (list.length === 0) {
      this.picked.set(null);
      return;
    }
    const idx = Math.floor(Math.random() * list.length);
    const chosen = list[idx];
    this.picked.set(chosen);
    this.store.recordPicked(chosen.id);
  }

  /**
   * 評価・レビュー件数・現在地からの距離・直近の被り回避を加味して1件を選ぶ。
   * 現在地が未取得なら「近い順」と同じ流れで取得を試みる（取得できなくてもスコア計算は続行）。
   */
  pickRecommended(): void {
    const list = this.filtered();
    if (list.length === 0) {
      this.picked.set(null);
      this.pickedReason.set(null);
      return;
    }
    if (!this.currentPos() && !this.locating()) {
      this.requestLocation();
    }

    const pos = this.currentPos();
    const recent = this.store.recentPickedIds();
    const globalMeanRating = this.meanRating(list);

    let best = list[0];
    let bestScore = -Infinity;
    for (const r of list) {
      const score = this.scoreOf(r, pos, recent, globalMeanRating);
      if (score > bestScore) {
        bestScore = score;
        best = r;
      }
    }

    this.picked.set(best);
    this.pickedReason.set(this.reasonFor(best, pos));
    this.store.recordPicked(best.id);
  }

  /** ベイズ平均による評価スコア（レビュー件数が少ない店を過大評価しない）＋距離減点＋被り減点。 */
  private scoreOf(
    r: Restaurant,
    pos: { lat: number; lng: number } | null,
    recentIds: string[],
    globalMeanRating: number,
  ): number {
    const p = r.places;
    const RATING_CONFIDENCE = 10; // ベイズ平均の重み（信頼に必要な最小レビュー件数の目安）

    let score = 0;
    if (p?.rating != null && p.userRatingsTotal != null) {
      const v = p.userRatingsTotal;
      const m = RATING_CONFIDENCE;
      score += (v / (v + m)) * p.rating + (m / (v + m)) * globalMeanRating;
    }

    if (pos) {
      const dist = this.distance(pos, r);
      if (Number.isFinite(dist)) {
        score -= dist * 0.1;
      }
    }

    if (recentIds.includes(r.id)) {
      score -= 5;
    }

    return score;
  }

  /** 絞り込み結果内の評価の平均（評価未取得の店は除く）。1件も無ければ 3.5 を仮の中庸値とする。 */
  private meanRating(list: Restaurant[]): number {
    const ratings = list.map((r) => r.places?.rating).filter((v): v is number => v != null);
    if (ratings.length === 0) return 3.5;
    return ratings.reduce((sum, v) => sum + v, 0) / ratings.length;
  }

  /** おすすめカードに表示する選定理由の1行サマリー。 */
  private reasonFor(r: Restaurant, pos: { lat: number; lng: number } | null): string {
    const parts: string[] = [];
    if (r.places?.rating != null) {
      parts.push(`評価 ${r.places.rating}（${r.places.userRatingsTotal ?? 0}件）`);
    }
    if (pos) {
      const dist = this.distance(pos, r);
      if (Number.isFinite(dist)) {
        parts.push(dist < 1 ? `現在地から${Math.round(dist * 1000)}m` : `現在地から${dist.toFixed(1)}km`);
      }
    }
    return parts.length > 0 ? parts.join('・') : 'データに基づくおすすめ';
  }

  /** 「近い順」選択時にブラウザの現在地取得を要求する。拒否・失敗時はランダム表示に留める。 */
  setSortMode(mode: SortMode): void {
    this.sortMode.set(mode);
    if (mode === 'near' && !this.currentPos() && !this.locating()) {
      this.requestLocation();
    }
  }

  private requestLocation(): void {
    if (!navigator.geolocation) {
      this.locationDenied.set(true);
      return;
    }
    this.locating.set(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.currentPos.set({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        this.locating.set(false);
      },
      () => {
        this.locationDenied.set(true);
        this.locating.set(false);
      },
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }

  /** 現在地からの直線距離（km、Haversine公式）。座標未取得の店は Infinity 扱い。 */
  private distance(pos: { lat: number; lng: number }, r: Restaurant): number {
    const p = r.places;
    if (!p || (p.lat === 0 && p.lng === 0)) return Infinity;
    const R = 6371;
    const dLat = this.toRad(p.lat - pos.lat);
    const dLng = this.toRad(p.lng - pos.lng);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(pos.lat)) * Math.cos(this.toRad(p.lat)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  /** おすすめカードの地図中心座標（マーカーと同じ位置）。 */
  mapCenter(r: Restaurant): google.maps.LatLngLiteral {
    return { lat: r.places?.lat ?? 0, lng: r.places?.lng ?? 0 };
  }
}
