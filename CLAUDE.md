# CLAUDE.md - Academia Chizu

## プロジェクト概要
スペイン語話者向けの日本語学習アプリ（N5レベル）。ボリビアの学習者を対象とした単一HTMLファイルのWebアプリ。UIテキストはスペイン語、学習対象は日本語。

## 技術スタック
- **Vanilla HTML / CSS / JavaScript** — フレームワーク・ビルドツールなし
- **単一ファイル**: `index.html`（約8,600行以上、CSS・JS・データすべて内包）
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
承認済みドメイン: `localhost`, `academia-chizu.firebaseapp.com`, `kenchisaka1991.github.io`

---

## アーキテクチャ
3つのトップレベル `<section>`：`#moji`（文字）/ `#grammar`（文法）/ `#vocab`（語彙）

### 文法モジュール一覧
**renderGrammar の if-else 分岐順:**
```
desu → katsu → keiyo → masu → aru → mashou → tai → maeni → niiku → te → ta → nai → kute → gimon → shiji → yori → dou → omou → ichiban → naru → joshi（else）
```
**⚠️ 新タブ追加時は必ず3箇所に追記：** ① タブボタンHTML ② if-else分岐（joshi elseの直前） ③ render関数本体

| key | タブ名 | 主なデータ | Practicar形式 |
|---|---|---|---|
| `desu` | です | `desuLesson`, `desuQuizPool` | 並び替え |
| `katsu` | です活用 | `katsuLesson`, `katsuQuizPool` | 4択 |
| `shiji` | 指示語 | `kosoAdoTable`(4行), `shijiQuizPool`(40問) | 4択穴埋め |
| `gimon` | 疑問詞 | `gimonData`(11語), `gimonFillPool`(15問), `gimonReorderPool`(10問) | 4択 / 並び替え |
| `masu` | ます | `masuLesson`, `masuQuizPool` | 4択 |
| `aru` | あります/います | `aruQuizPool`(30問), `aruReorderPool`(30問) | 4択 / 並び替え |
| `keiyo` | 形容詞 | `keiyoIData`(46語), `keiyoNaData`(18語) + Meishiデータ | Conjugación / Uso |
| `yori` | より〜の方が | `yoriLesson`, `yoriReorderPool`(30問), `yoriFillPool`(30問) | 並び替え / 4択 |
| `kute` | 〜くて・で | `kuteIData`(20語), `kuteNaData`(15語), `kuteReorderPool`(50問) | 4択 / 並び替え |
| `mashou` | ましょう | `mashouLesson`(15語), `mashouQuizPool`(12問) | 並び替え |
| `tai` | 〜たい | `taiData`(15語), `taiQuizPool`, `taiReorderPool`(12問) | 4択 / 並び替え |
| `maeni` | 〜前に・後で | `maeniLesson`(8語), `maeniQuizPool`(10問) | 並び替え |
| `niiku` | 〜に行く・来る | `niikuLesson`, `niikuQuizPool`(10問) | 並び替え |
| `te` | て形 | `teVerbPool`(38語), `teReorderPool`(30問, `use:'kara'`含む) | Conjugación / Orden / てから |
| `ta` | た形 | `taVerbPool`(38語), `taReorderPool`(30問, `use:'tari'`含む) | Conjugación / Orden / たり |
| `nai` | ない形 | `naiVerbPool`(38語), `naiReorderPool`(50問) | Conjugación / Orden |
| `dou` | 〜はどうですか | `douLesson`, `douReorderPool`(47問), `douFillPool`(35問) | 並び替え / 4択 |
| `omou` | 〜と思います | `omouLesson`, `omouReorderPool`(35問), `omouFillPool`(20問) | 並び替え / 4択 |
| `ichiban` | 〜のなかで〜がいちばん〜 | `ichibanLesson`, `ichibanReorderPool`(20問), `ichibanFillPool`(15問) | 並び替え / 4択 |
| `naru` | 〜になります/〜くなります | `naruLesson`, `naruReorderPool`(20問), `naruFillPool`(15問) | 並び替え / 4択 |
| `joshi` | 助詞 | `joshiData`(10グループ) | 並び替え / 穴埋め |

**て形・た形・ない形 Expresiones（応用表現）サブタブ:**
- て形: てください・ています・てもいいですか・てはいけません・**てから**
- た形: たことがある・たほうがいい・たあとで・たから・普通体過去・**たり〜たりします**
- ない形: ないでください・なくてもいいです・なければなりません・ないほうがいい

**助詞グループ（index 0〜9）:**
は/が(0) · を(1) · に/で/へ(2) · と/も/の(3) · 時間に/から/まで(4) · よ/ね/か(5) · も包含(6) · から/まで範囲(7) · から理由(8) · が逆接(9)
**⚠️ Repaso は `joshiGroup === 10` で判定**

### 語彙モジュール
20カテゴリ（index 0〜19）+ Repaso（index 20）。5グループのタブUI。
**⚠️ Repaso は `vocabCategory === vocabData.length`（=20）で判定**
各カテゴリ構造: `{ name, es, words:[{w, r, m}] }` / タブ表示は `c.es`

---

## コーディング規約
- 関数命名: `renderXxx()` / `showXxx()` / `checkXxx()` / `startXxx()` / `setXxx()`
- イベント処理は `onclick="..."` をHTML属性に直接記述
- 描画は `innerHTML = \`...\`` テンプレートリテラルで一括置換
- `stripRuby(html)` でルビタグ除去してから採点比較・チップ表示
- 並び替えPistaボタン: `.word-romaji` スパン（デフォルト `display:none`）をトグル
- 4択でrubyHTMLを含む場合は**インデックスベース採点**（`checkXxxAnswer(idx)`）
- **作業分担**: Haiku → データ・コンテンツ変更 / Sonnet → 関数ロジック・アーキテクチャ

## デザイン規則
- カラー: `--primary:#E63946`（赤）/ `--ocean:#2A9D8F`（緑）/ `--accent:#F4A261`（オレンジ）/ `--night:#1D3557`（紺）/ `--cream:#FDFBF7`（背景）
- フォント: 日本語 = `Noto Sans JP` / `Zen Maru Gothic`、欧文 = `DM Sans` / `Outfit`
- 角丸: `--radius-sm/md/lg/xl` (12/20/28/40px)
- **UIラベル・説明はスペイン語**、**学習テキストは日本語（`<ruby>`タグ）**。英語は使わない

## 要注意箇所
- `renderGrammar()` に新タブ追加時は**必ず3箇所**に追記（上記参照）
- 助詞 Repaso: `joshiGroup === 10` / 語彙 Repaso: `vocabCategory === vocabData.length`（=20）
- `taReorderPool` の `use:'hou'` エントリが2重（軽微な既知バグ）
- ビルド・テスト・lint なし。動作確認はブラウザで `index.html` を直接開く
- 実装完了後は必ず未実装リストを `✅完了` に更新すること

---

## 未実装リスト

### 🟡 文法補完
| 優先 | 項目 | 規模 | 備考 |
|---|---|---|---|
| 7 | ✅完了 〜のなかで〜がいちばん〜（最上級比較） | — | `ichiban`タブとして独立実装（2026-05-08） |
| 8 | ✅完了 〜になります/〜くなります（変化） | — | `naru`タブとして独立実装（2026-05-08） |
| 9 | 助詞：や/など（例示） | 小 | joshiタブに追加 |
| 10 | ✅完了 〜と思います（意見表現） | — | `omou`タブとして独立実装（2026-05-03） |
| 11 | 接続詞：でも/しかし/だから/そして | 小 | 新タブ or 助詞タブ拡張 |

### 🟡 UI・コンテンツ改善
| 優先 | 項目 | 規模 |
|---|---|---|
| A | カタカナ Practicar をひらがなと同じ機能・見た目に統一 | 中 |
| B | 漢字 Practicar をひらがなと同じ機能・見た目に統一 | 中 |
| C | 全文法の並び替え問題プールを増量 | 中 |

### 🟢 バックエンド
| 優先 | 項目 | 規模 |
|---|---|---|
| D | Googleログインボタン | 中 |
| E | パスワードリセット | 小 |
| F | Firestore進捗保存 | 大 |
| G | 利用規約・プライバシーポリシー | 中 |
