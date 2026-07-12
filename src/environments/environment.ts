/**
 * @file 開発環境用の設定値。Google Maps Platform の API キー、および Firebase 構成
 * （クライアント公開情報）を保持する。本番ビルド時は angular.json の fileReplacements により
 * environment.prod.ts に差し替えられる。Google Maps 側の保護は Google Cloud Console の
 * HTTP リファラー制限・API制限（Places API のみ許可）で、Firebase 側は Firestore
 * セキュリティルール（ホワイトリスト制）で担保する。study-english と同一の Firebase
 * プロジェクト（my-apps-sync）を、Firestore 上は apps/lunch_picker 名前空間で分離して共用する。
 */
export const environment = {
  production: false,
  googleMapsApiKey: '', // 開発用: ローカルで Google Cloud Console から発行したキーを設定して使う
  firebase: {
    apiKey: 'AIzaSyAutqBenGPJzQPjBy81pxGAqPROIKoAos8',
    authDomain: 'my-apps-sync.firebaseapp.com',
    projectId: 'my-apps-sync',
    storageBucket: 'my-apps-sync.firebasestorage.app',
    messagingSenderId: '757775114616',
    appId: '1:757775114616:web:0f288ea4f994c4d657a88d',
  },
};
