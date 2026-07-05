/**
 * @file 設定ページ。アプリのバージョン名・リリース日、および
 *       Google Maps API キーの入力・保存（localStorage）を扱う。
 *       version.ts はビルド/開発サーバ起動時に scripts/generate-version.mjs が自動生成する。
 */
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_VERSION, RELEASE_DATE } from '../../../version';
import { SettingsStore } from '../../services/settings-store';

@Component({
  selector: 'app-settings',
  imports: [
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  private settings = inject(SettingsStore);
  private snackBar = inject(MatSnackBar);

  protected readonly version = APP_VERSION;
  protected readonly releaseDate = RELEASE_DATE;

  /** 入力欄の一時的な値（保存ボタンを押すまでは反映しない）。 */
  protected readonly apiKeyInput = signal(this.settings.googleMapsApiKey());
  /** キーを平文表示するかどうか。 */
  protected readonly showKey = signal(false);
  protected readonly hasSavedKey = this.settings.googleMapsApiKey;

  toggleShowKey(): void {
    this.showKey.update((v) => !v);
  }

  save(): void {
    this.settings.setGoogleMapsApiKey(this.apiKeyInput());
    this.notify('Google Maps API キーを保存しました');
  }

  clear(): void {
    this.settings.clearGoogleMapsApiKey();
    this.apiKeyInput.set('');
    this.notify('Google Maps API キーを削除しました');
  }

  private notify(message: string): void {
    this.snackBar.open(message, '閉じる', { duration: 3000 });
  }
}
