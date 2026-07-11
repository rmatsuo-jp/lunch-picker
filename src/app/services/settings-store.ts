/**
 * @file アプリ設定（Google Maps APIキー・表示テーマ等）のストア。RestaurantStore と同じ方式で
 * localStorage に永続化する。ユーザーが設定画面から入力したキーやテーマ選択を保持し、
 * PlacesEnrichment / GoogleMapsLoader / App コンポーネントから参照される。
 */
import { Injectable, computed, effect, signal } from '@angular/core';

const STORAGE_KEY = 'lunch-picker.settings.v1';

/** ライト / ダーク / システム設定への追従。 */
export type ThemePreference = 'light' | 'dark' | 'system';

interface SettingsData {
  version: 2;
  googleMapsApiKey: string;
  theme: ThemePreference;
}

@Injectable({ providedIn: 'root' })
export class SettingsStore {
  private readonly data = signal<SettingsData>(this.load());

  /** 保存済みの Google Maps APIキー（未設定時は空文字）。 */
  readonly googleMapsApiKey = computed(() => this.data().googleMapsApiKey);

  /** 表示テーマの選択（未設定時は 'system'）。 */
  readonly theme = computed(() => this.data().theme);

  constructor() {
    effect(() => this.save(this.data()));
  }

  /** APIキーを保存する（前後の空白は除去）。 */
  setGoogleMapsApiKey(key: string): void {
    this.data.update((current) => ({ ...current, googleMapsApiKey: key.trim() }));
  }

  /** APIキーの設定を削除する。 */
  clearGoogleMapsApiKey(): void {
    this.data.update((current) => ({ ...current, googleMapsApiKey: '' }));
  }

  /** 表示テーマを保存する。 */
  setTheme(theme: ThemePreference): void {
    this.data.update((current) => ({ ...current, theme }));
  }

  private load(): SettingsData {
    const fallback: SettingsData = { version: 2, googleMapsApiKey: '', theme: 'system' };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw) as Partial<SettingsData>;
      return {
        version: 2,
        googleMapsApiKey: parsed.googleMapsApiKey ?? '',
        theme: parsed.theme ?? 'system',
      };
    } catch {
      return fallback;
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
