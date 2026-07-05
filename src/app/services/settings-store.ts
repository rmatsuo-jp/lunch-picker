/**
 * @file アプリ設定（Google Maps APIキー等）のストア。RestaurantStore と同じ方式で
 * localStorage に永続化する。ユーザーが設定画面から入力したキーを保持し、
 * PlacesEnrichment / GoogleMapsLoader から参照される。
 */
import { Injectable, computed, effect, signal } from '@angular/core';

const STORAGE_KEY = 'lunch-picker.settings.v1';

interface SettingsData {
  version: 1;
  googleMapsApiKey: string;
}

@Injectable({ providedIn: 'root' })
export class SettingsStore {
  private readonly data = signal<SettingsData>(this.load());

  /** 保存済みの Google Maps APIキー（未設定時は空文字）。 */
  readonly googleMapsApiKey = computed(() => this.data().googleMapsApiKey);

  constructor() {
    effect(() => this.save(this.data()));
  }

  /** APIキーを保存する（前後の空白は除去）。 */
  setGoogleMapsApiKey(key: string): void {
    this.data.set({ version: 1, googleMapsApiKey: key.trim() });
  }

  /** APIキーの設定を削除する。 */
  clearGoogleMapsApiKey(): void {
    this.data.set({ version: 1, googleMapsApiKey: '' });
  }

  private load(): SettingsData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { version: 1, googleMapsApiKey: '' };
      const parsed = JSON.parse(raw) as Partial<SettingsData>;
      return { version: 1, googleMapsApiKey: parsed.googleMapsApiKey ?? '' };
    } catch {
      return { version: 1, googleMapsApiKey: '' };
    }
  }

  private save(data: SettingsData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ストレージ不可時は無視（プライベートブラウズ等）
    }
  }
}
