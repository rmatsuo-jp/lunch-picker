/**
 * @file 飲食店データのストア（localStorage 永続化 + 任意の Firestore 同期）。
 * - signal で状態を保持し、変更時に localStorage へ自動保存（オフラインキャッシュ／未ログイン時の単一端末動作）
 * - Google ログイン中のみ Firestore と双方向同期し、複数デバイスでデータを共有する
 * - エリア / ジャンル / 気分 の一覧を派生 signal で提供（フィルタ UI 用）
 *
 * 同期の安全設計：
 *  1) ループ防止 … 直近に同期した内容を lastSyncedJson で記憶し、同一内容は再送しない
 *  2) データ破壊防止 … ログイン直後はまずクラウドを読み（remoteReady）、
 *     存在すれば採用、未作成なら初回移行としてローカルをアップロードする
 */
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase.config';
import { Restaurant, RestaurantData } from '../models/restaurant';
import { AuthService } from './auth.service';

const STORAGE_KEY = 'lunch-picker.data.v1';
// Firestore 上の保存先：users/{uid}/lunch-picker/data
const APP_COLLECTION = 'lunch-picker';

@Injectable({ providedIn: 'root' })
export class RestaurantStore {
  private auth = inject(AuthService);

  /** 全店データ */
  readonly restaurants = signal<Restaurant[]>(this.load());

  /** 登録済みのエリア一覧（重複なし・昇順） */
  readonly areas = computed(() => this.distinct(this.restaurants().map((r) => r.area)));

  /** 付与済みのジャンル一覧 */
  readonly genres = computed(() => this.distinct(this.restaurants().flatMap((r) => r.genres)));

  /** 付与済みの気分一覧 */
  readonly moods = computed(() => this.distinct(this.restaurants().flatMap((r) => r.moods)));

  // ── 同期用の内部状態 ──────────────────────────────────────────────
  // 直近に Firestore と一致させた内容（同一なら再送しないことでループを防ぐ）
  private lastSyncedJson: string | null = null;
  // クラウドの初回読み取りが完了したか（完了前にローカルを書き込んでクラウドを壊さないため）
  private remoteReady = false;

  constructor() {
    // ① 変更を localStorage へ永続化（従来通り：オフラインキャッシュ／未ログイン時の保存）
    effect(() => this.save(this.restaurants()));

    // ② Firestore 購読：ログイン状態が変わるたびに購読を張り直す
    effect((onCleanup) => {
      const user = this.auth.user();
      // 購読を張り直す前に同期状態をリセット
      this.remoteReady = false;
      this.lastSyncedJson = null;
      if (!user) return; // 未ログインなら同期しない（localStorage のみで動作）

      const ref = doc(firestore, 'users', user.uid, APP_COLLECTION, 'data');
      const unsub = onSnapshot(ref, (snap) => {
        if (snap.exists()) {
          // クラウドに正データあり → 採用（他デバイスの更新もここで反映される）
          const data = snap.data() as RestaurantData;
          const list = Array.isArray(data.restaurants)
            ? data.restaurants.map((r) => this.normalize(r))
            : [];
          this.lastSyncedJson = JSON.stringify(list);
          this.remoteReady = true;
          this.restaurants.set(list);
        } else if (!this.remoteReady) {
          // クラウド未作成 かつ 初回読み取り → ローカルデータを初回移行アップロード
          this.remoteReady = true;
          const local = this.restaurants();
          this.lastSyncedJson = JSON.stringify(local);
          void setDoc(ref, this.toRemote(local));
        }
      });
      onCleanup(() => unsub());
    });

    // ③ ローカル変更を Firestore へ反映（初回読み取り完了後のみ・同一内容はスキップ）
    effect(() => {
      const list = this.restaurants();
      const user = this.auth.user();
      if (!user || !this.remoteReady) return;
      const json = JSON.stringify(list);
      if (json === this.lastSyncedJson) return; // クラウド由来の更新や無変更は再送しない
      this.lastSyncedJson = json;
      const ref = doc(firestore, 'users', user.uid, APP_COLLECTION, 'data');
      void setDoc(ref, this.toRemote(list));
    });
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

  // Firestore へ書き込むドキュメント形（更新時刻を添えて last-write-wins の判断材料にする）
  private toRemote(restaurants: Restaurant[]): RestaurantData & { updatedAt: number } {
    return { version: 1, restaurants, updatedAt: Date.now() };
  }

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
