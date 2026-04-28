# CLAUDE.md - Academia Chizu

## プロジェクト概要
スペイン語話者向けの日本語学習アプリ（N5レベル）。ボリビアの学習者を対象とした単一HTMLファイルのWebアプリ。UIテキストはスペイン語、学習対象は日本語。

## 技術スタック
- **Vanilla HTML / CSS / JavaScript** — フレームワーク・ビルドツールなし
- **単一ファイル構成**: `index.html`（約8,600行以上、CSS・JS・データすべて内包）
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
| 文法 (ぶんぽう) | `#grammar` | 17タブ（下記参照） |
| 語彙 (ごい) | `#vocab` | カテゴリ別語彙（20カテゴリ＋Repaso）、グループ化タブ、Aprender / Practicar モード |

統計（学習済み数など）は `#moji` の上部に常時表示。

---

## 文法モジュール（Grammar）

### タブ構成（renderGrammar の if-else 17分岐）
```
desu → katsu → keiyo → masu → aru → mashou → tai → maeni → niiku → te → ta → nai → kute → gimon → shiji → yori → joshi（else）
```
**タブボタン表示順（視覚的な並び）:**
```
desu → katsu → shiji → gimon → masu → aru → keiyo → yori → kute → mashou → tai → maeni → niiku → joshi → te → ta → nai
```
**新レッスン追加時は必ず3箇所に追記：**
1. タブボタン HTML（renderGrammar内）
2. if-else 分岐（renderGrammar内・joshi elseの直前）
3. render関数本体（既存最終モジュールの直後・renderJoshi系の直前）

### 各モジュール概要

| key | タブ名 | データ | Practicar形式 |
|---|---|---|---|
| `desu` | です | `desuLesson`, `desuQuizPool` | 並び替え |
| `katsu` | です活用 | `katsuLesson`, `katsuQuizPool` | 4択 |
| `shiji` | 指示語・こそあど | `kosoAdoTable`(4行), `shijiQuizPool`(40問) | 4択穴埋め |
| `gimon` | 疑問詞 | `gimonData`(11語), `gimonFillPool`(15問), `gimonReorderPool`(10問) | Selección(4択) / Ordenar(並び替え) |
| `masu` | ます | `masuLesson`, `masuQuizPool` | 4択 |
| `aru` | あります/がいます | `aruQuizPool`(30問), `aruReorderPool`(30問) | 4択 / 並び替え |
| `keiyo` | 形容詞 | `keiyoIData`(46語), `keiyoNaData`(18語), `keiyoIMeishiData`, `keiyoNaMeishiData` | Conjugación / Uso con sustantivos |
| `yori` | より〜の方が | `yoriLesson`, `yoriReorderPool`(30問), `yoriFillPool`(30問) | Ordenar(並び替え) / Selección(4択) |
| `kute` | 〜くて・で | `kuteIData`(20語), `kuteNaData`(15語), `kuteReorderPool`(50問) | Conjugación(4択) / Conexión(並び替え) |
| `mashou` | ましょう | `mashouLesson`(15語), `mashouQuizPool`(12問) | 並び替え |
| `tai` | 〜たい | `taiData`(15語), `taiQuizPool`, `taiReorderPool`(12問) | Conjugación / Orden de palabras |
| `maeni` | 〜前に・後で | `maeniLesson`(8語), `maeniQuizPool`(10問) | 並び替え |
| `niiku` | 〜に行く・来る | `niikuLesson`, `niikuQuizPool`(10問) | 並び替え |
| `te` | て形 | `teVerbPool`(38語), `teReorderPool`(30問) | Conjugación(4択) / Orden de palabras |
| `ta` | た形 | `taVerbPool`(38語), `taReorderPool`(30問) | Conjugación(4択) / Orden de palabras |
| `nai` | ない形 | `naiVerbPool`(38語), `naiReorderPool`(50問) | Conjugación(4択) / Orden de palabras |
| `joshi` | 助詞 | `joshiData`(10グループ) | 並び替え / 穴埋め |

### 形容詞モジュール（keiyoXxx）
```
形容詞タブ
├── [い形容詞] [な形容詞] サブタブ（Aprender/Practicarで共有）
├── Aprender: ① 活用表（4形）② 名詞修飾例カード
└── Practicar: [Conjugación] [Uso con sustantivos] モード選択
```
State: `keiyoType('i'|'na')`, `keiyoPracMode('katsu'|'meishi')`

### より〜の方がモジュール（yoriXxx）
```
より〜の方がタブ
├── Aprender: 説明（3ブロック）+ 例文6個
└── Practicar: [Ordenar(並び替え)] [Selección(4択)] モード選択
```
State: `yoriPracMode('reorder'|'fill')`, `yoriReorderIdx`, `yoriReorderCorrect`, `yoriReorderQuestions`, `yoriReorderErrors`, `yoriCurrentAnswer[]`, `yoriCurrentWords[]`, `yoriFillIdx`, `yoriFillCorrect`, `yoriFillQuestions`, `yoriFillErrors`
- `yoriLesson`: title・subtitle・desc(3ブロック: 基本構文/疑問文/答え方表)・例文6個
- `yoriReorderPool`: 30問（AよりBの方が系22問 + どちらが疑問文8問）。どちらが問題は「AとBと」を1チップに統合
- `yoriFillPool`: 30問（より10問・の方が10問・どちら/どちらも10問）
- Pistaボタン: Ordenar＝`.word-romaji`スパンをトグル、Selección＝ruby付き問題文をトグル
- チップ表示: `stripRuby(w)` でフリガナなし。Pista押下時のみフリガナ表示
- 採点: 並び替えは `stripRuby` 連結比較、4択は `window._yoriOpts` インデックスベース
- スコア保存: `saveScore('yori', pct)`

### 〜くて・でモジュール（kuteXxx）
```
〜くて・でタブ
├── [い形容詞] [な形容詞] サブタブ（Aprender/Practicarで共有）
├── Aprender: 説明（スペイン語）+ 活用表 + 例文カード4枚
└── Practicar: [Conjugación(4択)] [Conexión(並び替え)] モード選択
```
State: `kutePracMode('katsu'|'reorder')`, `kuteType('i'|'na')`, `kuteKatsuIdx`, `kuteKatsuCorrect`, `kuteKatsuQuestions`, `kuteKatsuErrors`, `kuteReorderIdx`, `kuteReorderCorrect`, `kuteReorderQuestions`, `kuteReorderErrors`, `kuteCurrentAnswer`

### 疑問詞モジュール（gimonXxx）
```
疑問詞タブ
├── Aprender: 11語の一覧表（疑問詞・ローマ字・意味・助詞・例文）
└── Practicar: [Selección(4択)] [Ordenar(並び替え)] モード選択（mode-tab スタイル）
```
State: `gimonPracMode('fill'|'reorder')`, `gimonFillIdx`, `gimonFillCorrect`, `gimonFillQuestions`, `gimonFillErrors`, `gimonReorderIdx`, `gimonReorderCorrect`, `gimonReorderQuestions`, `gimonReorderErrors`, `gimonCurrentAnswer[]`, `gimonReorderCurrentWords[]`
- `gimonData`: 11語（なに・どこ・だれ・いつ・なぜ/どうして・どれ・どの・どう・いくら・いくつ・なん）
- `gimonFillPool`: 15問（ランダム5問抽出）。`window._gimonOpts` で選択肢配列を保持
- `gimonReorderPool`: 10問（ランダム5問抽出）。`gimonReorderCurrentWords` で単語チップを保持
- 採点: `checkGimonFill(idx)` インデックスベース、`checkGimonReorderAnswer()` stripRuby比較

### 指示語（こそあど）モジュール（shijiXxx）
```
指示語タブ
├── Aprender: こそあど体系表（4行×5列: 系列/距離/もの/adj+名詞/場所/方向）+ 例文カード
└── Practicar: 4択穴埋めクイズ40問からランダム5問
```
State: `shijiQuizIdx`, `shijiCorrect`, `shijiQuestions`, `shijiErrors`
- `kosoAdoTable`: 4行（こ/そ/あ/ど系）、各行に mono/adj/lugar/dir + 例文(ex/tr)
- `shijiQuizPool`: 40問、距離ヒント付き（スペイン語の括弧注釈）。`window._shijiOpts` で選択肢配列保持
- 採点: `checkShijiFill(idx)` インデックスベース

- `kuteIData`: い形容詞20語（いい→よくて 例外含む）
- `kuteNaData`: な形容詞15語
- `kuteReorderPool`: 50問（い形25＋な形25）、各問: `{words[], r[], answer, hint, explain, type:'i'|'na'}`
- 4択セッション: 5問ランダム。`checkKuteKatsuAnswer(idx)` インデックスベースで採点（rubyHTML対策）
- 並び替えチップ: `stripRuby(w)` で表示、Pistaボタンで `.word-romaji` スパン表示

### 〜たいモジュール（taiXxx）
```
〜たいタブ
├── Aprender: 説明 + 活用表（たい/たくない/たかった/たくなかった）
└── Practicar: [Conjugación(4択)] [Orden de palabras(並び替え)] モード選択
```
State: `taiPracMode('katsu'|'reorder')`

### て形・た形・ない形（共通パターン）
**8変化パターン：**
| グループ | 語尾 | て形 | た形 | ない形 |
|---|---|---|---|---|
| G1 | く | いて | いた | かない |
| G1 | ぐ | いで | いだ | がない |
| G1 | す | して | した | さない |
| G1 | む・ぶ・ぬ | んで | んだ | まない/ばない/なない |
| G1 | る・う・つ | って | った | らない/わない/たない |
| G2 | る | て | た | ない |
| G3 | する | して | した | しない |
| G3 | くる | きて | きた | こない |
| ⚠️例外 | 行く | って | った | いかない |

応用表現（て形）: てください・ています・てもいいですか・てはいけません
応用表現（た形）: たことがある・たほうがいい・たあとで・たから・普通体過去
応用表現（ない形）: ないでください・なくてもいいです・なければなりません・ないほうがいい

※ `taexp` タブは削除済み。た形の Expresiones サブタブに統合。

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

### カテゴリ一覧（index 0〜19、Repaso = vocabData.length = 20）
| index | name | es（タブ表示） |
|---|---|---|
| 0 | あいさつ | Saludos |
| 1 | 人・家族 | Personas |
| 2 | 家族 | Familia |
| 3 | 時間 | Tiempo |
| 4 | 数字 | Números |
| 5 | 〜時〜分 | La hora |
| 6 | 曜日・月 | Días y meses |
| 7 | 助数詞 | Contadores |
| 8 | 場所 | Lugares |
| 9 | 方向・位置 | Dirección |
| 10 | 乗り物 | Transporte |
| 11 | 食べ物・飲み物 | Comida y bebidas |
| 12 | 動物 | Animales |
| 13 | 自然・季節 | Naturaleza |
| 14 | からだ | Cuerpo |
| 15 | 生活用品 | Objetos |
| 16 | 動詞 | Verbos |
| 17 | い形容詞 | Adj. い |
| 18 | な形容詞 | Adj. な |
| 19 | その他 | Otros |
| **20** | **⭐ Repaso** | **全カテゴリ混合** |

**⚠️ 要注意: Repaso は `vocabCategory === vocabData.length`（=20）で判定。**

### 語彙タブ グループ化UI
`vocabGroups` const + `renderVocabCatTabs()` 関数で実装済み。5グループ（ラベル＋4列グリッド）。
- Básico: Saludos・Personas・Familia
- Tiempo: Tiempo・Números・La hora・Días y meses
- Lugares: Lugares・Dirección・Transporte
- Vida: Comida y bebidas・Animales・Naturaleza・Cuerpo・Objetos・Contadores
- Expresión: Verbos・Adj.い・Adj.な・Otros

数字カテゴリ（Números）: 0〜10、11〜19、Decenas（20〜90）、Grandes números（百・千・万）、計34語。`type:'header'` 区切りでグループ表示。

各カテゴリは `{ name, es, words:[{w, r, m}] }` の構造。タブ表示は `c.es`（`c.name` は内部識別のみ）。

---

## データ構造（すべて JS const）
- `hiragana` / `katakana`: `{ char: { romaji, vocab:[{jp, es, emoji}] } }`
- `desuLesson`, `desuQuizPool` — です並び替えクイズ50問
- `masuLesson`, `masuQuizPool` — ます活用（3グループ）
- `katsuLesson`, `katsuQuizPool` — です活用（現在/過去・肯定/否定）
- `aruQuizPool`(30問), `aruReorderPool`(30問) — あります/がいます
- `keiyoIData`(46語), `keiyoNaData`(18語), `keiyoIMeishiData`, `keiyoNaMeishiData`
- `kuteIData`(20語), `kuteNaData`(15語), `kuteReorderPool`(50問) — 〜くて・で
- `mashouLesson`, `mashouQuizPool` — ましょう・ませんか（15動詞、並び替え12問）
- `taiData`, `taiQuizPool`, `taiReorderPool` — 〜たい（15動詞、4択pool、並び替え12問）
- `maeniLesson`, `maeniQuizPool` — 〜前に・後で（8語、並び替え10問）
- `niikuLesson`, `niikuQuizPool` — 〜に行く・来る
- `teVerbPool`(38語), `teReorderPool`(30問)
- `taVerbPool`(38語), `taReorderPool`(30問)
- `naiVerbPool`(38語), `naiReorderPool`(50問)
- `gimonData`(11語), `gimonFillPool`(15問), `gimonReorderPool`(10問) — 疑問詞
- `kosoAdoTable`(4行), `shijiQuizPool`(40問) — 指示語・こそあど
- `joshiData`(10グループ), `joshiMatomeReorder`, `joshiMatomeFill`
- `kanjiData`, `kanjiWordPool`
- `vocabData`(20カテゴリ)

## State（グローバル `let`）
モジュールごとに `xxxMode`, `xxxQuizIdx`, `xxxCorrect`, `xxxQuestions`, `xxxErrors` のパターンを反復。
- `taiPracMode('katsu'|'reorder')` — 〜たい練習モード
- `keiyoPracMode('katsu'|'meishi')`, `keiyoType('i'|'na')` — 形容詞
- `kutePracMode('katsu'|'reorder')`, `kuteType('i'|'na')` — 〜くて・で
- `gimonPracMode('fill'|'reorder')` — 疑問詞練習モード
- `shijiQuizIdx`, `shijiCorrect`, `shijiQuestions`, `shijiErrors` — 指示語

---

## コーディング規約
- 関数命名: `renderXxx()` (描画), `showXxx()` (表示更新), `checkXxx()` (採点), `startXxx()` (クイズ開始), `setXxx()` (state変更)
- イベント処理は `onclick="..."` をHTML属性に直接記述（イベントリスナーは原則使わない）
- 描画は `innerHTML = \`...\`` テンプレートリテラルで一括置換
- `stripRuby(html)` でルビタグを除去してから採点比較・チップ表示
- 並び替えクイズのPistaボタン: `.word-romaji` スパン（デフォルト `display:none`）をトグル
- 4択で選択肢にrubyHTMLを含む場合は **インデックスベース採点**（`checkXxxAnswer(idx)`）を使う
- セクション切替: `.section.active { display: block }` と `.active` クラスのトグル
- **作業分担ルール**: Haiku → データ・コンテンツ変更（テキスト修正・問題追加）/ Sonnet → 関数ロジック・アーキテクチャ変更

---

## 実装済み（全機能）
- ひらがな・カタカナ・漢字（Aprender/Practicar・Tarjeta/Quiz）
- Firebase Authentication（メール/パスワード登録・ログイン・ログアウト）
- クイズスコアを `localStorage` に保存（`saveScore()` / `getAvgScore()`）
- プラン選択モーダル（Gratis/Estudio Bs.30/Premium Bs.60）
- **文法タブ16種**: です・です活用・指示語（こそあど）・疑問詞・ます・あります/がいます・形容詞・〜くて/で・ましょう・〜たい・〜前に/後で・〜に行く/来る・て形・た形・ない形・助詞
- **助詞10グループ**: は/が・を・に/で/へ・と/も/の・時間・よ/ね/か・も包含・から/まで・から理由・が逆接
- **語彙20カテゴリ**: Saludos〜Otros + グループ化タブUI
- GitHub Pagesデプロイ確認済み

---

## 未実装（優先度順）

### 🟡 中優先（文法補完）
| 優先 | 項目 | 規模 | 状態 |
|---|---|---|---|
| 1 | 〜より〜の方が | 小 | ✅ 完了（yoriタブ） |
| 2 | 〜はどうですか / 〜と思います | 小 | ❌ 未実装 |
| 3 | 疑問詞（なに・どこ・だれ・いつ…） | 小 | ✅ 完了（gimonタブ） |
| 4 | 指示語（これ/それ/あれ/この…） | 小 | ✅ 完了（shijiタブ） |

### 🟡 中優先（UI・コンテンツ改善）
| 優先 | 項目 | 規模 | 状態 |
|---|---|---|---|
| A | カタカナ Practicar をひらがなと同じ機能・見た目に統一 | 中 | ❌ 未実装 |
| B | 漢字 Practicar をひらがなと同じ機能・見た目に統一 | 中 | ❌ 未実装 |
| C | 全文法の並び替え問題プールを増量 | 中 | ❌ 未実装 |

### 🟢 低優先（バックエンド）
| 優先 | 項目 | 規模 | 状態 |
|---|---|---|---|
| D | Googleログインボタン | 中 | ❌ 未実装 |
| E | パスワードリセット | 小 | ❌ 未実装 |
| F | Firestore進捗保存 | 大 | ❌ 未実装 |
| G | 利用規約・プライバシーポリシー | 中 | ❌ 未実装 |

---

## プランコンテンツ設計（案）
- **Gratis**: ひらがな・カタカナ + 基本語彙
- **Estudio Bs.30**: 漢字 + 形容詞 + 文法全部 + スコア保存
- **Premium Bs.60**: 書き順 + クラウド保存 + 模擬テスト + 音声（未実装）

---

## 要注意箇所
- `renderGrammar()` の分岐は **16つ**（desu/katsu/keiyo/masu/aru/mashou/tai/maeni/niiku/te/ta/nai/kute/gimon/shiji/joshi）。新レッスン追加時は3箇所に追記
- **助詞 Repaso は `joshiGroup === 10`** で判定（グループ追加時は要更新）
- **語彙 Repaso は `vocabCategory === vocabData.length`（=20）** で判定（カテゴリ追加時は要更新）
- 語彙タブ表示は `c.es`、クイズ説明文も `c.es` を使用
- `taReorderPool` の `use:'hou'` エントリが2重（軽微な既知バグ）
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
