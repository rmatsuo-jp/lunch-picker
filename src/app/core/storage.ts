/**
 * @file localStorage への安全な読み書きユーティリティ。
 * プライベートブラウズ等でストレージ操作が失敗しても例外を投げず、既定値やno-opにフォールバックする。
 */

/** キーからJSONを読み込む。値が無い・パース失敗時は fallback を返す。 */
export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** キーへJSONを書き込む。失敗時は無視する。 */
export function writeJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ストレージ不可時は無視（プライベートブラウズ等）
  }
}
