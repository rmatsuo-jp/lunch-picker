/**
 * @file 本番環境用の設定値。Google Maps Platform の API キー、および Firebase 構成
 * （クライアント公開情報）を保持する。本番ドメインのみを許可する HTTP リファラー制限と、
 * Places API のみへの API 制限をかけたキーを設定する。Firebase はランチくじ専用の
 * プロジェクト（lunch-roulette-3c777）を使い、Firestore 上は apps/lunch_roulette 名前空間で管理する。
 */
export const environment = {
  production: true,
  googleMapsApiKey: '', // デプロイ時に本番用キーへ差し替える
  firebase: {
    apiKey: 'AIzaSyCbHt5PyRcv4oPTCoMm5mNs4ekoMhJhTqg',
    authDomain: 'lunch-roulette-3c777.firebaseapp.com',
    projectId: 'lunch-roulette-3c777',
    storageBucket: 'lunch-roulette-3c777.firebasestorage.app',
    messagingSenderId: '896647063882',
    appId: '1:896647063882:web:1c92112daccbed63d1b9b3',
  },
};
