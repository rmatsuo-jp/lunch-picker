import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SettingsStore } from './services/settings-store';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly settings = inject(SettingsStore);

  constructor() {
    // 設定画面のテーマ選択を body の color-scheme に反映する。
    // Angular Material 3 の mat.theme() は color-scheme の値に応じて
    // システム変数（--mat-sys-*）を自動でライト/ダーク切り替えるため、
    // ここでの値の書き換えだけでアプリ全体の配色が切り替わる。
    effect(() => {
      const theme = this.settings.theme();
      document.body.style.colorScheme = theme === 'system' ? 'light dark' : theme;
    });
  }
}
