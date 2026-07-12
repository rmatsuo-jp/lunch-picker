# Security Policy

## Supported Versions

このリポジトリは [semantic-release](https://semantic-release.gitbook.io/) により自動バージョニングされています。
セキュリティサポートは常に最新リリースのみを対象とします。過去バージョンへのバックポートは行いません。

## Reporting a Vulnerability

脆弱性を発見した場合は、公開Issueを立てず、GitHubの
[Private vulnerability reporting](../../security/advisories/new) から報告してください。

報告時は以下の情報を含めていただけると調査がスムーズです。

- 再現手順
- 影響範囲（該当するページ・機能）
- 想定される影響

報告後、可能な範囲で速やかに調査・対応します。対応の目安期間は設けていませんが、
個人開発プロジェクトのため即時対応をお約束するものではありません。

## 補足（本アプリ固有の注意点）

- 本アプリのデータは既定でブラウザの `localStorage` にのみ保存され、外部送信は行いません。
- Google Places / Maps API は、ユーザー操作（ボタン押下）を起点にのみ通信します。
- クラウド同期（Firestore）は、ホワイトリスト登録済みの特定アカウントがGoogleログインした場合のみ動作するオプトイン機能です。詳細は [ARCHITECTURE.md](ARCHITECTURE.md) を参照してください。
- クライアントに公開されるGoogle Maps/Places APIキーは、HTTPリファラー制限・Places API限定の制限キーを利用する前提です。
