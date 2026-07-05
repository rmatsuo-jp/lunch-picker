/**
 * @file Google Places API の公式ジャンル（`types`）を、アプリの日本語ジャンルタグ
 * （`models/tags.ts` の GENRE_OPTIONS）へ変換するユーティリティ。
 * 店名からの正規表現推定（旧 genre-guess.ts）に代わる、Places 由来の客観的な分類。
 */

/** Places の type（英語の列挙値）→ アプリのジャンルタグ（日本語）。 */
const TYPE_TO_GENRE: Record<string, string> = {
  ramen_restaurant: 'ラーメン',
  chinese_restaurant: '中華',
  dumpling_restaurant: '餃子',
  udon_noodle_restaurant: 'うどん',
  soba_noodle_restaurant: 'そば',
  japanese_restaurant: '和食',
  sushi_restaurant: '寿司',
  seafood_restaurant: '海鮮',
  barbecue_restaurant: '焼肉',
  yakitori_restaurant: '焼き鳥',
  steak_house: '肉料理',
  meal_takeaway: '定食',
  meal_delivery: '定食',
  italian_restaurant: 'イタリアン',
  pizza_restaurant: 'イタリアン',
  spanish_restaurant: 'スペイン料理',
  indian_restaurant: 'インド料理',
  thai_restaurant: 'タイ料理',
  vietnamese_restaurant: 'ベトナム料理',
  korean_restaurant: '韓国料理',
  cafe: 'カフェ',
  coffee_shop: 'カフェ',
  dessert_shop: 'スイーツ',
  bakery: 'パン',
  sandwich_shop: 'サンドイッチ',
  bar: '居酒屋',
  izakaya_restaurant: '居酒屋',
};

/** Places の `types` 配列から、アプリのジャンルタグ一覧（重複なし）を得る。 */
export function mapPlaceTypesToGenres(types: string[]): string[] {
  const found = new Set<string>();
  for (const t of types) {
    const genre = TYPE_TO_GENRE[t];
    if (genre) found.add(genre);
  }
  return [...found];
}
