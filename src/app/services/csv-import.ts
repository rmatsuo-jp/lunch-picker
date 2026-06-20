import { Injectable } from '@angular/core';
import Papa from 'papaparse';
import { Restaurant } from '../models/restaurant';

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
    const parsed = Papa.parse<Record<string, string>>(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase(),
    });

    const rows = parsed.data ?? [];
    const out: Restaurant[] = [];
    for (const row of rows) {
      const name = this.pick(row, ['title', 'name', '名前', '店名']);
      if (!name) continue; // 店名が無い行はスキップ
      out.push({
        id: crypto.randomUUID(),
        name,
        note: this.pick(row, ['note', 'comment', 'メモ', 'コメント']) || undefined,
        url: this.pick(row, ['url', 'link', 'リンク']) || undefined,
        area,
        genres: [],
        moods: [],
      });
    }
    return out;
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
