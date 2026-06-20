/**
 * @file guessGenres（店名→ジャンル推定）のユニットテスト。
 */
import { guessGenres } from './genre-guess';

describe('guessGenres', () => {
  it('キーワードからジャンルを推定する', () => {
    expect(guessGenres('荻窪中華そば春木屋 恵比寿店')).toContain('ラーメン');
    expect(guessGenres('肉汁餃子のダンダダン 恵比寿店')).toContain('餃子');
    expect(guessGenres('長命うどん東京本店')).toContain('うどん');
    expect(guessGenres('恵比寿ガパオ食堂')).toContain('タイ料理');
  });

  it('チェーン／固有名詞からジャンルを推定する', () => {
    expect(guessGenres('AFURI 恵比寿')).toContain('ラーメン');
    expect(guessGenres('サイゼリヤ 恵比寿駅東口店')).toContain('イタリアン');
    expect(guessGenres('サブウェイ 恵比寿店')).toContain('サンドイッチ');
  });

  it('複数該当時は重複なく返す', () => {
    const result = guessGenres('カレーつけ麺 しゅういち 恵比寿店');
    expect(result).toContain('ラーメン');
    expect(result).toContain('カレー');
    expect(new Set(result).size).toBe(result.length);
  });

  it('該当が無ければ空配列を返す', () => {
    expect(guessGenres('SONON')).toEqual([]);
  });
});
