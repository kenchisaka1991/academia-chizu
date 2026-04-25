# CLAUDE.md - Academia Chizu

## プロジェクト概要
スペイン語話者向けの日本語学習アプリ（N5レベル）。ボリビアの学習者を対象とした単一HTMLファイルのWebアプリ。UIテキストはスペイン語、学習対象は日本語。

## 技術スタック
- **Vanilla HTML / CSS / JavaScript** — フレームワーク・ビルドツールなし
- **単一ファイル構成**: `index.html`（約5,000行、CSS・JS・データすべて内包）
- 永続化: `localStorage`（学習済み文字・クイズスコア `chizu_scores`）
- 認証: **Firebase Authentication**（メール/パスワード・Google 有効済み）
- 外部依存: Google Fonts + Firebase CDN（10.12.0 compat版）
- デプロイ: GitHub Pages `https://kenchisaka1991.github.io/academia-chizu/`

## Firebase設定
```js
const firebaseConfig = {
    apiKey: "AIzaSyDJ9aF4SPYXq7IddE4JMTQtlo8mSV2OHnI",
    authDomain: "academia-chizu.firebaseapp.com",
    projectId: "academia-chizu",
    storageBucket: "academia-chizu.firebasestorage.app",
    messagingSenderId: "164979600430",
    appId: "1:164979600430:web:43e371a22e87ff7b9a43bf"
};
```
- 承認済みドメイン: `localhost`, `academia-chizu.firebaseapp.com`, `kenchisaka1991.github.io`
- ログインプロバイダ: メール/パスワード ✅ / Google ✅（Googleボタンは未実装）

## アーキテクチャ
ナビゲーションは3つのトップレベル `<section>`：

| Section | ID | 内容 |
|---|---|---|
| 文字 (もじ) | `#moji` | ひらがな / カタカナ / 漢字 のタブ、各々 Aprender/Practicar・Tarjeta/Quiz |
| 文法 (ぶんぽう) | `#grammar` | です / です活用 / ます / 形容詞 / ましょう / 〜たい / 助詞 のタブ |
| 語彙 (ごい) | `#vocab` | カテゴリ別語彙、「Aprender / Practicar」モード |

統計（学習済み数など）は `#moji` の上部に常時表示。

---

## 文法モジュール（Grammar）

### タブ構成（renderGrammar の if-else 12分岐）
```
desu → katsu → masu → keiyo → mashou → tai → maeni → niiku → te → ta → taexp → joshi（else）
```
**新レッスン追加時は必ず3箇所に追記：**
1. タブボタン HTML（renderGrammar内）
2. if-else 分岐（renderGrammar内）
3. render関数本体

### 各モジュール概要

| key | タブ名 | データ | Practicar形式 |
|---|---|---|---|
| `desu` | です | `desuLesson`, `desuQuizPool` | 並び替え |
| `katsu` | です活用 | `katsuLesson`, `katsuQuizPool` | 4択 |
| `masu` | ます | `masuLesson`, `masuQuizPool` | 4択 |
| `keiyo` | 形容詞 | `keiyoIData`(46語), `keiyoNaData`(18語), `keiyoIMeishiData`, `keiyoNaMeishiData` | Conjugación / Uso con sustantivos |
| `mashou` | ましょう | `mashouLesson`(15語), `mashouQuizPool`(12問) | 並び替え |
| `tai` | 〜たい | `taiData`(15語), `taiQuizPool`, `taiReorderPool`(12問) | Conjugación / Orden de palabras |
| `maeni` | 〜前に・後で | `maeniLesson`(8語), `maeniQuizPool`(10問) | 並び替え |
| `niiku` | 〜に行く・来る | `niikuLesson`, `niikuQuizPool`(10問) | 並び替え |
| `joshi` | 助詞 | `joshiData`(10グループ) | 並び替え / 穴埋め |
| `te` | て形 | `teVerbPool`(38語), `teReorderPool`(30問) | Conjugación(4択) / Orden de palabras |
| `ta` | た形 | `taVerbPool`(38語), `taReorderPool`(30問) | Conjugación(4択) / Orden de palabras |
| `taexp` | たことがある・たほうがいい | `taexpData`, `taReorderPool`をフィルタ | Orden de palabras（サブタブ切替） |

### 形容詞モジュール（keiyoXxx）
```
形容詞タブ
├── [い形容詞] [な形容詞] サブタブ（Aprender/Practicarで共有）
├── Aprender: ① 活用表（4形）② 名詞修飾例カード
└── Practicar: [Conjugación] [Uso con sustantivos] モード選択
```
State: `keiyoType('i'|'na')`, `keiyoPracMode('katsu'|'meishi')`

### 〜たいモジュール（taiXxx）
```
〜たいタブ
├── Aprender: 説明 + 活用表（たい/たくない/たかった/たくなかった）
└── Practicar: [Conjugación(4択)] [Orden de palabras(並び替え)] モード選択
```
State: `taiPracMode('katsu'|'reorder')`

### 助詞モジュール（joshiData）
**グループ一覧（index 0〜9）:**
| index | グループ名 | 助詞 |
|---|---|---|
| 0 | Tema y Sujeto | は・が |
| 1 | Objeto | を |
| 2 | Lugar y Dirección | に・で・へ |
| 3 | Conexión | と・も・の |
| 4 | Tiempo | に・から・まで |
| 5 | Final de oración | よ・ね・か |
| 6 | Inclusión も | も |
| 7 | から・まで | から・まで（範囲） |
| 8 | から (Razón) | から（理由・原因） |
| 9 | が (Pero) | が（逆接） |
| **10** | **⭐ Repaso** | **全グループ混合（並び替え+穴埋め）** |

**⚠️ 要注意: Repaso は `joshiGroup === 10` で判定。グループ追加時は必ず更新。**

---

## 語彙モジュール（vocabData）

### カテゴリ一覧（index 0〜10）
| index | name | es（タブ表示） | 語数 |
|---|---|---|---|
| 0 | あいさつ | Saludos | 15語 |
| 1 | 人・家族 | Personas | 15語（代名詞+職業） |
| 2 | 食べ物 | Comida | 18語 |
| 3 | 場所 | Lugares | 19語 |
| 4 | 時間 | Tiempo | 18語 |
| 5 | 動詞 | Verbos | 23語 |
| 6 | い形容詞 | Adj. い | 21語 |
| 7 | な形容詞 | Adj. な | 15語 |
| 8 | その他 | Otros | 22語 |
| 9 | 乗り物 | Transporte | 12語 |
| 10 | 家族 | Familia | 18語 |
| **11** | **⭐ Repaso** | **—** | **全カテゴリ混合** |

**⚠️ 要注意: Repaso は `vocabCategory === 11` で判定。**

各カテゴリは `{ name, es, words:[{w, r, m}] }` の構造。
タブ表示は `c.es` を使用（`c.name` は内部識別のみ）。

---

## データ構造（すべて JS const）
- `hiragana` / `katakana`: `{ char: { romaji, vocab:[{jp, es, emoji}] } }`
- `desuLesson`, `desuQuizPool` — です並び替えクイズ50問
- `masuLesson`, `masuQuizPool` — ます活用（3グループ）
- `katsuLesson`, `katsuQuizPool` — です活用（現在/過去・肯定/否定）
- `mashouLesson`, `mashouQuizPool` — ましょう・ませんか（15動詞、並び替え12問）
- `taiData`, `taiQuizPool`, `taiReorderPool` — 〜たい（15動詞、4択pool、並び替え12問）
- `keiyoIData`(46語), `keiyoNaData`(18語), `keiyoIMeishiData`, `keiyoNaMeishiData`
- `joshiData`(10グループ), `joshiMatomeReorder`, `joshiMatomeFill`
- `kanjiData`, `kanjiWordPool`
- `vocabData`(11カテゴリ)

## State（グローバル `let`）
モジュールごとに `xxxMode`, `xxxQuizIdx`, `xxxCorrect`, `xxxQuestions`, `xxxErrors` のパターンを反復。
- `taiPracMode('katsu'|'reorder')` — 〜たい練習モード
- `keiyoPracMode('katsu'|'meishi')` — 形容詞練習モード
- `keiyoType('i'|'na')` — 形容詞種別

---

## コーディング規約
- 関数命名: `renderXxx()` (描画), `showXxx()` (表示更新), `checkXxx()` (採点), `startXxx()` (クイズ開始), `setXxx()` (state変更)
- イベント処理は `onclick="..."` をHTML属性に直接記述（イベントリスナーは原則使わない）
- 描画は `innerHTML = \`...\`` テンプレートリテラルで一括置換
- `stripRuby(html)` でルビタグを除去してから採点比較
- セクション切替: `.section.active { display: block }` と `.active` クラスのトグル

---

## 実装済み（全機能）
- ひらがな・カタカナ・漢字（Aprender/Practicar・Tarjeta/Quiz）
- Firebase Authentication（メール/パスワード登録・ログイン・ログアウト）
- クイズスコアを `localStorage` に保存（`saveScore()` / `getAvgScore()`）
- プラン選択モーダル（Gratis/Estudio Bs.30/Premium Bs.60）
- **文法タブ12種**: です・です活用・ます・形容詞・ましょう・〜たい・〜前に/後で・〜に行く/来る・助詞・て形・た形・たことがある/たほうがいい
- **助詞10グループ**: は/が・を・に/で/へ・と/も/の・時間・よ/ね/か・もの包含・から/まで・から理由・が逆接
- **語彙11カテゴリ**: Saludos・Personas・Comida・Lugares・Tiempo・Verbos・Adj.い・Adj.な・Otros・Transporte・Familia
- 語彙タブはスペイン語表示（`es` プロパティ）
- GitHub Pagesデプロイ確認済み

---

## 未実装（優先度順）

### N5 文法（残り）
| 優先度 | 文法 | トークン | 備考 |
|---|---|---|---|
| 🟡中 | 〜より〜の方が | 少 | 比較表現 |
| 🟡中 | 〜はどうですか | 少 | 提案表現 |
| 🟡中 | 〜と思います | 少 | 意見表現 |
| ✅完了 | 〜前に・〜後で | — | `maeni` タブ実装済み |
| ✅完了 | 〜に行く・〜に来る | — | `niiku` タブ実装済み |
| 🟡中 | 〜くて / 〜で | 中 | 形容詞接続 |
| 🔴高 | **て形** | 大 | 8変化パターン・最優先 |
| 🔴高 | 〜てください | 少 | て形に依存 |
| 🔴高 | 〜ています | 少 | て形に依存 |
| 🔴高 | 〜てもいいですか | 少 | て形に依存 |
| 🔴高 | 〜てはいけません | 少 | て形に依存 |
| 🔴高 | ない形 | 大 | グループ別変化 |
| 🟡中 | 〜たことがある | 中 | た形依存 |

### その他
| 項目 | トークン |
|---|---|
| 数字・〜時〜分・曜日（語彙タブ追加） | 中 |
| Googleログインボタン | 少 |
| パスワードリセット | 少 |
| 利用規約・プライバシーポリシー画面 | 中 |
| 進捗データのFirestore保存 | 大 |

---

## プランコンテンツ設計（案）
- **Gratis**: ひらがな・カタカナ + 基本語彙
- **Estudio Bs.30**: 漢字 + 形容詞 + 文法全部 + スコア保存
- **Premium Bs.60**: 書き順 + クラウド保存 + 模擬テスト + 音声（未実装）

---

## 要注意箇所
- `renderGrammar()` の分岐は **12つ**（desu/katsu/masu/keiyo/mashou/tai/maeni/niiku/te/ta/taexp/joshi）。新レッスン追加時は3箇所に追記
- **助詞 Repaso は `joshiGroup === 10`** で判定（グループ追加時は要更新）
- **語彙 Repaso は `vocabCategory === 11`** で判定（カテゴリ追加時は要更新）
- 語彙タブ表示は `c.es`、クイズ説明文も `c.es` を使用
- `vocabData` の各エントリは `{ name, es, words }` 構造（`es` 必須）
- `taiPracMode` は `renderTaiPractice()` 内でモード切替ボタンを制御
- ビルド・テスト・lint なし。動作確認はブラウザで `index.html` を直接開く

## デザイン規則
- カラー: `--primary:#E63946`（赤）/ `--ocean:#2A9D8F`（緑）/ `--accent:#F4A261`（オレンジ）/ `--night:#1D3557`（ヘッダ濃紺）/ `--cream:#FDFBF7`（背景）
- フォント: 日本語 = `Noto Sans JP` / `Zen Maru Gothic`、欧文 = `DM Sans` / `Outfit`（見出し）
- 角丸: `--radius-sm/md/lg/xl` (12/20/28/40px)
- 言語ルール: **UIラベル・説明はスペイン語**、**学習対象テキストは日本語（ふりがなは `<ruby>` タグ）**。英語は使わない
- 絵文字をUI装飾に多用（ナビ・ボタン）

---

## ⚠️ このセクションの使い方
実装完了後は必ず該当項目を `✅完了` に更新すること。未更新のまま放置すると次チャットで混乱する。

## 実装優先順位

### 🔴 最優先（文法コンテンツ）
| 優先 | 項目 | 規模 | 状態 |
|---|---|---|---|
| 1 | **て形**（8変化パターン） | 大 | ✅ 完了（`te` タブ） |
| 2 | 〜てください / 〜ています / 〜てもいいですか / 〜てはいけません | 小×4 | ✅ 完了（て形 Aprender 応用表現カード＋reorderプール） |
| 3 | **ない形** | 中 | ❌ 未実装 |
| 4 | **た形**（普通体過去形・8変化パターン） | 大 | ✅ 完了（`ta` タブ） |
| 5 | 〜たことがある（経験） | 中 | ✅ 完了（`taexp` タブ） |
| 6 | 〜たほうがいい（アドバイス） | 小 | ✅ 完了（`taexp` タブ） |

**て形・た形 共通8変化パターン：**
| グループ | 語尾 | て形 | た形 |
|---|---|---|---|
| G1 | く | いて | いた |
| G1 | ぐ | いで | いだ |
| G1 | す | して | した |
| G1 | む・ぶ・ぬ | んで | んだ |
| G1 | る・う・つ | って | った |
| G2 | る | て | た |
| G3 | する | して | した |
| G3 | くる | きて | きた |
| ⚠️例外 | 行く | って | った |

### 🟡 中優先（文法補完）
| 優先 | 項目 | 規模 | 状態 |
|---|---|---|---|
| 7 | 〜くて / 〜で（形容詞接続） | 中 | ❌ 未実装 |
| 8 | 〜より〜の方が | 小 | ❌ 未実装 |
| 9 | 〜はどうですか / 〜と思います | 小 | ❌ 未実装 |

### 🟡 中優先（UI・コンテンツ改善）
| 優先 | 項目 | 規模 | 状態 |
|---|---|---|---|
| A | カタカナ Practicar をひらがなと同じ機能・見た目に統一 | 中 | ❌ 未実装 |
| B | 漢字 Practicar をひらがなと同じ機能・見た目に統一。Quiz は N5 動詞・語彙を出題 | 中 | ❌ 未実装 |
| C | 全文法の並び替え問題プールを増量し、同じ問題が出にくくなるよう改善 | 中 | ❌ 未実装 |

### 🟢 低優先（バックエンド）
| 優先 | 項目 | 規模 | 状態 |
|---|---|---|---|
| 8 | Googleログイン | 中 | ❌ 未実装 |
| 9 | パスワードリセット | 小 | ❌ 未実装 |
| 10 | Firestore進捗保存 | 大 | ❌ 未実装 |
| 11 | 利用規約・プライバシーポリシー | 中 | ❌ 未実装 |
