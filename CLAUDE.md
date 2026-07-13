# CLAUDE.md - Academia Chizu / NihongoMap

## プロジェクト概要
スペイン語話者向けの日本語学習アプリ（N5レベル）。ボリビアの学習者を対象とした単一HTMLファイルのWebアプリ。UIテキストはスペイン語、学習対象は日本語。
- アプリ名: **NihongoMap**（内部コード名 academia-chizu のまま）
- リポジトリ: `C:\Users\LENOVO\Desktop\academia-chizu\`

## 技術スタック
- **Vanilla HTML / CSS / JavaScript** — フレームワーク・ビルドツールなし
- **単一ファイル**: `index.html`（約28,560行、CSS・JS・データすべて内包 / 2026-07-10実カウント）
- **回帰テスト**（データ追加・修正後は必ず実行）:
  - 静的: `node scripts/verify_app_static.js`（依存なし・FAIL 0 が正常）
  - E2E: `python C:/Users/LENOVO/.claude/skills/webapp-testing/scripts/with_server.py --server "python -m http.server 8899" --port 8899 -- python scripts/verify_app_e2e.py`（Playwright headless・**22項目・2026-07-10時点 22/22 pass**（WS5でT17〜T19・WS8でT20〜T21・**WS9でT22（nm_*同期マージ）追加**）。静的側は **[A19]（nm_*マージ関数・15アサーション）** をWS9で追加。稼働中サーバ再利用なら `PYTHONIOENCODING=utf-8 NM_PORT=8080 python scripts/verify_app_e2e.py` が確実。※`with_server.py` は NM_PORT を渡さないと 8899 既定になるので、別ポート時は `NM_PORT=<port>` を必ず前置。8899/with_server が ERR_EMPTY_RESPONSE で不安定なら `python -m http.server <port> &` を自前で立てて `NM_PORT=<port> python scripts/verify_app_e2e.py` が確実）
  - 手動スニペット集: `scripts/verify_app_eval.md`（DevToolsコンソール用）
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
#scenario  — シナリオ学習フロー（Escena→Gramática→[Trazar]→Práctica→[Escuchar]→[Lectura]→Reto。Escuchar/Lectura はデータがある Can-do のみ・ステップ見出しには出さずボタン遷移）
#jlpt      — JLPT N5模擬試験（**実装済み**: 35問=語彙10+文法20+読解5・60%合格・+100XP・弱点誘導。現状ゲート未接続で無料開放）＋ **Práctica de Lectura ドリル**（2026-07-09実装: `lecturaDrillBank` 12パッセージ17問からランダム5パッセージ・60%合格・+20XP）
#profile   — ユーザープロフィール（XP・ストリーク・プラン）
#moji      — 文字（ひらがな・カタカナ・漢字）
#grammar   — 文法（26タブ）
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
**⚠️ Firestore 同期状況（WS9・2026-07-10）**: `chizu_scores`/`learnedChars`（既存）＋ **`nm_cando_progress`/`nm_xp`/`nm_streak`/`nm_jlpt`（WS9で同期化）** が `users/{uid}` に保存される。`nm_daily`/`nm_challenge_quota` は**意図的に同期スコープ外**（端末ローカル据え置き＝日次リセットとの二重管理回避。ユーザー承認済み）。`nm_plan` はWS8で同期（読込のみ）。
| キー | 型 | 用途 |
|---|---|---|
| `chizu_scores` | object | **既存**: 練習タブごとのスコア（0〜100）。**Firestore同期** |
| `learnedChars` | array | **既存**: 学習済み文字。**Firestore同期** |
| `chizu_placement` | object | **既存**: 配置テスト結果（未同期） |
| `nm_cando_progress` | object | Can-do別進捗（status/stars/practiceScore/…）。**WS5追加** `xpAwarded:{practice,escuchar,lectura,done}`＝初回満額XP判定フラグ。**WS9でFirestore同期**（`users/{uid}.nm.cando`） |
| `nm_xp` | object | `{total, today, lastUpdate}`。**WS9でFirestore同期**（total=maxマージ・today/lastUpdateはローカル当日優先） |
| `nm_streak` | object | `{current, longest, lastActiveDate}`。**WS9でFirestore同期**（longest=max・current/lastActiveDateは新しい日付の端末採用） |
| `nm_jlpt` | object | **WS5追加**: 模試初回合格管理。**WS9でFirestore同期**（passedOnce=OR・bestScore=max） |
| `nm_daily` | object | 日次カウンター（`{date, practiceCount, listeningPractice, lecturaDrill, …}`）。**WS5追加** `lecturaDrill`＝読解ドリル無料枠。**同期スコープ外**（端末ローカル） |
| `nm_plan` | object | プランフラグ（`{tier, expiresAt, source}`）。`source:'teacher_code'`＝教師コード解放（180日Premium）。WS8で同期（読込のみ・`mergePlanFromServer`） |
| `nm_challenge_quota` | object | 会話チャレンジ無料枠（週次）。**同期スコープ外**（端末ローカル） |

### NihongoMap Phase 1 — 主要関数
| 関数 | 役割 |
|---|---|
| `rolloverDailyIfNeeded()` | 日次リセット・ストリーク判定（起動時呼び出し） |
| `getTodayString()` | `sv-SE` ロケールでタイムゾーン対応の日付文字列 |
| `nmGetDaily/Streak/XP/Progress/Plan()` | nm_* 読み出しユーティリティ |
| `grantXP(amount)` | XP加算・ストリーク更新・HUD再描画。**WS9**: 末尾で `scheduleCloudSave()` |
| `nmMergeXP/Streak/Jlpt(l,s)` / `nmMergeCandoOne(l,s)` / `nmMergeCandoProgress(l,s)` | **WS9追加**: nm_* の純粋マージ関数（`NM_MERGE_START`〜`NM_MERGE_END`）。退行なし・単調増加・二重満額XP防止（xpAwarded=OR）。`server` falsy なら local を返す。回帰 [A19]/T22 で検証 |
| `mergeNmFromServer(serverNm)` | **WS9追加**: サーバ `nm{xp,streak,cando,jlpt}` を純粋マージ関数で localStorage へ反映（副作用あり）。`loadProgressFromCloud` が呼ぶ。末尾で `updateHUD()`＋ロードマップ表示中なら `renderRoadmap()` |
| `nmBuildSyncPayload()` / `scheduleCloudSave()` | **WS9追加**: 前者は nm_* を保存用 `{xp,streak,cando,jlpt}` に束ねる（daily/quota除外）。後者は grantXP/saveCanDoProgress/showJlptResults 後に**3秒デバウンス**で `saveProgressToCloud()` を1回に集約（未ログインは即return） |
| `awardStepXP(id, field, full, repeat)` | **WS5追加**: ステップXPを初回満額・2回目以降減額で付与し実額を返す。初回判定は `nm_cando_progress[id].xpAwarded[field]` |
| `isPremium()` | nm_plan の tier/expiresAt をチェック |
| `canUse(feature, ctx)` | FEATURE_GATES で機能制限チェック（**WS5で `'lectura.drill'` が初の実接続**） |
| `consume(feature)` | 日次カウンタを消費 |
| `sha256Hex(str)` / `redeemTeacherCode(code,msgId)` / `submitTeacherCode(inputId,msgId,after)` | **WS5追加**: 教師コードを `crypto.subtle` でSHA-256照合（ホワイトリスト `TEACHER_CODE_HASHES`）→一致で180日Premium付与。平文はソースに置かない |
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
| `startEscucharPart()` | Escuchar（聞き取り）練習開始。**openPracticeView と同型で audio_mc/audio_meaning/audio_match の選択肢を描画時シャッフルして answer を追従**（正解が answer:0 に92%偏っていたため。audio_fill 無料dictado は `_buildDictadoFreeOpts` が別途シャッフル済み）。**WS5**: コピー時に `_origIdx` を保持 |
| `speakEscucharItem(btn)` | **WS5変更**: `playScenarioAudio('audio/{id}_esc{n}.opus', text, btn)` 経由（n=`_origIdx`+1）。音声ファイル→TTSフォールバック |
| `startLecturaPart()` | Lectura（読解）練習開始（2026-07-09実装）。`cd.lectura.items`（read_mc）を浅いコピー→**描画時シャッフル＋answer追従**。状態変数 `_lectura*`。フロー: Práctica合格→[Escuchar]→Lectura→Reto（`showPracticeResult`/`showEscucharResult` の hasLectura 分岐） |
| `renderLecturaItem()` | パッセージ（`.lectura-passage`・ルビ付き）＋promptEs＋4択を `#scenario-content` に描画 |
| `checkLecturaAnswer(idx)` | インデックス採点・explainEs 表示 → `advanceLectura()` |
| `showLecturaResult()` | passRate 0.7判定・**+15XP**・合格で Reto ボタン |
| `startLecturaDrill()` | JLPT形式読解ドリル（2026-07-09実装）。`lecturaDrillBank` からランダム5パッセージ→設問フラット化（シャッフル＋answer追従）。状態変数 `_lectDrill*`（模試 `_jlpt*` と分離）。**WS5**: 冒頭 `canUse('lectura.drill')`＝無料1日1回ゲート→ブロック時 `renderLecturaDrillUpsell()`（教師コード入力）・通過時 `consume` |
| `composeReorderCorrectHtml(item)` | **WS5追加**: reorder誤答時の正しい並びをHTML再構成（displayOptions→ルビ付き・貪欲DFS。無ければ answer文字列） |
| `renderLectDrillQuestion()` / `checkLectDrillAnswer(idx)` / `showLectDrillResults()` | ドリル出題・採点（explainEs表示）・結果（60%合格・**+20XP**）。`#jlpt-content` に描画 |
| `checkPracticeAnswer(idx)` | 4択採点（インデックスベース） |
| `practiceReorderTap(btn)` | 並び替えチップ選択 |
| `checkPracticeReorder()` | 並び替え採点。**WS5**: 誤答時に `composeReorderCorrectHtml` で正解文（可能ならルビ付き）＋explainEs を表示 |
| `showPracticeResult()` | passRate 0.8判定・**WS5: 初回+20/以降+5**（`awardStepXP`・実額を結果画面に表示） |
| `openChallengeView()` | Reto（Phase 1: プレースホルダー） |
| `completeCandoDone()` | Can-do完了・**WS5: 初回+50/以降+0**・ロードマップへ |
| `playScenarioAudio(path, text, btn)` | MP3優先→Web Speech APIフォールバック |
| `speakFallback(text, btn)` | Web Speech API TTS（ja-JP、0.85倍速） |
| `renderProfile()` | `#profile-content` にXP・ストリーク・プラン表示 |
| `renderJlpt()` | `#jlpt-content` に模試イントロ＋**Práctica de Lectura エントリ** → `startJlptTest()` で35問実施（`jlptQuestionBank`・`showJlptResults()`）／ `startLecturaDrill()` で読解ドリル |
| `startJlptTest()` | **WS5変更**: section1/2 の出題順シャッフル＋各問の選択肢シャッフル＋answer追従（浅コピー・元データ非破壊）。section3（読解・同一パッセージ参照）は順序固定 |
| `showJlptResults()` | **WS5変更**: セクション別集計を `_jlptQuestions[i].section` ベース化（シャッフル耐性）。XP＝**初回+100/以降+20**（`nm_jlpt`） |

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
  },
  escuchar: {   // 任意。あると Práctica 合格後に Escuchar ステップ
    passRate: 0.7,
    items: [{type:"audio_meaning"|"audio_match"|"audio_mc"|"audio_fill", text:"（読み上げ文）", promptEs, options, answer, explainEs}]
  },
  lectura: {    // 任意（2026-07-09実装）。あると Práctica/Escuchar 合格後に Lectura ステップ
    passRate: 0.7,
    items: [{type:"read_mc", passage:"（ルビ付き2〜4文）", promptEs, options:[×4], answer:0, explainEs}]  // explainEs 必須
  }
});
```
- `displayOptions`: reorder問題のチップ表示用（rubyタグ含むHTML）。省略時は `answer` をそのまま使用
- **lectura 搭載 Can-do（10本・40問）**: まとめ系 u3_c5/u4_c5/u5_c5/u6_c5/u7_c5/u8_c5/u9_c5/u10_c5 ＋ u8t_c4（掲示読解）＋ **u8t_c5（職場ルール読解・WS6）**。各4問。構造は `verify_app_static.js` の [A18] で検証

### 会話練習（Reto）台本 — `data/conversation_scripts.js`（`window.NM_SCRIPTS`）
エンジン実装済み。台本データは **54 Can-do・165会話・568ステップ**（Unit1〜10全て＋u5_c6/u10_c6/u10_c7/u10_c8＋**新U8 u8t_c2/u8t_c4/u8t_c5**。2026-07-10実カウント）。scoring用 `jaPlain`/`accept` はかな（カタカナ外来語可 — `normalizeJa` がひらがなへ正規化するため。漢字のみ禁止）。**新規台本は expect.ja もかな限定で書くと KANJI_KANA 追記不要で [A17] 安全**（u8t の18ステップはこの方式）。**KANJI_KANA 追記完了（2026-07-06）**: WS指定13語＋採点回帰で検出した10語（何人/何歳/歳/上手/大すき/何か/友だち/買い物/行か/読ん）。全568ステップの採点回帰は `scripts/verify_app_static.js` の [A17] で自動検証（553/553 pass・dynamic除く）。残タスクは実機STT検証のみ。

### Can-do 実装済み一覧（2026-07-10更新 / 表示79本・canDoData計85本）
**N5標準文法追加Can-do（3本・2026-05-31 / WS6で各15問に増量）** — `u7_c7`（〜ことができます / `dekiru`タブ連動 / できますvs上手の対比）、`u8_c6`（〜と言いました / `itta` / と言いましたvsと思います）、`u8_c7`（〜でしょう簡易版 / `deshou` / でしょうvsです）。各 scenario→explain（`contrast`ブロックで対比明示）→practice（**各15問**=mc/fill/reorder・全問explainEs・passRate0.8。この3本のみ `promptEs`/`id`/`jlptForm` フィールド書式）。canDoData最末尾に追記（表示はユニット内末尾＝漢字Can-doの後）。

**漢字なぞり書きCan-do（u3_kanji〜u10_kanji＋u8t_kanji / 9本・各ユニット末尾）** — 各ユニットの漢字をなぞり書き（番号付き筆順ガイド）＋読み4択＋意味→漢字。完了で`learnedChars`連動。`id`は`u{n}_kanji`（既存`u5_c6`/`u10_c6`とのID衝突回避）。`trazarScript='kanji'`で描画。Unit 10は`unitKanji.nichijou=['今','毎','週','帰','出','休','読','話']`、**新U8は`unitKanji.teform=['写','真','使','入','待','作','手','伝']`（WS6・`roadmapUnits[8].kanjiKey='teform'`）**で漢字バッジ連動。KanjiVG筆順パス追記済み: 飛・機（U7）＋**写・真・使・待・作・伝（WS6。入・手は既存）**。

| id | unit | テーマ | traceChars | escuchar |
|---|---|---|---|---|
**⚠️ U1・U2 は 2026-07-09 に五十音行順＋累積制約で全面再構成（各12本・1行1CanDo）。** 語彙は「その行までに学習済みのかなだけで書ける言葉」に限定（濁音・半濁音・拗音・促音・長音は専用CanDo c11/c12 まで登場しない）。旧まとめ（c10）の escuchar/challenge は c12 へ移設。並び順は `displayUnit`/`displayOrder`（=unit/index、1〜12）で制御。累積制約は `scratchpad/check_cumulative.py` 相当のロジックで検証済み（行CanDo 20本すべてクリーン）。
| u1_c1 | 1 | あ行（あいうえお） | あいうえお | — |
| u1_c2 | 1 | か行（かきくけこ） | かきくけこ | — |
| u1_c3 | 1 | さ行（さしすせそ） | さしすせそ | — |
| u1_c4 | 1 | た行（たちつてと） | たちつてと | — |
| u1_c5 | 1 | な行（なにぬねの） | なにぬねの | — |
| u1_c6 | 1 | は行（はひふへほ） | はひふへほ | — |
| u1_c7 | 1 | ま行（まみむめも） | まみむめも | — |
| u1_c8 | 1 | や行（やゆよ） | やゆよ | — |
| u1_c9 | 1 | ら行（らりるれろ） | らりるれろ | — |
| u1_c10 | 1 | わ・を・ん＋初めての文 | わをん | — |
| u1_c11 | 1 | 濁音・半濁音（が・ざ・だ・ば・ぱ行） | がざだばぱ（代表） | — |
| u1_c12 | 1 | 拗音（きゃ…）・促音っ | ゃゅょっ | ✅ audio_mc/fill（旧c10より移設） |
| u2_c1 | 2 | ア行（アイウエオ） | アイウエオ | — |
| u2_c2 | 2 | カ行（カキクケコ） | カキクケコ | — |
| u2_c3 | 2 | サ行（サシスセソ） | サシスセソ | — |
| u2_c4 | 2 | タ行（タチツテト） | タチツテト | — |
| u2_c5 | 2 | ナ行（ナニヌネノ） | ナニヌネノ | — |
| u2_c6 | 2 | ハ行（ハヒフヘホ） | ハヒフヘホ | — |
| u2_c7 | 2 | マ行（マミムメモ） | マミムメモ | — |
| u2_c8 | 2 | ヤ行（ヤユヨ） | ヤユヨ | — |
| u2_c9 | 2 | ラ行（ラリルレロ） | ラリルレロ | — |
| u2_c10 | 2 | ワ・ヲ・ン＋完全な単語 | ワヲン | — |
| u2_c11 | 2 | 濁音・半濁音（ガ・ザ・ダ・バ・パ行） | ガザダバパ（代表） | — |
| u2_c12 | 2 | 拗音（キャ…）・促音ッ・長音ー | ャュョッー | ✅ audio_mc/fill（旧c10より移設） |
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
| u10_c6 | 10 | 〜てください・〜ています（指示・進行） | なし | — |
| u10_c7 | 10 | 〜てもいいですか・〜てはいけません（許可・禁止） | なし | — |
| u10_c8 | 10 | 〜たり〜たりします・〜ています（習慣列挙） | なし | — |

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

## 文法モジュール一覧（26タブ）

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

## 学習ロードマップ（11ユニット・2026-07-08 カリキュラム再構成）

**⚠️ 表示ユニット/順序は `displayUnit`/`displayOrder` で制御（ID・音声パス・進捗キーは不変）。**
- Can-do の実 `unit`/`index` は変更せず、`candoEffUnit(c)=c.displayUnit??c.unit` / `candoEffOrder(c)=c.displayOrder??c.index` で表示上の割当を決める。
- `candosForUnit(unitId)` が hidden除外＋effOrderソートして返す（`renderUnit`/`getUnitCanDoScore`/`renderRoadmap` の hasCando が使用）。
- `desafioExtra:true` の Can-do は「⭐ Desafío extra」バッジ付き・完了率の分母から除外（必須進行外）。
- `hidden:true` の Can-do は全表示から除外（データは温存）。

| # | テーマ | section/tab | scoreKeys | kanjiKey | 表示Can-do（displayOrder順） |
|---|---|---|---|---|---|
| 1 | Hiragana | moji/hiragana | kana_hiragana | null | u1_c1〜c12（五十音行順・2026-07-09再構成） |
| 2 | Katakana | moji/katakana | kana_katakana | null | u2_c1〜c12（五十音行順・2026-07-09再構成） |
| 3 | Autopresentación (です) | grammar/desu | desu/katsu | desu | u3_c1,c2,c3,c5,u3_kanji（**u3_c4はU7へ移動**） |
| 4 | Números, tiempo | grammar/gimon | gimon/shiji | gimon | u4_c1〜c5,u4_kanji |
| 5 | Lugares y direcciones | grammar/aru | aru/joshi | aru | u5_c1〜c4,c6,c5,u5_kanji |
| 6 | Compras y comida | grammar/keiyo | keiyo/dou/yori/ichiban | keiyo | u6_c1〜c5,u6_kanji |
| 7 | Acciones cotidianas (ます形) | grammar/mashou | masu/mashou/tai/niiku/maeni/dekiru | mashou | **u3_c4**,u7_c1,c2,c3,c4,c7,c5,u7_kanji |
| 8 | **La forma て（新設）** | grammar/te | te | teform | u8t_c1,u8t_c2,u8t_c3,u8t_c4,**u8t_c5,u8t_kanji（WS6）** |
| 9 | Describir con adjetivos（旧U8） | grammar/kute | kute/naru/omou/deshou/itta | kute | u8_c1〜c5,u8_kanji＋u8_c6,c7=**Desafío extra** |
| 10 | Familia y personas（旧U9） | grammar/kazoku | kazoku | kazoku | u9_c1〜c5,u9_kanji |
| 11 | Horario diario（旧U10） | grammar/ta | ta/nai/setsuzoku | nichijou | u10_c1,c2,c3,c4,c8,c5,u10_kanji（**c6/c7は`hidden`＝U8へ移設**） |

**新U8「La forma て」（u8t_ プレフィックス・unit:8・2026-07-08 / WS6でc5+kanji追加=6本構成）:** u8t_c1=て形の作り方（G1/2/3・リズム記憶）、u8t_c2=〜てください（旧u10_c6該当部を移設・職場シーン）、u8t_c3=〜ています（旧u10_c6から分離・作業中を伝える）、u8t_c4=〜てもいいですか/〜てはいけません（旧u10_c7を移設・教室の規則）、**u8t_c5=まとめ「アルバイト初日」（WS6・practice15/escuchar8/lectura4/Reto2会話のフルセット・displayOrder:5）、u8t_kanji=漢字なぞり書き（写真使入待作手伝・displayOrder:6）**。旧 `u10_c6`/`u10_c7` は `hidden:true` で退避（進捗は非継承・プレローンチのため無影響）。**Reto会話**: u8t_c2/u8t_c4/u8t_c5 に各2会話（NM_SCRIPTS・expect.jaかな限定）。**Escuchar**: u8t_c4/u8t_c5 に audio_meaning×4+audio_match×4。**Lectura**: u8t_c4（掲示読解）/u8t_c5（職場ルール）に read_mc×4。u8t_c1/c3 は Reto/Escuchar/Lectura なし。

**explain ブロック新タイプ `objetivo`（2026-07-08 全Can-do展開完了）:** 学習目標を explain 先頭に表示（`renderExplainBlock` に case ＋ `.explain-block--objetivo` CSS）。**表示中の全Can-do に配置済み**（hidden 2本を除く全て。WS6新設の u8t_c5/u8t_kanji も配置済み）。objetivo文は各Can-doの `es`（=学習目標そのもの）から「Hoy podrás {es先頭小文字}.」を自動導出。一人称/体言止めの5件（u1_c10,u2_c10,u2_c3,u3_c2,u3_c3）のみ手動調整。挿入は冪等スクリプトで実施（`blocks:` 正規表現マッチ→直後に差し込み・既存objetivoはskip）。

ロードマップ関数: `renderRoadmap()` / `getUnitScore(keys)` / `getUnitCanDoScore(unitId)` / `candosForUnit(unitId)` / `getKanjiProgress(chars)` / `navigateToUnit(section, tab)`

配置テスト判定（推奨ユニット名は `showPlacementResult` が `roadmapUnits` から動的取得＝名称ドリフト防止・2026-07-08）:
- 12〜15問正解 → Pre-intermedio → Unit 9推奨（＝Describir con adjetivos。再構成前は「Familia y personas」だった）
- 8〜11問正解 → Básico-intermedio → Unit 5推奨（Lugares y direcciones）
- 0〜7問正解 → Básico → Unit 1推奨（Hiragana）

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
- ~~`taReorderPool` の `use:'hou'` エントリが2重~~ → **2026-07-06 修正済み**（重複8件削除）
- **`canUse()`/`consume()` の実接続（WS8完了・2026-07-10）**: `practice.unlimited`（openPracticeView・無料10/日・counter `practiceCount`）／ `listening.practice`（startEscucharPart・無料3/日・`listeningPractice`）／ `lectura.drill`（startLecturaDrill・無料1/日・`lecturaDrill`・WS5）／ `jlpt.mock`（startJlptTest・Premium限定 blocked）。**`challenge.realtime`（Reto）は canUse ではなく専用 `checkChallengeQuota()`（週1・`nm_challenge_quota`）で接続**（canUse は weekly を解さない）。ブロック時は全て `renderGateUpsell(containerId, {...})` でPremium導線＋教師コード入力を描画。**死にゲート**（reading.simulacro/listening.simulacro/analytics.weakness/phrases.dict/reading.practice/scenario.audio）は FEATURE_GATES 内でコメント休眠（対応機能なし・scenario.audioは音声無料方針で恒久撤去）。isPremium() 直呼びは Escuchar dictado と教師コード解放。**教師コード** = `TEACHER_CODE_HASHES`（SHA-256）に一致で180日Premium。コード追加/変更は `printf '%s' 'CODE' | sha256sum` のハッシュを配列に追記/差し替え（平文は置かない）
- **プラン検証（L5簡易・WS8）**: `verifyPlanWithServer()`＋`mergePlanFromServer(serverPlan)`。ログイン時 `loadProgressFromCloud` が Firestore `users/{uid}.plan` を読み nm_plan へマージ（**期限が遠い方を採用**＝サーバの手動付与を受け取りつつ、教師コード起源 `source:'teacher_code'` はサーバに無くても保護）。localStorage の nm_plan 改ざんはログイン時サーバ値で上書きされる（完全な改ざん防止=L5完全版はセキュリティルール）
- **nm_* コア進捗の Firestore 同期（WS9完了・2026-07-10）**: `saveProgressToCloud()` が `users/{uid}.nm={xp,streak,cando,jlpt}` を `set({merge:true})` で保存（`nmBuildSyncPayload()`）。書込トリガは grantXP/saveCanDoProgress/showJlptResults の後に `scheduleCloudSave()`（**3秒デバウンス・過剰write抑制**・未ログイン即return）。既存 saveScore/toggleLearned の即時 `saveProgressToCloud` にも nm が相乗り。読込は `loadProgressFromCloud` → `mergeNmFromServer(data.nm)`。**マージ規則**（`NM_MERGE_START`〜`NM_MERGE_END` の純粋関数・[A19]/T22で全数検証）: xp.total=max（当日todayはローカル優先）／streak.longest=max・current/lastActiveDateは新しい日付の端末／cando は status(done>inprogress>available)・数値max・bool/xpAwardedはOR（**初回満額XPの二重付与防止**）・片方のみのIDも取込／jlpt passedOnce=OR・bestScore=max。`server` falsy（未書込）なら local を返し**初回ログインで退行しない**。⚠️ **XPは加算ログが無くmax採用のため多端末で別々に稼いだ分は合算されない**（多い方が残る・MVP既知の限界）。**`nm_daily`/`nm_challenge_quota` は意図的に非同期**（日次/週次リセットとの二重管理回避・ユーザー承認済み＝端末を替えると無料枠がリセットされ得るが実害小と判断）。L5完全版のルール草案は `docs/firestore_rules_draft.md`
- `nm_*` の読み出しは `nmSafeParse()` 経由（破損JSON耐性・2026-07-06導入）。ただし `chizu_scores`/`learnedChars`/`chizu_placement` は直 `JSON.parse` が残っている（index.html:1935 ほか）
- 料金モーダル `openPlansModal()`（WS8で2枚化: Gratis / Premium Bs.60）: 「Elegir Premium」＝`openWhatsAppPlan()`（wa.me 手動決済MVP）。機能表は実装と整合済み（audio/trazos は無料表記）。漢字モーダルの書き順ボタンは `openKanjiTrazarFromModal`（無料・実機能）
- Can-do の `practice.items` / `escuchar.items` / `lectura.items` / `lecturaDrillBank` / **`jlptQuestionBank`（WS5）** は **answer:0 のまま書いてよい**（`openPracticeView`/`startEscucharPart`/`startLecturaPart`/`startLecturaDrill`/`startJlptTest` が描画時に選択肢をシャッフルして answer を追従させる）。データ側で正解位置を手動分散させる必要なし。**lectura 系の explainEs は全問必須**（[A18] が FAIL にする）
- **漢字Can-do（u3_kanji〜u10_kanji）の practice explainEs は `scripts/gen_kanji_explain.js`（冪等）で機械生成**（読み/意味データから導出）。データ追加時は再実行（既存はskip）。u10系の手書き90問は **WS6で完了**（冪等 `scripts/gen_u10_explain.js`・u8t_kanji は最初から手書きexplainEs入り）
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

### 🔜 残タスク（2026-07-06 監査で実態更新・優先順）

**🔴 launch blocker（販売開始前に必須）**
| # | 内容 | 現状（根拠） | 規模 |
|---|---|---|---|
| ~~L1~~ | ~~決済＝WhatsApp手動MVP~~ **✅完了（WS8・2026-07-10）**: 「Elegir Premium」→ `openWhatsAppPlan()` が wa.me deeplink（定型文=プラン名＋ログインメール・URLエンコード確認済み）。管理者手順は `docs/plan_activation_manual.md`（Firebase Console で `users/{uid}.plan={tier,expiresAt(ISO),source:'whatsapp'}` を手動付与） | — |
| ~~L2~~ | ~~料金モーダルの嘘~~ **✅完了（WS8）**: プラン2枚化（Gratis / Premium Bs.60）。audio/trazos の❌行を撤去し、接続済みゲート（練習10/日・聴解3/日・模試Premium限定・lectura 1/日）を反映。漢字モーダルの偽ロックは**実機能化**（`openKanjiTrazarFromModal` で moji/kanji Trazar へ・無料・kanjiStrokes 有りのみ表示） | — |
| ~~L3~~ | ~~FEATURE_GATES 休眠~~ **✅完了（WS8）**: `practice.unlimited`(openPracticeView・10/日)・`listening.practice`(startEscucharPart・3/日)・`jlpt.mock`(startJlptTest・Premium限定)・`challenge.realtime`(openChallengeView→checkChallengeQuota・週1)を接続。死にゲート5個は休眠コメント化。全てアップセル＋教師コード導線（`renderGateUpsell` 汎用化） | — |
| ~~L4~~ | ~~nm_*（XP/streak/Can-do進捗）の Firestore 同期~~ **✅完了（WS9・2026-07-10）**: `nm_xp`/`nm_streak`/`nm_cando_progress`/`nm_jlpt` を `users/{uid}.nm` に同期。純粋マージ関数（退行なし・単調増加・二重満額XP防止=xpAwarded OR）＋ `mergeNmFromServer`（ログイン時読込マージ）＋ `scheduleCloudSave`（grantXP/saveCanDoProgress/showJlptResults 後に3秒デバウンス）。`nm_daily`/`nm_challenge_quota` は同期スコープ外（ユーザー承認）。回帰 [A19]（静的15）／T22（E2E）。**⚠️残: 実機ログインでの往復＋デバウンス確認（Stage 4）はユーザー実施** | — |
| ~~L5簡易~~ | ~~nm_plan サーバ検証~~ **✅完了（WS8簡易版）**: `verifyPlanWithServer()`＋`mergePlanFromServer()` 実装。ログイン時 Firestore `users/{uid}.plan` を読み nm_plan へマージ（期限が遠い方採用・教師コード起源は保護）。localStorage 改ざんはログイン時サーバ値で上書き。**L5完全版**（Firestoreセキュリティルールでの改ざん防止・削除即時反映）はL4と同時実施が残 | 完全版=中 |

**🟡 品質・コンテンツ**
| # | 内容 | 現状 | 規模 |
|---|---|---|---|
| Q1 | 音声 .opus 生成（VOICEVOX or ユーザー録音・ffmpeg） | manifest **520行**（364シーン+156Escuchar）/ 生成 0件（TTSフォールバックで動作中）。**WS5**: 録音リスト `docs/grabacion_lista.md` 出力済み・Escuchar も `audio/{id}_esc{n}.opus` で自動切替対応 | ユーザー作業 |
| Q2 | Reto 実機STT検証（マイク・Web Speech認識） | 採点ロジックは回帰 pass済み | 小 |
| Q3 | 語彙拡充 520→600〜800語 | 実カウント 524語/20カテゴリ | Opus（WS7） |
| Q4 | Can-do完了時の達成演出（現状 無演出でロードマップへ戻るだけ） | `completeCandoDone()` | 小 |
| ~~Q5~~ | ~~🔊/ヒントボタンのタップターゲット拡大（28px→44px）~~ | **✅完了（WS5）**: `.btn-speak`/`.btn-hint` に 44px の `::after` 当たり判定（見た目28px維持）。E2Eで computed 44px 確認 | — |
| ~~Q6~~ | ~~u10系 practice.items へ explainEs 追加~~ | **✅完了（WS6・2026-07-10）**: u10_c1/c2/c3/c4/c5/c8 の90問（reorder含む）に追記（冪等 `scripts/gen_u10_explain.js`）。hidden の u10_c6/c7 のみ未付与（対象外） | — |
| ~~Q7~~ | ~~読解モジュール~~ | **✅完了（2026-07-09）**: (A) Can-doフロー組込 lectura 9本×4問（まとめ8本＋u8t_c4）＋ (B) JLPTドリル `lecturaDrillBank` 12パッセージ17問。回帰 [A18]/T15/T16 追加・16/16 pass・モバイル375px確認済み | — |

**⚪ 保留・要判断**
| # | 内容 | 備考 |
|---|---|---|
| 11 | admin.html + Claude API シナリオ自動生成 | admin.html 不存在。Unit1-10コンテンツ完成済みのため優先度低下 |
| 14 | OpenAI Realtime PoC | **保留のまま残す**（2026-07-08 ユーザー確認済み。将来のPremium差別化候補。今は着手しない） |

### 🟢 バックエンド（2026-07-06 監査: 大半が実装済みと判明）
| 項目 | 状態 |
|---|---|
| Googleログインボタン | ✅ 実装済み（index.html:1491 UI + signInWithGoogle） |
| パスワードリセット | ✅ 実装済み（reset-view UI + sendPasswordResetEmail） |
| 利用規約・プライバシーポリシー | ✅ 実装済み（showLegal モーダル・スペイン語） |
| Firestore進捗保存 | ⚠️ 部分実装: chizu_scores + learnedChars のみ（save/load・maxマージ）。nm_* は未同期（→L4） |

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
