/**
 * @file 開発環境用の設定値。Google Maps Platform の API キー、および Firebase 構成
 * （クライアント公開情報）を保持する。本番ビルド時は angular.json の fileReplacements により
 * environment.prod.ts に差し替えられる。Google Maps 側の保護は Google Cloud Console の
 * HTTP リファラー制限・API制限（Places API のみ許可）で、Firebase 側は Firestore
 * セキュリティルール（ホワイトリスト制）で担保する。ランチくじ専用の Firebase プロジェクト
 * （lunch-roulette-3c777）を使い、Firestore 上は apps/lunch_roulette 名前空間で管理する。
 */
export const environment = {
  production: false,
  googleMapsApiKey: '', // 開発用: ローカルで Google Cloud Console から発行したキーを設定して使う
  firebase: {
    apiKey: 'AIzaSyCbHt5PyRcv4oPTCoMm5mNs4ekoMhJhTqg',
    authDomain: 'lunch-roulette-3c777.firebaseapp.com',
    projectId: 'lunch-roulette-3c777',
    storageBucket: 'lunch-roulette-3c777.firebasestorage.app',
    messagingSenderId: '896647063882',
    appId: '1:896647063882:web:1c92112daccbed63d1b9b3',
  },
};
