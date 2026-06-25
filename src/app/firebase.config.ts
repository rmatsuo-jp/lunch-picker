/**
 * @file Firebase 接続設定とアプリ初期化。
 * Auth（Google ログイン）と Firestore（複数デバイス同期）の単一初期化点。
 * firebaseConfig は秘密情報ではなくプロジェクト識別子であり、public push して問題ない。
 * 実際のアクセス保護は Firestore セキュリティルール（本人 UID のみ許可）で行う。
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from 'firebase/firestore';

// ── 接続設定（Firebase コンソール → プロジェクト設定 → ウェブアプリ から取得して貼り付け） ──
// TODO: 下記をあなたのプロジェクトの値に置き換える。
export const firebaseConfig = {
  apiKey: 'REPLACE_ME',
  authDomain: 'REPLACE_ME.firebaseapp.com',
  projectId: 'REPLACE_ME',
  storageBucket: 'REPLACE_ME.appspot.com',
  messagingSenderId: 'REPLACE_ME',
  appId: 'REPLACE_ME',
};

// ── 初期化（アプリ全体で 1 インスタンスを共有） ──────────────────────
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

// オフライン永続化を有効化した Firestore。
// persistentLocalCache により、ネット切断時もローカルから読み書きでき、復帰時に自動同期される。
export const firestore = initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({ tabManager: persistentSingleTabManager(undefined) }),
});
