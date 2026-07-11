import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SettingsStore } from './services/settings-store';
import { RestaurantSyncService } from './services/restaurant-sync.service';

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
  // 起動時に生成することでログイン監視・クラウド同期の effect を有効化する（他では未使用のため注入のみ必要）。
  private readonly restaurantSync = inject(RestaurantSyncService);

  constructor() {
    // 設定画面のテーマ選択を body の color-scheme に反映する。
    // Angular Material 3 の mat.theme() は color-scheme の値に応じて
    // システム変数（--mat-sys-*）を自動でライト/ダーク切り替えるため、
    // ここでの値の書き換えだけでアプリ全体の配色が切り替わる。
    //
    // 加えて、ダークモード時は独自の配色（styles.scss の
    // `html[data-color-scheme="dark"]` ブロック）で --mat-sys-* を
    // 上書きするため、実際に適用される配色（light / dark）を
    // data-color-scheme 属性として html に反映する。'system' の場合は
    // OS 設定を prefers-color-scheme で判定し、変更も監視する。
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applyResolvedTheme = () => {
      const theme = this.settings.theme();
      const resolved = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;
      document.documentElement.setAttribute('data-color-scheme', resolved);
    };

    effect(() => {
      const theme = this.settings.theme();
      document.body.style.colorScheme = theme === 'system' ? 'light dark' : theme;
      applyResolvedTheme();
    });
    media.addEventListener('change', applyResolvedTheme);
  }
}
