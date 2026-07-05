/**
 * @file Google Maps JavaScript API のスクリプトを動的に読み込むサービス。
 * `@angular/google-maps` の `<google-map>` は window.google.maps を前提とするため、
 * 地図を使う画面（おすすめページ）で初めて呼ばれたときに1回だけ読み込む。
 */
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { SettingsStore } from './settings-store';

@Injectable({ providedIn: 'root' })
export class GoogleMapsLoader {
  private settings = inject(SettingsStore);
  private loadPromise: Promise<void> | null = null;

  /** スクリプトの読み込みを開始し、読み込み完了（または失敗）を待つ Promise を返す。 */
  load(): Promise<void> {
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = new Promise((resolve, reject) => {
      if (window.google?.maps) {
        resolve();
        return;
      }
      const apiKey = this.settings.googleMapsApiKey() || environment.googleMapsApiKey;
      if (!apiKey) {
        reject(new Error('設定画面で Google Maps API キーを登録してください'));
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Google Maps スクリプトの読み込みに失敗しました'));
      document.head.appendChild(script);
    });

    return this.loadPromise;
  }
}
