/**
 * @file 本番環境用の設定値。Google Maps Platform の API キー（クライアント公開情報）を保持する。
 * 本番ドメインのみを許可する HTTP リファラー制限と、Places API のみへの API 制限をかけたキーを設定する。
 */
export const environment = {
  production: true,
  googleMapsApiKey: '', // デプロイ時に本番用キーへ差し替える
};
