# CLAUDE.md

このリポジトリで作業する際の指針。

## 概要
Google Map の保存リスト（CSV）を取り込み、ジャンル・気分タグで絞り込んで
「今日のランチ」をおすすめするアプリ。AI は使わず、ローカルのデータとタグだけで完結する。

## エージェント向け基本ルール
- **会話言語**: Claude Code はすべての返答・説明・質問を**日本語**で行うこと。
- **学習目的の教授ルール**: ユーザーがスクリプト作成やコード変更を依頼した際、エージェントは単に実装するのではなく、Claude Code 上で同時に「なぜそのファイルをどう変更するとその挙動になるのか」を日本語で解説すること。目的は、ユーザー自身が今後 Angular のコードを自力で修正できるレベルまで精通すること。実装と解説を必ずセットで行う。

## 規約
- **Angular 22 / standalone components / signals / `inject()`**。NgModule は使わない。
- ファイル命名は `.component` 等のサフィックス無し（`feature.ts/html/scss`）。
- 各ファイル冒頭に日本語の `@file` / JSDoc コメントを付ける。
- ルートは `app.routes.ts` で `loadComponent`（遅延ロード）。
- **状態は必ず `RestaurantStore` 経由**。コンポーネントから直接 `localStorage` を触らない。
- UI コンポーネントは **Angular Material**（`@angular/material` / `@angular/cdk`）を利用。
- UI 文言・コメントは日本語。

## アーキテクチャ
- `services/restaurant-store.ts` — localStorage 永続化の単一ソース。
  `restaurants` を signal で保持し、変更を `effect` で自動保存。
  エリア / ジャンル / 気分の一覧を派生 `computed` で公開（フィルタ UI 用）。
  追加（重複排除）・更新・削除・JSON 入出力を提供する。
- `services/csv-import.ts` — Google Takeout の保存リスト CSV（`Title, Note, URL`）を
  `papaparse` で解析し `Restaurant[]` へ変換。エリアはファイル名から決める。
- `models/restaurant.ts` — `Restaurant` / `RestaurantData` 型定義。
- `pages/recommend/` — タグで絞り込んでランチをおすすめ（トップページ）。
- `pages/data/` — CSV 取り込み & タグ付け・データ管理。

## コマンド
- `npm start` 開発サーバ / `npm run build` 本番ビルド / `npm test` テスト。

## 開発サーバーのポート
- 既定ポートは `angular.json` の `architect.serve.options.port` で **4202** に固定。
  （study-english=4200 / career-roadmap=4201 と分け、3システム同時起動を可能にするため）
</content>
