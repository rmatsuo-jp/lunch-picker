import { Routes } from '@angular/router';
import { environment } from '../environments/environment';

export const routes: Routes = [
  {
    path: '',
    title: '今日のランチおすすめ',
    loadComponent: () =>
      import('./pages/recommend/recommend').then((m) => m.Recommend),
  },
  {
    path: 'data',
    title: '取り込み & タグ付け',
    loadComponent: () => import('./pages/data/data').then((m) => m.Data),
  },
  {
    path: 'settings',
    title: '設定',
    loadComponent: () => import('./pages/settings/settings').then((m) => m.Settings),
  },
  // 開発用タブは本番ビルドでは存在させない（isDev による app.html のナビ表示制御と対応）
  ...(!environment.production
    ? [
        {
          path: 'dev',
          title: '開発',
          loadComponent: () => import('./pages/dev/dev').then((m) => m.Dev),
        },
      ]
    : []),
  { path: '**', redirectTo: '' },
];
