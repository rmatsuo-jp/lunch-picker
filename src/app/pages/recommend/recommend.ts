import { Component, WritableSignal, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Restaurant } from '../../models/restaurant';
import { RestaurantStore } from '../../services/restaurant-store';

/** ホーム：エリア/ジャンル/気分で絞り込み、一覧表示＋ランダム抽選でおすすめする。 */
@Component({
  selector: 'app-recommend',
  imports: [RouterLink, MatChipsModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './recommend.html',
  styleUrl: './recommend.scss',
})
export class Recommend {
  private store = inject(RestaurantStore);

  readonly areas = this.store.areas;
  readonly genres = this.store.genres;
  readonly moods = this.store.moods;
  readonly total = computed(() => this.store.restaurants().length);

  readonly selectedAreas = signal<string[]>([]);
  readonly selectedGenres = signal<string[]>([]);
  readonly selectedMoods = signal<string[]>([]);

  /** ランダム抽選で選ばれた1件 */
  readonly picked = signal<Restaurant | null>(null);

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
  }

  isSelected(sig: WritableSignal<string[]>, value: string): boolean {
    return sig().includes(value);
  }

  clearFilters(): void {
    this.selectedAreas.set([]);
    this.selectedGenres.set([]);
    this.selectedMoods.set([]);
    this.picked.set(null);
  }

  /** 絞り込み結果からランダムに1件選ぶ。 */
  pickRandom(): void {
    const list = this.filtered();
    if (list.length === 0) {
      this.picked.set(null);
      return;
    }
    const idx = Math.floor(Math.random() * list.length);
    this.picked.set(list[idx]);
  }
}
