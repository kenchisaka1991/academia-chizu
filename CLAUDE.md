# CLAUDE.md - Academia Chizu / NihongoMap

## プロジェクト概要
スペイン語話者向けの日本語学習アプリ（N5レベル）。ボリビアの学習者を対象とした単一HTMLファイルのWebアプリ。UIテキストはスペイン語、学習対象は日本語。
- アプリ名: **NihongoMap**（内部コード名 academia-chizu のまま）
- リポジトリ: `C:\Users\LENOVO\Desktop\academia-chizu\`

## 技術スタック
- **Vanilla HTML / CSS / JavaScript** — フレームワーク・ビルドツールなし
- **単一ファイル**: `index.html`（約27,130行、CSS・JS・データすべて内包）
- 永続化: `localStorage`（`chizu_scores` / `learnedChars` / `nm_*` キー群）
- 認証: **Firebase Authentication**（メール/パスワード・Google 有効済み）
- 外部依存: Google Fonts + Firebase CDN（10.12.0 compat版）
- デプロイ: GitHub Pages `https://kenchisaka1991.github.io/academia-chizu/`

## ローカル動作確認
`file://` URL は Firebase Auth がブロックするため **必ずローカルサーバ経由**で確認する。
```bash
cd C:\Users\LENOVO\Desktop\academia-chizu
python -m http.server 8080
# → http://localhost:8080 でアクセス
```
ブラウザコンソールでログインをバイパスして確認：
```javascript
document.getElementById('login-screen').classList.add('hidden');
showSection('roadmap', document.getElementById('nav-roadmap'));
```

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

## モデル使い分けルール（厳守）
| モデル | 担当 |
|---|---|
| **Sonnet** | 関数ロジック・アーキテクチャ・UI実装（メイン作業） |
| **Opus** | データ・コンテンツ生成（Can-doシナリオJSON・練習問題・VOICEVOXバッチ） |
| **Haiku** | 軽微なデータ修正・文言調整 |

---

## アーキテクチャ（Phase 1 実装後）

### セクション構成（`<section>` 一覧）
```
#roadmap   — ホーム（ロードマップ）。初期表示 class="section active"
#unit      — ユニット詳細（Can-doカード一覧）
#scenario  — シナリオ学習フロー（Escena→Gramática→[Trazar]→Práctica→Reto）
#jlpt      — JLPT N5模擬試験（Premium・プレースホルダー）
#profile   — ユーザープロフィール（XP・ストリーク・プラン）
#moji      — 文字（ひらがな・カタカナ・漢字）
#grammar   — 文法（22タブ）
#vocab     — 語彙（20カテゴリ）
```

### ボトムナビ（2026-05-25 Task #9 実装）
```html
<nav class="bottom-nav" role="navigation">
  <button class="nav-btn active" id="nav-roadmap" onclick="showSection('roadmap',this)">🗺️<span>Mapa</span></button>
  <button class="nav-btn" id="nav-grammar" onclick="showSection('grammar',this)">📖<span>Práctica</span></button>
  <button class="nav-btn" id="nav-jlpt" onclick="showSection('jlpt',this)">🎯<span>Examen</span></button>
  <button class="nav-btn" id="nav-profile" onclick="showSection('profile',this)">👤<span>Perfil</span></button>
</nav>
```
- モバイル: `position:fixed; bottom:0; height:60px`（`body` に `padding-bottom:60px`）
- PC (768px+): `position:fixed; left:0; width:200px; height:100vh`（`.header/.hud/.main` に `margin-left:200px`）
- JS互換: `querySelectorAll('.nav-btn')` はそのまま動作

### NihongoMap Phase 1 — localStorage キー
| キー | 型 | 用途 |
|---|---|---|
| `chizu_scores` | object | **既存**: 練習タブごとのスコア（0〜100） |
| `learnedChars` | array | **既存**: 学習済み文字 |
| `chizu_placement` | object | **既存**: 配置テスト結果 |
| `nm_cando_progress` | object | Can-do別進捗（status/stars/practiceScore/…） |
| `nm_xp` | object | `{total, today, lastUpdate}` |
| `nm_streak` | object | `{current, longest, lastActiveDate}` |
| `nm_daily` | object | 日次カウンター（`{date, practiceCount, …}`） |
| `nm_plan` | object | プランフラグ（`{tier, expiresAt, source}`） |
| `nm_challenge_quota` | object | 会話チャレンジ無料枠 |

### NihongoMap Phase 1 — 主要関数
| 関数 | 役割 |
|---|---|
| `rolloverDailyIfNeeded()` | 日次リセット・ストリーク判定（起動時呼び出し） |
| `getTodayString()` | `sv-SE` ロケールでタイムゾーン対応の日付文字列 |
| `nmGetDaily/Streak/XP/Progress/Plan()` | nm_* 読み出しユーティリティ |
| `grantXP(amount)` | XP加算・ストリーク更新・HUD再描画 |
| `isPremium()` | nm_plan の tier/expiresAt をチェック |
| `canUse(feature, ctx)` | FEATURE_GATES で機能制限チェック |
| `consume(feature)` | 日次カウンタを消費 |
| `updateHUD()` | `#hud-xp` / `#hud-streak` / `#hud-daily` を更新 |
| `renderUnit(unitId)` | Can-doカード一覧を `#unit-content` に描画 |
| `openCanDo(canDoId)` | シナリオ画面へ遷移・ステップ初期化 |
| `setScenarioStep(step)` | `['scenario','explain','trazar','practice','challenge']` |
| `updateStepVisibility(hasTraza)` | traceChars有無でトレースステップ表示切替・番号更新 |
| `renderScenarioView(cd)` | Escena（会話）表示 |
| `toggleHint(lineId)` | 0→1(romaji)→2(romaji+es)→0 のヒント3段階 |
| `openExplainView()` | Gramática説明表示（Siguiente→Trazar or Práctica） |
| `openTrazarView()` | なぞり書き画面（Unit 1=hiragana / 2=katakana / **3以降=kanji**。`cd.unit>=3?'kanji':…`で分岐） |
| `showCanDoTrazarChar()` | `#scenario-content` に既存Trazar UIを描画（`sData`は**hiragana/katakana/kanji の3択**。kanji対応済み） |
| `openPracticeView()` | 練習問題開始（mc/fill/reorder 対応）。**items を浅いコピーし、mc/fill/conv の選択肢を描画時シャッフルして answer を追従**（正解が answer:0 に偏っていたため。元データ非破壊・採点はindexベースのまま） |
| `renderPracticeItem()` | 問題1問描画（displayOptions でフリガナ対応） |
| `startEscucharPart()` | Escuchar（聞き取り）練習開始。**openPracticeView と同型で audio_mc/audio_meaning/audio_match の選択肢を描画時シャッフルして answer を追従**（正解が answer:0 に92%偏っていたため。audio_fill 無料dictado は `_buildDictadoFreeOpts` が別途シャッフル済み） |
| `checkPracticeAnswer(idx)` | 4択採点（インデックスベース） |
| `practiceReorderTap(btn)` | 並び替えチップ選択 |
| `checkPracticeReorder()` | 並び替え採点 |
| `showPracticeResult()` | passRate 0.8判定・+20XP |
| `openChallengeView()` | Reto（Phase 1: プレースホルダー） |
| `completeCandoDone()` | Can-do完了・+50XP・ロードマップへ |
| `playScenarioAudio(path, text, btn)` | MP3優先→Web Speech APIフォールバック |
| `speakFallback(text, btn)` | Web Speech API TTS（ja-JP、0.85倍速） |
| `renderProfile()` | `#profile-content` にXP・ストリーク・プラン表示 |
| `renderJlpt()` | `#jlpt-content` にPremiumプレースホルダー表示 |

### Can-do データ構造
```javascript
window.canDoData.push({
  id: "u3_c1",        // "u{unit}_{index}"
  unit: 3,            // ユニット番号
  index: 1,
  es: "Presentarse en japonés",
  jaGoal: "はじめまして。〜です。どうぞよろしく。",
  grammarTabs: ["desu"],
  traceChars: [{c:"あ",r:"a"}, ...],   // Unit 1・2のみ。なければ省略
  scenario: {
    title: "...",
    contextEs: "...",
    lines: [{speaker, ja, jaPlain, romaji, es, audio, highlight}]
  },
  explain: {
    summaryEs: "...",
    blocks: [{type:"rule"|"pattern"|"note", es:"..."}]
  },
  practice: {
    passRate: 0.8,
    items: [
      {type:"mc", prompt:"...", ja:"...", options:[...], answer:0},
      {type:"fill", prompt:"...", prefix:"...", answer:"...", options:[...]},
      {type:"reorder", prompt:"...", answer:[...], displayOptions:[...]}  // displayOptionsでruby対応
    ]
  }
});
```
- `displayOptions`: reorder問題のチップ表示用（rubyタグ含むHTML）。省略時は `answer` をそのまま使用

### 会話練習（Reto）台本 — `data/conversation_scripts.js`（`window.NM_SCRIPTS`）
エンジン実装済み。台本データは **47 Can-do・147会話**（Unit1〜10全て。u9_c1〜u9_c5 / u10_c1〜u10_c5 を2026-07-03 Opus生成で追加）。各Can-do 3会話×3〜4ステップ。scoring用 `jaPlain`/`accept` は全ひらがな（loanwordもひらがな化・`ー`のみ許容）。詳細・残タスク（u9/u10のKANJI_KANA追記＋実機検証）は memory の `next_session_prompt.md` / `conversation-feature-plan.md`。

### Can-do 実装済み一覧（2026-05-31更新 / 75本）
**N5標準文法追加Can-do（3本・2026-05-31）** — `u7_c7`（〜ことができます / `dekiru`タブ連動 / できますvs上手の対比）、`u8_c6`（〜と言いました / `itta` / と言いましたvsと思います）、`u8_c7`（〜でしょう簡易版 / `deshou` / でしょうvsです）。各 scenario→explain（`contrast`ブロックで対比明示）→practice（mc/fill/reorder・passRate0.8）。canDoData最末尾に追記（表示はユニット内末尾＝漢字Can-doの後）。

**漢字なぞり書きCan-do（u3_kanji〜u10_kanji / 8本・各ユニット末尾）** — Unit 3〜10の全漢字をなぞり書き（番号付き筆順ガイド）＋読み4択＋意味→漢字。完了で`learnedChars`連動。`id`は`u{n}_kanji`（既存`u5_c6`/`u10_c6`とのID衝突回避）。`trazarScript='kanji'`で描画。Unit 10は`unitKanji.nichijou=['今','毎','週','帰','出','休','読','話']`を新規定義し`roadmapUnits[10].kanjiKey='nichijou'`で漢字バッジ連動。Unit 7の`飛`「機」はKanjiVG筆順パスを`kanjiStrokes`へ追記済み。

| id | unit | テーマ | traceChars | escuchar |
|---|---|---|---|---|
| u1_c1 | 1 | ひらがな母音（あいうえお） | あいうえお | — |
| u1_c2 | 1 | ひらがな単語読み | えきあめて | — |
| u1_c3 | 1 | 長い単語・あいさつ | なし | — |
| u1_c4 | 1 | か行・さ行 | かきくけこさしすせそ | — |
| u1_c5 | 1 | た行・な行 | たちつてとなにぬねの | — |
| u1_c6 | 1 | は行・ま行・や行 | はひふへほまみむめもやゆよ | — |
| u1_c7 | 1 | ら行・わ行・ん | らりるれろわをん | — |
| u1_c8 | 1 | 濁音（が・ざ・だ・ば行） | が行等代表 | — |
| u1_c9 | 1 | 半濁音（ぱ行）＋拗音 | ぱ行・きゃ等 | — |
| u1_c10 | 1 | ひらがな総まとめ | [] | ✅ audio_mc/fill |
| u2_c1 | 2 | カタカナ母音（アイウエオ） | アイウエオ | — |
| u2_c2 | 2 | カタカナ単語（コンビニ等） | コケキスミ | — |
| u2_c3 | 2 | カタカナ外来語（マリアカルロス） | マリアカルス | — |
| u2_c4 | 2 | カ行・サ行 | カキクケコサシスセソ | — |
| u2_c5 | 2 | タ行・ナ行 | タチツテトナニヌネノ | — |
| u2_c6 | 2 | ハ行・マ行・ヤ行 | ハヒフへほマミムメモヤユヨ | — |
| u2_c7 | 2 | ラ行・ワ行・ン | ラリルレロワヲン | — |
| u2_c8 | 2 | 濁音（ガ・ザ・ダ・バ行） | ガ行等代表 | — |
| u2_c9 | 2 | 半濁音（パ行）＋長音符ー | パ行・キャ等 | — |
| u2_c10 | 2 | カタカナ総まとめ | [] | ✅ audio_mc/fill |
| u3_c1 | 3 | 自己紹介（です・ます） | なし | — |
| u3_c2 | 3 | 職業（じゃありません） | なし | — |
| u3_c3 | 3 | 年齢（〜さいです） | なし | ✅ meaning×4+match×4 |
| u3_c4 | 3 | 日課の動作（ます形） | なし | — |
| u3_c5 | 3 | フル自己紹介（Unit 3まとめ） | なし | ✅ meaning×4+match×4 |
| u4_c1 | 4 | 数字1〜10 + いくつ + ～つください | なし | — |
| u4_c2 | 4 | 数字11〜100 + いくらですか + 電話番号 | なし | — |
| u4_c3 | 4 | 時間（なんじですか / はん / ごぜん・ごご） | なし | ✅ meaning×6+match×2 |
| u4_c4 | 4 | 指示語（これ/それ/あれ / この/その/あの） | なし | — |
| u4_c5 | 4 | 疑問詞まとめ + 曜日（いつ/どこ/だれ/なに） | なし | ✅ meaning×4+match×4 |
| u5_c1 | 5 | 場所を聞く（〜はどこですか / 〜にあります） | なし | — |
| u5_c2 | 5 | あります vs います（物 vs 人・動物） | なし | — |
| u5_c3 | 5 | 位置表現（うえ/した/まえ/うしろ/なか/そと/よこ/ちかく/あいだ） | なし | ✅ meaning×4+match×4 |
| u5_c4 | 5 | 助詞 で/へ（動作場所・移動方向） | なし | — |
| u5_c6 | 5 | 段階的文作り（は/に/で/を・で vs に） | なし | ✅ reorder×8+fill×4+conv×2+mc×2 |
| u5_c5 | 5 | 街案内の総合会話（Unit 5まとめ） | なし | ✅ meaning×4+match×4 |
| u6_c1 | 6 | い形容詞（おいしい・たかい・やすい） | なし | — |
| u6_c2 | 6 | な形容詞（きれい・すき・べんり） | なし | — |
| u6_c3 | 6 | どうですか（感想を聞く・答える） | なし | ✅ meaning×4+match×4 |
| u6_c4 | 6 | より〜のほうが（比較） | なし | — |
| u6_c5 | 6 | いちばん（最上級・Unit 6まとめ） | なし | ✅ meaning×4+match×4 |
| u7_c1 | 7 | 〜ましょう・ましょうか（誘い・申し出） | なし | — |
| u7_c2 | 7 | 〜たいです・たくないです（願望） | なし | — |
| u7_c3 | 7 | 〜にいきます・きます（目的移動） | なし | ✅ meaning×4+match×4 |
| u7_c4 | 7 | 〜前に・〜後で（順序） | なし | — |
| u7_c5 | 7 | 一日のスケジュール（Unit 7まとめ） | なし | ✅ meaning×4+match×4 |
| u7_c7 | 7 | 〜ことができます（能力・可能／vs上手） | なし | — |
| u8_c1 | 8 | 〜くて・で（形容詞をつなげる） | なし | — |
| u8_c2 | 8 | 〜くなります/になります（変化） | なし | — |
| u8_c3 | 8 | 〜とおもいます（意見を言う） | なし | ✅ meaning×4+match×4 |
| u8_c4 | 8 | 形容詞の否定・過去形 | なし | — |
| u8_c5 | 8 | 形容詞で詳しく描写する（Unit 8まとめ） | なし | ✅ meaning×4+match×4 |
| u8_c6 | 8 | 〜と言いました（引用／vsと思います） | なし | — |
| u8_c7 | 8 | 〜でしょう（推量・確認・簡易版／vsです） | なし | — |
| u9_c1 | 9 | 家族構成を言う（〜は〜が〜人います） | なし | — |
| u9_c2 | 9 | 家族の職業・特徴を言う（〜の〜は〜です） | なし | — |
| u9_c3 | 9 | うち vs そと の使い分け | なし | ✅ meaning×4+match×4 |
| u9_c4 | 9 | 家族について質問・答える（何人/何歳/どんな人） | なし | — |
| u9_c5 | 9 | 家族紹介まとめ（Unit 9総合） | なし | ✅ meaning×4+match×4 |
| u10_c1 | 10 | 朝のルーティン（〜てから） | なし | — |
| u10_c2 | 10 | 経験を話す（〜たことがある・たあとで） | なし | — |
| u10_c3 | 10 | 禁止・義務・不必要（ない形3文型） | なし | ✅ meaning×4+match×4 |
| u10_c4 | 10 | 理由・逆接（だから/でも/そして/それから/それに） | なし | — |
| u10_c5 | 10 | 一日のスケジュール（Unit 10総合） | なし | ✅ meaning×4+match×4 |

### showSection() の動作
```javascript
function showSection(id, btn) {
    // 全section非表示 → 対象section表示
    // 全nav-btn非アクティブ → 対象btnアクティブ
    if(id === 'roadmap') renderRoadmap();
    if(id === 'profile') renderProfile();
    if(id === 'jlpt')    renderJlpt();
    updateHUD();
}
```

### 音声再生（VOICEVOX / Opus）
```javascript
playScenarioAudio("audio/u3_kanji_l1.opus", "なまえはマリアです。", btnEl)
// → Audio.load() → onerror → speakFallback()（Web Speech API）にフォールバック
```
- **命名規約**: `audio/{canDoId}_l{行番号}.opus`（話者はファイル名に含めない）。`renderScenarioView` が `line.audio` を無視して**この規約パスを自動生成**して 🔊 ボタンに埋め込む。
- ファイルを `audio/` に置くだけで自動切替。**未生成なら Web Speech API で動作**（＝音声無しでも全機能OK）。
- **生成ツール**: `tools/`（`extract_audio_manifest.js`→`audio/audio_manifest.json`→`voicevox_build.py`）。VOICEVOX(localhost:50021) + ffmpeg で WAV→Opus(28kbps mono)変換。詳細は `tools/README.md`。
- 形式は **Opus** を採用（MP3比 約半分サイズ・データ通信節約）。レガシーの `line.audio` 内 `.mp3` パス（24件）は規約パスに置換されたため死にデータ（無害）。

---

## 文法モジュール一覧（25タブ）

**⚠️ 実物の構造（CLAUDE.md旧記述の訂正）：**
- タブボタンは `data-tab` 属性ではなく **`lesson-tab` クラス + `onclick="setCurrentLesson('key')"`**。HTMLは `renderGrammar()`（index.html:3151付近）**関数内のテンプレートリテラル**に直書き。`currentLesson` 変数で active 制御。
- 分岐は if-else ではなく **`currentLesson` のモード制 if 連鎖**（index.html:3185付近〜）：`if(currentLesson==='xxx'){ if(grammarMode==='learn') renderXxxLearn(); else renderXxxPractice(); }`。各タブは **learn / practice の2関数構成**。
- 分岐末尾の `else { ... renderJoshiLearn/Practice }` が joshi（デフォルト）。
- タブ横スクロール：`renderGrammar()` 内 `requestAnimationFrame`（3180付近）でactiveタブを中央へスクロール。

**⚠️ 新タブ追加時は必ず3箇所に追記：** ① タブボタンHTML（renderGrammarテンプレート内） ② `currentLesson` モード制 if 連鎖 ③ `renderXxxLearn`/`renderXxxPractice` 本体（+ データプール `xxxLesson`/`xxxReorderPool`/`xxxFillPool` を関数外に定義、+ 状態変数 `xxxPracMode` 等）。並び替え＋4択タブは既存 `omou` 系を雛形にする（プレフィックス置換）。

| key | タブ名 | Practicar形式 |
|---|---|---|
| `desu` | です | 並び替え |
| `katsu` | です活用 | 4択 |
| `shiji` | 指示語 | 4択穴埋め |
| `gimon` | 疑問詞 | 4択 / 並び替え |
| `masu` | ます | 4択 |
| `aru` | あります/います | 4択 / 並び替え |
| `keiyo` | 形容詞 | Conjugación / Uso |
| `yori` | より〜の方が | 並び替え / 4択 |
| `kute` | 〜くて・で | 4択 / 並び替え |
| `mashou` | ましょう | 並び替え |
| `tai` | 〜たい | 4択 / 並び替え |
| `maeni` | 〜前に・後で | 並び替え |
| `niiku` | 〜に行く・来る | 並び替え |
| `te` | て形 | Conjugación / Orden / てから |
| `ta` | た形 | Conjugación / Orden / たり |
| `nai` | ない形 | Conjugación / Orden |
| `dou` | 〜はどうですか | 並び替え / 4択 |
| `omou` | 〜と思います | 並び替え / 4択 |
| `dekiru` | 〜ことができます（能力・可能） | 並び替え / 4択 |
| `itta` | 〜と言いました（引用・伝聞） | 並び替え / 4択 |
| `deshou` | 〜でしょう（推量・確認／簡易版） | 並び替え / 4択 |
| `ichiban` | 〜のなかで〜がいちばん〜 | 並び替え / 4択 |
| `naru` | 〜になります/〜くなります | 並び替え / 4択 |
| `setsuzoku` | 接続詞 | 並び替え / 4択 |
| `kazoku` | 家族の紹介 | 並び替え / 4択 |
| `joshi` | 助詞（11グループ） | 並び替え / 穴埋め |

**助詞グループ（index 0〜10）:**
は/が(0) · を(1) · に/で/へ(2) · と/も/の(3) · 時間に/から/まで(4) · よ/ね/か(5) · も包含(6) · から/まで範囲(7) · から理由(8) · が逆接(9) · や/など例示(10)
**⚠️ Repaso は `joshiGroup === 11` で判定**

### 語彙モジュール
20カテゴリ（index 0〜19）+ Repaso（index 20）。vocabData[2] = '家族'（27語）。
**⚠️ Repaso は `vocabCategory === vocabData.length`（=20）で判定**

---

## 学習ロードマップ（10ユニット）

| # | テーマ | section/tab | scoreKeys | kanjiKey |
|---|---|---|---|---|
| 1 | Hiragana | moji/hiragana | kana_hiragana | null |
| 2 | Katakana | moji/katakana | kana_katakana | null |
| 3 | Autopresentación | grammar/desu | desu/katsu/masu | desu |
| 4 | Números, tiempo | grammar/gimon | gimon/shiji | gimon |
| 5 | Lugares y direcciones | grammar/aru | aru/joshi | aru |
| 6 | Compras y comida | grammar/keiyo | keiyo/dou/yori/ichiban | keiyo |
| 7 | Acciones cotidianas | grammar/mashou | mashou/tai/niiku/maeni/dekiru | mashou |
| 8 | Describir con adjetivos | grammar/kute | kute/naru/omou/deshou/itta | kute |
| 9 | Familia y personas | grammar/kazoku | kazoku | kazoku |
| 10 | Horario diario | grammar/te | te/ta/nai/setsuzoku | nichijou |

ロードマップ関数: `renderRoadmap()` / `getUnitScore(keys)` / `getKanjiProgress(chars)` / `navigateToUnit(section, tab)`

配置テスト判定:
- 12〜15問正解 → Pre-intermedio → Unit 9推奨
- 8〜11問正解 → Básico-intermedio → Unit 5推奨
- 0〜7問正解 → Básico → Unit 1推奨

---

## コーディング規約
- 関数命名: `renderXxx()` / `showXxx()` / `checkXxx()` / `startXxx()` / `setXxx()`
- イベント処理は `onclick="..."` をHTML属性に直接記述
- 描画は `innerHTML = \`...\`` テンプレートリテラルで一括置換
- `stripRuby(html)` でルビタグ除去してから採点比較・チップ表示
- 4択でrubyHTMLを含む場合は**インデックスベース採点**（`checkXxxAnswer(idx)`）
- **UIラベル・説明はスペイン語**、**学習テキストは日本語（`<ruby>`タグ）**。英語は使わない

## デザイン規則
- カラー: `--primary:#E63946`（赤）/ `--ocean:#2A9D8F`（緑）/ `--accent:#F4A261`（オレンジ）/ `--night:#1D3557`（紺）/ `--cream:#FDFBF7`（背景）
- フォント: 日本語 = `Noto Sans JP` / `Zen Maru Gothic`、欧文 = `DM Sans` / `Outfit`
- 角丸: `--radius-sm/md/lg/xl` (12/20/28/40px)
- ボタンクラス: `.btn.btn-primary`（赤）/ `.btn.btn-secondary`（緑）

## 要注意箇所
- `renderGrammar()` に新タブ追加時は**必ず3箇所**に追記
- `taReorderPool` の `use:'hou'` エントリが2重（軽微な既知バグ）
- Can-do の `practice.items` / `escuchar.items` は **answer:0 のまま書いてよい**（`openPracticeView`/`startEscucharPart` が描画時に選択肢をシャッフルして answer を追従させる）。データ側で正解位置を手動分散させる必要なし
- ビルド・テスト・lint なし。動作確認は `python -m http.server 8080`
- 実装完了後は必ず未実装リストを `✅完了` に更新すること

---

## NihongoMap Phase 1 — 実装進捗

### ✅ 完了タスク（Task #1〜#9）
| # | 内容 | 完了日 |
|---|---|---|
| 1 | `nm_*` localStorage キー設計 / `rolloverDailyIfNeeded()` | 2026-05-25 |
| 2 | `FEATURE_GATES` / `canUse()` / `consume()` 共通関数 | 2026-05-25 |
| 3 | `<section id="unit">` / `<section id="scenario">` HTML枠追加 | 2026-05-25 |
| 4 | Unit 3 Can-do 1（u3_c1）データ実装 | 2026-05-25 |
| 5 | シナリオUI（ヒント3段階・🔊・対話表示） | 2026-05-25 |
| 6 | Práctica UI・80%判定・displayOptions対応 | 2026-05-25 |
| 7 | ロードマップ → Can-doカード接続（`renderUnit()` / `openCanDo()`） | 2026-05-25 |
| 8 | XP/ストリーク/HUD（`grantXP()` / `updateHUD()`） | 2026-05-25 |
| 9 | ボトムナビ整備 / `#profile` / `#jlpt` セクション / `renderProfile()` | 2026-05-25 |
| — | Unit 1（ひらがな）・Unit 2（カタカナ）Can-doデータ（各3本） | 2026-05-25 |
| — | Trazar（なぞり書き）ステップをUnit 1・2フローに統合 | 2026-05-25 |

### ✅ 完了済み追加分（2026-05-27〜29）
| 内容 | 完了日 |
|---|---|
| Unit 4 Can-do 5本（u4_c1〜u4_c5）+ escuchar（c3/c5） | 2026-05-27 |
| Unit 5 Can-do 5本（u5_c1〜u5_c5）+ escuchar（c3/c5）+ conv renderer | 2026-05-27 |
| Unit 6 Can-do 5本（u6_c1〜u6_c5）+ escuchar（c3/c5） | 2026-05-27 |
| Unit 7 Can-do 5本（u7_c1〜u7_c5）+ escuchar（c3/c5） | 2026-05-28 |
| Unit 8 Can-do 5本（u8_c1〜u8_c5）+ escuchar（c3/c5） | 2026-05-28 |
| Unit 9 Can-do 5本（u9_c1〜u9_c5）+ escuchar（c3/c5）+ 選択肢ランダム化 | 2026-05-29 |
| Unit 10 Can-do 5本（u10_c1〜u10_c5）+ escuchar（c3/c5）+ 選択肢ランダム化 | 2026-05-29 |

### 🔜 残タスク（優先順）
| # | 内容 | 担当モデル |
|---|---|---|
| ✅ | Unit 8 Can-do 5本（u8_c1〜u8_c5）| Opus/Sonnet |
| ✅ | Unit 9 Can-do 5本（u9_c1〜u9_c5）| Opus/Sonnet |
| ✅ | Unit 10 Can-do 5本（u10_c1〜u10_c5）| Opus/Sonnet |
| ✅ | VOICEVOXバッチスクリプト（**Opus(.opus)** 生成 / `tools/`）— 2026-05-31完了 | Opus |
| 11 | admin.html + Claude API シナリオ自動生成 | Sonnet |
| 13 | Lemon Squeezy 連携・`nm_plan` サーバ検証 | Sonnet |
| 14 | OpenAI Realtime PoC（Unit 3 c1 の Reto） | Sonnet |

### 🟢 バックエンド（後回し）
| 項目 | 規模 |
|---|---|
| Googleログインボタン（Firebase Google Auth） | 中 |
| パスワードリセット | 小 |
| Firestore進捗保存（nm_cando_progress 同期） | 大 |
| 利用規約・プライバシーポリシー | 中 |

---

## index.html 行番号インデックス（約27,130行 / 2026-05-31更新）

**⚠️ 2026-05-31の文法3タブ追加で全体が後方へシフト。新規追加箇所：**
- 状態変数 `dekiru/itta/deshou` 系：index.html:2359付近（omou状態変数の直後）
- タブボタン3つ：`renderGrammar()` テンプレート内 `omou` ボタンの直後
- `currentLesson` 分岐3つ：`omou` 分岐の直後
- render関数：`// ===== DEKIRU ... FUNCTIONS =====`（index.html:7399）以降に dekiru/itta/deshou の各16関数（omou系と同型）
- データプール：`// ===== DEKIRU ... DATA =====`（index.html:11173）に `dekiruLesson`/`dekiruReorderPool`/`dekiruFillPool` ほか（KAZOKU DATAの直前）
- Can-do 3本：canDoData最末尾（index.html:26440〜 `u7_c7`/`u8_c6`/`u8_c7`）

※下記の旧行番号はシフト前のもの。おおよその相対位置の参考に留め、編集前に必ず Grep で実物を再確認すること。

### HTML構造
| 行 | 内容 |
|---|---|
| 1〜1308 | `<style>` CSS 全体 |
| 124 | `.bottom-nav {` モバイルCSS |
| 162 | `@media (min-width: 768px)` PC左サイドバーCSS |
| 1393 | `<nav class="bottom-nav">` 4ボタン |
| 1401 | `<div class="hud" id="hud">` |
| 1409 | `<section id="roadmap">` |
| 1414 | `<section id="unit">` |
| 1423 | `<section id="scenario">` |
| 1442 | `<section id="jlpt">` |
| 1447 | `<section id="profile">` |
| 1452 | `<section id="moji">` |
| 1516 | `<section id="grammar">` |
| 1525 | `<section id="vocab">` |
| 1619 | `<script>` JS開始 |

### データ定義
| 行 | 内容 |
|---|---|
| 2181 | `const unitKanji` |
| 2191 | `const roadmapUnits` 10ユニット |
| 2213 | `let trazarScript, trazarList, ...` |
| 13765 | `window.canDoData = []` |
| 13768〜17681 | `window.canDoData.push(...)` × 30本（u1_c1〜u4_c5） |
| 17682〜19289 | `window.canDoData.push(...)` × 6本（u5_c1〜u5_c4, **u5_c6**, u5_c5） |
| 19290〜20656 | `window.canDoData.push(...)` × 5本（u6_c1〜u6_c5） |
| 20657〜21973 | `window.canDoData.push(...)` × 5本（u7_c1〜u7_c5） |
| 21974〜23291 | `window.canDoData.push(...)` × 5本（u8_c1〜u8_c5） |
| 23292〜24638 | `window.canDoData.push(...)` × 5本（u9_c1〜u9_c5） |
| 〜25174 | `window.canDoData.push(...)` 既存分（u1_c1〜u10_c5・64本） |
| 25176〜25534 | `window.canDoData.push(...)` × 8本（**u3_kanji〜u10_kanji** 漢字なぞり書き） |
| 〜26440〜 | `window.canDoData.push(...)` × 3本（**u7_c7 / u8_c6 / u8_c7** N5文法追加・2026-05-31） |

※ 行番号は kanjiStrokes（`飛`「機」追記）・unitKanji（`nichijou`追加）で全体が後ろにシフト。`const kanjiStrokes`末尾に飛・機の2字、`const unitKanji`に`nichijou`を追加済み。

### 既存ロードマップ関数
| 行 | 関数 |
|---|---|
| 11984 | `showSection(id, btn)` |
| 12017 | `updateStats()` |
| 12036 | `navigateToUnit(section, tab)` |
| 12047 | `buildPlacementQuestions()` |
| 12165 | `renderRoadmap()` |

### NihongoMap Phase 1 関数ブロック（13002行〜）
| 行 | 関数 |
|---|---|
| 13002 | Phase 1 ブロック開始コメント |
| 13010 | `rolloverDailyIfNeeded()` |
| 13038 | `getTodayString()` |
| 13045 | `nmGetDaily/Streak/XP/Progress/Plan()` |
| 13085 | `grantXP(amount)` |
| 13113 | `isPremium()` |
| 13132 | `FEATURE_GATES` |
| 13151 | `canUse(feature, ctx)` |
| 13169 | `consume(feature)` |
| 13224 | `updateHUD()` |
| 13246 | `saveCanDoProgress(canDoId, patch)` |
| 13264 | `getCanDoProgress(canDoId)` |
| 13284 | `renderUnit(unitId)` |
| 13331 | `let currentCanDoId = null` |
| 13337 | `openCanDo(canDoId)` |
| 13352 | `setScenarioStep(step)` |
| 13360 | `updateStepVisibility(hasTraza)` |
| 13374 | `renderScenarioView(cd)` |
| 13419 | `openExplainView()` |
| 13445 | `openTrazarView()` |
| 13525 | `openPracticeView()` |
| 13662 | `openChallengeView()` |
| 13673 | `completeCandoDone()` |
| 13696 | `playScenarioAudio(path, text, btn)` |
| 13715 | `speakFallback(text, btn)` |
| 14144 | `renderProfile()` |
| 14218 | `renderJlpt()` |
| 14230 | 起動時: `rolloverDailyIfNeeded(); updateHUD();` |
