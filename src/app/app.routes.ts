import { Routes } from '@angular/router';

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
  { path: '**', redirectTo: '' },
];
