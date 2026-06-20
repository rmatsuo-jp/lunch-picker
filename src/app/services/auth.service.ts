/**
 * @file Google ログイン（任意・オプトイン）を担う認証サービス。
 * onAuthStateChanged でログイン状態を signal に反映し、UI とデータ同期の両方が購読できるようにする。
 * 未ログイン時はアプリは従来通り localStorage のみで動作する（ログインは「共有を有効化するスイッチ」）。
 */
import { Injectable, signal } from '@angular/core';
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { firebaseAuth } from '../firebase.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // ── ログイン中ユーザー（null = 未ログイン）。テンプレートと同期処理が購読する ──
  private _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  constructor() {
    // 認証状態の変化（ログイン/ログアウト/リロード復元）を signal へ反映
    onAuthStateChanged(firebaseAuth, (u) => this._user.set(u));
  }

  // Google アカウントでログイン（ポップアップ方式）
  async loginWithGoogle(): Promise<void> {
    await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
  }

  // ログアウト（以後は localStorage のみの従来動作に戻る）
  async logout(): Promise<void> {
    await signOut(firebaseAuth);
  }
}
