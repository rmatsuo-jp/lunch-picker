import { Injectable } from '@angular/core';
import Papa from 'papaparse';
import { Restaurant } from '../models/restaurant';
import { guessGenres } from './genre-guess';

/**
 * Google Takeout（保存済みリスト）の CSV を Restaurant[] へ変換する。
 *
 * Takeout の CSV は基本 `Title, Note, URL` の3列。
 * エリアはファイル名（拡張子を除いたもの＝Google Map のリスト名）から決める。
 */
@Injectable({ providedIn: 'root' })
export class CsvImport {
  /** 複数ファイルをまとめて取り込む。 */
  async parseFiles(files: FileList | File[]): Promise<Restaurant[]> {
    const list = Array.from(files);
    const results = await Promise.all(list.map((f) => this.parseFile(f)));
    return results.flat();
  }

  /** 1ファイルを取り込む。 */
  async parseFile(file: File): Promise<Restaurant[]> {
    const area = this.areaFromFileName(file.name);
    const text = await file.text();
    return this.parseText(text, area);
  }

  /** CSV テキストを指定エリアの Restaurant[] へ変換する。 */
  parseText(text: string, area: string): Restaurant[] {
    // 説明文や空行が先頭にある CSV にも対応するため、本当のヘッダー行から解析を始める。
    const body = this.sliceFromHeader(text);
    const parsed = Papa.parse<Record<string, string>>(body, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase(),
    });

    const rows = parsed.data ?? [];
    const out: Restaurant[] = [];
    for (const row of rows) {
      const name = this.pick(row, ['title', 'name', 'タイトル', '名前', '店名']);
      if (!name) continue; // 店名が無い行はスキップ
      out.push({
        id: crypto.randomUUID(),
        name,
        note: this.pick(row, ['note', 'comment', 'メモ', 'コメント']) || undefined,
        url: this.pick(row, ['url', 'link', 'リンク']) || undefined,
        area,
        genres: guessGenres(name), // 店名からジャンルをローカル推定（初期値・手動編集可）
        moods: [],
      });
    }
    return out;
  }

  /**
   * 本当のヘッダー行から始まるテキストへ切り詰める。
   * Google 標準形式（1行目がヘッダー）はそのまま、
   * 先頭に説明文や空行がある形式では該当行以前を読み飛ばす。
   */
  private sliceFromHeader(text: string): string {
    const lines = text.split(/\r?\n/);
    // 既知の列名のいずれかを含む最初の行をヘッダーとみなす。
    const headerKeys = ['title', 'name', 'url', 'タイトル', '名前', '店名'];
    const idx = lines.findIndex((line) => {
      const cells = line.toLowerCase().split(',').map((c) => c.trim());
      return cells.some((c) => headerKeys.includes(c));
    });
    // 見つからなければ元テキストをそのまま返す（従来動作を維持）。
    return idx <= 0 ? text : lines.slice(idx).join('\n');
  }

  /** ファイル名からエリア名を作る（拡張子除去）。 */
  private areaFromFileName(fileName: string): string {
    const base = fileName.replace(/\.[^.]+$/, '').trim();
    return base || '未分類';
  }

  /** 候補キーのうち最初に見つかった非空値を返す。 */
  private pick(row: Record<string, string>, keys: string[]): string {
    for (const k of keys) {
      const v = row[k];
      if (v && v.trim()) return v.trim();
    }
    return '';
  }
}
