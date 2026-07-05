/** Google Places API (v1) から取得した店舗情報のキャッシュ。 */
export interface PlacesInfo {
  /** Places API 側の店舗 ID（再取得判定・重複防止のキー） */
  placeId: string;
  /** 緯度 */
  lat: number;
  /** 経度 */
  lng: number;
  /** Places API の公式ジャンル（例: "ramen_restaurant"） */
  types: string[];
  /** 評価（5点満点、未提供の場合あり） */
  rating?: number;
  /** レビュー件数 */
  userRatingsTotal?: number;
  /** 価格帯（0〜4、未提供の場合あり） */
  priceLevel?: number;
  /** 表示用の住所 */
  address?: string;
  /** 営業時間（曜日ごとの表示用テキスト） */
  openingHoursText?: string[];
  /** 取得日時（ISO文字列） */
  fetchedAt: string;
  /** 取得失敗時のエラーメッセージ（成功時は未設定） */
  fetchError?: string;
}
