import { Component, computed, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Restaurant } from '../../models/restaurant';
import { GENRE_OPTIONS, MOOD_OPTIONS } from '../../models/tags';
import { RestaurantStore } from '../../services/restaurant-store';
import { CsvImport } from '../../services/csv-import';

/** 取り込み & タグ付け画面：CSV 取込、ジャンル/気分タグ編集、JSON 入出力。 */
@Component({
  selector: 'app-data',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './data.html',
  styleUrl: './data.scss',
})
export class Data {
  private store = inject(RestaurantStore);
  private csv = inject(CsvImport);
  private snackBar = inject(MatSnackBar);

  readonly restaurants = this.store.restaurants;
  readonly total = computed(() => this.restaurants().length);

  /** ジャンル／気分の選択肢（選択式入力用）。 */
  readonly genreOptions = GENRE_OPTIONS;
  readonly moodOptions = MOOD_OPTIONS;

  /** エリア別にグルーピングした表示用データ。 */
  readonly groups = computed(() => {
    const map = new Map<string, Restaurant[]>();
    for (const r of this.restaurants()) {
      const list = map.get(r.area) ?? [];
      list.push(r);
      map.set(r.area, list);
    }
    return [...map.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], 'ja'))
      .map(([area, items]) => ({ area, items }));
  });

  readonly importing = signal(false);

  /** CSV ファイル選択時の取り込み。 */
  async onCsvSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.importing.set(true);
    try {
      const parsed = await this.csv.parseFiles(input.files);
      const added = this.store.addMany(parsed);
      const skipped = parsed.length - added;
      this.notify(
        `${added}件を取り込みました` + (skipped > 0 ? `（重複 ${skipped}件はスキップ）` : ''),
      );
    } catch (e) {
      this.notify('CSV の取り込みに失敗しました: ' + (e as Error).message);
    } finally {
      this.importing.set(false);
      input.value = ''; // 同じファイルを再選択できるようリセット
    }
  }

  /** ジャンル選択（複数選択ドロップダウン）の確定。 */
  setGenres(r: Restaurant, values: string[]): void {
    this.store.update(r.id, { genres: values });
  }

  /** 気分・その他選択（複数選択ドロップダウン）の確定。 */
  setMoods(r: Restaurant, values: string[]): void {
    this.store.update(r.id, { moods: values });
  }

  remove(r: Restaurant): void {
    this.store.remove(r.id);
  }

  clearAll(): void {
    if (confirm('登録済みのお店をすべて削除します。よろしいですか？')) {
      this.store.clear();
      this.notify('すべて削除しました');
    }
  }

  /** 現在のデータを JSON ファイルとしてダウンロード。 */
  exportJson(): void {
    const blob = new Blob([this.store.toJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lunch-picker-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /** JSON ファイルからデータを復元（既存は置き換え）。 */
  async onJsonSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const count = this.store.importJson(await file.text());
      this.notify(`${count}件を読み込みました`);
    } catch (e) {
      this.notify('JSON の読み込みに失敗しました: ' + (e as Error).message);
    } finally {
      input.value = '';
    }
  }

  private notify(message: string): void {
    this.snackBar.open(message, '閉じる', { duration: 4000 });
  }
}
