/**
 * @file 設定ページ。アプリのバージョン名・リリース日を表示する。
 *       version.ts はビルド/開発サーバ起動時に scripts/generate-version.mjs が自動生成する。
 */
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { APP_VERSION, RELEASE_DATE } from '../../../version';

@Component({
  selector: 'app-settings',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  protected readonly version = APP_VERSION;
  protected readonly releaseDate = RELEASE_DATE;
}
