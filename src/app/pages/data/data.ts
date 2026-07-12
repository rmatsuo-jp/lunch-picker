import { Component, computed, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Restaurant } from '../../models/restaurant';
import { GENRE_OPTIONS, MOOD_OPTIONS } from '../../models/tags';
import { RestaurantStore } from '../../services/restaurant-store';
import { CsvImport } from '../../services/csv-import';
import { PlacesEnrichment } from '../../services/places-enrichment';
import { mapPlaceTypesToGenres } from '../../services/places-genre-map';

/** 取り込み & タグ付け画面：CSV 取込、ジャンル/気分タグ編集、JSON 入出力。 */
@Component({
  selector: 'app-data',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './data.html',
  styleUrl: './data.scss',
})
export class Data {
  private store = inject(RestaurantStore);
  private csv = inject(CsvImport);
  private places = inject(PlacesEnrichment);
  private snackBar = inject(MatSnackBar);

  readonly restaurants = this.store.restaurants;
  readonly total = computed(() => this.restaurants().length);

  /**
   * 地図情報が未取得（または前回取得が失敗、営業時間の構造化データ未取得）の店舗一覧。
   * openingPeriods は後から追加したフィールドのため、既存キャッシュには無く再取得が必要。
   */
  readonly pending = computed(() =>
    this.restaurants().filter(
      (r) => !r.places || r.places.fetchError || !r.places.openingPeriods,
    ),
  );

  /** 地図情報を取得中の店舗 ID 集合（ボタンの多重クリック防止・スピナー表示用）。 */
  readonly enriching = signal<Set<string>>(new Set());
  /** 一括取得の進行中フラグ。 */
  readonly bulkEnriching = signal(false);

  /** ジャンル／気分の選択肢（選択式入力用）。 */
  readonly genreOptions = GENRE_OPTIONS;
  readonly moodOptions = MOOD_OPTIONS;

  /** エリア別にグルーピングした表示用データ。 */
  readonly groups = computed(() => {
    const map = new Map<string, Restaurant[]>();
    for (const r of this.restaurants()) {
      const list = map.get(r.area) ?? [];
      list.push(r);
      map.set(r.area, list);
    }
    return [...map.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], 'ja'))
      .map(([area, items]) => ({ area, items }));
  });

  readonly importing = signal(false);

  /** CSV ファイル選択時の取り込み。 */
  async onCsvSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.importing.set(true);
    try {
      const parsed = await this.csv.parseFiles(input.files);
      const added = this.store.addMany(parsed);
      const skipped = parsed.length - added;
      this.notify(
        `${added}件を取り込みました` + (skipped > 0 ? `（重複 ${skipped}件はスキップ）` : ''),
      );
    } catch (e) {
      this.notify('CSV の取り込みに失敗しました: ' + (e as Error).message);
    } finally {
      this.importing.set(false);
      input.value = ''; // 同じファイルを再選択できるようリセット
    }
  }

  /** 同梱のサンプルCSV（恵比寿ランチ）を取り込む。動作確認用。 */
  async addSampleData(): Promise<void> {
    this.importing.set(true);
    try {
      const res = await fetch('sample-data/恵比寿ランチ.csv');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const parsed = this.csv.parseText(text, 'サンプル：恵比寿');
      const added = this.store.addMany(parsed);
      const skipped = parsed.length - added;
      this.notify(
        `サンプルデータを${added}件追加しました` +
          (skipped > 0 ? `（重複 ${skipped}件はスキップ）` : ''),
      );
    } catch (e) {
      this.notify('サンプルデータの取得に失敗しました: ' + (e as Error).message);
    } finally {
      this.importing.set(false);
    }
  }

  /** ジャンル選択（複数選択ドロップダウン）の確定。 */
  setGenres(r: Restaurant, values: string[]): void {
    this.store.update(r.id, { genres: values });
  }

  /** 気分・その他選択（複数選択ドロップダウン）の確定。 */
  setMoods(r: Restaurant, values: string[]): void {
    this.store.update(r.id, { moods: values });
  }

  remove(r: Restaurant): void {
    this.store.remove(r.id);
  }

  clearAll(): void {
    if (confirm('登録済みのお店をすべて削除します。よろしいですか？')) {
      this.store.clear();
      this.notify('すべて削除しました');
    }
  }

  /** 現在のデータを JSON ファイルとしてダウンロード。 */
  exportJson(): void {
    const blob = new Blob([this.store.toJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lunch-roulette-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /** JSON ファイルからデータを復元（既存は置き換え）。 */
  async onJsonSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const count = this.store.importJson(await file.text());
      this.notify(`${count}件を読み込みました`);
    } catch (e) {
      this.notify('JSON の読み込みに失敗しました: ' + (e as Error).message);
    } finally {
      input.value = '';
    }
  }

  /** 1件だけ Google Places 情報を取得する（成功・失敗に関わらず store に保存）。 */
  async enrichOne(r: Restaurant): Promise<void> {
    this.enriching.update((set) => new Set(set).add(r.id));
    try {
      const places = await this.places.enrich(r);
      if (places.fetchError) {
        this.store.update(r.id, { places });
        this.notify(`${r.name}: 地図情報の取得に失敗しました（${places.fetchError}）`);
      } else {
        // Places の公式ジャンルを手動タグと統合（和集合・重複排除）し、既存タグは消さない
        const merged = [...new Set([...r.genres, ...mapPlaceTypesToGenres(places.types)])];
        this.store.update(r.id, { places, genres: merged });
      }
    } finally {
      this.enriching.update((set) => {
        const next = new Set(set);
        next.delete(r.id);
        return next;
      });
    }
  }

  /** 未取得（失敗含む）の店舗をまとめて取得する。レート制限対策で直列＋間隔をあけて実行。 */
  async enrichAllPending(): Promise<void> {
    const targets = this.pending();
    if (targets.length === 0) return;
    this.bulkEnriching.set(true);
    let success = 0;
    let failed = 0;
    try {
      for (const r of targets) {
        await this.enrichOne(r);
        const updated = this.restaurants().find((x) => x.id === r.id);
        if (updated?.places?.fetchError) failed++;
        else success++;
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      this.notify(`地図情報を取得しました（成功 ${success}件・失敗 ${failed}件）`);
    } finally {
      this.bulkEnriching.set(false);
    }
  }

  private notify(message: string): void {
    this.snackBar.open(message, '閉じる', { duration: 4000 });
  }
}
