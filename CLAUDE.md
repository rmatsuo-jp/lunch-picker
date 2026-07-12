# CLAUDE.md

このリポジトリで作業する際の指針。

アプリ名: **ランチくじ（Lunch Roulette）**

## 概要
Google Map の保存リスト（CSV）を取り込み、ジャンル・気分タグで絞り込んで
「今日のランチ」をおすすめするアプリ。データは基本ローカル完結だが、
店舗情報の正確化のため Google Places API（外部通信）を利用する。
外部API・生成AIの利用は、APIキー保護やコスト管理などの安全性を担保できる場合に限り許可する。
バックグラウンドでの自動通信は行わず、ユーザー操作（ボタン押下）をきっかけにのみ通信する。

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
  ジャンルは取り込み時点では未設定（空配列）。手動タグ付け、または Places API 取得時の
  自動反映（`places-genre-map.ts`）でジャンルを付与する（店名からの正規表現推定は廃止済み）。
- `models/restaurant.ts` — `Restaurant` / `RestaurantData` 型定義。
- `models/places.ts` — Google Places API から取得する `PlacesInfo` 型定義。
- `services/places-enrichment.ts` — Places API v1 (`searchText`) を呼び、店舗の座標・
  評価・営業時間等を取得。店ごとに1回のみ呼び出す前提（キャッシュは `Restaurant.places`）。
- `services/places-genre-map.ts` — Places の公式ジャンル（`types`）を日本語ジャンルタグへ
  変換。`pages/data/` で取得成功時に手動タグと統合（和集合）して反映する。
- `services/google-maps-loader.ts` — Google Maps JavaScript API スクリプトの動的読み込み。
- `services/settings-store.ts` — `googleMapsApiKey`（ユーザーが設定画面で入力した値）を
  localStorage に永続化。`environment.ts` の値より優先される。
- `pages/recommend/` — タグで絞り込んでランチをおすすめ（トップページ）。地図表示・
  現在地からの距離順/評価順ソートに加え、評価・レビュー件数・距離・直近の被り回避を
  加味したスコアリングで1件を選ぶ「今日のおすすめ」がある（`RestaurantStore.recentPickedIds`
  で直近の被りを回避）。
- `pages/data/` — CSV 取り込み & タグ付け・データ管理・Places 情報の取得ボタン。
- `pages/settings/` — バージョン情報表示 ＋ Google Maps API キーの入力・保存。
- `environments/` — `googleMapsApiKey` の開発用フォールバック値。実運用は設定画面から
  ユーザーが登録するキー（`SettingsStore`）を優先。HTTP リファラー制限・Places API限定の
  API制限をかけたキーをクライアントに公開する前提。

## コマンド
- `npm start` 開発サーバ / `npm run build` 本番ビルド / `npm test` テスト。

## バージョン運用
- **Conventional Commits + semantic-release** で自動採番。`package.json` の `version` は手動編集しない。
- main への push をトリガに GitHub Actions が次バージョンを判定し、タグ・GitHub Release・`CHANGELOG.md` を生成。
  - `fix:` / `perf:` → PATCH、`feat:` → MINOR、`feat!:` / `BREAKING CHANGE:` → MAJOR。
    `docs:` `chore:` `refactor:` `style:` `test:` `ci:` は上昇なし。
- `src/version.ts`（`APP_VERSION` / `RELEASE_DATE`）は **リリース時のみ** semantic-release が
  `scripts/generate-version.mjs` を実行して更新する。`npm start` / `npm run build` では再生成されない。
- 設定（`.releaserc.json`）は3プロジェクト共通。

## 開発サーバーのポート
- 既定ポートは `angular.json` の `architect.serve.options.port` で **4202** に固定。
  （study-english=4200 / career-roadmap=4201 と分け、3システム同時起動を可能にするため）

## 今後の対応（TODO）
アプリ名を「ランチくじ（Lunch Roulette）」に変更した際、以下の技術識別子は
既存ユーザーデータとの互換性・デプロイ設定変更のリスクを避けるため、あえて
`lunch-picker` のまま据え置いた。将来的には段階的にこれらも新名称ベースへ
統一すること。
- `package.json` の `"name": "lunch-picker"`、`angular.json` のプロジェクト名
  （`lunch-picker:build:production` 等のビルドターゲット）
- `restaurant-store.ts` / `settings-store.ts` / `dev.ts` の localStorage キー
  （`lunch-picker.data.v1` 等） — 変更するとブラウザ内の既存保存データが読めなくなる
- `restaurant-sync.service.ts` / `firebase.init.ts` の Firestore 名前空間
  `apps/lunch_picker` — 既存のクラウド同期データとの互換性のため
- GitHub リポジトリ名・`CHANGELOG.md` 内のリポジトリURL（`--base-href=/lunch-picker/` 等の
  デプロイ設定にも波及するため、リポジトリ名変更は別途計画して実施する）
</content>
