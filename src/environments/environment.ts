/**
 * @file 開発環境用の設定値。Google Maps Platform の API キー（クライアント公開情報）を保持する。
 * 本番ビルド時は angular.json の fileReplacements により environment.prod.ts に差し替えられる。
 * 保護は Google Cloud Console 側の HTTP リファラー制限・API制限（Places API のみ許可）で担保する。
 */
export const environment = {
  production: false,
  googleMapsApiKey: '', // 開発用: ローカルで Google Cloud Console から発行したキーを設定して使う
};
