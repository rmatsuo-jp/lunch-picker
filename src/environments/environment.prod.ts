/**
 * @file 本番環境用の設定値。Google Maps Platform の API キー、および Firebase 構成
 * （クライアント公開情報）を保持する。本番ドメインのみを許可する HTTP リファラー制限と、
 * Places API のみへの API 制限をかけたキーを設定する。Firebase は study-english と
 * 同一プロジェクト（my-apps-sync）を Firestore 上の apps/lunch_picker 名前空間で分離して共用する。
 */
export const environment = {
  production: true,
  googleMapsApiKey: '', // デプロイ時に本番用キーへ差し替える
  firebase: {
    apiKey: 'AIzaSyAutqBenGPJzQPjBy81pxGAqPROIKoAos8',
    authDomain: 'my-apps-sync.firebaseapp.com',
    projectId: 'my-apps-sync',
    storageBucket: 'my-apps-sync.firebasestorage.app',
    messagingSenderId: '757775114616',
    appId: '1:757775114616:web:0f288ea4f994c4d657a88d',
  },
};
