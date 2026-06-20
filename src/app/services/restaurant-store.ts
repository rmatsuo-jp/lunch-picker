import { Injectable, computed, effect, signal } from '@angular/core';
import { Restaurant, RestaurantData } from '../models/restaurant';

const STORAGE_KEY = 'lunch-picker.data.v1';

/**
 * 飲食店データのストア。
 * - signal で状態を保持し、変更時に localStorage へ自動保存
 * - エリア / ジャンル / 気分 の一覧を派生 signal で提供（フィルタ UI 用）
 */
@Injectable({ providedIn: 'root' })
export class RestaurantStore {
  /** 全店データ */
  readonly restaurants = signal<Restaurant[]>(this.load());

  /** 登録済みのエリア一覧（重複なし・昇順） */
  readonly areas = computed(() => this.distinct(this.restaurants().map((r) => r.area)));

  /** 付与済みのジャンル一覧 */
  readonly genres = computed(() => this.distinct(this.restaurants().flatMap((r) => r.genres)));

  /** 付与済みの気分一覧 */
  readonly moods = computed(() => this.distinct(this.restaurants().flatMap((r) => r.moods)));

  constructor() {
    // 変更を localStorage へ永続化
    effect(() => this.save(this.restaurants()));
  }

  /**
   * CSV 取り込み等で得た店をマージ追加する。
   * 同一エリア内で URL（無ければ店名）が一致するものは重複とみなしスキップ。
   * @returns 実際に追加した件数
   */
  addMany(incoming: Restaurant[]): number {
    const current = this.restaurants();
    const seen = new Set(current.map((r) => this.dedupeKey(r)));
    const added: Restaurant[] = [];
    for (const r of incoming) {
      const key = this.dedupeKey(r);
      if (seen.has(key)) continue;
      seen.add(key);
      added.push(r);
    }
    if (added.length > 0) {
      this.restaurants.set([...current, ...added]);
    }
    return added.length;
  }

  /** 1件更新（タグ編集など）。 */
  update(id: string, patch: Partial<Restaurant>): void {
    this.restaurants.update((list) =>
      list.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );
  }

  /** 1件削除。 */
  remove(id: string): void {
    this.restaurants.update((list) => list.filter((r) => r.id !== id));
  }

  /** 全削除。 */
  clear(): void {
    this.restaurants.set([]);
  }

  /** JSON エクスポート用の文字列を返す。 */
  toJson(): string {
    const data: RestaurantData = { version: 1, restaurants: this.restaurants() };
    return JSON.stringify(data, null, 2);
  }

  /**
   * JSON 文字列を取り込む（バックアップ復元）。既存データは置き換え。
   * @returns 取り込んだ件数
   */
  importJson(json: string): number {
    const parsed = JSON.parse(json) as RestaurantData | Restaurant[];
    const list = Array.isArray(parsed) ? parsed : parsed.restaurants;
    if (!Array.isArray(list)) throw new Error('不正な JSON 形式です');
    const normalized = list.map((r) => this.normalize(r));
    this.restaurants.set(normalized);
    return normalized.length;
  }

  // --- 内部ヘルパ ---

  private dedupeKey(r: Restaurant): string {
    const id = (r.url?.trim() || r.name.trim()).toLowerCase();
    return `${r.area.trim().toLowerCase()}::${id}`;
  }

  private distinct(values: string[]): string[] {
    return [...new Set(values.map((v) => v.trim()).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, 'ja'),
    );
  }

  private normalize(r: Partial<Restaurant>): Restaurant {
    return {
      id: r.id || crypto.randomUUID(),
      name: r.name ?? '',
      note: r.note,
      url: r.url,
      area: r.area ?? '未分類',
      genres: Array.isArray(r.genres) ? r.genres : [],
      moods: Array.isArray(r.moods) ? r.moods : [],
    };
  }

  private load(): Restaurant[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const data = JSON.parse(raw) as RestaurantData;
      return Array.isArray(data.restaurants)
        ? data.restaurants.map((r) => this.normalize(r))
        : [];
    } catch {
      return [];
    }
  }

  private save(restaurants: Restaurant[]): void {
    try {
      const data: RestaurantData = { version: 1, restaurants };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ストレージ不可時は無視（プライベートブラウズ等）
    }
  }
}
