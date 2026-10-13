/* ============================================================================
 * NihongoMap — 会話練習（Reto）台本データ
 * 生成: Opus（O-1 国名リスト + O-2 Unit1-2-3 各3会話=9本）
 * ----------------------------------------------------------------------------
 * 【Sonnet向け 統合メモ】
 * - このファイルは index.html の <script> 末尾（canDoData 定義より後）に貼るか、
 *   <script src="data/conversation_scripts.js"></script> で読み込む。
 * - 会話エンジン（openChallengeView 作り替え）は currentCanDoId から
 *   window.NM_SCRIPTS[currentCanDoId] を読み、無ければ従来プレースホルダー表示。
 * - 1 step = 「AIのセリフ1つ → ユーザーの返答1つ」。
 * - ユーザー返答の照合 scoreChallengeResponse(input, expect):
 *     1) normalizeJa() で ルビ除去・空白/句読点除去・全半角統一。
 *     2) expect.dynamic === "name"    → 正規化入力が「です」で終わる(=何か名前+です)なら正解。
 *        expect.dynamic === "country" → 正規化入力が nm_profile.countryJa を含む、
 *                                       または window.COUNTRY_JA の値いずれかを含むなら正解。
 *        それ以外 → expect.accept のいずれか、または expect.jaPlain を含むなら正解。
 * - プレースホルダー（AIセリフ・closing内）: {name} {country} {countryJa} を
 *   nm_profile（S-7で収集）から置換。未設定時は {name}→"", {countryJa}→"" の安全置換。
 * - 各会話 = challenge.scripts[i] 相当。1本クリアでCan-do達成可、3本コンプで★3。
 * ========================================================================== */

/* ---------- O-1: 国名リスト（スペイン語キー[小文字・アクセント無し] → 日本語） ----------
 * country ターンの照合と、出身国の保存・表示に使用。
 * nm_profile.country（スペイン語表示用） / nm_profile.countryJa（日本語照合用）。 */
window.COUNTRY_JA = {
  "bolivia": "ボリビア",
  "argentina": "アルゼンチン",
  "peru": "ペルー",
  "chile": "チリ",
  "brasil": "ブラジル",
  "paraguay": "パラグアイ",
  "uruguay": "ウルグアイ",
  "colombia": "コロンビア",
  "ecuador": "エクアドル",
  "venezuela": "ベネズエラ",
  "mexico": "メキシコ",
  "guatemala": "グアテマラ",
  "honduras": "ホンジュラス",
  "nicaragua": "ニカラグア",
  "costa rica": "コスタリカ",
  "panama": "パナマ",
  "el salvador": "エルサルバドル",
  "republica dominicana": "ドミニカきょうわこく",
  "cuba": "キューバ",
  "puerto rico": "プエルトリコ",
  "espana": "スペイン",
  "estados unidos": "アメリカ",
  "canada": "カナダ",
  "francia": "フランス",
  "italia": "イタリア",
  "alemania": "ドイツ",
  "reino unido": "イギリス",
  "inglaterra": "イギリス",
  "portugal": "ポルトガル",
  "rusia": "ロシア",
  "china": "ちゅうごく",
  "japon": "にほん",
  "corea": "かんこく",
  "corea del sur": "かんこく",
  "filipinas": "フィリピン",
  "india": "インド",
  "australia": "オーストラリア",
  "nueva zelanda": "ニュージーランド",
  "tailandia": "タイ",
  "vietnam": "ベトナム"
};

/* ---------- O-2: 台本データ ----------
 * scripts[canDoId] = [ {settingEs, closingJa, closingEs, steps:[...]}, ... ]
 * step = { ai:{ja,jaPlain,romaji,es}, task, expect:{ja,jaPlain,romaji,es,accept,dynamic} } */
window.NM_SCRIPTS = {

  /* ===================== Unit 1: あいさつ + 感謝 + 別れ ===================== */
  "u1_c1": [
    /* 会話1 — 場面: 学校（朝・先生） */
    {
      settingEs: "Es tu primer día en una clase de japonés. Saluda a tu profesora por la mañana.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "おはようございます。", jaPlain: "おはようございます。", romaji: "Ohayou gozaimasu.", es: "Buenos días." },
          task: "Saluda por la mañana (formal).",
          expect: { ja: "おはようございます。", jaPlain: "おはようございます。", romaji: "Ohayou gozaimasu.", es: "Buenos días.", accept: ["おはよう"], dynamic: null }
        },
        {
          ai: { ja: "きょうから いっしょに べんきょうしましょう。", jaPlain: "きょうから いっしょに べんきょうしましょう。", romaji: "Kyou kara issho ni benkyou shimashou.", es: "Estudiemos juntos desde hoy." },
          task: "Da las gracias (formal).",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        },
        {
          ai: { ja: "では、また あした。", jaPlain: "では、また あした。", romaji: "Dewa, mata ashita.", es: "Entonces, hasta mañana." },
          task: "Despídete.",
          expect: { ja: "さようなら。", jaPlain: "さようなら。", romaji: "Sayounara.", es: "Adiós.", accept: ["またあした", "また あした", "しつれいします"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 場面: 公園（昼・友達・カジュアル） */
    {
      settingEs: "Te encuentras con un amigo en el parque por la tarde.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "こんにちは！", jaPlain: "こんにちは！", romaji: "Konnichiwa!", es: "¡Hola!" },
          task: "Saluda (buenas tardes / hola).",
          expect: { ja: "こんにちは。", jaPlain: "こんにちは。", romaji: "Konnichiwa.", es: "Hola.", accept: ["こんにちは！", "やあ"], dynamic: null }
        },
        {
          ai: { ja: "これ、どうぞ。", jaPlain: "これ、どうぞ。", romaji: "Kore, douzo.", es: "Toma, esto es para ti." },
          task: "Agradece de forma casual.",
          expect: { ja: "ありがとう。", jaPlain: "ありがとう。", romaji: "Arigatou.", es: "Gracias.", accept: ["ありがとうございます", "どうも"], dynamic: null }
        },
        {
          ai: { ja: "じゃあ、またね。", jaPlain: "じゃあ、またね。", romaji: "Jaa, mata ne.", es: "Bueno, nos vemos." },
          task: "Despídete de forma casual.",
          expect: { ja: "またね。", jaPlain: "またね。", romaji: "Mata ne.", es: "Nos vemos.", accept: ["じゃあね", "バイバイ", "また", "じゃあ"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 場面: 近所（夜・ていねい） */
    {
      settingEs: "Te encuentras con un vecino por la noche.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "こんばんは。", jaPlain: "こんばんは。", romaji: "Konbanwa.", es: "Buenas noches." },
          task: "Saluda de noche.",
          expect: { ja: "こんばんは。", jaPlain: "こんばんは。", romaji: "Konbanwa.", es: "Buenas noches.", accept: ["こんばんは！"], dynamic: null }
        },
        {
          ai: { ja: "これ、おみやげです。どうぞ。", jaPlain: "これ、おみやげです。どうぞ。", romaji: "Kore, omiyage desu. Douzo.", es: "Es un recuerdo, tómalo." },
          task: "Agradece cortésmente.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        },
        {
          ai: { ja: "では、おやすみなさい。", jaPlain: "では、おやすみなさい。", romaji: "Dewa, oyasumi nasai.", es: "Bueno, que descanses." },
          task: "Desea buenas noches al despedirte.",
          expect: { ja: "おやすみなさい。", jaPlain: "おやすみなさい。", romaji: "Oyasumi nasai.", es: "Buenas noches (al dormir).", accept: ["おやすみ"], dynamic: null }
        }
      ]
    }
  ],

  /* ===== Unit 1 代表②: ひらがな総まとめ — 「おげんきですか」の挨拶ラリー ===== */
  "u1_c10": [
    /* 会話1 — 友達と道で（昼・カジュアル） */
    {
      settingEs: "Te encuentras con un amigo en la calle por la tarde.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "こんにちは！おげんきですか？", jaPlain: "こんにちは！おげんきですか？", romaji: "Konnichiwa! Ogenki desu ka?", es: "¡Hola! ¿Cómo estás?" },
          task: "Saluda y di que estás bien.",
          expect: { ja: "はい、げんきです。", jaPlain: "はい、げんきです。", romaji: "Hai, genki desu.", es: "Sí, estoy bien.", accept: ["げんきです", "はいげんきです"], dynamic: null }
        },
        {
          ai: { ja: "よかった！これ、どうぞ。", jaPlain: "よかった！これ、どうぞ。", romaji: "Yokatta! Kore, douzo.", es: "¡Qué bien! Toma, esto es para ti." },
          task: "Agradece de forma casual.",
          expect: { ja: "ありがとう。", jaPlain: "ありがとう。", romaji: "Arigatou.", es: "Gracias.", accept: ["ありがとうございます", "どうも"], dynamic: null }
        },
        {
          ai: { ja: "じゃあ、またね。", jaPlain: "じゃあ、またね。", romaji: "Jaa, mata ne.", es: "Bueno, nos vemos." },
          task: "Despídete de forma casual.",
          expect: { ja: "またね。", jaPlain: "またね。", romaji: "Mata ne.", es: "Nos vemos.", accept: ["じゃあね", "バイバイ", "また"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 先生に朝（ていねい） */
    {
      settingEs: "Saludas a tu profesora al llegar a clase por la mañana.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "おはようございます。おげんきですか？", jaPlain: "おはようございます。おげんきですか？", romaji: "Ohayou gozaimasu. Ogenki desu ka?", es: "Buenos días. ¿Cómo está?" },
          task: "Saluda (mañana) y di que estás bien.",
          expect: { ja: "はい、げんきです。", jaPlain: "はい、げんきです。", romaji: "Hai, genki desu.", es: "Sí, estoy bien.", accept: ["げんきです", "おはようございます"], dynamic: null }
        },
        {
          ai: { ja: "きょうも がんばりましょう。", jaPlain: "きょうも がんばりましょう。", romaji: "Kyou mo ganbarimashou.", es: "Esforcémonos también hoy." },
          task: "Responde con ánimo y agradece.",
          expect: { ja: "はい、ありがとうございます。", jaPlain: "はい、ありがとうございます。", romaji: "Hai, arigatou gozaimasu.", es: "Sí, muchas gracias.", accept: ["ありがとうございます", "はい", "がんばります"], dynamic: null }
        },
        {
          ai: { ja: "では、また あした。", jaPlain: "では、また あした。", romaji: "Dewa, mata ashita.", es: "Entonces, hasta mañana." },
          task: "Despídete (formal).",
          expect: { ja: "さようなら。", jaPlain: "さようなら。", romaji: "Sayounara.", es: "Adiós.", accept: ["またあした", "また あした", "しつれいします"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 近所の人と（昼・久しぶり） */
    {
      settingEs: "Te encuentras con un vecino al que no veías hace tiempo.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "こんにちは。おひさしぶりです。", jaPlain: "こんにちは。おひさしぶりです。", romaji: "Konnichiwa. Ohisashiburi desu.", es: "Hola. Cuánto tiempo." },
          task: "Devuelve el saludo.",
          expect: { ja: "こんにちは。", jaPlain: "こんにちは。", romaji: "Konnichiwa.", es: "Hola.", accept: ["おひさしぶりです", "こんにちは！"], dynamic: null }
        },
        {
          ai: { ja: "おげんきですか？", jaPlain: "おげんきですか？", romaji: "Ogenki desu ka?", es: "¿Cómo está?" },
          task: "Di que estás bien.",
          expect: { ja: "はい、げんきです。", jaPlain: "はい、げんきです。", romaji: "Hai, genki desu.", es: "Sí, estoy bien.", accept: ["げんきです", "はい"], dynamic: null }
        },
        {
          ai: { ja: "では、おげんきで。さようなら。", jaPlain: "では、おげんきで。さようなら。", romaji: "Dewa, ogenki de. Sayounara.", es: "Bueno, cuídese. Adiós." },
          task: "Despídete.",
          expect: { ja: "さようなら。", jaPlain: "さようなら。", romaji: "Sayounara.", es: "Adiós.", accept: ["また", "しつれいします"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 2: 謝罪 + 感謝 + 国名（過去形は未習なので不使用） ===================== */
  "u2_c1": [
    /* 会話1 — 場面: パーティー会場（足を踏む→落とし物） */
    {
      settingEs: "En una fiesta llena de gente, sin querer pisas a alguien y luego se te cae algo.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "あ、いたっ。", jaPlain: "あ、いたっ。", romaji: "A, ita'.", es: "¡Ay, eso dolió!" },
          task: "Discúlpate.",
          expect: { ja: "ごめんなさい。", jaPlain: "ごめんなさい。", romaji: "Gomen nasai.", es: "Perdón.", accept: ["すみません", "ごめん", "すいません"], dynamic: null }
        },
        {
          ai: { ja: "いいえ、だいじょうぶです。あ、どうぞ。", jaPlain: "いいえ、だいじょうぶです。あ、どうぞ。", romaji: "Iie, daijoubu desu. A, douzo.", es: "No, está bien. Ah, toma (te recoge algo)." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        },
        {
          ai: { ja: "どういたしまして。おくには どこですか？", jaPlain: "どういたしまして。おくには どこですか？", romaji: "Dou itashimashite. Okuni wa doko desu ka?", es: "De nada. ¿De qué país eres?" },
          task: "Di tu país de origen (… です).",
          expect: { ja: "{countryJa}です。", jaPlain: "{countryJa}です。", romaji: "... desu.", es: "Soy de … (tu país).", accept: [], dynamic: "country" }
        }
      ]
    },
    /* 会話2 — 場面: 駅でぶつかる */
    {
      settingEs: "En la estación, chocas con alguien por accidente.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "（ドン）あっ、すみません。", jaPlain: "あっ、すみません。", romaji: "(Don) A', sumimasen.", es: "(Choque) ¡Ah, disculpe!" },
          task: "Discúlpate tú también.",
          expect: { ja: "すみません。", jaPlain: "すみません。", romaji: "Sumimasen.", es: "Disculpe / perdón.", accept: ["ごめんなさい", "ごめん", "いいえ"], dynamic: null }
        },
        {
          ai: { ja: "だいじょうぶですか？", jaPlain: "だいじょうぶですか？", romaji: "Daijoubu desu ka?", es: "¿Está bien?" },
          task: "Di que estás bien y agradece.",
          expect: { ja: "だいじょうぶです。ありがとうございます。", jaPlain: "だいじょうぶです。ありがとうございます。", romaji: "Daijoubu desu. Arigatou gozaimasu.", es: "Estoy bien. Gracias.", accept: ["だいじょうぶです", "ありがとうございます", "ありがとう"], dynamic: null }
        },
        {
          ai: { ja: "よかったです。おくには どこですか？", jaPlain: "よかったです。おくには どこですか？", romaji: "Yokatta desu. Okuni wa doko desu ka?", es: "Me alegro. ¿De qué país eres?" },
          task: "Di tu país de origen (… です).",
          expect: { ja: "{countryJa}です。", jaPlain: "{countryJa}です。", romaji: "... desu.", es: "Soy de … (tu país).", accept: [], dynamic: "country" }
        }
      ]
    },
    /* 会話3 — 場面: お店で商品を落とす */
    {
      settingEs: "En una tienda, sin querer tiras un producto y el empleado te ayuda.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。", jaPlain: "いらっしゃいませ。", romaji: "Irasshaimase.", es: "Bienvenido (a la tienda)." },
          task: "Se te cayó algo: discúlpate.",
          expect: { ja: "すみません。", jaPlain: "すみません。", romaji: "Sumimasen.", es: "Disculpe.", accept: ["ごめんなさい", "ごめん"], dynamic: null }
        },
        {
          ai: { ja: "だいじょうぶですよ。はい、どうぞ。", jaPlain: "だいじょうぶですよ。はい、どうぞ。", romaji: "Daijoubu desu yo. Hai, douzo.", es: "No pasa nada. Aquí tiene." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        },
        {
          ai: { ja: "おくには どこからですか？", jaPlain: "おくには どこからですか？", romaji: "Okuni wa doko kara desu ka?", es: "¿De dónde es usted?" },
          task: "Di tu país de origen (… です).",
          expect: { ja: "{countryJa}です。", jaPlain: "{countryJa}です。", romaji: "... desu.", es: "Soy de … (tu país).", accept: [], dynamic: "country" }
        }
      ]
    }
  ],

  /* ===== Unit 2 代表②: カタカナ総まとめ — 外来語で注文（を は accept で許容） ===== */
  "u2_c10": [
    /* 会話1 — カフェ */
    {
      settingEs: "Pides algo en una cafetería usando palabras en katakana.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。ごちゅうもんは？", jaPlain: "いらっしゃいませ。ごちゅうもんは？", romaji: "Irasshaimase. Gochuumon wa?", es: "Bienvenido. ¿Qué desea ordenar?" },
          task: "Pide un café (… ください).",
          expect: { ja: "コーヒーください。", jaPlain: "コーヒーください。", romaji: "Koohii kudasai.", es: "Un café, por favor.", accept: ["コーヒーをください", "コーヒー"], dynamic: null }
        },
        {
          ai: { ja: "はい。ケーキは いかがですか？", jaPlain: "はい。ケーキは いかがですか？", romaji: "Hai. Keeki wa ikaga desu ka?", es: "Bien. ¿Le apetece un pastel?" },
          task: "Pide también un pastel.",
          expect: { ja: "ケーキもください。", jaPlain: "ケーキもください。", romaji: "Keeki mo kudasai.", es: "También un pastel, por favor.", accept: ["ケーキください", "ケーキをください", "はい", "ケーキ"], dynamic: null }
        },
        {
          ai: { ja: "かしこまりました。", jaPlain: "かしこまりました。", romaji: "Kashikomarimashita.", es: "Entendido." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    },
    /* 会話2 — ファストフード店 */
    {
      settingEs: "Pides en un local de comida rápida.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。", jaPlain: "いらっしゃいませ。", romaji: "Irasshaimase.", es: "Bienvenido." },
          task: "Pide un jugo (… ください).",
          expect: { ja: "ジュースください。", jaPlain: "ジュースください。", romaji: "Juusu kudasai.", es: "Un jugo, por favor.", accept: ["ジュースをください", "ジュース"], dynamic: null }
        },
        {
          ai: { ja: "アイスは いかがですか？", jaPlain: "アイスは いかがですか？", romaji: "Aisu wa ikaga desu ka?", es: "¿Le apetece un helado?" },
          task: "Di que sí y pide un helado.",
          expect: { ja: "アイスもください。", jaPlain: "アイスもください。", romaji: "Aisu mo kudasai.", es: "También un helado, por favor.", accept: ["アイスください", "アイスをください", "はい", "アイス"], dynamic: null }
        },
        {
          ai: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias." },
          task: "Agradece tú también.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    },
    /* 会話3 — パン屋・コンビニ */
    {
      settingEs: "Compras en una panadería o tienda de conveniencia.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。", jaPlain: "いらっしゃいませ。", romaji: "Irasshaimase.", es: "Bienvenido." },
          task: "Pide pan (… ください).",
          expect: { ja: "パンください。", jaPlain: "パンください。", romaji: "Pan kudasai.", es: "Pan, por favor.", accept: ["パンをください", "パン"], dynamic: null }
        },
        {
          ai: { ja: "のみものは いかがですか？", jaPlain: "のみものは いかがですか？", romaji: "Nomimono wa ikaga desu ka?", es: "¿Algo de beber?" },
          task: "Pide una cola/refresco.",
          expect: { ja: "コーラください。", jaPlain: "コーラください。", romaji: "Koora kudasai.", es: "Una cola, por favor.", accept: ["コーラをください", "コーラ", "ジュースください"], dynamic: null }
        },
        {
          ai: { ja: "ありがとうございました。", jaPlain: "ありがとうございました。", romaji: "Arigatou gozaimashita.", es: "Muchas gracias (por su compra)." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 3: 自己紹介（名前・国・よろしく） ===================== */
  "u3_c1": [
    /* 会話1 — 場面: 日本語クラス初日（先生） */
    {
      settingEs: "Es tu primer día en una clase de japonés en Tokio. Preséntate ante la profesora.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "はじめまして。わたしは やまだです。おなまえは？", jaPlain: "はじめまして。わたしは やまだです。おなまえは？", romaji: "Hajimemashite. Watashi wa Yamada desu. Onamae wa?", es: "Mucho gusto. Soy Yamada. ¿Cómo te llamas?" },
          task: "Di tu nombre (… です).",
          expect: { ja: "{name}です。", jaPlain: "{name}です。", romaji: "... desu.", es: "Soy … (tu nombre).", accept: ["わたしは"], dynamic: "name" }
        },
        {
          ai: { ja: "{name}さんですね。ごしゅっしんは どちらですか？", jaPlain: "{name}さんですね。ごしゅっしんは どちらですか？", romaji: "{name}-san desu ne. Goshusshin wa dochira desu ka?", es: "{name}, ¿verdad? ¿De dónde eres?" },
          task: "Di tu nacionalidad o país (… じん です / … です).",
          expect: { ja: "{countryJa}です。", jaPlain: "{countryJa}です。", romaji: "... desu.", es: "Soy de … (tu país).", accept: [], dynamic: "country" }
        },
        {
          ai: { ja: "そうですか。どうぞ よろしく。", jaPlain: "そうですか。どうぞ よろしく。", romaji: "Sou desu ka. Douzo yoroshiku.", es: "Ah, ya veo. Encantada." },
          task: "Responde el saludo de cortesía.",
          expect: { ja: "よろしく おねがいします。", jaPlain: "よろしく おねがいします。", romaji: "Yoroshiku onegai shimasu.", es: "Mucho gusto / encantado.", accept: ["こちらこそ", "よろしく"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 場面: パーティーで同年代の人と（職業） */
    {
      settingEs: "En una fiesta conoces a alguien de tu edad. Preséntate y di tu ocupación.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "はじめまして。たなかです。", jaPlain: "はじめまして。たなかです。", romaji: "Hajimemashite. Tanaka desu.", es: "Mucho gusto. Soy Tanaka." },
          task: "Preséntate con tu nombre (… です).",
          expect: { ja: "{name}です。", jaPlain: "{name}です。", romaji: "... desu.", es: "Soy … (tu nombre).", accept: ["はじめまして", "わたしは"], dynamic: "name" }
        },
        {
          ai: { ja: "{name}さんですか。おしごとは なんですか？", jaPlain: "{name}さんですか。おしごとは なんですか？", romaji: "{name}-san desu ka. Oshigoto wa nan desu ka?", es: "¿{name}? ¿A qué te dedicas?" },
          task: "Di tu ocupación (p. ej. soy estudiante: がくせいです).",
          expect: { ja: "がくせいです。", jaPlain: "がくせいです。", romaji: "Gakusei desu.", es: "Soy estudiante.", accept: ["せんせいです", "かいしゃいんです", "いしゃです", "です"], dynamic: null }
        },
        {
          ai: { ja: "そうですか。よろしく おねがいします。", jaPlain: "そうですか。よろしく おねがいします。", romaji: "Sou desu ka. Yoroshiku onegai shimasu.", es: "Ya veo. Encantado." },
          task: "Responde el saludo de cortesía.",
          expect: { ja: "よろしく おねがいします。", jaPlain: "よろしく おねがいします。", romaji: "Yoroshiku onegai shimasu.", es: "Encantado / igualmente.", accept: ["こちらこそ", "よろしく"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 場面: 会社・オフィス（同僚／国） */
    {
      settingEs: "Tu primer día en una oficina. Te presentas ante un compañero.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "はじめまして。すずきです。", jaPlain: "はじめまして。すずきです。", romaji: "Hajimemashite. Suzuki desu.", es: "Mucho gusto. Soy Suzuki." },
          task: "Di tu nombre (… です).",
          expect: { ja: "{name}です。", jaPlain: "{name}です。", romaji: "... desu.", es: "Soy … (tu nombre).", accept: ["はじめまして", "わたしは"], dynamic: "name" }
        },
        {
          ai: { ja: "{name}さんは おくには どこですか？", jaPlain: "{name}さんは おくには どこですか？", romaji: "{name}-san wa okuni wa doko desu ka?", es: "{name}, ¿de qué país eres?" },
          task: "Di tu país de origen (… です).",
          expect: { ja: "{countryJa}です。", jaPlain: "{countryJa}です。", romaji: "... desu.", es: "Soy de … (tu país).", accept: [], dynamic: "country" }
        },
        {
          ai: { ja: "いいですね。よろしく おねがいします。", jaPlain: "いいですね。よろしく おねがいします。", romaji: "Ii desu ne. Yoroshiku onegai shimasu.", es: "Qué bien. Encantado." },
          task: "Responde el saludo de cortesía.",
          expect: { ja: "よろしく おねがいします。", jaPlain: "よろしく おねがいします。", romaji: "Yoroshiku onegai shimasu.", es: "Encantado / igualmente.", accept: ["こちらこそ", "よろしく"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 3 c2: 職業（〜です / 〜じゃありません） ===================== */
  "u3_c2": [
    /* 会話1 — パーティーで職業を尋ねられ、訂正する */
    {
      settingEs: "En una fiesta te preguntan a qué te dedicas; corriges un malentendido.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "はじめまして。おしごとは なんですか？", jaPlain: "はじめまして。おしごとは なんですか？", romaji: "Hajimemashite. Oshigoto wa nan desu ka?", es: "Mucho gusto. ¿A qué te dedicas?" },
          task: "Di tu profesión (estudiante: がくせい).",
          expect: { ja: "がくせいです。", jaPlain: "がくせいです。", romaji: "Gakusei desu.", es: "Soy estudiante.", accept: ["わたしはがくせいです", "です"], dynamic: null }
        },
        {
          ai: { ja: "えっ、せんせいですか？", jaPlain: "えっ、せんせいですか？", romaji: "E', sensei desu ka?", es: "¿Eh? ¿Eres profesor/a?" },
          task: "Niega: no soy profesor (… じゃありません).",
          expect: { ja: "せんせいじゃありません。", jaPlain: "せんせいじゃありません。", romaji: "Sensei ja arimasen.", es: "No soy profesor/a.", accept: ["いいえ、せんせいじゃありません", "ちがいます", "じゃありません"], dynamic: null }
        },
        {
          ai: { ja: "ああ、すみません。がくせいですね。", jaPlain: "ああ、すみません。がくせいですね。", romaji: "Aa, sumimasen. Gakusei desu ne.", es: "Ah, perdón. Eres estudiante." },
          task: "Confirma (sí, así es).",
          expect: { ja: "はい、そうです。", jaPlain: "はい、そうです。", romaji: "Hai, sou desu.", es: "Sí, así es.", accept: ["はい", "そうです"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 職場で（会社員じゃありません） */
    {
      settingEs: "En el trabajo alguien se equivoca con tu ocupación.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "こんにちは。おしごとは なんですか？", jaPlain: "こんにちは。おしごとは なんですか？", romaji: "Konnichiwa. Oshigoto wa nan desu ka?", es: "Hola. ¿A qué te dedicas?" },
          task: "Di tu profesión (médico/a: いしゃ).",
          expect: { ja: "いしゃです。", jaPlain: "いしゃです。", romaji: "Isha desu.", es: "Soy médico/a.", accept: ["かいしゃいんです", "です"], dynamic: null }
        },
        {
          ai: { ja: "かいしゃいんですか？", jaPlain: "かいしゃいんですか？", romaji: "Kaishain desu ka?", es: "¿Eres empleado/a de empresa?" },
          task: "Niega: no soy empleado de empresa (… じゃありません).",
          expect: { ja: "かいしゃいんじゃありません。", jaPlain: "かいしゃいんじゃありません。", romaji: "Kaishain ja arimasen.", es: "No soy empleado de empresa.", accept: ["いいえ", "ちがいます", "じゃありません"], dynamic: null }
        },
        {
          ai: { ja: "しつれいしました。", jaPlain: "しつれいしました。", romaji: "Shitsurei shimashita.", es: "Disculpa." },
          task: "Responde amablemente (no pasa nada).",
          expect: { ja: "だいじょうぶです。", jaPlain: "だいじょうぶです。", romaji: "Daijoubu desu.", es: "Está bien.", accept: ["いいえ", "だいじょうぶ"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 学校で先生に間違われる */
    {
      settingEs: "En la escuela te confunden con un profesor.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "あなたは せんせいですか？", jaPlain: "あなたは せんせいですか？", romaji: "Anata wa sensei desu ka?", es: "¿Usted es profesor/a?" },
          task: "Niega y di que eres estudiante.",
          expect: { ja: "せんせいじゃありません。がくせいです。", jaPlain: "せんせいじゃありません。がくせいです。", romaji: "Sensei ja arimasen. Gakusei desu.", es: "No soy profesor/a. Soy estudiante.", accept: ["がくせいです", "いいえ", "じゃありません"], dynamic: null }
        },
        {
          ai: { ja: "ああ、がくせいですか。", jaPlain: "ああ、がくせいですか。", romaji: "Aa, gakusei desu ka.", es: "Ah, ¿eres estudiante?" },
          task: "Afirma (sí, soy estudiante).",
          expect: { ja: "はい、がくせいです。", jaPlain: "はい、がくせいです。", romaji: "Hai, gakusei desu.", es: "Sí, soy estudiante.", accept: ["はい", "そうです"], dynamic: null }
        },
        {
          ai: { ja: "べんきょう、がんばって ください。", jaPlain: "べんきょう、がんばって ください。", romaji: "Benkyou, ganbatte kudasai.", es: "Échale ganas a los estudios." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "がんばります"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 3 c3: 年齢（〜さいです） ===================== */
  "u3_c3": [
    /* 会話1 — 受付で名前と年齢 */
    {
      settingEs: "En una recepción te piden tu nombre y tu edad.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "おなまえを おねがいします。", jaPlain: "おなまえを おねがいします。", romaji: "Onamae o onegai shimasu.", es: "Su nombre, por favor." },
          task: "Di tu nombre (… です).",
          expect: { ja: "{name}です。", jaPlain: "{name}です。", romaji: "... desu.", es: "Soy … (tu nombre).", accept: ["わたしは"], dynamic: "name" }
        },
        {
          ai: { ja: "{name}さんですね。なんさいですか？", jaPlain: "{name}さんですね。なんさいですか？", romaji: "{name}-san desu ne. Nansai desu ka?", es: "{name}, ¿verdad? ¿Cuántos años tiene?" },
          task: "Di tu edad (… さいです / はたちです).",
          expect: { ja: "にじゅっさいです。", jaPlain: "にじゅっさいです。", romaji: "Nijussai desu.", es: "Tengo 20 años (ej.).", accept: ["さいです", "はたち", "さい"], dynamic: null }
        },
        {
          ai: { ja: "はい、ありがとうございます。", jaPlain: "はい、ありがとうございます。", romaji: "Hai, arigatou gozaimasu.", es: "Bien, gracias." },
          task: "Responde / agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Gracias.", accept: ["ありがとう", "はい"], dynamic: null }
        }
      ]
    },
    /* 会話2 — パーティーで年齢の雑談 */
    {
      settingEs: "En una fiesta charlan sobre la edad.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "しつれいですが、おいくつですか？", jaPlain: "しつれいですが、おいくつですか？", romaji: "Shitsurei desu ga, oikutsu desu ka?", es: "Disculpa, ¿cuántos años tienes?" },
          task: "Di tu edad (… さいです).",
          expect: { ja: "にじゅっさいです。", jaPlain: "にじゅっさいです。", romaji: "Nijussai desu.", es: "Tengo 20 años (ej.).", accept: ["さいです", "はたち", "さい"], dynamic: null }
        },
        {
          ai: { ja: "えっ、わかいですね！がくせいですか？", jaPlain: "えっ、わかいですね！がくせいですか？", romaji: "E', wakai desu ne! Gakusei desu ka?", es: "¡Qué joven! ¿Eres estudiante?" },
          task: "Afirma (sí, soy estudiante).",
          expect: { ja: "はい、がくせいです。", jaPlain: "はい、がくせいです。", romaji: "Hai, gakusei desu.", es: "Sí, soy estudiante.", accept: ["はい", "がくせいです"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。", jaPlain: "いいですね。", romaji: "Ii desu ne.", es: "Qué bien." },
          task: "Responde / agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Gracias.", accept: ["ありがとう", "はい"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 家族の年齢を話す */
    {
      settingEs: "Hablas de la edad de un hermano y luego de la tuya.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "おとうとさんは なんさいですか？", jaPlain: "おとうとさんは なんさいですか？", romaji: "Otouto-san wa nansai desu ka?", es: "¿Cuántos años tiene tu hermano menor?" },
          task: "Di la edad de tu hermano (… さいです).",
          expect: { ja: "じゅっさいです。", jaPlain: "じゅっさいです。", romaji: "Jussai desu.", es: "Tiene 10 años (ej.).", accept: ["さいです", "さい"], dynamic: null }
        },
        {
          ai: { ja: "そうですか。{name}さんは？", jaPlain: "そうですか。{name}さんは？", romaji: "Sou desu ka. {name}-san wa?", es: "Ya veo. ¿Y tú, {name}?" },
          task: "Di tu edad (… さいです / はたちです).",
          expect: { ja: "にじゅっさいです。", jaPlain: "にじゅっさいです。", romaji: "Nijussai desu.", es: "Tengo 20 años (ej.).", accept: ["さいです", "はたち", "さい"], dynamic: null }
        },
        {
          ai: { ja: "わかいですね。", jaPlain: "わかいですね。", romaji: "Wakai desu ne.", es: "Qué joven." },
          task: "Reacciona / agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Gracias.", accept: ["ありがとう", "そうですか", "はい"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 3 c4: 日課の動作（ます形） ===================== */
  "u3_c4": [
    /* 会話1 — 一日の流れを尋ねられる */
    {
      settingEs: "Te preguntan qué haces durante el día (forma ます).",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "あさ、なにを しますか？", jaPlain: "あさ、なにを しますか？", romaji: "Asa, nani o shimasu ka?", es: "Por la mañana, ¿qué haces?" },
          task: "Di una acción de la mañana (comer: たべます).",
          expect: { ja: "ごはんを たべます。", jaPlain: "ごはんを たべます。", romaji: "Gohan o tabemasu.", es: "Como arroz/comida.", accept: ["たべます", "パンをたべます"], dynamic: null }
        },
        {
          ai: { ja: "そうですか。それから？", jaPlain: "そうですか。それから？", romaji: "Sou desu ka. Sorekara?", es: "Ya veo. ¿Y después?" },
          task: "Di otra acción (estudiar: べんきょうします).",
          expect: { ja: "べんきょうします。", jaPlain: "べんきょうします。", romaji: "Benkyou shimasu.", es: "Estudio.", accept: ["べんきょうします", "いきます"], dynamic: null }
        },
        {
          ai: { ja: "よる、なにを しますか？", jaPlain: "よる、なにを しますか？", romaji: "Yoru, nani o shimasu ka?", es: "Por la noche, ¿qué haces?" },
          task: "Di una acción de la noche (dormir: ねます).",
          expect: { ja: "ねます。", jaPlain: "ねます。", romaji: "Nemasu.", es: "Duermo.", accept: ["ねます", "テレビをみます"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 習慣について */
    {
      settingEs: "Charlan sobre tus hábitos diarios.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "まいにち べんきょうしますか？", jaPlain: "まいにち べんきょうしますか？", romaji: "Mainichi benkyou shimasu ka?", es: "¿Estudias todos los días?" },
          task: "Afirma (sí, estudio).",
          expect: { ja: "はい、べんきょうします。", jaPlain: "はい、べんきょうします。", romaji: "Hai, benkyou shimasu.", es: "Sí, estudio.", accept: ["はい", "べんきょうします"], dynamic: null }
        },
        {
          ai: { ja: "あさ、なにを たべますか？", jaPlain: "あさ、なにを たべますか？", romaji: "Asa, nani o tabemasu ka?", es: "¿Qué comes por la mañana?" },
          task: "Di qué comes (pan: パン).",
          expect: { ja: "パンを たべます。", jaPlain: "パンを たべます。", romaji: "Pan o tabemasu.", es: "Como pan.", accept: ["たべます", "ごはんをたべます"], dynamic: null }
        },
        {
          ai: { ja: "のみものは？", jaPlain: "のみものは？", romaji: "Nomimono wa?", es: "¿Y de beber?" },
          task: "Di qué bebes (agua/café: のみます).",
          expect: { ja: "みずを のみます。", jaPlain: "みずを のみます。", romaji: "Mizu o nomimasu.", es: "Bebo agua.", accept: ["のみます", "コーヒーをのみます"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 健康相談 */
    {
      settingEs: "Un médico te pregunta por tus hábitos.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "あさごはんを たべますか？", jaPlain: "あさごはんを たべますか？", romaji: "Asagohan o tabemasu ka?", es: "¿Desayunas?" },
          task: "Afirma (sí, como).",
          expect: { ja: "はい、たべます。", jaPlain: "はい、たべます。", romaji: "Hai, tabemasu.", es: "Sí, como.", accept: ["はい", "たべます"], dynamic: null }
        },
        {
          ai: { ja: "よく ねますか？", jaPlain: "よく ねますか？", romaji: "Yoku nemasu ka?", es: "¿Duermes bien?" },
          task: "Afirma (sí, duermo bien).",
          expect: { ja: "はい、ねます。", jaPlain: "はい、ねます。", romaji: "Hai, nemasu.", es: "Sí, duermo.", accept: ["はい", "ねます", "よくねます"], dynamic: null }
        },
        {
          ai: { ja: "うんどうを しますか？", jaPlain: "うんどうを しますか？", romaji: "Undou o shimasu ka?", es: "¿Haces ejercicio?" },
          task: "Afirma (sí, hago).",
          expect: { ja: "はい、します。", jaPlain: "はい、します。", romaji: "Hai, shimasu.", es: "Sí, hago.", accept: ["はい", "します", "うんどうします"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 3 c5: フル自己紹介（まとめ） ===================== */
  "u3_c5": [
    /* 会話1 — クラスで自己紹介スピーチ */
    {
      settingEs: "Haces tu autopresentación completa ante la clase.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "では、じこしょうかいを おねがいします。おなまえは？", jaPlain: "では、じこしょうかいを おねがいします。おなまえは？", romaji: "Dewa, jikoshoukai o onegai shimasu. Onamae wa?", es: "Bien, preséntate. ¿Tu nombre?" },
          task: "Di tu nombre (… です).",
          expect: { ja: "{name}です。", jaPlain: "{name}です。", romaji: "... desu.", es: "Soy … (tu nombre).", accept: ["わたしは", "はじめまして"], dynamic: "name" }
        },
        {
          ai: { ja: "ごしゅっしんは？", jaPlain: "ごしゅっしんは？", romaji: "Goshusshin wa?", es: "¿De dónde eres?" },
          task: "Di tu país (… です).",
          expect: { ja: "{countryJa}です。", jaPlain: "{countryJa}です。", romaji: "... desu.", es: "Soy de … (tu país).", accept: [], dynamic: "country" }
        },
        {
          ai: { ja: "おしごとは？", jaPlain: "おしごとは？", romaji: "Oshigoto wa?", es: "¿A qué te dedicas?" },
          task: "Di tu profesión (… です).",
          expect: { ja: "がくせいです。", jaPlain: "がくせいです。", romaji: "Gakusei desu.", es: "Soy estudiante.", accept: ["です"], dynamic: null }
        },
        {
          ai: { ja: "では、ひとこと おねがいします。", jaPlain: "では、ひとこと おねがいします。", romaji: "Dewa, hitokoto onegai shimasu.", es: "Por último, unas palabras." },
          task: "Cierra el saludo de cortesía.",
          expect: { ja: "よろしく おねがいします。", jaPlain: "よろしく おねがいします。", romaji: "Yoroshiku onegai shimasu.", es: "Mucho gusto / encantado.", accept: ["こちらこそ", "よろしく"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 歓迎会で（名前・国・年齢） */
    {
      settingEs: "En una fiesta de bienvenida das varios datos sobre ti.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "はじめまして。おなまえは？", jaPlain: "はじめまして。おなまえは？", romaji: "Hajimemashite. Onamae wa?", es: "Mucho gusto. ¿Tu nombre?" },
          task: "Di tu nombre (… です).",
          expect: { ja: "{name}です。", jaPlain: "{name}です。", romaji: "... desu.", es: "Soy … (tu nombre).", accept: ["はじめまして", "わたしは"], dynamic: "name" }
        },
        {
          ai: { ja: "{name}さんですね。おくには？", jaPlain: "{name}さんですね。おくには？", romaji: "{name}-san desu ne. Okuni wa?", es: "{name}, ¿verdad? ¿De qué país?" },
          task: "Di tu país (… です).",
          expect: { ja: "{countryJa}です。", jaPlain: "{countryJa}です。", romaji: "... desu.", es: "Soy de … (tu país).", accept: [], dynamic: "country" }
        },
        {
          ai: { ja: "なんさいですか？", jaPlain: "なんさいですか？", romaji: "Nansai desu ka?", es: "¿Cuántos años tienes?" },
          task: "Di tu edad (… さいです).",
          expect: { ja: "にじゅっさいです。", jaPlain: "にじゅっさいです。", romaji: "Nijussai desu.", es: "Tengo 20 años (ej.).", accept: ["さいです", "はたち", "さい"], dynamic: null }
        },
        {
          ai: { ja: "そうですか。どうぞ よろしく。", jaPlain: "そうですか。どうぞ よろしく。", romaji: "Sou desu ka. Douzo yoroshiku.", es: "Ya veo. Encantado." },
          task: "Cierra el saludo de cortesía.",
          expect: { ja: "よろしく おねがいします。", jaPlain: "よろしく おねがいします。", romaji: "Yoroshiku onegai shimasu.", es: "Encantado / igualmente.", accept: ["こちらこそ", "よろしく"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 面接風（名前・職業・国） */
    {
      settingEs: "En una entrevista breve te presentas con varios datos.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "おなまえを おしえて ください。", jaPlain: "おなまえを おしえて ください。", romaji: "Onamae o oshiete kudasai.", es: "Dime tu nombre, por favor." },
          task: "Di tu nombre (… です).",
          expect: { ja: "{name}です。", jaPlain: "{name}です。", romaji: "... desu.", es: "Soy … (tu nombre).", accept: ["わたしは", "はじめまして"], dynamic: "name" }
        },
        {
          ai: { ja: "おしごとは なんですか？", jaPlain: "おしごとは なんですか？", romaji: "Oshigoto wa nan desu ka?", es: "¿A qué te dedicas?" },
          task: "Di tu profesión (… です).",
          expect: { ja: "がくせいです。", jaPlain: "がくせいです。", romaji: "Gakusei desu.", es: "Soy estudiante.", accept: ["です", "かいしゃいんです"], dynamic: null }
        },
        {
          ai: { ja: "ごしゅっしんは どちらですか？", jaPlain: "ごしゅっしんは どちらですか？", romaji: "Goshusshin wa dochira desu ka?", es: "¿De dónde eres?" },
          task: "Di tu país (… です).",
          expect: { ja: "{countryJa}です。", jaPlain: "{countryJa}です。", romaji: "... desu.", es: "Soy de … (tu país).", accept: [], dynamic: "country" }
        },
        {
          ai: { ja: "ありがとうございます。よろしく おねがいします。", jaPlain: "ありがとうございます。よろしく おねがいします。", romaji: "Arigatou gozaimasu. Yoroshiku onegai shimasu.", es: "Gracias. Encantado." },
          task: "Cierra el saludo de cortesía.",
          expect: { ja: "よろしく おねがいします。", jaPlain: "よろしく おねがいします。", romaji: "Yoroshiku onegai shimasu.", es: "Encantado / igualmente.", accept: ["こちらこそ", "よろしく"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 4 c1: 数字1〜10 ・ 〜つください ・ いくつ ===================== */
  "u4_c1": [
    /* 会話1 — 八百屋（verdulería） */
    {
      settingEs: "En una verdulería pides fruta usando el contador 〜つ.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。", jaPlain: "いらっしゃいませ。", romaji: "Irasshaimase.", es: "¡Bienvenido!" },
          task: "Pide 2 manzanas (… を ふたつ ください).",
          expect: { ja: "りんごを ふたつ ください。", jaPlain: "りんごをふたつください。", romaji: "Ringo o futatsu kudasai.", es: "Dos manzanas, por favor.", accept: ["ふたつ", "ください", "りんごをふたつ"], dynamic: null }
        },
        {
          ai: { ja: "りんごを ふたつ ですね。みかんは いくつ ですか。", jaPlain: "りんごをふたつですね。みかんはいくつですか。", romaji: "Ringo o futatsu desu ne. Mikan wa ikutsu desu ka.", es: "Dos manzanas, ¿verdad? ¿Cuántas mandarinas?" },
          task: "Di 'tres' (… みっつ).",
          expect: { ja: "みっつ ください。", jaPlain: "みっつください。", romaji: "Mittsu kudasai.", es: "Tres, por favor.", accept: ["みっつ", "みかんをみっつ"], dynamic: null }
        },
        {
          ai: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    },
    /* 会話2 — カフェ */
    {
      settingEs: "Pides bebidas y dulces en una cafetería usando 〜つ.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。ごちゅうもんは？", jaPlain: "いらっしゃいませ。ごちゅうもんは？", romaji: "Irasshaimase. Gochuumon wa?", es: "Bienvenido. ¿Qué desea ordenar?" },
          task: "Pide 1 café (… を ひとつ ください).",
          expect: { ja: "コーヒーを ひとつ ください。", jaPlain: "コーヒーをひとつください。", romaji: "Koohii o hitotsu kudasai.", es: "Un café, por favor.", accept: ["ひとつ", "ください", "コーヒーをひとつ"], dynamic: null }
        },
        {
          ai: { ja: "コーヒー ひとつ ですね。ケーキは いくつ ですか。", jaPlain: "コーヒーひとつですね。ケーキはいくつですか。", romaji: "Koohii hitotsu desu ne. Keeki wa ikutsu desu ka.", es: "Un café, ¿verdad? ¿Cuántos pasteles?" },
          task: "Pide 2 (… ふたつ).",
          expect: { ja: "ふたつ ください。", jaPlain: "ふたつください。", romaji: "Futatsu kudasai.", es: "Dos, por favor.", accept: ["ふたつ", "ケーキをふたつ"], dynamic: null }
        },
        {
          ai: { ja: "かしこまりました。", jaPlain: "かしこまりました。", romaji: "Kashikomarimashita.", es: "Entendido." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 文房具屋（papelería） */
    {
      settingEs: "Compras útiles en una papelería usando 〜つ.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。", jaPlain: "いらっしゃいませ。", romaji: "Irasshaimase.", es: "¡Bienvenido!" },
          task: "Pide 5 bolígrafos (… を いつつ ください).",
          expect: { ja: "ペンを いつつ ください。", jaPlain: "ペンをいつつください。", romaji: "Pen o itsutsu kudasai.", es: "Cinco bolígrafos, por favor.", accept: ["いつつ", "ください", "ペンをいつつ"], dynamic: null }
        },
        {
          ai: { ja: "ペンを いつつ ですね。ノートは いくつ ですか。", jaPlain: "ペンをいつつですね。ノートはいくつですか。", romaji: "Pen o itsutsu desu ne. Nooto wa ikutsu desu ka.", es: "Cinco bolígrafos, ¿verdad? ¿Cuántos cuadernos?" },
          task: "Di 'cuatro' (… よっつ).",
          expect: { ja: "よっつ ください。", jaPlain: "よっつください。", romaji: "Yottsu kudasai.", es: "Cuatro, por favor.", accept: ["よっつ", "ノートをよっつ"], dynamic: null }
        },
        {
          ai: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 4 c2: 11〜100 ・ いくらですか ・ 〜えんです ・ でんわばんごう ===================== */
  "u4_c2": [
    /* 会話1 — コンビニで値段を聞く */
    {
      settingEs: "En un konbini preguntas el precio de varios productos.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。", jaPlain: "いらっしゃいませ。", romaji: "Irasshaimase.", es: "¡Bienvenido!" },
          task: "Pregunta cuánto cuesta el té (… は いくらですか).",
          expect: { ja: "おちゃは いくらですか。", jaPlain: "おちゃはいくらですか。", romaji: "Ocha wa ikura desu ka.", es: "¿Cuánto cuesta el té?", accept: ["いくら", "おちゃはいくら"], dynamic: null }
        },
        {
          ai: { ja: "ひゃくにじゅうえんです。", jaPlain: "ひゃくにじゅうえんです。", romaji: "Hyaku nijuu en desu.", es: "Cuesta 120 yenes." },
          task: "Pregunta cuánto cuesta el onigiri.",
          expect: { ja: "おにぎりは いくらですか。", jaPlain: "おにぎりはいくらですか。", romaji: "Onigiri wa ikura desu ka.", es: "¿Cuánto cuesta el onigiri?", accept: ["いくら", "おにぎりはいくら"], dynamic: null }
        },
        {
          ai: { ja: "ひゃくごじゅうえんです。", jaPlain: "ひゃくごじゅうえんです。", romaji: "Hyaku gojuu en desu.", es: "Cuesta 150 yenes." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 店で2つの値段を聞いて買う */
    {
      settingEs: "En una tienda preguntas dos precios y luego compras algo.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。", jaPlain: "いらっしゃいませ。", romaji: "Irasshaimase.", es: "¡Bienvenido!" },
          task: "Pregunta cuánto cuesta el cuaderno.",
          expect: { ja: "ノートは いくらですか。", jaPlain: "ノートはいくらですか。", romaji: "Nooto wa ikura desu ka.", es: "¿Cuánto cuesta el cuaderno?", accept: ["いくら", "ノートはいくら"], dynamic: null }
        },
        {
          ai: { ja: "ノートは にひゃくえんです。", jaPlain: "ノートはにひゃくえんです。", romaji: "Nooto wa nihyaku en desu.", es: "El cuaderno cuesta 200 yenes." },
          task: "Pregunta cuánto cuesta el bolígrafo.",
          expect: { ja: "ペンは いくらですか。", jaPlain: "ペンはいくらですか。", romaji: "Pen wa ikura desu ka.", es: "¿Cuánto cuesta el bolígrafo?", accept: ["いくら", "ペンはいくら"], dynamic: null }
        },
        {
          ai: { ja: "ペンは はちじゅうえんです。", jaPlain: "ペンははちじゅうえんです。", romaji: "Pen wa hachijuu en desu.", es: "El bolígrafo cuesta 80 yenes." },
          task: "Pide el bolígrafo (… を ください).",
          expect: { ja: "ペンを ください。", jaPlain: "ペンをください。", romaji: "Pen o kudasai.", es: "El bolígrafo, por favor.", accept: ["ください", "ペンを", "じゃあペンを"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 電話番号を交換する */
    {
      settingEs: "Intercambias tu número de teléfono con un amigo.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "でんわばんごうを おしえて ください。", jaPlain: "でんわばんごうをおしえてください。", romaji: "Denwa bangou o oshiete kudasai.", es: "Dime tu número de teléfono, por favor." },
          task: "Di tu número leyendo los dígitos con の entre grupos.",
          expect: { ja: "ぜろななぜろの いちにさんよんの ごろくななはちです。", jaPlain: "ぜろななぜろのいちにさんよんのごろくななはちです。", romaji: "Zero-nana-zero no ichi-ni-san-yon no go-roku-nana-hachi desu.", es: "Es 070-1234-5678 (ej.).", accept: ["の"], dynamic: null }
        },
        {
          ai: { ja: "{name}さんの ばんごうですね。ありがとうございます。", jaPlain: "{name}さんのばんごうですね。ありがとうございます。", romaji: "{name}-san no bangou desu ne. Arigatou gozaimasu.", es: "Tu número, {name}, ¿verdad? Gracias." },
          task: "Pregunta el suyo (… ばんごうは？).",
          expect: { ja: "でんわばんごうは？", jaPlain: "でんわばんごうは？", romaji: "Denwa bangou wa?", es: "¿Y tu número de teléfono?", accept: ["ばんごう", "でんわばんごう"], dynamic: null }
        },
        {
          ai: { ja: "ぜろきゅうぜろの いちにさんよんの ごろくななはちです。", jaPlain: "ぜろきゅうぜろのいちにさんよんのごろくななはちです。", romaji: "Zero-kyuu-zero no ichi-ni-san-yon no go-roku-nana-hachi desu.", es: "Es 090-1234-5678." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 4 c3: 時間（なんじ ・ はん ・ ごぜん/ごご） ===================== */
  "u4_c3": [
    /* 会話1 — 道で時間を聞かれる */
    {
      settingEs: "Alguien en la calle te pregunta la hora.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "すみません、いま なんじ ですか。", jaPlain: "すみません、いまなんじですか。", romaji: "Sumimasen, ima nanji desu ka.", es: "Disculpe, ¿qué hora es ahora?" },
          task: "Di que son las 3:00 (… じです).",
          expect: { ja: "さんじです。", jaPlain: "さんじです。", romaji: "Sanji desu.", es: "Son las 3:00.", accept: ["じです", "さんじ"], dynamic: null }
        },
        {
          ai: { ja: "さんじ ですね。ごぜん ですか、ごご ですか。", jaPlain: "さんじですね。ごぜんですか、ごごですか。", romaji: "Sanji desu ne. Gozen desu ka, gogo desu ka.", es: "Las 3:00, ¿verdad? ¿AM o PM?" },
          task: "Di 'PM' (ごご です).",
          expect: { ja: "ごごです。", jaPlain: "ごごです。", romaji: "Gogo desu.", es: "PM (de la tarde).", accept: ["ごご"], dynamic: null }
        },
        {
          ai: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias." },
          task: "Di 'de nada'.",
          expect: { ja: "どういたしまして。", jaPlain: "どういたしまして。", romaji: "Dou itashimashite.", es: "De nada.", accept: ["いいえ", "どういたしまして"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 授業の時間 */
    {
      settingEs: "Te preguntan a qué hora empieza y termina la clase.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "じゅぎょうは なんじ から ですか。", jaPlain: "じゅぎょうはなんじからですか。", romaji: "Jugyou wa nanji kara desu ka.", es: "¿A qué hora empieza la clase?" },
          task: "Di 'desde las 9:00' (… じ から です).",
          expect: { ja: "くじからです。", jaPlain: "くじからです。", romaji: "Kuji kara desu.", es: "Desde las 9:00.", accept: ["くじ", "じから"], dynamic: null }
        },
        {
          ai: { ja: "くじ ですね。おわりは なんじ ですか。", jaPlain: "くじですね。おわりはなんじですか。", romaji: "Kuji desu ne. Owari wa nanji desu ka.", es: "Las 9:00, ¿verdad? ¿A qué hora termina?" },
          task: "Di 'las 10:30' (… じ はん です).",
          expect: { ja: "じゅうじはんです。", jaPlain: "じゅうじはんです。", romaji: "Juuji han desu.", es: "Las 10:30.", accept: ["じはん", "はん", "じゅうじはん"], dynamic: null }
        },
        {
          ai: { ja: "じゅうじはん ですね。ありがとうございます。", jaPlain: "じゅうじはんですね。ありがとうございます。", romaji: "Juuji han desu ne. Arigatou gozaimasu.", es: "Las 10:30, ¿verdad? Gracias." },
          task: "Responde (sí).",
          expect: { ja: "はい。", jaPlain: "はい。", romaji: "Hai.", es: "Sí.", accept: ["はい", "そうです", "どういたしまして"], dynamic: null }
        }
      ]
    },
    /* 会話3 — お店の開店時間を教える */
    {
      settingEs: "Trabajas en una tienda y un cliente pregunta los horarios.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "すみません、おみせは なんじ から ですか。", jaPlain: "すみません、おみせはなんじからですか。", romaji: "Sumimasen, omise wa nanji kara desu ka.", es: "Disculpe, ¿a qué hora abre la tienda?" },
          task: "Di 'desde las 10:00 AM' (ごぜん … じ から です).",
          expect: { ja: "ごぜん じゅうじ から です。", jaPlain: "ごぜんじゅうじからです。", romaji: "Gozen juuji kara desu.", es: "Desde las 10:00 AM.", accept: ["ごぜん", "じから"], dynamic: null }
        },
        {
          ai: { ja: "ひるごはんは なんじ ですか。", jaPlain: "ひるごはんはなんじですか。", romaji: "Hirugohan wa nanji desu ka.", es: "¿A qué hora es el almuerzo?" },
          task: "Di 'las 12:30' (… じ はん です).",
          expect: { ja: "じゅうにじはんです。", jaPlain: "じゅうにじはんです。", romaji: "Juuni-ji han desu.", es: "Las 12:30.", accept: ["じはん", "はん", "じゅうにじはん"], dynamic: null }
        },
        {
          ai: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias." },
          task: "Di 'de nada'.",
          expect: { ja: "どういたしまして。", jaPlain: "どういたしまして。", romaji: "Dou itashimashite.", es: "De nada.", accept: ["いいえ", "どういたしまして"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 4 c4: これ/それ/あれ ・ この/その/あの ・ なんですか ===================== */
  "u4_c4": [
    /* 会話1 — おみやげ屋 */
    {
      settingEs: "En una tienda de recuerdos preguntas qué son los productos.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。", jaPlain: "いらっしゃいませ。", romaji: "Irasshaimase.", es: "¡Bienvenido!" },
          task: "Pregunta '¿qué es esto?' (これ は なんですか).",
          expect: { ja: "これはなんですか。", jaPlain: "これはなんですか。", romaji: "Kore wa nan desu ka.", es: "¿Qué es esto?", accept: ["これは", "なん"], dynamic: null }
        },
        {
          ai: { ja: "それは せんす です。にほんの せんす です。", jaPlain: "それはせんすです。にほんのせんすです。", romaji: "Sore wa sensu desu. Nihon no sensu desu.", es: "Eso es un abanico. Un abanico japonés." },
          task: "Pregunta por aquello (あれ は なんですか).",
          expect: { ja: "あれはなんですか。", jaPlain: "あれはなんですか。", romaji: "Are wa nan desu ka.", es: "¿Qué es aquello?", accept: ["あれは", "なん"], dynamic: null }
        },
        {
          ai: { ja: "あれは ふうりん です。", jaPlain: "あれはふうりんです。", romaji: "Are wa fuurin desu.", es: "Aquello es una campanilla de viento." },
          task: "Pide este abanico (この … を ください).",
          expect: { ja: "このせんすをください。", jaPlain: "このせんすをください。", romaji: "Kono sensu o kudasai.", es: "Este abanico, por favor.", accept: ["この", "ください"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 教室で（AIが指さして質問） */
    {
      settingEs: "En el aula, un compañero señala objetos y te pregunta qué son.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "これは なんですか。", jaPlain: "これはなんですか。", romaji: "Kore wa nan desu ka.", es: "¿Qué es esto? (señala algo cerca de ti)" },
          task: "Responde 'eso es un bolígrafo' (それ は ペン です).",
          expect: { ja: "それはペンです。", jaPlain: "それはペンです。", romaji: "Sore wa pen desu.", es: "Eso es un bolígrafo.", accept: ["それは", "ペン"], dynamic: null }
        },
        {
          ai: { ja: "じゃあ、あれは なんですか。", jaPlain: "じゃあ、あれはなんですか。", romaji: "Jaa, are wa nan desu ka.", es: "¿Y aquello qué es?" },
          task: "Responde 'aquello es un libro' (あれ は ほん です).",
          expect: { ja: "あれはほんです。", jaPlain: "あれはほんです。", romaji: "Are wa hon desu.", es: "Aquello es un libro.", accept: ["あれは", "ほん"], dynamic: null }
        },
        {
          ai: { ja: "ありがとう。", jaPlain: "ありがとう。", romaji: "Arigatou.", es: "Gracias." },
          task: "Di 'de nada'.",
          expect: { ja: "どういたしまして。", jaPlain: "どういたしまして。", romaji: "Dou itashimashite.", es: "De nada.", accept: ["いいえ", "どういたしまして"], dynamic: null }
        }
      ]
    },
    /* 会話3 — ギャラリー */
    {
      settingEs: "En una galería preguntas por los objetos en exhibición.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "ようこそ。", jaPlain: "ようこそ。", romaji: "Youkoso.", es: "Bienvenido." },
          task: "Pregunta '¿qué es eso?' (それ は なんですか).",
          expect: { ja: "それはなんですか。", jaPlain: "それはなんですか。", romaji: "Sore wa nan desu ka.", es: "¿Qué es eso?", accept: ["それは", "なん"], dynamic: null }
        },
        {
          ai: { ja: "これは おちゃわん です。", jaPlain: "これはおちゃわんです。", romaji: "Kore wa ochawan desu.", es: "Esto es un cuenco de té." },
          task: "Pregunta '¿qué es aquello?' (あれ は なんですか).",
          expect: { ja: "あれはなんですか。", jaPlain: "あれはなんですか。", romaji: "Are wa nan desu ka.", es: "¿Qué es aquello?", accept: ["あれは", "なん"], dynamic: null }
        },
        {
          ai: { ja: "あれは きもの です。", jaPlain: "あれはきものです。", romaji: "Are wa kimono desu.", es: "Aquello es un kimono." },
          task: "Di 'esto, por favor' (これ を ください).",
          expect: { ja: "これをください。", jaPlain: "これをください。", romaji: "Kore o kudasai.", es: "Esto, por favor.", accept: ["これを", "これ", "ください"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 4 c5: いつ/どこ/だれ/なに ・ 曜日 ===================== */
  "u4_c5": [
    /* 会話1 — パーティーの計画 */
    {
      settingEs: "Un amigo te invita a una fiesta y preguntas los detalles.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "{name}さん、パーティーに いきますか。", jaPlain: "{name}さん、パーティーにいきますか。", romaji: "{name}-san, paatii ni ikimasu ka.", es: "{name}, ¿vas a la fiesta?" },
          task: "Di que sí y pregunta cuándo (はい、いつ ですか).",
          expect: { ja: "はい、いつですか。", jaPlain: "はい、いつですか。", romaji: "Hai, itsu desu ka.", es: "Sí, ¿cuándo es?", accept: ["いつ"], dynamic: null }
        },
        {
          ai: { ja: "どようび です。", jaPlain: "どようびです。", romaji: "Doyoubi desu.", es: "El sábado." },
          task: "Pregunta dónde (どこ ですか).",
          expect: { ja: "どこですか。", jaPlain: "どこですか。", romaji: "Doko desu ka.", es: "¿Dónde es?", accept: ["どこ"], dynamic: null }
        },
        {
          ai: { ja: "がっこう です。", jaPlain: "がっこうです。", romaji: "Gakkou desu.", es: "En la escuela." },
          task: "Pregunta quién viene (だれ が きますか).",
          expect: { ja: "だれが きますか。", jaPlain: "だれがきますか。", romaji: "Dare ga kimasu ka.", es: "¿Quién viene?", accept: ["だれ"], dynamic: null }
        }
      ]
    },
    /* 会話2 — イベントについて聞く */
    {
      settingEs: "Preguntas qué día es hoy y cuándo es un examen.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "こんにちは。", jaPlain: "こんにちは。", romaji: "Konnichiwa.", es: "Hola." },
          task: "Pregunta qué día de la semana es hoy (きょうは なんようび ですか).",
          expect: { ja: "きょうは なんようびですか。", jaPlain: "きょうはなんようびですか。", romaji: "Kyou wa nan-youbi desu ka.", es: "¿Qué día es hoy?", accept: ["なんようび", "ようび"], dynamic: null }
        },
        {
          ai: { ja: "きんようび です。", jaPlain: "きんようびです。", romaji: "Kin-youbi desu.", es: "Es viernes." },
          task: "Pregunta cuándo es el examen (しけんは いつ ですか).",
          expect: { ja: "しけんは いつですか。", jaPlain: "しけんはいつですか。", romaji: "Shiken wa itsu desu ka.", es: "¿Cuándo es el examen?", accept: ["いつ"], dynamic: null }
        },
        {
          ai: { ja: "すいようび です。", jaPlain: "すいようびです。", romaji: "Sui-youbi desu.", es: "El miércoles." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 週末の予定 */
    {
      settingEs: "Hablas de tus planes para el fin de semana.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "{name}さん、にちようびに なにを しますか。", jaPlain: "{name}さん、にちようびになにをしますか。", romaji: "{name}-san, nichi-youbi ni nani o shimasu ka.", es: "{name}, ¿qué haces el domingo?" },
          task: "Di 'estudio' (べんきょうします).",
          expect: { ja: "べんきょうします。", jaPlain: "べんきょうします。", romaji: "Benkyou shimasu.", es: "Estudio.", accept: ["べんきょうします", "します"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。だれと しますか。", jaPlain: "いいですね。だれとしますか。", romaji: "Ii desu ne. Dare to shimasu ka.", es: "Qué bien. ¿Con quién?" },
          task: "Di 'con un amigo' (ともだち と).",
          expect: { ja: "ともだちと します。", jaPlain: "ともだちとします。", romaji: "Tomodachi to shimasu.", es: "Con un amigo.", accept: ["ともだち", "ともだちと"], dynamic: null }
        },
        {
          ai: { ja: "たのしんで ください。", jaPlain: "たのしんでください。", romaji: "Tanoshinde kudasai.", es: "Que lo disfrutes." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 5 c1: 場所を聞く（〜はどこですか / 〜にあります） ===================== */
  "u5_c1": [
    /* 会話1 — 駅で（駅員に銀行・コンビニを聞く） */
    {
      settingEs: "Estás en la estación y necesitas encontrar el banco. Pregunta al empleado.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "こんにちは。なにか おさがしですか。", jaPlain: "こんにちは。なにかおさがしですか。", romaji: "Konnichiwa. Nanika osagashi desu ka.", es: "Hola. ¿Busca algo?" },
          task: "Pregunta dónde está el banco (〜はどこですか).",
          expect: { ja: "ぎんこうは どこですか。", jaPlain: "ぎんこうはどこですか。", romaji: "Ginkou wa doko desu ka.", es: "¿Dónde está el banco?", accept: ["ぎんこう", "どこですか", "どこ"], dynamic: null }
        },
        {
          ai: { ja: "ぎんこうは えきの まえに ありますよ。", jaPlain: "ぎんこうはえきのまえにありますよ。", romaji: "Ginkou wa eki no mae ni arimasu yo.", es: "El banco está delante de la estación." },
          task: "Pregunta si también hay un konbini cerca (コンビニも… ありますか).",
          expect: { ja: "コンビニも ちかくに ありますか。", jaPlain: "コンビニもちかくにありますか。", romaji: "Konbini mo chikaku ni arimasu ka.", es: "¿También hay un konbini cerca?", accept: ["コンビニ", "ありますか", "ちかく"], dynamic: null }
        },
        {
          ai: { ja: "はい、えきの なかに あります。", jaPlain: "はい、えきのなかにあります。", romaji: "Hai, eki no naka ni arimasu.", es: "Sí, está dentro de la estación." },
          task: "Di que entendiste y agradece.",
          expect: { ja: "わかりました。ありがとうございます。", jaPlain: "わかりました。ありがとうございます。", romaji: "Wakarimashita. Arigatou gozaimasu.", es: "Entendido. Muchas gracias.", accept: ["ありがとう", "わかりました", "どうも"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 街角（通行人にホテル・スーパーを聞く） */
    {
      settingEs: "Estás perdido en la calle. Un transeúnte se acerca a ayudarte.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "あのう、だいじょうぶですか。", jaPlain: "あのう、だいじょうぶですか。", romaji: "Anou, daijoubu desu ka.", es: "Disculpe, ¿está bien?" },
          task: "Pregunta dónde está el hotel.",
          expect: { ja: "ホテルは どこですか。", jaPlain: "ホテルはどこですか。", romaji: "Hoteru wa doko desu ka.", es: "¿Dónde está el hotel?", accept: ["ホテル", "どこですか", "どこ"], dynamic: null }
        },
        {
          ai: { ja: "ホテルですか。びょういんの となりに ありますよ。", jaPlain: "ホテルですか。びょういんのとなりにありますよ。", romaji: "Hoteru desu ka. Byouin no tonari ni arimasu yo.", es: "¿El hotel? Está al lado del hospital." },
          task: "Di 'ya veo' y pregunta dónde está el supermercado.",
          expect: { ja: "そうですか。スーパーは どこですか。", jaPlain: "そうですか。スーパーはどこですか。", romaji: "Sou desu ka. Suupaa wa doko desu ka.", es: "Ya veo. ¿Dónde está el supermercado?", accept: ["スーパー", "どこですか", "そうですか"], dynamic: null }
        },
        {
          ai: { ja: "スーパーは ホテルの よこです。", jaPlain: "スーパーはホテルのよこです。", romaji: "Suupaa wa hoteru no yoko desu.", es: "El supermercado está al lado del hotel." },
          task: "Agradece cortésmente.",
          expect: { ja: "どうも ありがとうございます。", jaPlain: "どうもありがとうございます。", romaji: "Doumo arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    },
    /* 会話3 — デパート案内係（郵便局・駅を聞く） */
    {
      settingEs: "En unos grandes almacenes, preguntas al personal de información.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。", jaPlain: "いらっしゃいませ。", romaji: "Irasshaimase.", es: "Bienvenido." },
          task: "Pregunta dónde está la oficina de correos.",
          expect: { ja: "すみません、ゆうびんきょくは どこですか。", jaPlain: "すみません、ゆうびんきょくはどこですか。", romaji: "Sumimasen, yuubinkyoku wa doko desu ka.", es: "Disculpe, ¿dónde está la oficina de correos?", accept: ["ゆうびんきょく", "どこですか", "どこ"], dynamic: null }
        },
        {
          ai: { ja: "ゆうびんきょくは ぎんこうの ちかくに あります。", jaPlain: "ゆうびんきょくはぎんこうのちかくにあります。", romaji: "Yuubinkyoku wa ginkou no chikaku ni arimasu.", es: "Correos está cerca del banco." },
          task: "Pregunta dónde está la estación.",
          expect: { ja: "えきは どこですか。", jaPlain: "えきはどこですか。", romaji: "Eki wa doko desu ka.", es: "¿Dónde está la estación?", accept: ["えき", "どこですか", "どこ"], dynamic: null }
        },
        {
          ai: { ja: "えきは あちらです。", jaPlain: "えきはあちらです。", romaji: "Eki wa achira desu.", es: "La estación está por allá." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 5 c2: あります vs います（物 / 人・動物） ===================== */
  "u5_c2": [
    /* 会話1 — 公園を散歩 */
    {
      settingEs: "Paseas por un parque con un amigo y comentan lo que ven.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "わあ、いい こうえんですね。なにが いますか。", jaPlain: "わあ、いいこうえんですね。なにがいますか。", romaji: "Waa, ii kouen desu ne. Nani ga imasu ka.", es: "¡Qué buen parque! ¿Qué (seres) hay?" },
          task: "Di que hay niños (こども が います).",
          expect: { ja: "こどもが います。", jaPlain: "こどもがいます。", romaji: "Kodomo ga imasu.", es: "Hay niños.", accept: ["こども", "います"], dynamic: null }
        },
        {
          ai: { ja: "ほんとうだ。ほかに なにか いますか。", jaPlain: "ほんとうだ。ほかになにかいますか。", romaji: "Hontou da. Hoka ni nanika imasu ka.", es: "Es verdad. ¿Hay algo (alguien) más?" },
          task: "Di que también hay un gato (ねこ も います).",
          expect: { ja: "ねこも います。", jaPlain: "ねこもいます。", romaji: "Neko mo imasu.", es: "También hay un gato.", accept: ["ねこ", "います"], dynamic: null }
        },
        {
          ai: { ja: "ベンチは ありますか。", jaPlain: "ベンチはありますか。", romaji: "Benchi wa arimasu ka.", es: "¿Hay un banco (para sentarse)?" },
          task: "Di que sí, hay allí (あそこに あります).",
          expect: { ja: "はい、あそこに あります。", jaPlain: "はい、あそこにあります。", romaji: "Hai, asoko ni arimasu.", es: "Sí, hay allí.", accept: ["あります", "あそこ", "はい"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 新しい部屋 */
    {
      settingEs: "Le describes a un amigo qué hay en tu habitación nueva.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "あたらしい へやは どうですか。なにが ありますか。", jaPlain: "あたらしいへやはどうですか。なにがありますか。", romaji: "Atarashii heya wa dou desu ka. Nani ga arimasu ka.", es: "¿Qué tal tu cuarto nuevo? ¿Qué hay?" },
          task: "Di que hay una mesa (テーブル が あります).",
          expect: { ja: "テーブルが あります。", jaPlain: "テーブルがあります。", romaji: "Teeburu ga arimasu.", es: "Hay una mesa.", accept: ["テーブル", "あります"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。いすは ありますか。", jaPlain: "いいですね。いすはありますか。", romaji: "Ii desu ne. Isu wa arimasu ka.", es: "Qué bien. ¿Hay sillas?" },
          task: "Di que sí, también hay sillas (いす も あります).",
          expect: { ja: "はい、いすも あります。", jaPlain: "はい、いすもあります。", romaji: "Hai, isu mo arimasu.", es: "Sí, también hay sillas.", accept: ["いす", "あります", "はい"], dynamic: null }
        },
        {
          ai: { ja: "いぬは いますか。", jaPlain: "いぬはいますか。", romaji: "Inu wa imasu ka.", es: "¿Hay un perro?" },
          task: "Di que sí, hay un perro (いぬ が います).",
          expect: { ja: "はい、いぬが います。", jaPlain: "はい、いぬがいます。", romaji: "Hai, inu ga imasu.", es: "Sí, hay un perro.", accept: ["いぬ", "います", "はい"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 教室 */
    {
      settingEs: "Hablas de qué hay en el aula.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "テーブルの うえに なにが ありますか。", jaPlain: "テーブルのうえになにがありますか。", romaji: "Teeburu no ue ni nani ga arimasu ka.", es: "¿Qué hay encima de la mesa?" },
          task: "Di que hay un libro (ほん が あります).",
          expect: { ja: "ほんが あります。", jaPlain: "ほんがあります。", romaji: "Hon ga arimasu.", es: "Hay un libro.", accept: ["ほん", "あります"], dynamic: null }
        },
        {
          ai: { ja: "ノートは ありますか。", jaPlain: "ノートはありますか。", romaji: "Nooto wa arimasu ka.", es: "¿Hay un cuaderno?" },
          task: "Di que sí, también hay un cuaderno (ノート も あります).",
          expect: { ja: "はい、ノートも あります。", jaPlain: "はい、ノートもあります。", romaji: "Hai, nooto mo arimasu.", es: "Sí, también hay un cuaderno.", accept: ["ノート", "あります", "はい"], dynamic: null }
        },
        {
          ai: { ja: "きょうしつに だれか いますか。", jaPlain: "きょうしつにだれかいますか。", romaji: "Kyoushitsu ni dareka imasu ka.", es: "¿Hay alguien en el aula?" },
          task: "Di que sí, hay niños (こども が います).",
          expect: { ja: "はい、こどもが います。", jaPlain: "はい、こどもがいます。", romaji: "Hai, kodomo ga imasu.", es: "Sí, hay niños.", accept: ["こども", "います", "はい"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 5 c3: 位置表現（うえ/した/まえ/うしろ/なか/そと/よこ/ちかく/あいだ） ===================== */
  "u5_c3": [
    /* 会話1 — 友達の持ち物を教える */
    {
      settingEs: "Un amigo no encuentra sus cosas en el aula y tú se las indicas.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "すみません、わたしの ノートは どこですか。", jaPlain: "すみません、わたしのノートはどこですか。", romaji: "Sumimasen, watashi no nooto wa doko desu ka.", es: "Perdona, ¿dónde está mi cuaderno?" },
          task: "Di que está encima del escritorio (つくえの うえ).",
          expect: { ja: "つくえの うえに あります。", jaPlain: "つくえのうえにあります。", romaji: "Tsukue no ue ni arimasu.", es: "Está encima del escritorio.", accept: ["うえ", "つくえのうえ"], dynamic: null }
        },
        {
          ai: { ja: "なるほど。じゃあ、かばんは？", jaPlain: "なるほど。じゃあ、かばんは？", romaji: "Naruhodo. Jaa, kaban wa?", es: "Ya veo. ¿Y la mochila?" },
          task: "Di que está debajo del escritorio (つくえの した).",
          expect: { ja: "つくえの したに あります。", jaPlain: "つくえのしたにあります。", romaji: "Tsukue no shita ni arimasu.", es: "Está debajo del escritorio.", accept: ["した", "つくえのした"], dynamic: null }
        },
        {
          ai: { ja: "はこは どこに ありますか。", jaPlain: "はこはどこにありますか。", romaji: "Hako wa doko ni arimasu ka.", es: "¿Dónde está la caja?" },
          task: "Di que está al lado de la silla (いすの よこ).",
          expect: { ja: "いすの よこに あります。", jaPlain: "いすのよこにあります。", romaji: "Isu no yoko ni arimasu.", es: "Está al lado de la silla.", accept: ["よこ", "いすのよこ"], dynamic: null }
        }
      ]
    },
    /* 会話2 — ペットと物の場所 */
    {
      settingEs: "Le explicas a alguien dónde están los animales y un lugar.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "ねこが いませんね。どこに いますか。", jaPlain: "ねこがいませんね。どこにいますか。", romaji: "Neko ga imasen ne. Doko ni imasu ka.", es: "No veo al gato. ¿Dónde está?" },
          task: "Di que está dentro de la caja (はこの なか).",
          expect: { ja: "はこの なかに います。", jaPlain: "はこのなかにいます。", romaji: "Hako no naka ni imasu.", es: "Está dentro de la caja.", accept: ["なか", "はこのなか"], dynamic: null }
        },
        {
          ai: { ja: "あ、ほんとうだ。いぬは？", jaPlain: "あ、ほんとうだ。いぬは？", romaji: "A, hontou da. Inu wa?", es: "Ah, es cierto. ¿Y el perro?" },
          task: "Di que el perro está afuera (そと).",
          expect: { ja: "いぬは そとに います。", jaPlain: "いぬはそとにいます。", romaji: "Inu wa soto ni imasu.", es: "El perro está afuera.", accept: ["そと"], dynamic: null }
        },
        {
          ai: { ja: "コンビニは どこに ありますか。", jaPlain: "コンビニはどこにありますか。", romaji: "Konbini wa doko ni arimasu ka.", es: "¿Dónde está el konbini?" },
          task: "Di que está entre la estación y la escuela (えきと がっこうの あいだ).",
          expect: { ja: "えきと がっこうの あいだに あります。", jaPlain: "えきとがっこうのあいだにあります。", romaji: "Eki to gakkou no aida ni arimasu.", es: "Está entre la estación y la escuela.", accept: ["あいだ"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 家具の配置 */
    {
      settingEs: "Describes la posición de los muebles de una sala.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "つくえは どこに ありますか。", jaPlain: "つくえはどこにありますか。", romaji: "Tsukue wa doko ni arimasu ka.", es: "¿Dónde está el escritorio?" },
          task: "Di que está delante de la silla (いすの まえ).",
          expect: { ja: "いすの まえに あります。", jaPlain: "いすのまえにあります。", romaji: "Isu no mae ni arimasu.", es: "Está delante de la silla.", accept: ["まえ", "いすのまえ"], dynamic: null }
        },
        {
          ai: { ja: "いすは？", jaPlain: "いすは？", romaji: "Isu wa?", es: "¿Y la silla?" },
          task: "Di que está detrás del escritorio (つくえの うしろ).",
          expect: { ja: "つくえの うしろに あります。", jaPlain: "つくえのうしろにあります。", romaji: "Tsukue no ushiro ni arimasu.", es: "Está detrás del escritorio.", accept: ["うしろ"], dynamic: null }
        },
        {
          ai: { ja: "コンビニは とおいですか。", jaPlain: "コンビニはとおいですか。", romaji: "Konbini wa tooi desu ka.", es: "¿El konbini está lejos?" },
          task: "Di que no, está cerca (ちかくに あります).",
          expect: { ja: "いいえ、ちかくに あります。", jaPlain: "いいえ、ちかくにあります。", romaji: "Iie, chikaku ni arimasu.", es: "No, está cerca.", accept: ["ちかく", "いいえ"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 5 c4: 助詞 で（動作場所）/ へ（移動方向） ===================== */
  "u5_c4": [
    /* 会話1 — 友達と昼の予定 */
    {
      settingEs: "Hablas con un amigo sobre los planes del día (で / へ).",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "おなかが すきましたね。どこで ひるごはんを たべますか。", jaPlain: "おなかがすきましたね。どこでひるごはんをたべますか。", romaji: "Onaka ga sukimashita ne. Doko de hirugohan o tabemasu ka.", es: "Tengo hambre. ¿Dónde almuerzas?" },
          task: "Di que comes en un restaurante (レストランで たべます).",
          expect: { ja: "レストランで たべます。", jaPlain: "レストランでたべます。", romaji: "Resutoran de tabemasu.", es: "Como en un restaurante.", accept: ["レストランで", "たべます"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。そのあと、どこへ いきますか。", jaPlain: "いいですね。そのあと、どこへいきますか。", romaji: "Ii desu ne. Sono ato, doko e ikimasu ka.", es: "Qué bien. Después, ¿a dónde vas?" },
          task: "Di que vas a la biblioteca (としょかんへ いきます).",
          expect: { ja: "としょかんへ いきます。", jaPlain: "としょかんへいきます。", romaji: "Toshokan e ikimasu.", es: "Voy a la biblioteca.", accept: ["としょかんへ", "としょかん", "いきます"], dynamic: null }
        },
        {
          ai: { ja: "としょかんで なにを しますか。", jaPlain: "としょかんでなにをしますか。", romaji: "Toshokan de nani o shimasu ka.", es: "¿Qué haces en la biblioteca?" },
          task: "Di que lees un libro (ほんを よみます).",
          expect: { ja: "ほんを よみます。", jaPlain: "ほんをよみます。", romaji: "Hon o yomimasu.", es: "Leo un libro.", accept: ["よみます", "べんきょうします"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 週末の予定 */
    {
      settingEs: "Cuentas tus planes para el fin de semana.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "しゅうまつ、どこへ いきますか。", jaPlain: "しゅうまつ、どこへいきますか。", romaji: "Shuumatsu, doko e ikimasu ka.", es: "El fin de semana, ¿a dónde vas?" },
          task: "Di que vas al supermercado (スーパーへ いきます).",
          expect: { ja: "スーパーへ いきます。", jaPlain: "スーパーへいきます。", romaji: "Suupaa e ikimasu.", es: "Voy al supermercado.", accept: ["スーパーへ", "スーパー", "いきます"], dynamic: null }
        },
        {
          ai: { ja: "スーパーで なにを かいますか。", jaPlain: "スーパーでなにをかいますか。", romaji: "Suupaa de nani o kaimasu ka.", es: "¿Qué compras en el supermercado?" },
          task: "Di que compras pan (パンを かいます).",
          expect: { ja: "パンを かいます。", jaPlain: "パンをかいます。", romaji: "Pan o kaimasu.", es: "Compro pan.", accept: ["かいます", "パン"], dynamic: null }
        },
        {
          ai: { ja: "そのあとは？", jaPlain: "そのあとは？", romaji: "Sono ato wa?", es: "¿Y después?" },
          task: "Di que vas al parque (こうえんへ いきます).",
          expect: { ja: "こうえんへ いきます。", jaPlain: "こうえんへいきます。", romaji: "Kouen e ikimasu.", es: "Voy al parque.", accept: ["こうえんへ", "こうえん", "いきます"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 学校生活 */
    {
      settingEs: "Hablas de tu rutina escolar.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "まいあさ、どこへ いきますか。", jaPlain: "まいあさ、どこへいきますか。", romaji: "Maiasa, doko e ikimasu ka.", es: "Cada mañana, ¿a dónde vas?" },
          task: "Di que vas a la escuela (がっこうへ いきます).",
          expect: { ja: "がっこうへ いきます。", jaPlain: "がっこうへいきます。", romaji: "Gakkou e ikimasu.", es: "Voy a la escuela.", accept: ["がっこうへ", "がっこう", "いきます"], dynamic: null }
        },
        {
          ai: { ja: "がっこうで なにを しますか。", jaPlain: "がっこうでなにをしますか。", romaji: "Gakkou de nani o shimasu ka.", es: "¿Qué haces en la escuela?" },
          task: "Di que estudias japonés (にほんごを べんきょうします).",
          expect: { ja: "にほんごを べんきょうします。", jaPlain: "にほんごをべんきょうします。", romaji: "Nihongo o benkyou shimasu.", es: "Estudio japonés.", accept: ["べんきょうします", "べんきょう"], dynamic: null }
        },
        {
          ai: { ja: "おひるは どこで たべますか。", jaPlain: "おひるはどこでたべますか。", romaji: "Ohiru wa doko de tabemasu ka.", es: "¿Dónde comes al mediodía?" },
          task: "Di que comes en el konbini (コンビニで たべます).",
          expect: { ja: "コンビニで たべます。", jaPlain: "コンビニでたべます。", romaji: "Konbini de tabemasu.", es: "Como en el konbini.", accept: ["コンビニで", "たべます"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 5 c5: 街案内の総合会話（まとめ） ===================== */
  "u5_c5": [
    /* 会話1 — 図書館を探す */
    {
      settingEs: "Estás en una ciudad nueva y buscas la biblioteca.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "こんにちは。どうしましたか。", jaPlain: "こんにちは。どうしましたか。", romaji: "Konnichiwa. Dou shimashita ka.", es: "Hola. ¿Qué ocurre?" },
          task: "Pregunta dónde está la biblioteca.",
          expect: { ja: "としょかんは どこですか。", jaPlain: "としょかんはどこですか。", romaji: "Toshokan wa doko desu ka.", es: "¿Dónde está la biblioteca?", accept: ["としょかん", "どこですか", "どこ"], dynamic: null }
        },
        {
          ai: { ja: "ぎんこうの となりに ありますよ。", jaPlain: "ぎんこうのとなりにありますよ。", romaji: "Ginkou no tonari ni arimasu yo.", es: "Está al lado del banco." },
          task: "Pregunta si está lejos de aquí (とおいですか).",
          expect: { ja: "ここから とおいですか。", jaPlain: "ここからとおいですか。", romaji: "Koko kara tooi desu ka.", es: "¿Está lejos de aquí?", accept: ["とおい"], dynamic: null }
        },
        {
          ai: { ja: "いいえ、ちかいです。まっすぐ いって、みぎです。", jaPlain: "いいえ、ちかいです。まっすぐいって、みぎです。", romaji: "Iie, chikai desu. Massugu itte, migi desu.", es: "No, está cerca. Sigue recto y a la derecha." },
          task: "Di que entendiste y agradece.",
          expect: { ja: "わかりました。ありがとうございます。", jaPlain: "わかりました。ありがとうございます。", romaji: "Wakarimashita. Arigatou gozaimasu.", es: "Entendido. Muchas gracias.", accept: ["ありがとう", "わかりました", "どうも"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 駅へ（バス） */
    {
      settingEs: "Necesitas ir a la estación y preguntas cómo llegar.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "なにか おさがしですか。", jaPlain: "なにかおさがしですか。", romaji: "Nanika osagashi desu ka.", es: "¿Busca algo?" },
          task: "Pregunta dónde está la estación.",
          expect: { ja: "えきは どこですか。", jaPlain: "えきはどこですか。", romaji: "Eki wa doko desu ka.", es: "¿Dónde está la estación?", accept: ["えき", "どこですか", "どこ"], dynamic: null }
        },
        {
          ai: { ja: "えきは すこし とおいですよ。バスで いけます。", jaPlain: "えきはすこしとおいですよ。バスでいけます。", romaji: "Eki wa sukoshi tooi desu yo. Basu de ikemasu.", es: "La estación está algo lejos. Se puede ir en autobús." },
          task: "Pregunta si puedes ir en autobús (バスで いけますか).",
          expect: { ja: "バスで いけますか。", jaPlain: "バスでいけますか。", romaji: "Basu de ikemasu ka.", es: "¿Se puede ir en autobús?", accept: ["バス", "いけますか", "いけます"], dynamic: null }
        },
        {
          ai: { ja: "はい、いけます。あそこの バスていです。", jaPlain: "はい、いけます。あそこのバスていです。", romaji: "Hai, ikemasu. Asoko no basutei desu.", es: "Sí, se puede. La parada está allí." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 病院の道案内 */
    {
      settingEs: "Preguntas cómo llegar al hospital.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。", jaPlain: "いらっしゃいませ。", romaji: "Irasshaimase.", es: "Bienvenido." },
          task: "Pregunta dónde está el hospital.",
          expect: { ja: "すみません、びょういんは どこですか。", jaPlain: "すみません、びょういんはどこですか。", romaji: "Sumimasen, byouin wa doko desu ka.", es: "Disculpe, ¿dónde está el hospital?", accept: ["びょういん", "どこですか", "どこ"], dynamic: null }
        },
        {
          ai: { ja: "びょういんは こうえんの ちかくに あります。", jaPlain: "びょういんはこうえんのちかくにあります。", romaji: "Byouin wa kouen no chikaku ni arimasu.", es: "El hospital está cerca del parque." },
          task: "Pregunta si vas recto (まっすぐ いきますか).",
          expect: { ja: "まっすぐ いきますか。", jaPlain: "まっすぐいきますか。", romaji: "Massugu ikimasu ka.", es: "¿Voy recto?", accept: ["まっすぐ"], dynamic: null }
        },
        {
          ai: { ja: "はい、まっすぐ いって、ひだりです。", jaPlain: "はい、まっすぐいって、ひだりです。", romaji: "Hai, massugu itte, hidari desu.", es: "Sí, sigue recto y a la izquierda." },
          task: "Agradece cortésmente.",
          expect: { ja: "どうも ありがとうございます。", jaPlain: "どうもありがとうございます。", romaji: "Doumo arigatou gozaimasu.", es: "Muchas gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 6 c1: い形容詞で商品を描写 ===================== */
  "u6_c1": [
    /* 会話1 — スーパーで友達と果物を選ぶ */
    {
      settingEs: "Estás en el supermercado con una amiga, eligiendo fruta para una fiesta.",
      closingJa: "いい かいものでしたね！",
      closingEs: "¡Buena compra!",
      steps: [
        {
          ai: { ja: "見て、このりんご、大きいよ！", jaPlain: "みて、このりんご、おおきいよ！", romaji: "Mite, kono ringo, ookii yo!", es: "¡Mira, esta manzana es grande!" },
          task: "Reacciona con sorpresa y di que de verdad es grande.",
          expect: { ja: "ほんとうに おおきいですね。", jaPlain: "ほんとうにおおきいですね。", romaji: "Hontou ni ookii desu ne.", es: "Es verdad, qué grande.", accept: ["おおきい", "ほんとう", "おおきいですね"], dynamic: null }
        },
        {
          ai: { ja: "日本のりんごは あまくて おいしいよ。ボリビアのは どう？", jaPlain: "にほんのりんごはあまくておいしいよ。ボリビアのはどう？", romaji: "Nihon no ringo wa amakute oishii yo. Boribia no wa dou?", es: "Las manzanas japonesas son dulces y ricas. ¿Y las de Bolivia?" },
          task: "Di que las de Bolivia también son ricas.",
          expect: { ja: "ボリビアのも おいしいです。", jaPlain: "ボリビアのもおいしいです。", romaji: "Boribia no mo oishii desu.", es: "Las de Bolivia también son ricas.", accept: ["おいしい", "おいしいです"], dynamic: null }
        },
        {
          ai: { ja: "あ、でも 見て…ねだんは いくら？", jaPlain: "あ、でもみて…ねだんはいくら？", romaji: "A, demo mite... nedan wa ikura?", es: "Ah, pero mira… ¿cuánto cuesta?" },
          task: "Mira el precio y di que cuesta 500 yenes (ごひゃくえん).",
          expect: { ja: "ごひゃくえんです。", jaPlain: "ごひゃくえんです。", romaji: "Gohyaku en desu.", es: "Cuesta 500 yenes.", accept: ["ごひゃく", "ごひゃくえん"], dynamic: null }
        },
        {
          ai: { ja: "えっ、五百円？ちょっと 高いね…", jaPlain: "えっ、ごひゃくえん？ちょっとたかいね…", romaji: "E, gohyaku en? Chotto takai ne...", es: "¿Eh, 500 yenes? Es un poco caro…" },
          task: "Coincide en que es caro y propón comprar otra cosa (ほかのを かいましょう).",
          expect: { ja: "そうですね、たかいです。ほかのを かいましょう。", jaPlain: "そうですね、たかいです。ほかのをかいましょう。", romaji: "Sou desu ne, takai desu. Hoka no o kaimashou.", es: "Sí, es caro. Compremos otra cosa.", accept: ["たかい", "たかいです", "かいましょう"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 八百屋で店員とやりとり */
    {
      settingEs: "En la verdulería del barrio. El dueño te atiende y hablas de los precios.",
      closingJa: "ありがとうございました！また どうぞ。",
      closingEs: "¡Muchas gracias! Vuelva pronto.",
      steps: [
        {
          ai: { ja: "いらっしゃいませ！今日の トマトは 安いですよ。", jaPlain: "いらっしゃいませ！きょうのトマトはやすいですよ。", romaji: "Irasshaimase! Kyou no tomato wa yasui desu yo.", es: "¡Bienvenida! Hoy los tomates están baratos." },
          task: "Pregunta cuánto cuestan (いくらですか).",
          expect: { ja: "いくらですか。", jaPlain: "いくらですか。", romaji: "Ikura desu ka.", es: "¿Cuánto cuestan?", accept: ["いくら", "いくらですか"], dynamic: null }
        },
        {
          ai: { ja: "三つで 百円です。安いでしょう？", jaPlain: "みっつでひゃくえんです。やすいでしょう？", romaji: "Mittsu de hyaku en desu. Yasui deshou?", es: "Tres por 100 yenes. ¿A que es barato?" },
          task: "Di que sí, es muy barato.",
          expect: { ja: "はい、とても やすいです。", jaPlain: "はい、とてもやすいです。", romaji: "Hai, totemo yasui desu.", es: "Sí, es muy barato.", accept: ["やすい", "やすいです", "とても"], dynamic: null }
        },
        {
          ai: { ja: "こっちの りんごも どうですか。", jaPlain: "こっちのりんごもどうですか。", romaji: "Kocchi no ringo mo dou desu ka.", es: "¿Y estas manzanas qué tal?" },
          task: "Comenta que son un poco pequeñas.",
          expect: { ja: "ちょっと ちいさいですね。", jaPlain: "ちょっとちいさいですね。", romaji: "Chotto chiisai desu ne.", es: "Son un poco pequeñas, ¿no?", accept: ["ちいさい", "ちいさいですね"], dynamic: null }
        },
        {
          ai: { ja: "そうですね（笑／risa）。じゃあ、トマトを どうぞ。", jaPlain: "そうですね。じゃあ、トマトをどうぞ。", romaji: "Sou desu ne (risa). Jaa, tomato o douzo.", es: "Cierto, jaja. Entonces, lleve los tomates." },
          task: "Pide los tomates (トマトを ください).",
          expect: { ja: "トマトを ください。", jaPlain: "トマトをください。", romaji: "Tomato o kudasai.", es: "Deme los tomates, por favor.", accept: ["トマト", "ください", "トマトをください"], dynamic: null }
        }
      ]
    },
    /* 会話3 — パン屋で新商品を試食 */
    {
      settingEs: "En una panadería. La dependienta te invita a probar un pan nuevo.",
      closingJa: "ありがとうございました！おいしい パンを どうぞ。",
      closingEs: "¡Gracias! Disfrute el pan.",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。この パンは 新しいですよ。どうぞ。", jaPlain: "いらっしゃいませ。このパンはあたらしいですよ。どうぞ。", romaji: "Irasshaimase. Kono pan wa atarashii desu yo. Douzo.", es: "Bienvenido. Este pan es nuevo. Sírvase." },
          task: "Muestra interés: \"¿Este pan?\" (この パンですか).",
          expect: { ja: "この パンですか。", jaPlain: "このパンですか。", romaji: "Kono pan desu ka.", es: "¿Este pan?", accept: ["このパン", "パンですか", "これ"], dynamic: null }
        },
        {
          ai: { ja: "はい。あたたかくて おいしいですよ。食べて みて ください。", jaPlain: "はい。あたたかくておいしいですよ。たべてみてください。", romaji: "Hai. Atatakakute oishii desu yo. Tabete mite kudasai.", es: "Sí. Está calentito y rico. Pruébelo." },
          task: "Pruébalo y di que está caliente y rico.",
          expect: { ja: "あついです。そして おいしいです。", jaPlain: "あついです。そしておいしいです。", romaji: "Atsui desu. Soshite oishii desu.", es: "Está caliente. Y rico.", accept: ["あつい", "あたたかい", "おいしい"], dynamic: null }
        },
        {
          ai: { ja: "こちらの ジュースも どうぞ。よく 冷えていますよ。", jaPlain: "こちらのジュースもどうぞ。よくひえていますよ。", romaji: "Kochira no juusu mo douzo. Yoku hiete imasu yo.", es: "Y este jugo también. Está bien frío." },
          task: "Bébelo y di que está frío y rico (usa 〜くて).",
          expect: { ja: "つめたくて おいしいです。", jaPlain: "つめたくておいしいです。", romaji: "Tsumetakute oishii desu.", es: "Está frío y rico.", accept: ["つめたい", "つめたくて", "おいしい"], dynamic: null }
        },
        {
          ai: { ja: "じゃあ、この 新しい パンは いかがですか。", jaPlain: "じゃあ、このあたらしいパンはいかがですか。", romaji: "Jaa, kono atarashii pan wa ikaga desu ka.", es: "Entonces, ¿qué le parece este pan nuevo?" },
          task: "Decídete: \"Me llevo este pan\" (この パンを ください).",
          expect: { ja: "この パンを ください。", jaPlain: "このパンをください。", romaji: "Kono pan o kudasai.", es: "Me llevo este pan.", accept: ["このパン", "パンをください", "ください"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 6 c2: な形容詞で場所/物を描写 ===================== */
  "u6_c2": [
    /* 会話1 — 新しいレストランの感想 */
    {
      settingEs: "Acabas de cenar con tu amigo Kenta en un restaurante nuevo. Él te pregunta tu opinión.",
      closingJa: "また 来週、来ましょうね！",
      closingEs: "¡Volvamos la próxima semana!",
      steps: [
        {
          ai: { ja: "この レストラン、新しいですね。どうですか？", jaPlain: "このレストラン、あたらしいですね。どうですか？", romaji: "Kono resutoran, atarashii desu ne. Dou desu ka?", es: "Este restaurante es nuevo, ¿no? ¿Qué te parece?" },
          task: "Di que es bonito (きれい).",
          expect: { ja: "きれいです。", jaPlain: "きれいです。", romaji: "Kirei desu.", es: "Es bonito.", accept: ["きれい"], dynamic: null }
        },
        {
          ai: { ja: "そうですね。とても きれいで、しずかですね。料理は？", jaPlain: "そうですね。とてもきれいで、しずかですね。りょうりは？", romaji: "Sou desu ne. Totemo kirei de, shizuka desu ne. Ryouri wa?", es: "Sí. Muy bonito y tranquilo. ¿Y la comida?" },
          task: "Di que la comida es deliciosa y barata (usa 〜くて).",
          expect: { ja: "おいしくて、やすいです。", jaPlain: "おいしくて、やすいです。", romaji: "Oishikute, yasui desu.", es: "Es deliciosa y barata.", accept: ["おいしくて", "やすい"], dynamic: null }
        },
        {
          ai: { ja: "ほんとうですね！この やさい、すきですか？", jaPlain: "ほんとうですね！このやさい、すきですか？", romaji: "Hontou desu ne! Kono yasai, suki desu ka?", es: "¡Es verdad! ¿Te gustan estas verduras?" },
          task: "Di que sí, te gustan las verduras.",
          expect: { ja: "はい、やさいが すきです。", jaPlain: "はい、やさいがすきです。", romaji: "Hai, yasai ga suki desu.", es: "Sí, me gustan las verduras.", accept: ["やさい", "すき"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。じゃあ、また 来ましょう！", jaPlain: "いいですね。じゃあ、またきましょう！", romaji: "Ii desu ne. Jaa, mata kimashou!", es: "¡Qué bien! Entonces, ¡volvamos!" },
          task: "Di que sí, te gusta este lugar.",
          expect: { ja: "はい、ここが すきです。", jaPlain: "はい、ここがすきです。", romaji: "Hai, koko ga suki desu.", es: "Sí, me gusta este lugar.", accept: ["ここ", "すき"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 引っ越し先の街について */
    {
      settingEs: "Estás pensando en mudarte. Hablas con una amiga sobre el barrio nuevo cerca de la estación.",
      closingJa: "いい まちですね。あした、見に 行きましょう！",
      closingEs: "¡Qué buen barrio! ¡Vamos a verlo mañana!",
      steps: [
        {
          ai: { ja: "駅の ちかくに 引っ越しますか？その まちは どうですか？", jaPlain: "えきのちかくにひっこしますか？そのまちはどうですか？", romaji: "Eki no chikaku ni hikkoshimasu ka? Sono machi wa dou desu ka?", es: "¿Te mudas cerca de la estación? ¿Cómo es ese barrio?" },
          task: "Di que es muy conveniente (べんり).",
          expect: { ja: "とても べんりです。", jaPlain: "とてもべんりです。", romaji: "Totemo benri desu.", es: "Es muy conveniente.", accept: ["べんり"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。にぎやかですか？しずかですか？", jaPlain: "いいですね。にぎやかですか？しずかですか？", romaji: "Ii desu ne. Nigiyaka desu ka? Shizuka desu ka?", es: "Qué bien. ¿Es animado? ¿O tranquilo?" },
          task: "Di que es animado y conveniente (usa 〜で).",
          expect: { ja: "にぎやかで、べんりです。", jaPlain: "にぎやかで、べんりです。", romaji: "Nigiyaka de, benri desu.", es: "Es animado y conveniente.", accept: ["にぎやかで", "べんり"], dynamic: null }
        },
        {
          ai: { ja: "スーパーは ありますか？", jaPlain: "スーパーはありますか？", romaji: "Suupaa wa arimasu ka?", es: "¿Hay un supermercado?" },
          task: "Di que sí, hay un supermercado grande.",
          expect: { ja: "はい、おおきい スーパーが あります。", jaPlain: "はい、おおきいスーパーがあります。", romaji: "Hai, ookii suupaa ga arimasu.", es: "Sí, hay un supermercado grande.", accept: ["スーパー", "あります"], dynamic: null }
        },
        {
          ai: { ja: "べんりな まちですね！その まちが すきですか？", jaPlain: "べんりなまちですね！そのまちがすきですか？", romaji: "Benri na machi desu ne! Sono machi ga suki desu ka?", es: "¡Es un barrio conveniente! ¿Te gusta?" },
          task: "Di que sí, te gusta ese barrio.",
          expect: { ja: "はい、まちが すきです。", jaPlain: "はい、まちがすきです。", romaji: "Hai, machi ga suki desu.", es: "Sí, me gusta el barrio.", accept: ["まち", "すき"], dynamic: null }
        }
      ]
    },
    /* 会話3 — お気に入りのカフェを紹介 */
    {
      settingEs: "Le muestras a tu amiga Hana tu café favorito cerca de la estación.",
      closingJa: "すてきな カフェですね。また 一緒に 来ましょう！",
      closingEs: "¡Qué café tan encantador! ¡Vengamos juntas otra vez!",
      steps: [
        {
          ai: { ja: "ここが すきな カフェですか？すてきですね！", jaPlain: "ここがすきなカフェですか？すてきですね！", romaji: "Koko ga suki na kafe desu ka? Suteki desu ne!", es: "¿Este es tu café favorito? ¡Qué bonito!" },
          task: "Di que sí, es tranquilo y te gusta (usa 〜で).",
          expect: { ja: "はい、しずかで すきです。", jaPlain: "はい、しずかですきです。", romaji: "Hai, shizuka de suki desu.", es: "Sí, es tranquilo y me gusta.", accept: ["しずか", "すき"], dynamic: null }
        },
        {
          ai: { ja: "コーヒーは おいしいですか？", jaPlain: "コーヒーはおいしいですか？", romaji: "Koohii wa oishii desu ka?", es: "¿El café es rico?" },
          task: "Di que es delicioso y barato (usa 〜くて).",
          expect: { ja: "おいしくて、やすいです。", jaPlain: "おいしくて、やすいです。", romaji: "Oishikute, yasui desu.", es: "Es delicioso y barato.", accept: ["おいしくて", "やすい"], dynamic: null }
        },
        {
          ai: { ja: "この カフェは ゆうめいですか？", jaPlain: "このカフェはゆうめいですか？", romaji: "Kono kafe wa yuumei desu ka?", es: "¿Este café es famoso?" },
          task: "Di que sí, es famoso y animado (usa 〜で).",
          expect: { ja: "ゆうめいで、にぎやかです。", jaPlain: "ゆうめいで、にぎやかです。", romaji: "Yuumei de, nigiyaka desu.", es: "Es famoso y animado.", accept: ["ゆうめいで", "にぎやか"], dynamic: null }
        },
        {
          ai: { ja: "いい カフェですね。わたしも すきです！", jaPlain: "いいカフェですね。わたしもすきです！", romaji: "Ii kafe desu ne. Watashi mo suki desu!", es: "¡Qué buen café! ¡A mí también me gusta!" },
          task: "Di que para ti es un lugar importante (たいせつ).",
          expect: { ja: "たいせつな ところです。", jaPlain: "たいせつなところです。", romaji: "Taisetsu na tokoro desu.", es: "Es un lugar importante para mí.", accept: ["たいせつ", "ところ"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 6 c3: 〜はどうですか（感想を聞く・答える） ===================== */
  "u6_c3": [
    /* 会話1 — レストランで友達と食事 */
    {
      settingEs: "Estás en un restaurante con un amigo. Él te pregunta qué tal está tu comida.",
      closingJa: "じょうずですね！",
      closingEs: "¡Muy bien!",
      steps: [
        {
          ai: { ja: "りょうりは どうですか。", jaPlain: "りょうりはどうですか。", romaji: "Ryouri wa dou desu ka.", es: "La comida, ¿qué tal está?" },
          task: "Di que está muy rica (とても おいしい).",
          expect: { ja: "とても おいしいです。", jaPlain: "とてもおいしいです。", romaji: "Totemo oishii desu.", es: "Está muy rica.", accept: ["おいしい", "とても"], dynamic: null }
        },
        {
          ai: { ja: "よかったです。この みせの ラーメンは 大きいですよ。", jaPlain: "よかったです。このみせのラーメンはおおきいですよ。", romaji: "Yokatta desu. Kono mise no raamen wa ookii desu yo.", es: "Me alegro. El ramen de este restaurante es grande." },
          task: "Pregúntale qué tal está su ramen (〜は どうですか).",
          expect: { ja: "ラーメンは どうですか。", jaPlain: "ラーメンはどうですか。", romaji: "Raamen wa dou desu ka.", es: "¿Qué tal está el ramen?", accept: ["ラーメン", "どうですか", "どう"], dynamic: null }
        },
        {
          ai: { ja: "すこし からいです。でも おいしいですよ。", jaPlain: "すこしからいです。でもおいしいですよ。", romaji: "Sukoshi karai desu. Demo oishii desu yo.", es: "Está un poco picante. Pero está rico." },
          task: "Di que tú también quieres probar (たべたい).",
          expect: { ja: "わたしも たべたいです。", jaPlain: "わたしもたべたいです。", romaji: "Watashi mo tabetai desu.", es: "Yo también quiero probar.", accept: ["たべたい", "たべたいです"], dynamic: null }
        },
        {
          ai: { ja: "いいですよ。どうぞ。", jaPlain: "いいですよ。どうぞ。", romaji: "Ii desu yo. Douzo.", es: "Claro. Adelante." },
          task: "Agradece.",
          expect: { ja: "ありがとうございます。", jaPlain: "ありがとうございます。", romaji: "Arigatou gozaimasu.", es: "Gracias.", accept: ["ありがとう", "どうも"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 友達の手料理を食べる */
    {
      settingEs: "Un amigo te invitó a su casa y cocinó para ti. Prueba su comida y comenta el sabor.",
      closingJa: "いいですね！じょうずです。",
      closingEs: "¡Genial! Muy bien.",
      steps: [
        {
          ai: { ja: "どうぞ、食べてください。あじは どうですか。", jaPlain: "どうぞ、たべてください。あじはどうですか。", romaji: "Douzo, tabete kudasai. Aji wa dou desu ka.", es: "Adelante, come por favor. ¿Qué tal el sabor?" },
          task: "Di que está muy rico (とても おいしい).",
          expect: { ja: "とても おいしいです。", jaPlain: "とてもおいしいです。", romaji: "Totemo oishii desu.", es: "Está muy rico.", accept: ["おいしい", "とても"], dynamic: null }
        },
        {
          ai: { ja: "ありがとう！この りょうりは あまいですか。", jaPlain: "ありがとう！このりょうりはあまいですか。", romaji: "Arigatou! Kono ryouri wa amai desu ka.", es: "¡Gracias! ¿Esta comida está dulce?" },
          task: "Di que está un poco dulce y rico (usa 〜くて).",
          expect: { ja: "ちょっと あまくて おいしいです。", jaPlain: "ちょっとあまくておいしいです。", romaji: "Chotto amakute oishii desu.", es: "Está un poco dulce y rico.", accept: ["あまくて", "あまい", "おいしい"], dynamic: null }
        },
        {
          ai: { ja: "コーヒーも どうですか。", jaPlain: "コーヒーもどうですか。", romaji: "Koohii mo dou desu ka.", es: "¿Y un café también?" },
          task: "Acepta: \"sí, por favor\" (おねがいします).",
          expect: { ja: "はい、おねがいします。", jaPlain: "はい、おねがいします。", romaji: "Hai, onegai shimasu.", es: "Sí, por favor.", accept: ["おねがいします", "おねがい"], dynamic: null }
        },
        {
          ai: { ja: "はい、どうぞ。", jaPlain: "はい、どうぞ。", romaji: "Hai, douzo.", es: "Sí, aquí tienes." },
          task: "Di que el café también está rico.",
          expect: { ja: "コーヒーも おいしいです。", jaPlain: "コーヒーもおいしいです。", romaji: "Koohii mo oishii desu.", es: "El café también está rico.", accept: ["おいしい", "コーヒー"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 新しいカフェで飲み物と甘いもの */
    {
      settingEs: "Pruebas una cafetería nueva con un amigo. Comenten las bebidas y el pastel.",
      closingJa: "とても じょうずですね！",
      closingEs: "¡Lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "この 新しい みせは きれいですね。コーヒーは どうですか。", jaPlain: "このあたらしいみせはきれいですね。コーヒーはどうですか。", romaji: "Kono atarashii mise wa kirei desu ne. Koohii wa dou desu ka.", es: "Esta tienda nueva es bonita. ¿Qué tal el café?" },
          task: "Di que está muy rico.",
          expect: { ja: "とても おいしいです。", jaPlain: "とてもおいしいです。", romaji: "Totemo oishii desu.", es: "Está muy rico.", accept: ["おいしい", "とても"], dynamic: null }
        },
        {
          ai: { ja: "この みせの ケーキも 安いですよ。", jaPlain: "このみせのケーキもやすいですよ。", romaji: "Kono mise no keeki mo yasui desu yo.", es: "El pastel de esta tienda también es barato." },
          task: "Pregunta qué tal está el pastel (〜は どうですか).",
          expect: { ja: "ケーキは どうですか。", jaPlain: "ケーキはどうですか。", romaji: "Keeki wa dou desu ka.", es: "¿Qué tal está el pastel?", accept: ["ケーキ", "どうですか", "どう"], dynamic: null }
        },
        {
          ai: { ja: "とても あまくて おいしいですよ。", jaPlain: "とてもあまくておいしいですよ。", romaji: "Totemo amakute oishii desu yo.", es: "Está muy dulce y rico." },
          task: "Di que tú también quieres comer pastel (たべたい).",
          expect: { ja: "わたしも ケーキが たべたいです。", jaPlain: "わたしもケーキがたべたいです。", romaji: "Watashi mo keeki ga tabetai desu.", es: "Yo también quiero comer pastel.", accept: ["たべたい", "ケーキ"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。この みせは とても いいです。", jaPlain: "いいですね。このみせはとてもいいです。", romaji: "Ii desu ne. Kono mise wa totemo ii desu.", es: "Qué bien. Esta tienda es muy buena." },
          task: "Di que sí, es una tienda muy bonita (きれいな みせ).",
          expect: { ja: "はい、とても きれいな みせです。", jaPlain: "はい、とてもきれいなみせです。", romaji: "Hai, totemo kirei na mise desu.", es: "Sí, es una tienda muy bonita.", accept: ["きれいな", "きれい", "みせ"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 6 c4: 〜より〜のほうが（比較） ===================== */
  "u6_c4": [
    /* 会話1 — スーパーで果物の比較 */
    {
      settingEs: "Estás en el supermercado con tu amigo Carlos. Comparan frutas para decidir qué comprar.",
      closingJa: "ありがとうございます。りんごは おいしくて 安いですね。",
      closingEs: "¡Gracias! Las manzanas son ricas y baratas.",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。きょうは りんごと オレンジが 安いですよ。", jaPlain: "いらっしゃいませ。きょうはりんごとオレンジがやすいですよ。", romaji: "Irasshaimase. Kyou wa ringo to orenji ga yasui desu yo.", es: "¡Bienvenidos! Hoy las manzanas y naranjas están baratas." },
          task: "Pregunta cuál es más barata (どちらが やすいですか).",
          expect: { ja: "りんごと オレンジ、どちらが やすいですか。", jaPlain: "りんごとオレンジ、どちらがやすいですか。", romaji: "Ringo to orenji, dochira ga yasui desu ka.", es: "¿Cuál es más barata, la manzana o la naranja?", accept: ["どちらがやすい", "りんごとオレンジ", "やすいですか"], dynamic: null }
        },
        {
          ai: { ja: "オレンジより りんごの ほうが 安いです。りんごは 百円ですよ。", jaPlain: "オレンジよりりんごのほうがやすいです。りんごはひゃくえんですよ。", romaji: "Orenji yori ringo no hou ga yasui desu. Ringo wa hyaku en desu yo.", es: "La manzana es más barata que la naranja. La manzana cuesta 100 yenes." },
          task: "Confirma: la manzana es más barata (〜のほうが やすい).",
          expect: { ja: "りんごの ほうが やすいですね。", jaPlain: "りんごのほうがやすいですね。", romaji: "Ringo no hou ga yasui desu ne.", es: "La manzana es más barata, ¿verdad?", accept: ["りんごのほうがやすい", "ほうがやすい"], dynamic: null }
        },
        {
          ai: { ja: "バナナも おいしいですよ。バナナと りんご、どちらが おいしいですか。", jaPlain: "バナナもおいしいですよ。バナナとりんご、どちらがおいしいですか。", romaji: "Banana mo oishii desu yo. Banana to ringo, dochira ga oishii desu ka.", es: "El plátano también está rico. ¿Cuál es más rico, el plátano o la manzana?" },
          task: "Di que la manzana es más rica que el plátano (〜より〜のほうが).",
          expect: { ja: "バナナより りんごの ほうが おいしいです。", jaPlain: "バナナよりりんごのほうがおいしいです。", romaji: "Banana yori ringo no hou ga oishii desu.", es: "La manzana es más rica que el plátano.", accept: ["バナナよりりんごのほうがおいしい", "りんごのほうがおいしい"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。じゃあ りんごを みっつ ください。", jaPlain: "いいですね。じゃありんごをみっつください。", romaji: "Ii desu ne. Jaa ringo o mittsu kudasai.", es: "Qué bien. Entonces deme tres manzanas." },
          task: "Pide dos manzanas tú también.",
          expect: { ja: "りんごを ふたつ ください。", jaPlain: "りんごをふたつください。", romaji: "Ringo o futatsu kudasai.", es: "Deme dos manzanas, por favor.", accept: ["ふたつください", "りんごをふたつ"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 2つの店を比較する */
    {
      settingEs: "Hablas con tu vecina sobre dos tiendas: la de enfrente de la estación y la del barrio.",
      closingJa: "いいですね。近所の 店は 安くて べんりですね。",
      closingEs: "¡Perfecto! La tienda del barrio es barata y cómoda.",
      steps: [
        {
          ai: { ja: "駅前の 店と きんじょの 店、よく 行きますか。", jaPlain: "えきまえのみせときんじょのみせ、よくいきますか。", romaji: "Ekimae no mise to kinjo no mise, yoku ikimasu ka.", es: "La tienda de la estación y la del barrio, ¿vas seguido?" },
          task: "Pregunta cuál es más barata (どちらが やすいですか).",
          expect: { ja: "えきまえの みせと きんじょの みせ、どちらが やすいですか。", jaPlain: "えきまえのみせときんじょのみせ、どちらがやすいですか。", romaji: "Ekimae no mise to kinjo no mise, dochira ga yasui desu ka.", es: "¿Cuál es más barata?", accept: ["どちらがやすい", "やすいですか"], dynamic: null }
        },
        {
          ai: { ja: "駅前の 店より きんじょの 店の ほうが 安いですよ。", jaPlain: "えきまえのみせよりきんじょのみせのほうがやすいですよ。", romaji: "Ekimae no mise yori kinjo no mise no hou ga yasui desu yo.", es: "La del barrio es más barata que la de la estación." },
          task: "Di que la del barrio es más grande (〜より〜のほうが おおきい).",
          expect: { ja: "えきまえの みせより きんじょの みせの ほうが おおきいです。", jaPlain: "えきまえのみせよりきんじょのみせのほうがおおきいです。", romaji: "Ekimae no mise yori kinjo no mise no hou ga ookii desu.", es: "La del barrio es más grande que la de la estación.", accept: ["のほうがおおきい", "ほうがおおきいです"], dynamic: null }
        },
        {
          ai: { ja: "そうですね。でも 駅前の 店は 新しくて きれいですよ。", jaPlain: "そうですね。でもえきまえのみせはあたらしくてきれいですよ。", romaji: "Sou desu ne. Demo ekimae no mise wa atarashikute kirei desu yo.", es: "Cierto. Pero la de la estación es nueva y bonita." },
          task: "Di que la del barrio es más cómoda (べんり).",
          expect: { ja: "きんじょの みせの ほうが べんりです。", jaPlain: "きんじょのみせのほうがべんりです。", romaji: "Kinjo no mise no hou ga benri desu.", es: "La del barrio es más cómoda.", accept: ["ほうがべんり", "のほうがべんり"], dynamic: null }
        },
        {
          ai: { ja: "ほんとうですね。きょうは きんじょの 店に 行きましょうか。", jaPlain: "ほんとうですね。きょうはきんじょのみせにいきましょうか。", romaji: "Hontou desu ne. Kyou wa kinjo no mise ni ikimashou ka.", es: "Es verdad. ¿Vamos hoy a la del barrio?" },
          task: "Acepta: \"sí, vamos juntos\" (いっしょに いきましょう).",
          expect: { ja: "はい、いっしょに いきましょう。", jaPlain: "はい、いっしょにいきましょう。", romaji: "Hai, issho ni ikimashou.", es: "Sí, vamos juntos.", accept: ["いっしょにいきましょう", "いきましょう"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 食べ物の好みを比較する */
    {
      settingEs: "Almuerzas con tu amiga. Conversan sobre qué comida prefieren.",
      closingJa: "たのしみですね。すしより ラーメンの ほうが いいですね。",
      closingEs: "¡Qué ganas! Prefieres el ramen. Hasta mañana.",
      steps: [
        {
          ai: { ja: "にくと さかな、どちらが 好きですか。", jaPlain: "にくとさかな、どちらがすきですか。", romaji: "Niku to sakana, dochira ga suki desu ka.", es: "¿Qué te gusta más, la carne o el pescado?" },
          task: "Di que prefieres el pescado (〜より〜のほうが すき).",
          expect: { ja: "にくより さかなの ほうが すきです。", jaPlain: "にくよりさかなのほうがすきです。", romaji: "Niku yori sakana no hou ga suki desu.", es: "Me gusta más el pescado que la carne.", accept: ["さかなのほうがすき", "よりさかなのほう"], dynamic: null }
        },
        {
          ai: { ja: "わたしも さかなが 好きです。安くて おいしいですね。", jaPlain: "わたしもさかながすきです。やすくておいしいですね。", romaji: "Watashi mo sakana ga suki desu. Yasukute oishii desu ne.", es: "A mí también me gusta el pescado. Es barato y rico." },
          task: "Pregunta cuál le gusta más, sushi o ramen (どちらが すきですか).",
          expect: { ja: "すしと ラーメン、どちらが すきですか。", jaPlain: "すしとラーメン、どちらがすきですか。", romaji: "Sushi to raamen, dochira ga suki desu ka.", es: "¿Cuál te gusta más, sushi o ramen?", accept: ["どちらがすき", "すしとラーメン"], dynamic: null }
        },
        {
          ai: { ja: "ラーメンより すしの ほうが 好きです。あなたは？", jaPlain: "ラーメンよりすしのほうがすきです。あなたは？", romaji: "Raamen yori sushi no hou ga suki desu. Anata wa?", es: "Me gusta más el sushi que el ramen. ¿Y tú?" },
          task: "Di que para ti el ramen es más rico que el sushi (〜より〜のほうが).",
          expect: { ja: "すしより ラーメンの ほうが おいしいです。", jaPlain: "すしよりラーメンのほうがおいしいです。", romaji: "Sushi yori raamen no hou ga oishii desu.", es: "Para mí el ramen es más rico que el sushi.", accept: ["ラーメンのほうがおいしい", "よりラーメンのほう"], dynamic: null }
        },
        {
          ai: { ja: "いいですね（笑／risa）。じゃあ あした いっしょに ラーメンを 食べましょうか。", jaPlain: "いいですね。じゃああしたいっしょにラーメンをたべましょうか。", romaji: "Ii desu ne (risa). Jaa ashita issho ni raamen o tabemashou ka.", es: "Qué bien, jaja. ¿Comemos ramen juntas mañana?" },
          task: "Acepta: \"sí, comamos juntas mañana\" (いっしょに たべましょう).",
          expect: { ja: "はい、あした いっしょに たべましょう。", jaPlain: "はい、あしたいっしょにたべましょう。", romaji: "Hai, ashita issho ni tabemashou.", es: "Sí, comamos juntas mañana.", accept: ["いっしょにたべましょう", "たべましょう"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 6 c5: いちばん + Unit 6 まとめ（5会話） ===================== */
  "u6_c5": [
    /* 会話1 — 果物ランキング（友達と昼休みに） */
    {
      settingEs: "Es la hora del almuerzo. Estás con un amigo japonés comparando frutas.",
      closingJa: "いいですね！くだものの はなし、たのしかったです。",
      closingEs: "¡Genial! Fue divertido hablar de frutas.",
      steps: [
        {
          ai: { ja: "くだものの なかで、なにが いちばん すきですか。", jaPlain: "くだもののなかで、なにがいちばんすきですか。", romaji: "Kudamono no naka de, nani ga ichiban suki desu ka.", es: "De las frutas, ¿cuál te gusta más?" },
          task: "Di cuál fruta te gusta más usando いちばん.",
          expect: { ja: "りんごが いちばん すきです。", jaPlain: "りんごがいちばんすきです。", romaji: "Ringo ga ichiban suki desu.", es: "La manzana es mi favorita.", accept: ["りんごがいちばん", "いちばんすき"], dynamic: null }
        },
        {
          ai: { ja: "わたしも りんごが すきです。あまくて おいしいですね。バナナは どうですか。", jaPlain: "わたしもりんごがすきです。あまくておいしいですね。バナナはどうですか。", romaji: "Watashi mo ringo ga suki desu. Amakute oishii desu ne. Banana wa dou desu ka.", es: "A mí también me gusta la manzana. Es dulce y rica. ¿Y el plátano?" },
          task: "Compara: el plátano es más barato (より〜のほうが).",
          expect: { ja: "りんごより バナナの ほうが やすいです。", jaPlain: "りんごよりバナナのほうがやすいです。", romaji: "Ringo yori banana no hou ga yasui desu.", es: "El plátano es más barato que la manzana.", accept: ["バナナのほうがやすい", "やすい"], dynamic: null }
        },
        {
          ai: { ja: "そうですね。オレンジは どうですか。あまいですか。", jaPlain: "そうですね。オレンジはどうですか。あまいですか。", romaji: "Sou desu ne. Orenji wa dou desu ka. Amai desu ka.", es: "Cierto. ¿Y la naranja? ¿Es dulce?" },
          task: "Di que la naranja es dulce y rica (〜くて).",
          expect: { ja: "オレンジは あまくて おいしいです。", jaPlain: "オレンジはあまくておいしいです。", romaji: "Orenji wa amakute oishii desu.", es: "La naranja es dulce y rica.", accept: ["あまくておいしい", "おいしい"], dynamic: null }
        },
        {
          ai: { ja: "じゃあ、この みっつの なかで どれが いちばん あまいですか。", jaPlain: "じゃあ、このみっつのなかでどれがいちばんあまいですか。", romaji: "Jaa, kono mittsu no naka de dore ga ichiban amai desu ka.", es: "Entonces, de las tres, ¿cuál es la más dulce?" },
          task: "Di cuál es la más dulce (いちばん).",
          expect: { ja: "オレンジが いちばん あまいです。", jaPlain: "オレンジがいちばんあまいです。", romaji: "Orenji ga ichiban amai desu.", es: "La naranja es la más dulce.", accept: ["オレンジがいちばん", "いちばんあまい"], dynamic: null }
        }
      ]
    },
    /* 会話2 — カフェで飲み物を選ぶ（注文まで） */
    {
      settingEs: "Estás en una cafetería. El camarero te ayuda a elegir bebida.",
      closingJa: "かしこまりました。すこし おまちください。",
      closingEs: "Entendido. Espere un momento, por favor.",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。のみものは どうですか。コーヒーが ゆうめいですよ。", jaPlain: "いらっしゃいませ。のみものはどうですか。コーヒーがゆうめいですよ。", romaji: "Irasshaimase. Nomimono wa dou desu ka. Koohii ga yuumei desu yo.", es: "¡Bienvenido! ¿Qué tal una bebida? Nuestro café es famoso." },
          task: "Pregunta cuál es la más rica (どれが いちばん).",
          expect: { ja: "どれが いちばん おいしいですか。", jaPlain: "どれがいちばんおいしいですか。", romaji: "Dore ga ichiban oishii desu ka.", es: "¿Cuál es la más rica?", accept: ["どれがいちばん", "いちばんおいしい"], dynamic: null }
        },
        {
          ai: { ja: "ジュースが いちばん あたらしくて にんきですよ。つめたいですよ。", jaPlain: "ジュースがいちばんあたらしくてにんきですよ。つめたいですよ。", romaji: "Juusu ga ichiban atarashikute ninki desu yo. Tsumetai desu yo.", es: "El jugo es el más nuevo y popular. Está frío." },
          task: "Di que prefieres las bebidas frías.",
          expect: { ja: "つめたい のみものの ほうが すきです。", jaPlain: "つめたいのみもののほうがすきです。", romaji: "Tsumetai nomimono no hou ga suki desu.", es: "Prefiero las bebidas frías.", accept: ["つめたい", "つめたいのほうが"], dynamic: null }
        },
        {
          ai: { ja: "では、つめたい ジュースは どうですか。あまくて おいしいですよ。", jaPlain: "では、つめたいジュースはどうですか。あまくておいしいですよ。", romaji: "Dewa, tsumetai juusu wa dou desu ka. Amakute oishii desu yo.", es: "Entonces, ¿qué tal un jugo frío? Es dulce y rico." },
          task: "Suena rico — pídelo (〜を ください).",
          expect: { ja: "いいですね。ジュースを ください。", jaPlain: "いいですね。ジュースをください。", romaji: "Ii desu ne. Juusu o kudasai.", es: "Suena bien. Un jugo, por favor.", accept: ["ジュースをください", "ください"], dynamic: null }
        },
        {
          ai: { ja: "はい。大きいのと 小さいの、どちらが いいですか。", jaPlain: "はい。おおきいのとちいさいの、どちらがいいですか。", romaji: "Hai. Ookii no to chiisai no, dochira ga ii desu ka.", es: "Sí. ¿Grande o pequeño?" },
          task: "Di que la grande, por favor.",
          expect: { ja: "おおきいのを ください。", jaPlain: "おおきいのをください。", romaji: "Ookii no o kudasai.", es: "La grande, por favor.", accept: ["おおきいのを", "おおきい"], dynamic: null }
        }
      ]
    },
    /* 会話3 — レストランで好みを話して注文（い/な形容詞混合） */
    {
      settingEs: "Estás en un restaurante japonés con un amigo. Hablan de comida y piden.",
      closingJa: "いいですね。いっしょに たべましょう！",
      closingEs: "¡Bien! ¡Comamos juntos!",
      steps: [
        {
          ai: { ja: "にほんの たべものの なかで、なにが いちばん すきですか。", jaPlain: "にほんのたべもののなかで、なにがいちばんすきですか。", romaji: "Nihon no tabemono no naka de, nani ga ichiban suki desu ka.", es: "De la comida japonesa, ¿cuál te gusta más?" },
          task: "Di cuál comida te gusta más (いちばん).",
          expect: { ja: "すしが いちばん すきです。", jaPlain: "すしがいちばんすきです。", romaji: "Sushi ga ichiban suki desu.", es: "El sushi es mi favorito.", accept: ["すしがいちばん", "いちばんすき"], dynamic: null }
        },
        {
          ai: { ja: "すしは いいですね！ラーメンは どうですか。", jaPlain: "すしはいいですね！ラーメンはどうですか。", romaji: "Sushi wa ii desu ne! Raamen wa dou desu ka.", es: "¡El sushi es bueno! ¿Y el ramen?" },
          task: "Compara: el ramen es más barato y rico (より〜のほうが + くて).",
          expect: { ja: "すしより ラーメンの ほうが やすくて おいしいです。", jaPlain: "すしよりラーメンのほうがやすくておいしいです。", romaji: "Sushi yori raamen no hou ga yasukute oishii desu.", es: "El ramen es más barato y rico que el sushi.", accept: ["ラーメンのほうが", "やすくておいしい"], dynamic: null }
        },
        {
          ai: { ja: "そうですね。てんぷらは どうですか。", jaPlain: "そうですね。てんぷらはどうですか。", romaji: "Sou desu ne. Tenpura wa dou desu ka.", es: "Cierto. ¿Y la tempura?" },
          task: "Di que la tempura es famosa y rica (ゆうめい + で).",
          expect: { ja: "てんぷらは ゆうめいで おいしいです。", jaPlain: "てんぷらはゆうめいでおいしいです。", romaji: "Tenpura wa yuumei de oishii desu.", es: "La tempura es famosa y rica.", accept: ["ゆうめいでおいしい", "ゆうめい"], dynamic: null }
        },
        {
          ai: { ja: "じゃあ、ちゅうもんしましょう。なにが いいですか。", jaPlain: "じゃあ、ちゅうもんしましょう。なにがいいですか。", romaji: "Jaa, chuumon shimashou. Nani ga ii desu ka.", es: "Entonces, pidamos. ¿Qué quieres?" },
          task: "Pide ramen y tempura (〜と〜を ください).",
          expect: { ja: "ラーメンと てんぷらを ください。", jaPlain: "ラーメンとてんぷらをください。", romaji: "Raamen to tenpura o kudasai.", es: "Ramen y tempura, por favor.", accept: ["ラーメンとてんぷら", "ください"], dynamic: null }
        }
      ]
    },
    /* 会話4 — 街の場所を比較する（な形容詞中心） */
    {
      settingEs: "Hablas con un amigo sobre lugares de la ciudad: parque, biblioteca y cafetería.",
      closingJa: "わたしも カフェが すきです。こんど いきましょう！",
      closingEs: "A mí también me gusta la cafetería. ¡Vamos la próxima vez!",
      steps: [
        {
          ai: { ja: "この まちには こうえんと としょかんと カフェが あります。こうえんは どうですか。", jaPlain: "このまちにはこうえんととしょかんとカフェがあります。こうえんはどうですか。", romaji: "Kono machi ni wa kouen to toshokan to kafe ga arimasu. Kouen wa dou desu ka.", es: "En esta ciudad hay un parque, una biblioteca y una cafetería. ¿Qué tal el parque?" },
          task: "Di que el parque es tranquilo y grande (しずか + で).",
          expect: { ja: "こうえんは しずかで おおきいです。", jaPlain: "こうえんはしずかでおおきいです。", romaji: "Kouen wa shizuka de ookii desu.", es: "El parque es tranquilo y grande.", accept: ["しずかでおおきい", "しずか"], dynamic: null }
        },
        {
          ai: { ja: "そうですね。としょかんは とても しずかですよ。カフェは どうですか。", jaPlain: "そうですね。としょかんはとてもしずかですよ。カフェはどうですか。", romaji: "Sou desu ne. Toshokan wa totemo shizuka desu yo. Kafe wa dou desu ka.", es: "Cierto. La biblioteca es muy tranquila. ¿Y la cafetería?" },
          task: "Di que la cafetería es animada y conveniente (にぎやか + で).",
          expect: { ja: "カフェは にぎやかで べんりです。", jaPlain: "カフェはにぎやかでべんりです。", romaji: "Kafe wa nigiyaka de benri desu.", es: "La cafetería es animada y conveniente.", accept: ["にぎやかでべんり", "べんり"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。この みっつの なかで どこが いちばん しずかですか。", jaPlain: "いいですね。このみっつのなかでどこがいちばんしずかですか。", romaji: "Ii desu ne. Kono mittsu no naka de doko ga ichiban shizuka desu ka.", es: "Bien. De los tres, ¿cuál es el más tranquilo?" },
          task: "Di cuál es el más tranquilo (いちばん).",
          expect: { ja: "としょかんが いちばん しずかです。", jaPlain: "としょかんがいちばんしずかです。", romaji: "Toshokan ga ichiban shizuka desu.", es: "La biblioteca es la más tranquila.", accept: ["としょかんがいちばん", "いちばんしずか"], dynamic: null }
        },
        {
          ai: { ja: "わたしも そう おもいます。あなたは どこが いちばん すきですか。", jaPlain: "わたしもそうおもいます。あなたはどこがいちばんすきですか。", romaji: "Watashi mo sou omoimasu. Anata wa doko ga ichiban suki desu ka.", es: "Yo también lo creo. ¿Cuál te gusta más?" },
          task: "Di cuál te gusta más y por qué.",
          expect: { ja: "カフェが いちばん すきです。べんりです。", jaPlain: "カフェがいちばんすきです。べんりです。", romaji: "Kafe ga ichiban suki desu. Benri desu.", es: "La cafetería es mi favorita. Es conveniente.", accept: ["カフェがいちばん", "いちばんすき"], dynamic: null }
        }
      ]
    },
    /* 会話5 — 週末の買い物（スーパーで・総合） */
    {
      settingEs: "Estás de compras en un supermercado el fin de semana. Comparas precio, tamaño y sabor.",
      closingJa: "はい、大きい りんごを みっつ ですね。ありがとうございます！",
      closingEs: "Sí, tres manzanas grandes. ¡Gracias!",
      steps: [
        {
          ai: { ja: "いらっしゃいませ。きょうは りんごが 安いですよ。この りんごは どうですか。", jaPlain: "いらっしゃいませ。きょうはりんごがやすいですよ。このりんごはどうですか。", romaji: "Irasshaimase. Kyou wa ringo ga yasui desu yo. Kono ringo wa dou desu ka.", es: "¡Bienvenido! Hoy las manzanas están baratas. ¿Qué tal esta?" },
          task: "Pregunta el precio (いくら).",
          expect: { ja: "いくらですか。", jaPlain: "いくらですか。", romaji: "Ikura desu ka.", es: "¿Cuánto cuesta?", accept: ["いくらですか", "いくら"], dynamic: null }
        },
        {
          ai: { ja: "ひとつ 百円です。やすいでしょう。バナナは 三百円です。", jaPlain: "ひとつひゃくえんです。やすいでしょう。バナナはさんびゃくえんです。", romaji: "Hitotsu hyaku en desu. Yasui deshou. Banana wa sanbyaku en desu.", es: "Una por 100 yenes. Barata, ¿verdad? El plátano cuesta 300." },
          task: "Compara: la manzana es más barata (より〜のほうが).",
          expect: { ja: "バナナより りんごの ほうが やすいです。", jaPlain: "バナナよりりんごのほうがやすいです。", romaji: "Banana yori ringo no hou ga yasui desu.", es: "La manzana es más barata que el plátano.", accept: ["りんごのほうがやすい", "やすい"], dynamic: null }
        },
        {
          ai: { ja: "そうですね。りんごは やすくて あまいですよ。どれが いいですか。", jaPlain: "そうですね。りんごはやすくてあまいですよ。どれがいいですか。", romaji: "Sou desu ne. Ringo wa yasukute amai desu yo. Dore ga ii desu ka.", es: "Cierto. Las manzanas son baratas y dulces. ¿Cuál quieres?" },
          task: "Di que quieres la grande y dulce (おおきくて あまい).",
          expect: { ja: "おおきくて あまい りんごが いいです。", jaPlain: "おおきくてあまいりんごがいいです。", romaji: "Ookikute amai ringo ga ii desu.", es: "Quiero la grande y dulce.", accept: ["おおきくてあまい", "おおきいりんご"], dynamic: null }
        },
        {
          ai: { ja: "はい。この みっつの くだものの なかで、どれが いちばん やすいですか。", jaPlain: "はい。このみっつのくだもののなかで、どれがいちばんやすいですか。", romaji: "Hai. Kono mittsu no kudamono no naka de, dore ga ichiban yasui desu ka.", es: "Bien. De estas tres frutas, ¿cuál es la más barata?" },
          task: "Di cuál es la más barata (いちばん) y pídela.",
          expect: { ja: "りんごが いちばん やすいです。りんごを ください。", jaPlain: "りんごがいちばんやすいです。りんごをください。", romaji: "Ringo ga ichiban yasui desu. Ringo o kudasai.", es: "La manzana es la más barata. Deme manzanas.", accept: ["りんごがいちばん", "いちばんやすい", "りんごをください"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 7: ましょう・たい・にいく・まえに・できます ===================== */

  /* ---------- u7_c1: 〜ましょう・ましょうか（誘い・申し出）---------- */
  "u7_c1": [
    /* 会話1 — 昼食の誘い（友達・学校） */
    {
      settingEs: "Estás en la universidad con tu amigo Tanaka. Es la hora del almuerzo.",
      closingJa: "いっしょに たのしく 食べましょうね！",
      closingEs: "¡Comamos juntos con gusto!",
      steps: [
        {
          ai: { ja: "おなかが すきましたね。いっしょに 食べましょう！", jaPlain: "おなかがすきましたね。いっしょにたべましょう。", romaji: "Onaka ga sukimashita ne. Issho ni tabemashou!", es: "Tengo hambre. ¡Comamos juntos!" },
          task: "Acepta la invitación: \"Sí, comamos juntos.\"",
          expect: { ja: "はい、いっしょに 食べましょう。", jaPlain: "はい、いっしょにたべましょう。", romaji: "Hai, issho ni tabemashou.", es: "Sí, comamos juntos.", accept: ["いっしょにたべましょう", "たべましょう"], dynamic: null }
        },
        {
          ai: { ja: "食堂に 行きましょうか、コンビニに 行きましょうか。", jaPlain: "しょくどうにいきましょうか、こんびにいきましょうか。", romaji: "Shokudou ni ikimashou ka, konbini ni ikimashou ka.", es: "¿Vamos a la cafetería o al konbini?" },
          task: "Sugiere ir a la cafetería (食堂).",
          expect: { ja: "食堂に 行きましょう。", jaPlain: "しょくどうにいきましょう。", romaji: "Shokudou ni ikimashou.", es: "Vamos a la cafetería.", accept: ["しょくどうにいきましょう", "しょくどう"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！飲み物を 買いましょうか。", jaPlain: "いいですね。のみものをかいましょうか。", romaji: "Ii desu ne! Nomimono o kaimashou ka.", es: "¡Bien! ¿Compro bebidas?" },
          task: "Acepta la oferta: \"Sí, por favor.\"",
          expect: { ja: "はい、おねがいします。", jaPlain: "はい、おねがいします。", romaji: "Hai, onegai shimasu.", es: "Sí, por favor.", accept: ["おねがいします", "はい"], dynamic: null }
        },
        {
          ai: { ja: "じゃあ、お茶を 買いましょう。行きましょう！", jaPlain: "じゃあ、おちゃをかいましょう。いきましょう。", romaji: "Jaa, ocha o kaimashou. Ikimashou!", es: "Entonces compremos té. ¡Vamos!" },
          task: "Di \"Sí, vamos.\"",
          expect: { ja: "はい、行きましょう！", jaPlain: "はい、いきましょう。", romaji: "Hai, ikimashou!", es: "Sí, ¡vamos!", accept: ["いきましょう"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 週末の映画（友達を誘う） */
    {
      settingEs: "Es viernes. Quieres invitar a tu amiga Yuki a ver una película el fin de semana.",
      closingJa: "たのしみですね！",
      closingEs: "¡Qué emocionante!",
      steps: [
        {
          ai: { ja: "しゅうまつ、ひまですか？", jaPlain: "しゅうまつ、ひまですか。", romaji: "Shuumatsu, hima desu ka?", es: "¿Estás libre el fin de semana?" },
          task: "Invítala a ver una película: \"Veamos una película juntos.\"",
          expect: { ja: "いっしょに 映画を 見ましょう。", jaPlain: "いっしょにえいがをみましょう。", romaji: "Issho ni eiga o mimashou.", es: "Veamos una película juntos.", accept: ["いっしょにえいがをみましょう", "えいがをみましょう", "えいがみましょう"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！何を 見ましょうか。", jaPlain: "いいですね。なにをみましょうか。", romaji: "Ii desu ne! Nani o mimashou ka.", es: "¡Qué bueno! ¿Qué vemos?" },
          task: "Sugiere ver una película japonesa.",
          expect: { ja: "にほんの 映画を 見ましょう。", jaPlain: "にほんのえいがをみましょう。", romaji: "Nihon no eiga o mimashou.", es: "Veamos una película japonesa.", accept: ["にほんのえいがをみましょう", "にほんのえいが"], dynamic: null }
        },
        {
          ai: { ja: "にほんの映画、いいですね！チケットを 買いましょうか。", jaPlain: "にほんのえいが、いいですね。ちけっとをかいましょうか。", romaji: "Nihon no eiga, ii desu ne! Chiketto o kaimashou ka.", es: "¡Película japonesa, genial! ¿Compro las entradas?" },
          task: "Acepta la oferta.",
          expect: { ja: "はい、おねがいします。", jaPlain: "はい、おねがいします。", romaji: "Hai, onegai shimasu.", es: "Sí, por favor.", accept: ["おねがいします", "はい"], dynamic: null }
        },
        {
          ai: { ja: "じゃあ、土曜日に 行きましょう！", jaPlain: "じゃあ、どようびにいきましょう。", romaji: "Jaa, doyoubi ni ikimashou!", es: "Entonces, ¡vamos el sábado!" },
          task: "Acepta: \"Sí, vamos el sábado.\"",
          expect: { ja: "はい、土曜日に 行きましょう。", jaPlain: "はい、どようびにいきましょう。", romaji: "Hai, doyoubi ni ikimashou.", es: "Sí, vamos el sábado.", accept: ["どようびにいきましょう", "いきましょう"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 引っ越しの手伝い（申し出中心） */
    {
      settingEs: "Tu compañera de clase se va a mudar mañana. Tiene mucho equipaje. Ofrécele ayuda.",
      closingJa: "やさしいですね！ありがとうございます！",
      closingEs: "¡Eres muy amable! ¡Gracias!",
      steps: [
        {
          ai: { ja: "あした ひっこしです。にもつが たくさん あります…。", jaPlain: "あしたひっこしです。にもつがたくさんあります。", romaji: "Ashita hikkoshi desu. Nimotsu ga takusan arimasu...", es: "Mañana me mudo. Tengo mucho equipaje..." },
          task: "Ofrece llevar el equipaje: \"¿Llevo el equipaje?\"",
          expect: { ja: "にもつを もちましょうか。", jaPlain: "にもつをもちましょうか。", romaji: "Nimotsu o mochimashou ka.", es: "¿Llevo el equipaje?", accept: ["にもつをもちましょうか", "もちましょうか", "てつだいましょうか"], dynamic: null }
        },
        {
          ai: { ja: "ほんとうですか？ありがとうございます！車で 行きましょうか。", jaPlain: "ほんとうですか。ありがとうございます。くるまでいきましょうか。", romaji: "Hontou desu ka? Arigatou gozaimasu! Kuruma de ikimashou ka.", es: "¿De verdad? ¡Gracias! ¿Vamos en coche?" },
          task: "Acepta: \"Sí, vamos en coche.\"",
          expect: { ja: "はい、車で 行きましょう。", jaPlain: "はい、くるまでいきましょう。", romaji: "Hai, kuruma de ikimashou.", es: "Sí, vamos en coche.", accept: ["くるまでいきましょう", "いきましょう"], dynamic: null }
        },
        {
          ai: { ja: "あたらしい へやは きれいですよ。いっしょに そうじしましょうか。", jaPlain: "あたらしいへやはきれいですよ。いっしょにそうじしましょうか。", romaji: "Atarashii heya wa kirei desu yo. Issho ni souji shimashou ka.", es: "El nuevo cuarto es bonito. ¿Limpiamos juntos?" },
          task: "Acepta: \"Sí, limpiemos juntos.\"",
          expect: { ja: "はい、いっしょに そうじしましょう。", jaPlain: "はい、いっしょにそうじしましょう。", romaji: "Hai, issho ni souji shimashou.", es: "Sí, limpiemos juntos.", accept: ["いっしょにそうじしましょう", "そうじしましょう"], dynamic: null }
        },
        {
          ai: { ja: "ありがとうございます！おわったら、いっしょに ごはんを 食べましょう！", jaPlain: "ありがとうございます。おわったら、いっしょにごはんをたべましょう。", romaji: "Arigatou gozaimasu! Owattara, issho ni gohan o tabemashou!", es: "¡Gracias! Cuando terminemos, ¡comamos juntos!" },
          task: "Acepta la invitación a comer.",
          expect: { ja: "はい、食べましょう！", jaPlain: "はい、たべましょう。", romaji: "Hai, tabemashou!", es: "Sí, ¡comamos!", accept: ["たべましょう"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u7_c2: 〜たいです・たくないです（願望）---------- */
  "u7_c2": [
    /* 会話1 — 週末の願望（映画・旅行） */
    {
      settingEs: "Tu amigo Tanaka te pregunta sobre tus planes del fin de semana.",
      closingJa: "たのしい しゅうまつに しましょうね！",
      closingEs: "¡Que sea un fin de semana divertido!",
      steps: [
        {
          ai: { ja: "しゅうまつ、何を したいですか。", jaPlain: "しゅうまつ、なにをしたいですか。", romaji: "Shuumatsu, nani o shitai desu ka.", es: "¿Qué quieres hacer el fin de semana?" },
          task: "Di que quieres ver una película.",
          expect: { ja: "映画を 見たいです。", jaPlain: "えいがをみたいです。", romaji: "Eiga o mitai desu.", es: "Quiero ver una película.", accept: ["えいがをみたいです", "えいがみたい", "えいがをみたい"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！どこで 見たいですか。映画館ですか。", jaPlain: "いいですね。どこでみたいですか。えいがかんですか。", romaji: "Ii desu ne! Doko de mitai desu ka. Eigakan desu ka.", es: "¡Bien! ¿Dónde quieres ver? ¿En el cine?" },
          task: "Di que quieres ver en el cine.",
          expect: { ja: "映画館で 見たいです。", jaPlain: "えいがかんでみたいです。", romaji: "Eigakan de mitai desu.", es: "Quiero ver en el cine.", accept: ["えいがかんでみたいです", "えいがかんでみたい"], dynamic: null }
        },
        {
          ai: { ja: "日曜日は どうですか。土曜日は べんきょうしたくないですか。", jaPlain: "にちようびはどうですか。どようびはべんきょうしたくないですか。", romaji: "Nichiyoubi wa dou desu ka. Doyoubi wa benkyou shitakunai desu ka.", es: "¿Qué tal el domingo? ¿No quieres estudiar el sábado?" },
          task: "Di que no quieres estudiar el sábado. El domingo está bien.",
          expect: { ja: "土曜日は べんきょうしたくないです。日曜日が いいです。", jaPlain: "どようびはべんきょうしたくないです。にちようびがいいです。", romaji: "Doyoubi wa benkyou shitakunai desu. Nichiyoubi ga ii desu.", es: "No quiero estudiar el sábado. El domingo está bien.", accept: ["べんきょうしたくないです", "にちようびがいいです", "したくない"], dynamic: null }
        },
        {
          ai: { ja: "わかりました。日曜日に 映画を 見ましょう！何が 食べたいですか。", jaPlain: "わかりました。にちようびにえいがをみましょう。なにがたべたいですか。", romaji: "Wakarimashita. Nichiyoubi ni eiga o mimashou! Nani ga tabetai desu ka.", es: "Entendido. ¡Veamos la película el domingo! ¿Qué quieres comer?" },
          task: "Di que quieres comer ramen.",
          expect: { ja: "ラーメンが 食べたいです。", jaPlain: "らーめんがたべたいです。", romaji: "Raamen ga tabetai desu.", es: "Quiero comer ramen.", accept: ["らーめんがたべたいです", "らーめんたべたい", "らーめんがたべたい"], dynamic: null }
        }
      ]
    },
    /* 会話2 — レストランで食べたいもの */
    {
      settingEs: "Estás en un restaurante japonés con tu amiga. Miran el menú juntos.",
      closingJa: "おいしそうですね。たのしみましょう！",
      closingEs: "¡Se ve delicioso! ¡Disfrutemos!",
      steps: [
        {
          ai: { ja: "メニューが たくさん ありますね。何が 食べたいですか。", jaPlain: "めにゅーがたくさんありますね。なにがたべたいですか。", romaji: "Menyuu ga takusan arimasu ne. Nani ga tabetai desu ka.", es: "Hay mucho en el menú. ¿Qué quieres comer?" },
          task: "Di que quieres comer sushi.",
          expect: { ja: "おすしが 食べたいです。", jaPlain: "おすしがたべたいです。", romaji: "Osushi ga tabetai desu.", es: "Quiero comer sushi.", accept: ["おすしがたべたいです", "すしがたべたい", "すしたべたい"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！飲み物は？何が 飲みたいですか。", jaPlain: "いいですね。のみものは。なにがのみたいですか。", romaji: "Ii desu ne! Nomimono wa? Nani ga nomitai desu ka.", es: "¡Bien! ¿Y de bebida? ¿Qué quieres tomar?" },
          task: "Di que quieres tomar té verde.",
          expect: { ja: "おちゃが 飲みたいです。", jaPlain: "おちゃがのみたいです。", romaji: "Ocha ga nomitai desu.", es: "Quiero tomar té verde.", accept: ["おちゃがのみたいです", "おちゃのみたい", "おちゃがのみたい"], dynamic: null }
        },
        {
          ai: { ja: "デザートも 食べたいですか。ケーキが ありますよ。", jaPlain: "でざーともたべたいですか。けーきがありますよ。", romaji: "Dezaato mo tabetai desu ka. Keeki ga arimasu yo.", es: "¿También quieres postre? Hay pastel." },
          task: "Di que no quieres postre (おなかがいっぱい).",
          expect: { ja: "デザートは 食べたくないです。おなかが いっぱいです。", jaPlain: "でざーとはたべたくないです。おなかがいっぱいです。", romaji: "Dezaato wa tabetakunai desu. Onaka ga ippai desu.", es: "No quiero postre. Estoy lleno/a.", accept: ["たべたくないです", "たべたくない", "いっぱい"], dynamic: null }
        },
        {
          ai: { ja: "わかりました（笑／risa）。じゃあ、おすしと おちゃを たのみましょう！", jaPlain: "わかりました。じゃあ、おすしとおちゃをたのみましょう。", romaji: "Wakarimashita (risa). Jaa, osushi to ocha o tanomimashou!", es: "Entendido (risa). ¡Entonces pidamos sushi y té!" },
          task: "Acepta: \"Sí, pidamos.\"",
          expect: { ja: "はい、たのみましょう。", jaPlain: "はい、たのみましょう。", romaji: "Hai, tanomimashou.", es: "Sí, pidamos.", accept: ["たのみましょう"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 将来の夢（べんきょう・しごと） */
    {
      settingEs: "Hablas con tu profesora sobre tus metas y lo que te gustaría hacer en el futuro.",
      closingJa: "すてきな ゆめですね。がんばってください！",
      closingEs: "¡Es un sueño bonito! ¡Ánimo!",
      steps: [
        {
          ai: { ja: "しょうらい、何を したいですか。", jaPlain: "しょうらい、なにをしたいですか。", romaji: "Shourai, nani o shitai desu ka.", es: "¿Qué quieres hacer en el futuro?" },
          task: "Di que quieres estudiar en Japón (にほんで べんきょうしたい).",
          expect: { ja: "にほんで べんきょうしたいです。", jaPlain: "にほんでべんきょうしたいです。", romaji: "Nihon de benkyou shitai desu.", es: "Quiero estudiar en Japón.", accept: ["にほんでべんきょうしたいです", "べんきょうしたい", "にほんでべんきょうしたい"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！にほんで 何を べんきょうしたいですか。", jaPlain: "いいですね。にほんでなにをべんきょうしたいですか。", romaji: "Ii desu ne! Nihon de nani o benkyou shitai desu ka.", es: "¡Genial! ¿Qué quieres estudiar en Japón?" },
          task: "Di que quieres estudiar japonés.",
          expect: { ja: "にほんごを べんきょうしたいです。", jaPlain: "にほんごをべんきょうしたいです。", romaji: "Nihongo o benkyou shitai desu.", es: "Quiero estudiar japonés.", accept: ["にほんごをべんきょうしたいです", "にほんごべんきょうしたい", "にほんごをべんきょうしたい"], dynamic: null }
        },
        {
          ai: { ja: "すばらしいですね。にほんで どこに 行きたいですか。", jaPlain: "すばらしいですね。にほんでどこにいきたいですか。", romaji: "Subarashii desu ne. Nihon de doko ni ikitai desu ka.", es: "¡Increíble! ¿A dónde quieres ir en Japón?" },
          task: "Di que quieres ir a Tokio.",
          expect: { ja: "とうきょうに 行きたいです。", jaPlain: "とうきょうにいきたいです。", romaji: "Toukyou ni ikitai desu.", es: "Quiero ir a Tokio.", accept: ["とうきょうにいきたいです", "とうきょういきたい", "とうきょうにいきたい"], dynamic: null }
        },
        {
          ai: { ja: "とうきょうは たのしいですよ！おいしい ものも 食べたいですか。", jaPlain: "とうきょうはたのしいですよ。おいしいものもたべたいですか。", romaji: "Toukyou wa tanoshii desu yo! Oishii mono mo tabetai desu ka.", es: "¡Tokio es divertido! ¿También quieres comer cosas ricas?" },
          task: "Di que sí, quieres comer ramen y sushi.",
          expect: { ja: "はい、ラーメンと おすしが 食べたいです。", jaPlain: "はい、らーめんとおすしがたべたいです。", romaji: "Hai, raamen to osushi ga tabetai desu.", es: "Sí, quiero comer ramen y sushi.", accept: ["らーめんとおすしがたべたい", "たべたいです", "らーめんとすし"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u7_c3: 〜にいきます・きます（目的移動）---------- */
  "u7_c3": [
    /* 会話1 — スーパーへ買い物に行く */
    {
      settingEs: "Tu amiga te pregunta a dónde vas esta tarde.",
      closingJa: "いってらっしゃい！",
      closingEs: "¡Buen viaje!",
      steps: [
        {
          ai: { ja: "きょうの ごご、どこに 行きますか。", jaPlain: "きょうのごご、どこにいきますか。", romaji: "Kyou no gogo, doko ni ikimasu ka.", es: "¿A dónde vas esta tarde?" },
          task: "Di que vas al súper a comprar verduras (やさいを 買いに).",
          expect: { ja: "スーパーに やさいを 買いに 行きます。", jaPlain: "すーぱーにやさいをかいにいきます。", romaji: "Suupaa ni yasai o kai ni ikimasu.", es: "Voy al súper a comprar verduras.", accept: ["すーぱーにやさいをかいにいきます", "やさいをかいにいきます", "かいにいきます"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。何を つくりますか。", jaPlain: "いいですね。なにをつくりますか。", romaji: "Ii desu ne. Nani o tsukurimasu ka.", es: "Qué bien. ¿Qué vas a cocinar?" },
          task: "Di que vas a cocinar curry (カレーを つくります).",
          expect: { ja: "カレーを つくります。", jaPlain: "かれーをつくります。", romaji: "Karee o tsukurimasu.", es: "Voy a cocinar curry.", accept: ["かれーをつくります", "かれーつくります"], dynamic: null }
        },
        {
          ai: { ja: "おいしそう！わたしも スーパーに くだものを 買いに 行きたいです。", jaPlain: "おいしそう。わたしもすーぱーにくだものをかいにいきたいです。", romaji: "Oishisou! Watashi mo suupaa ni kudamono o kai ni ikitai desu.", es: "¡Suena delicioso! Yo también quiero ir al súper a comprar fruta." },
          task: "Invítala: \"¿Vamos juntos al súper?\"",
          expect: { ja: "いっしょに スーパーに 行きましょう。", jaPlain: "いっしょにすーぱーにいきましょう。", romaji: "Issho ni suupaa ni ikimashou.", es: "Vamos juntos al súper.", accept: ["いっしょにすーぱーにいきましょう", "いっしょにいきましょう"], dynamic: null }
        },
        {
          ai: { ja: "ありがとう！じゃあ、三時に 行きましょう。", jaPlain: "ありがとう。じゃあ、さんじにいきましょう。", romaji: "Arigatou! Jaa, sanji ni ikimashou.", es: "¡Gracias! Entonces vamos a las 3." },
          task: "Acepta: \"Sí, vamos a las 3.\"",
          expect: { ja: "はい、三時に 行きましょう。", jaPlain: "はい、さんじにいきましょう。", romaji: "Hai, sanji ni ikimashou.", es: "Sí, vamos a las 3.", accept: ["さんじにいきましょう", "いきましょう"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 図書館へ勉強しに行く */
    {
      settingEs: "Tu compañero de clase te pregunta qué harás después de clase.",
      closingJa: "がんばって べんきょうしましょう！",
      closingEs: "¡Estudiemos con ganas!",
      steps: [
        {
          ai: { ja: "じゅぎょうの あとで、何を しますか。", jaPlain: "じゅぎょうのあとで、なにをしますか。", romaji: "Jugyou no ato de, nani o shimasu ka.", es: "¿Qué harás después de clase?" },
          task: "Di que vas a la biblioteca a estudiar.",
          expect: { ja: "図書館に べんきょうしに 行きます。", jaPlain: "としょかんにべんきょうしにいきます。", romaji: "Toshokan ni benkyou shi ni ikimasu.", es: "Voy a la biblioteca a estudiar.", accept: ["としょかんにべんきょうしにいきます", "べんきょうしにいきます"], dynamic: null }
        },
        {
          ai: { ja: "何を べんきょうしますか。", jaPlain: "なにをべんきょうしますか。", romaji: "Nani o benkyou shimasu ka.", es: "¿Qué estudiarás?" },
          task: "Di que vas a estudiar japonés.",
          expect: { ja: "にほんごを べんきょうします。", jaPlain: "にほんごをべんきょうします。", romaji: "Nihongo o benkyou shimasu.", es: "Voy a estudiar japonés.", accept: ["にほんごをべんきょうします", "にほんごべんきょうします"], dynamic: null }
        },
        {
          ai: { ja: "わたしも にほんごの しけんが ありますから、いっしょに 行きましょうか。", jaPlain: "わたしもにほんごのしけんがありますから、いっしょにいきましょうか。", romaji: "Watashi mo nihongo no shiken ga arimasu kara, issho ni ikimashou ka.", es: "Yo también tengo examen de japonés, ¿vamos juntos?" },
          task: "Acepta: \"Sí, vamos juntos.\"",
          expect: { ja: "はい、いっしょに 行きましょう。", jaPlain: "はい、いっしょにいきましょう。", romaji: "Hai, issho ni ikimashou.", es: "Sí, vamos juntos.", accept: ["いっしょにいきましょう", "いきましょう"], dynamic: null }
        },
        {
          ai: { ja: "べんきょうの あとで、カフェに コーヒーを 飲みに 行きませんか。", jaPlain: "べんきょうのあとで、かふぇにこーひーをのみにいきませんか。", romaji: "Benkyou no ato de, kafe ni koohii o nomi ni ikimasen ka.", es: "Después de estudiar, ¿vamos al café a tomar un café?" },
          task: "Acepta la invitación: \"Sí, vamos a tomar café.\"",
          expect: { ja: "はい、コーヒーを 飲みに 行きましょう。", jaPlain: "はい、こーひーをのみにいきましょう。", romaji: "Hai, koohii o nomi ni ikimashou.", es: "Sí, vamos a tomar café.", accept: ["こーひーをのみにいきましょう", "のみにいきましょう", "いきましょう"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 友達の家に遊びに来る */
    {
      settingEs: "Tu amiga Yuki te invita a su casa este fin de semana.",
      closingJa: "まっていますね！たのしみ！",
      closingEs: "¡Te espero! ¡Será divertido!",
      steps: [
        {
          ai: { ja: "土曜日、うちに あそびに 来ませんか。", jaPlain: "どようび、うちにあそびにきませんか。", romaji: "Doyoubi, uchi ni asobi ni kimasen ka.", es: "¿Vienes a mi casa a jugar el sábado?" },
          task: "Acepta la invitación: \"Sí, voy a jugar a tu casa.\"",
          expect: { ja: "はい、あそびに 行きます。", jaPlain: "はい、あそびにいきます。", romaji: "Hai, asobi ni ikimasu.", es: "Sí, voy a jugar.", accept: ["あそびにいきます", "いきます"], dynamic: null }
        },
        {
          ai: { ja: "うれしい！いっしょに にほんの りょうりを つくりに 来ませんか。", jaPlain: "うれしい。いっしょににほんのりょうりをつくりにきませんか。", romaji: "Ureshii! Issho ni nihon no ryouri o tsukuri ni kimasen ka.", es: "¡Qué bien! ¿Vienes a cocinar comida japonesa juntos?" },
          task: "Acepta: \"Sí, quiero ir a cocinar.\"",
          expect: { ja: "はい、つくりに 行きたいです。", jaPlain: "はい、つくりにいきたいです。", romaji: "Hai, tsukuri ni ikitai desu.", es: "Sí, quiero ir a cocinar.", accept: ["つくりにいきたいです", "つくりにいきたい"], dynamic: null }
        },
        {
          ai: { ja: "何を 作りましょうか。カレーと おにぎり、どっちが いいですか。", jaPlain: "なにをつくりましょうか。かれーとおにぎり、どっちがいいですか。", romaji: "Nani o tsukurimashou ka. Karee to onigiri, docchi ga ii desu ka.", es: "¿Qué cocinamos? ¿Curry u onigiri?" },
          task: "Di que quieres hacer onigiri.",
          expect: { ja: "おにぎりを つくりましょう。", jaPlain: "おにぎりをつくりましょう。", romaji: "Onigiri o tsukurimashou.", es: "Hagamos onigiri.", accept: ["おにぎりをつくりましょう", "おにぎりがいいです", "おにぎり"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！じゃあ、土曜日の 十時に 来てください。", jaPlain: "いいですね。じゃあ、どようびのじゅうじにきてください。", romaji: "Ii desu ne! Jaa, doyoubi no juuji ni kite kudasai.", es: "¡Bien! Entonces ven a las 10 del sábado." },
          task: "Di \"Entendido. Voy a las 10.\"",
          expect: { ja: "わかりました。十時に 行きます。", jaPlain: "わかりました。じゅうじにいきます。", romaji: "Wakarimashita. Juuji ni ikimasu.", es: "Entendido. Voy a las 10.", accept: ["わかりました", "じゅうじにいきます"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u7_c4: 〜前に・〜後で（順序）---------- */
  "u7_c4": [
    /* 会話1 — 朝のルーティン（ごはん前に手を洗う） */
    {
      settingEs: "Tu profesora te pregunta sobre tu rutina de la mañana.",
      closingJa: "いい しゅうかんですね！",
      closingEs: "¡Buena costumbre!",
      steps: [
        {
          ai: { ja: "あさ、ごはんの 前に 何を しますか。", jaPlain: "あさ、ごはんのまえになにをしますか。", romaji: "Asa, gohan no mae ni nani o shimasu ka.", es: "¿Qué haces antes de desayunar?" },
          task: "Di que te lavas las manos antes de comer (手を あらいます).",
          expect: { ja: "ごはんの 前に、手を あらいます。", jaPlain: "ごはんのまえに、てをあらいます。", romaji: "Gohan no mae ni, te o araimasu.", es: "Me lavo las manos antes de comer.", accept: ["ごはんのまえにてをあらいます", "てをあらいます", "まえにてをあらいます"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！ごはんの 後で、何を しますか。", jaPlain: "いいですね。ごはんのあとで、なにをしますか。", romaji: "Ii desu ne! Gohan no ato de, nani o shimasu ka.", es: "¡Bien! ¿Qué haces después de comer?" },
          task: "Di que te cepillas los dientes (はを みがきます).",
          expect: { ja: "ごはんの 後で、はを みがきます。", jaPlain: "ごはんのあとで、はをみがきます。", romaji: "Gohan no ato de, ha o migakimasu.", es: "Me cepillo los dientes después de comer.", accept: ["ごはんのあとではをみがきます", "はをみがきます", "あとではをみがきます"], dynamic: null }
        },
        {
          ai: { ja: "すばらしい！学校に 行く 前に、何を しますか。", jaPlain: "すばらしい。がっこうにいくまえに、なにをしますか。", romaji: "Subarashii! Gakkou ni iku mae ni, nani o shimasu ka.", es: "¡Excelente! ¿Qué haces antes de ir a la escuela?" },
          task: "Di que repasas japonés (にほんごを ふくしゅうします).",
          expect: { ja: "学校に 行く 前に、にほんごを ふくしゅうします。", jaPlain: "がっこうにいくまえに、にほんごをふくしゅうします。", romaji: "Gakkou ni iku mae ni, nihongo o fukushuu shimasu.", es: "Repaso japonés antes de ir a la escuela.", accept: ["にほんごをふくしゅうします", "まえににほんごをふくしゅうします", "ふくしゅうします"], dynamic: null }
        },
        {
          ai: { ja: "えらいですね！学校の 後で、何を したいですか。", jaPlain: "えらいですね。がっこうのあとで、なにをしたいですか。", romaji: "Erai desu ne! Gakkou no ato de, nani o shitai desu ka.", es: "¡Qué responsable! ¿Qué quieres hacer después de la escuela?" },
          task: "Di que quieres ir al parque a jugar.",
          expect: { ja: "公園に あそびに 行きたいです。", jaPlain: "こうえんにあそびにいきたいです。", romaji: "Kouen ni asobi ni ikitai desu.", es: "Quiero ir al parque a jugar.", accept: ["こうえんにあそびにいきたいです", "あそびにいきたい"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 授業の前後（べんきょう） */
    {
      settingEs: "Hablas con tu compañero de clase sobre sus hábitos de estudio.",
      closingJa: "いい べんきょうの しかたですね！",
      closingEs: "¡Buen método de estudio!",
      steps: [
        {
          ai: { ja: "じゅぎょうの 前に、何を しますか。", jaPlain: "じゅぎょうのまえに、なにをしますか。", romaji: "Jugyou no mae ni, nani o shimasu ka.", es: "¿Qué haces antes de clase?" },
          task: "Di que lees el libro de texto (きょうかしょを よみます).",
          expect: { ja: "じゅぎょうの 前に、きょうかしょを 読みます。", jaPlain: "じゅぎょうのまえに、きょうかしょをよみます。", romaji: "Jugyou no mae ni, kyoukasho o yomimasu.", es: "Leo el libro de texto antes de clase.", accept: ["きょうかしょをよみます", "まえにきょうかしょをよみます"], dynamic: null }
        },
        {
          ai: { ja: "えらいですね。じゅぎょうの 後で、何を しますか。", jaPlain: "えらいですね。じゅぎょうのあとで、なにをしますか。", romaji: "Erai desu ne. Jugyou no ato de, nani o shimasu ka.", es: "Qué responsable. ¿Qué haces después de clase?" },
          task: "Di que repasas las notas (ノートを ふくしゅうします).",
          expect: { ja: "じゅぎょうの 後で、ノートを ふくしゅうします。", jaPlain: "じゅぎょうのあとで、のーとをふくしゅうします。", romaji: "Jugyou no ato de, nooto o fukushuu shimasu.", es: "Repaso las notas después de clase.", accept: ["のーとをふくしゅうします", "あとでのーとをふくしゅうします", "ふくしゅうします"], dynamic: null }
        },
        {
          ai: { ja: "テストの 前に、たくさん べんきょうしますか。", jaPlain: "てすとのまえに、たくさんべんきょうしますか。", romaji: "Tesuto no mae ni, takusan benkyou shimasu ka.", es: "¿Estudias mucho antes del examen?" },
          task: "Di que sí, estudias mucho antes del examen.",
          expect: { ja: "はい、テストの 前に たくさん べんきょうします。", jaPlain: "はい、てすとのまえにたくさんべんきょうします。", romaji: "Hai, tesuto no mae ni takusan benkyou shimasu.", es: "Sí, estudio mucho antes del examen.", accept: ["てすとのまえにたくさんべんきょうします", "たくさんべんきょうします"], dynamic: null }
        },
        {
          ai: { ja: "テストの 後で、何を しますか。", jaPlain: "てすとのあとで、なにをしますか。", romaji: "Tesuto no ato de, nani o shimasu ka.", es: "¿Qué haces después del examen?" },
          task: "Di que quieres ir a comer con amigos.",
          expect: { ja: "友だちと ごはんを 食べに 行きたいです。", jaPlain: "ともだちとごはんをたべにいきたいです。", romaji: "Tomodachi to gohan o tabe ni ikitai desu.", es: "Quiero ir a comer con mis amigos.", accept: ["ともだちとごはんをたべにいきたいです", "たべにいきたい", "ごはんをたべにいきたい"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 旅行の準備（出発前に） */
    {
      settingEs: "Vas a viajar a Japón la próxima semana. Tu amigo te pregunta sobre tus preparativos.",
      closingJa: "じゅんびが できましたね。いい 旅行に なりますよ！",
      closingEs: "¡Ya estás listo! ¡Será un buen viaje!",
      steps: [
        {
          ai: { ja: "らいしゅう にほんに 行きますね！旅行の 前に、何を しますか。", jaPlain: "らいしゅうにほんにいきますね。りょこうのまえに、なにをしますか。", romaji: "Raishuu nihon ni ikimasu ne! Ryokou no mae ni, nani o shimasu ka.", es: "¡Vas a Japón la próxima semana! ¿Qué haces antes del viaje?" },
          task: "Di que compras regalos antes del viaje (おみやげを 買います).",
          expect: { ja: "旅行の 前に、おみやげを 買います。", jaPlain: "りょこうのまえに、おみやげをかいます。", romaji: "Ryokou no mae ni, omiyage o kaimasu.", es: "Compro regalos antes del viaje.", accept: ["りょこうのまえにおみやげをかいます", "おみやげをかいます", "まえにおみやげをかいます"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！ひこうきに のる 前に、何を しますか。", jaPlain: "いいですね。ひこうきにのるまえに、なにをしますか。", romaji: "Ii desu ne! Hikouki ni noru mae ni, nani o shimasu ka.", es: "¡Bien! ¿Qué haces antes de subir al avión?" },
          task: "Di que comes algo (何か 食べます).",
          expect: { ja: "ひこうきに のる 前に、何か 食べます。", jaPlain: "ひこうきにのるまえに、なにかたべます。", romaji: "Hikouki ni noru mae ni, nanika tabemasu.", es: "Como algo antes de subir al avión.", accept: ["ひこうきにのるまえになにかたべます", "なにかたべます", "まえになにかたべます"], dynamic: null }
        },
        {
          ai: { ja: "にほんに ついた 後で、何を したいですか。", jaPlain: "にほんについたあとで、なにをしたいですか。", romaji: "Nihon ni tsuita ato de, nani o shitai desu ka.", es: "Después de llegar a Japón, ¿qué quieres hacer?" },
          task: "Di que quieres ir a comer ramen.",
          expect: { ja: "ラーメンを 食べに 行きたいです。", jaPlain: "らーめんをたべにいきたいです。", romaji: "Raamen o tabe ni ikitai desu.", es: "Quiero ir a comer ramen.", accept: ["らーめんをたべにいきたいです", "たべにいきたい", "らーめんたべたい"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！旅行の 後で、写真を 見せてくださいね。", jaPlain: "いいですね。りょこうのあとで、しゃしんをみせてくださいね。", romaji: "Ii desu ne! Ryokou no ato de, shashin o misete kudasai ne.", es: "¡Bien! Después del viaje, muéstrame las fotos." },
          task: "Acepta: \"Sí. Después del viaje, le muestro las fotos.\"",
          expect: { ja: "はい。旅行の 後で、写真を 見せます。", jaPlain: "はい。りょこうのあとで、しゃしんをみせます。", romaji: "Hai. Ryokou no ato de, shashin o misemasu.", es: "Sí. Después del viaje, le muestro las fotos.", accept: ["りょこうのあとでしゃしんをみせます", "しゃしんをみせます", "みせます"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u7_c5: 一日のスケジュール（Unit 7まとめ・5会話）---------- */
  "u7_c5": [
    /* 会話1 — 平日のスケジュール */
    {
      settingEs: "Tu profesora te pregunta sobre tu horario de un día normal entre semana.",
      closingJa: "いそがしい いちにちですね。がんばってください！",
      closingEs: "¡Un día ajetreado! ¡Ánimo!",
      steps: [
        {
          ai: { ja: "あさ、何時に おきますか。おきた 後で、何を しますか。", jaPlain: "あさ、なんじにおきますか。おきたあとで、なにをしますか。", romaji: "Asa, nanji ni okimasu ka. Okita ato de, nani o shimasu ka.", es: "¿A qué hora te levantas? Después de levantarte, ¿qué haces?" },
          task: "Di que te levantas a las 7 y después de levantarte desayunas.",
          expect: { ja: "七時に おきます。おきた 後で、あさごはんを 食べます。", jaPlain: "しちじにおきます。おきたあとで、あさごはんをたべます。", romaji: "Shichiji ni okimasu. Okita ato de, asagohan o tabemasu.", es: "Me levanto a las 7. Después de levantarme, desayuno.", accept: ["しちじにおきます", "あさごはんをたべます", "おきたあとで"], dynamic: null }
        },
        {
          ai: { ja: "学校に 行く 前に、何を しますか。", jaPlain: "がっこうにいくまえに、なにをしますか。", romaji: "Gakkou ni iku mae ni, nani o shimasu ka.", es: "¿Qué haces antes de ir a la escuela?" },
          task: "Di que estudias japonés antes de ir a la escuela.",
          expect: { ja: "学校に 行く 前に、にほんごを べんきょうします。", jaPlain: "がっこうにいくまえに、にほんごをべんきょうします。", romaji: "Gakkou ni iku mae ni, nihongo o benkyou shimasu.", es: "Estudio japonés antes de ir a la escuela.", accept: ["がっこうにいくまえににほんごをべんきょうします", "にほんごをべんきょうします"], dynamic: null }
        },
        {
          ai: { ja: "えらいですね！ひるやすみに 何を したいですか。", jaPlain: "えらいですね。ひるやすみになにをしたいですか。", romaji: "Erai desu ne! Hiruyasumi ni nani o shitai desu ka.", es: "¡Qué responsable! ¿Qué quieres hacer en el almuerzo?" },
          task: "Di que quieres comer con amigos en la cafetería.",
          expect: { ja: "友だちと 食堂で ごはんを 食べたいです。", jaPlain: "ともだちとしょくどうでごはんをたべたいです。", romaji: "Tomodachi to shokudou de gohan o tabetai desu.", es: "Quiero comer con amigos en la cafetería.", accept: ["ともだちとしょくどうでごはんをたべたいです", "しょくどうでたべたい", "ともだちとたべたい"], dynamic: null }
        },
        {
          ai: { ja: "じゅぎょうの 後で、何を しますか。", jaPlain: "じゅぎょうのあとで、なにをしますか。", romaji: "Jugyou no ato de, nani o shimasu ka.", es: "¿Qué haces después de clase?" },
          task: "Di que vas a la biblioteca a estudiar, y después quieres ir al café.",
          expect: { ja: "図書館に べんきょうしに 行きます。その 後で、カフェに 行きたいです。", jaPlain: "としょかんにべんきょうしにいきます。そのあとで、かふぇにいきたいです。", romaji: "Toshokan ni benkyou shi ni ikimasu. Sono ato de, kafe ni ikitai desu.", es: "Voy a la biblioteca a estudiar. Después quiero ir al café.", accept: ["としょかんにべんきょうしにいきます", "かふぇにいきたい", "べんきょうしにいきます"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 週末のプラン */
    {
      settingEs: "Tu amigo te pregunta sobre tus planes para el fin de semana.",
      closingJa: "たのしい しゅうまつに なりそうですね！",
      closingEs: "¡Suena como un fin de semana divertido!",
      steps: [
        {
          ai: { ja: "しゅうまつ、何を したいですか。", jaPlain: "しゅうまつ、なにをしたいですか。", romaji: "Shuumatsu, nani o shitai desu ka.", es: "¿Qué quieres hacer el fin de semana?" },
          task: "Di que quieres ir de compras (買い物に 行きたい).",
          expect: { ja: "買い物に 行きたいです。", jaPlain: "かいものにいきたいです。", romaji: "Kaimono ni ikitai desu.", es: "Quiero ir de compras.", accept: ["かいものにいきたいです", "かいものにいきたい"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！買い物の 前に、何を しますか。", jaPlain: "いいですね。かいもののまえに、なにをしますか。", romaji: "Ii desu ne! Kaimono no mae ni, nani o shimasu ka.", es: "¡Bien! ¿Qué haces antes de ir de compras?" },
          task: "Di que limpias tu habitación antes de ir de compras.",
          expect: { ja: "買い物の 前に、へやを そうじします。", jaPlain: "かいもののまえに、へやをそうじします。", romaji: "Kaimono no mae ni, heya o souji shimasu.", es: "Limpio mi habitación antes de ir de compras.", accept: ["かいもののまえにへやをそうじします", "へやをそうじします"], dynamic: null }
        },
        {
          ai: { ja: "えらいですね。買い物の 後で、何を しましょうか。", jaPlain: "えらいですね。かいもののあとで、なにをしましょうか。", romaji: "Erai desu ne. Kaimono no ato de, nani o shimashou ka.", es: "Qué bueno. Después de compras, ¿qué hacemos?" },
          task: "Sugiere ir a comer juntos.",
          expect: { ja: "いっしょに ごはんを 食べに 行きましょう。", jaPlain: "いっしょにごはんをたべにいきましょう。", romaji: "Issho ni gohan o tabe ni ikimashou.", es: "Vamos a comer juntos.", accept: ["いっしょにごはんをたべにいきましょう", "たべにいきましょう", "ごはんたべましょう"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！何が 食べたいですか。", jaPlain: "いいですね。なにがたべたいですか。", romaji: "Ii desu ne! Nani ga tabetai desu ka.", es: "¡Bien! ¿Qué quieres comer?" },
          task: "Di que quieres comer curry.",
          expect: { ja: "カレーが 食べたいです。", jaPlain: "かれーがたべたいです。", romaji: "Karee ga tabetai desu.", es: "Quiero comer curry.", accept: ["かれーがたべたいです", "かれーたべたい", "かれーがたべたい"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 友達との一日（総合・ましょう＋たい＋にいく＋まえに） */
    {
      settingEs: "Planeas un día completo con tu amiga. Combina todas las expresiones del Unit 7.",
      closingJa: "さいこうの いちにちに なりましたね！",
      closingEs: "¡Fue un día increíble!",
      steps: [
        {
          ai: { ja: "きょう、いっしょに 何を しましょうか。", jaPlain: "きょう、いっしょになにをしましょうか。", romaji: "Kyou, issho ni nani o shimashou ka.", es: "¿Qué hacemos juntos hoy?" },
          task: "Sugiere ir al parque a jugar.",
          expect: { ja: "公園に あそびに 行きましょう。", jaPlain: "こうえんにあそびにいきましょう。", romaji: "Kouen ni asobi ni ikimashou.", es: "Vamos al parque a jugar.", accept: ["こうえんにあそびにいきましょう", "あそびにいきましょう"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！公園に 行く 前に、おべんとうを つくりましょうか。", jaPlain: "いいですね。こうえんにいくまえに、おべんとうをつくりましょうか。", romaji: "Ii desu ne! Kouen ni iku mae ni, obentou o tsukurimashou ka.", es: "¡Bien! Antes de ir al parque, ¿hacemos un bentō?" },
          task: "Acepta: \"Sí, hagamos un bentō.\"",
          expect: { ja: "はい、おべんとうを つくりましょう。", jaPlain: "はい、おべんとうをつくりましょう。", romaji: "Hai, obentou o tsukurimashou.", es: "Sí, hagamos un bentō.", accept: ["おべんとうをつくりましょう", "つくりましょう"], dynamic: null }
        },
        {
          ai: { ja: "おべんとうの 中に 何を 入れたいですか。", jaPlain: "おべんとうのなかになにをいれたいですか。", romaji: "Obentou no naka ni nani o iretai desu ka.", es: "¿Qué quieres poner en el bentō?" },
          task: "Di que quieres poner onigiri y fruta.",
          expect: { ja: "おにぎりと くだものを 入れたいです。", jaPlain: "おにぎりとくだものをいれたいです。", romaji: "Onigiri to kudamono o iretai desu.", es: "Quiero poner onigiri y fruta.", accept: ["おにぎりとくだものをいれたいです", "いれたいです", "おにぎりとくだもの"], dynamic: null }
        },
        {
          ai: { ja: "おいしそう！あそんだ 後で、カフェに コーヒーを 飲みに 行きませんか。", jaPlain: "おいしそう。あそんだあとで、かふぇにこーひーをのみにいきませんか。", romaji: "Oishisou! Asonda ato de, kafe ni koohii o nomi ni ikimasen ka.", es: "¡Suena rico! Después de jugar, ¿vamos al café a tomar un café?" },
          task: "Acepta la invitación.",
          expect: { ja: "はい、コーヒーを 飲みに 行きましょう。", jaPlain: "はい、こーひーをのみにいきましょう。", romaji: "Hai, koohii o nomi ni ikimashou.", es: "Sí, vamos a tomar café.", accept: ["こーひーをのみにいきましょう", "のみにいきましょう", "いきましょう"], dynamic: null }
        }
      ]
    },
    /* 会話4 — 日曜日の予定（たい＋まえに＋にいく） */
    {
      settingEs: "Tu amigo te pregunta qué harás el domingo.",
      closingJa: "すてきな 日曜日ですね！",
      closingEs: "¡Bonito domingo!",
      steps: [
        {
          ai: { ja: "日曜日、どこに 行きたいですか。", jaPlain: "にちようび、どこにいきたいですか。", romaji: "Nichiyoubi, doko ni ikitai desu ka.", es: "¿A dónde quieres ir el domingo?" },
          task: "Di que quieres ir al acuario (すいぞくかん).",
          expect: { ja: "すいぞくかんに 行きたいです。", jaPlain: "すいぞくかんにいきたいです。", romaji: "Suizokukan ni ikitai desu.", es: "Quiero ir al acuario.", accept: ["すいぞくかんにいきたいです", "すいぞくかんにいきたい"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！すいぞくかんに 行く 前に、何を しましょうか。", jaPlain: "いいですね。すいぞくかんにいくまえに、なにをしましょうか。", romaji: "Ii desu ne! Suizokukan ni iku mae ni, nani o shimashou ka.", es: "¡Bien! Antes de ir al acuario, ¿qué hacemos?" },
          task: "Di que desayunemos juntos antes.",
          expect: { ja: "いっしょに あさごはんを 食べましょう。", jaPlain: "いっしょにあさごはんをたべましょう。", romaji: "Issho ni asagohan o tabemashou.", es: "Desayunemos juntos.", accept: ["いっしょにあさごはんをたべましょう", "あさごはんをたべましょう"], dynamic: null }
        },
        {
          ai: { ja: "すいぞくかんで、何を 見たいですか。", jaPlain: "すいぞくかんで、なにをみたいですか。", romaji: "Suizokukan de, nani o mitai desu ka.", es: "¿Qué quieres ver en el acuario?" },
          task: "Di que quieres ver delfines (イルカ).",
          expect: { ja: "イルカを 見たいです。", jaPlain: "いるかをみたいです。", romaji: "Iruka o mitai desu.", es: "Quiero ver delfines.", accept: ["いるかをみたいです", "いるかみたい", "いるかをみたい"], dynamic: null }
        },
        {
          ai: { ja: "すいぞくかんの 後で、何を しましょうか。", jaPlain: "すいぞくかんのあとで、なにをしましょうか。", romaji: "Suizokukan no ato de, nani o shimashou ka.", es: "Después del acuario, ¿qué hacemos?" },
          task: "Sugiere ir a comer sushi.",
          expect: { ja: "おすしを 食べに 行きましょう。", jaPlain: "おすしをたべにいきましょう。", romaji: "Osushi o tabe ni ikimashou.", es: "Vamos a comer sushi.", accept: ["おすしをたべにいきましょう", "たべにいきましょう", "すしたべましょう"], dynamic: null }
        }
      ]
    },
    /* 会話5 — 夏休みの計画（総合フル） */
    {
      settingEs: "Tu profesora te pregunta sobre tus planes para las vacaciones de verano. Usa todas las expresiones aprendidas.",
      closingJa: "すばらしい けいかくですね。いい なつやすみに なりますよ！",
      closingEs: "¡Excelente plan! ¡Serán unas buenas vacaciones!",
      steps: [
        {
          ai: { ja: "なつやすみに 何を したいですか。", jaPlain: "なつやすみになにをしたいですか。", romaji: "Natsuyasumi ni nani o shitai desu ka.", es: "¿Qué quieres hacer en vacaciones de verano?" },
          task: "Di que quieres viajar a Japón.",
          expect: { ja: "にほんに 旅行に 行きたいです。", jaPlain: "にほんにりょこうにいきたいです。", romaji: "Nihon ni ryokou ni ikitai desu.", es: "Quiero viajar a Japón.", accept: ["にほんにりょこうにいきたいです", "にほんにいきたい", "りょこうにいきたい"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！旅行の 前に、何を しますか。", jaPlain: "いいですね。りょこうのまえに、なにをしますか。", romaji: "Ii desu ne! Ryokou no mae ni, nani o shimasu ka.", es: "¡Qué bien! ¿Qué haces antes del viaje?" },
          task: "Di que estudias japonés antes del viaje.",
          expect: { ja: "旅行の 前に、にほんごを べんきょうします。", jaPlain: "りょこうのまえに、にほんごをべんきょうします。", romaji: "Ryokou no mae ni, nihongo o benkyou shimasu.", es: "Estudio japonés antes del viaje.", accept: ["りょこうのまえににほんごをべんきょうします", "にほんごをべんきょうします"], dynamic: null }
        },
        {
          ai: { ja: "にほんで 何を したいですか。", jaPlain: "にほんでなにをしたいですか。", romaji: "Nihon de nani o shitai desu ka.", es: "¿Qué quieres hacer en Japón?" },
          task: "Di que quieres ir a comprar regalos y comer ramen.",
          expect: { ja: "おみやげを 買いに 行きたいです。ラーメンも 食べたいです。", jaPlain: "おみやげをかいにいきたいです。らーめんもたべたいです。", romaji: "Omiyage o kai ni ikitai desu. Raamen mo tabetai desu.", es: "Quiero ir a comprar regalos. También quiero comer ramen.", accept: ["おみやげをかいにいきたい", "らーめんもたべたい", "かいにいきたい"], dynamic: null }
        },
        {
          ai: { ja: "旅行の 後で、何を しましょうか。いっしょに 写真を 見ましょうか。", jaPlain: "りょこうのあとで、なにをしましょうか。いっしょにしゃしんをみましょうか。", romaji: "Ryokou no ato de, nani o shimashou ka. Issho ni shashin o mimashou ka.", es: "Después del viaje, ¿qué hacemos? ¿Vemos las fotos juntos?" },
          task: "Acepta: \"Sí, veamos las fotos juntos.\"",
          expect: { ja: "はい、いっしょに 写真を 見ましょう。", jaPlain: "はい、いっしょにしゃしんをみましょう。", romaji: "Hai, issho ni shashin o mimashou.", es: "Sí, veamos las fotos juntos.", accept: ["いっしょにしゃしんをみましょう", "しゃしんをみましょう"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u7_c7: 〜ことができます（能力・可能）---------- */
  "u7_c7": [
    /* 会話1 — 言語能力（日本語を話せる） */
    {
      settingEs: "Tu nueva compañera de clase te pregunta qué idiomas puedes hablar.",
      closingJa: "すごいですね！いろいろな ことばが できますね！",
      closingEs: "¡Increíble! ¡Puedes hablar varios idiomas!",
      steps: [
        {
          ai: { ja: "にほんごを 話すことが できますか。", jaPlain: "にほんごをはなすことができますか。", romaji: "Nihongo o hanasu koto ga dekimasu ka.", es: "¿Puedes hablar japonés?" },
          task: "Di que sí, un poco (すこし).",
          expect: { ja: "はい、すこし 話すことが できます。", jaPlain: "はい、すこしはなすことができます。", romaji: "Hai, sukoshi hanasu koto ga dekimasu.", es: "Sí, puedo hablar un poco.", accept: ["すこしはなすことができます", "はなすことができます", "すこしできます"], dynamic: null }
        },
        {
          ai: { ja: "すごいですね！スペインごも 話すことが できますか。", jaPlain: "すごいですね。すぺいんごもはなすことができますか。", romaji: "Sugoi desu ne! Supeingo mo hanasu koto ga dekimasu ka.", es: "¡Increíble! ¿También puedes hablar español?" },
          task: "Di que sí, puedes hablar español.",
          expect: { ja: "はい、スペインごを 話すことが できます。", jaPlain: "はい、すぺいんごをはなすことができます。", romaji: "Hai, supeingo o hanasu koto ga dekimasu.", es: "Sí, puedo hablar español.", accept: ["すぺいんごをはなすことができます", "はなすことができます"], dynamic: null }
        },
        {
          ai: { ja: "かんじを 読むことが できますか。", jaPlain: "かんじをよむことができますか。", romaji: "Kanji o yomu koto ga dekimasu ka.", es: "¿Puedes leer kanji?" },
          task: "Di que puedes leer un poco.",
          expect: { ja: "すこし 読むことが できます。", jaPlain: "すこしよむことができます。", romaji: "Sukoshi yomu koto ga dekimasu.", es: "Puedo leer un poco.", accept: ["すこしよむことができます", "よむことができます"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。にほんごの うたを うたうことが できますか。", jaPlain: "いいですね。にほんごのうたをうたうことができますか。", romaji: "Ii desu ne. Nihongo no uta o utau koto ga dekimasu ka.", es: "Bien. ¿Puedes cantar canciones en japonés?" },
          task: "Di que no puedes cantar, pero quieres aprender (ならいたい).",
          expect: { ja: "うたうことは できません。でも、ならいたいです。", jaPlain: "うたうことはできません。でも、ならいたいです。", romaji: "Utau koto wa dekimasen. Demo, naraitai desu.", es: "No puedo cantar. Pero quiero aprender.", accept: ["うたうことはできません", "できません", "ならいたい"], dynamic: null }
        }
      ]
    },
    /* 会話2 — スポーツ（泳げる・走れる） */
    {
      settingEs: "Tu amigo te pregunta sobre qué deportes puedes hacer.",
      closingJa: "スポーツが じょうずですね！",
      closingEs: "¡Eres bueno/a en deportes!",
      steps: [
        {
          ai: { ja: "およぐことが できますか。", jaPlain: "およぐことができますか。", romaji: "Oyogu koto ga dekimasu ka.", es: "¿Puedes nadar?" },
          task: "Di que sí, puedes nadar.",
          expect: { ja: "はい、およぐことが できます。", jaPlain: "はい、およぐことができます。", romaji: "Hai, oyogu koto ga dekimasu.", es: "Sí, puedo nadar.", accept: ["およぐことができます", "できます"], dynamic: null }
        },
        {
          ai: { ja: "すごい！サッカーは じょうずですか。", jaPlain: "すごい。さっかーはじょうずですか。", romaji: "Sugoi! Sakkaa wa jouzu desu ka.", es: "¡Genial! ¿Eres bueno/a en fútbol?" },
          task: "Di que no eres bueno/a, pero puedes jugar un poco (すこし).",
          expect: { ja: "じょうずじゃないですが、すこし できます。", jaPlain: "じょうずじゃないですが、すこしできます。", romaji: "Jouzu ja nai desu ga, sukoshi dekimasu.", es: "No soy bueno/a, pero puedo un poco.", accept: ["じょうずじゃないです", "すこしできます", "じょうずじゃない"], dynamic: null }
        },
        {
          ai: { ja: "りょうりを つくることが できますか。", jaPlain: "りょうりをつくることができますか。", romaji: "Ryouri o tsukuru koto ga dekimasu ka.", es: "¿Puedes cocinar?" },
          task: "Di que puedes hacer curry.",
          expect: { ja: "はい、カレーを つくることが できます。", jaPlain: "はい、かれーをつくることができます。", romaji: "Hai, karee o tsukuru koto ga dekimasu.", es: "Sí, puedo hacer curry.", accept: ["かれーをつくることができます", "つくることができます"], dynamic: null }
        },
        {
          ai: { ja: "おいしそう！こんど いっしょに つくりましょう！", jaPlain: "おいしそう。こんどいっしょにつくりましょう。", romaji: "Oishisou! Kondo issho ni tsukurimashou!", es: "¡Suena delicioso! ¡Hagámoslo juntos la próxima vez!" },
          task: "Acepta: \"Sí, hagámoslo juntos.\"",
          expect: { ja: "はい、いっしょに つくりましょう。", jaPlain: "はい、いっしょにつくりましょう。", romaji: "Hai, issho ni tsukurimashou.", es: "Sí, hagámoslo juntos.", accept: ["いっしょにつくりましょう", "つくりましょう"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 料理（作れる） */
    {
      settingEs: "Tu profesora organiza una fiesta cultural. Te pregunta qué puedes preparar.",
      closingJa: "たのしい パーティーに なりますね！",
      closingEs: "¡Va a ser una fiesta divertida!",
      steps: [
        {
          ai: { ja: "らいしゅう パーティーが あります。りょうりを つくることが できますか。", jaPlain: "らいしゅうぱーてぃーがあります。りょうりをつくることができますか。", romaji: "Raishuu paatii ga arimasu. Ryouri o tsukuru koto ga dekimasu ka.", es: "La próxima semana hay una fiesta. ¿Puedes cocinar?" },
          task: "Di que puedes cocinar comida boliviana.",
          expect: { ja: "はい、ボリビアの りょうりを つくることが できます。", jaPlain: "はい、ぼりびあのりょうりをつくることができます。", romaji: "Hai, boribia no ryouri o tsukuru koto ga dekimasu.", es: "Sí, puedo cocinar comida boliviana.", accept: ["ぼりびあのりょうりをつくることができます", "つくることができます", "りょうりをつくることができます"], dynamic: null }
        },
        {
          ai: { ja: "すてきですね！ギターを ひくことが できますか。音楽も ほしいです。", jaPlain: "すてきですね。ぎたーをひくことができますか。おんがくもほしいです。", romaji: "Suteki desu ne! Gitaa o hiku koto ga dekimasu ka. Ongaku mo hoshii desu.", es: "¡Qué bonito! ¿Puedes tocar guitarra? También queremos música." },
          task: "Di que no puedes tocar guitarra, pero puedes cantar (うたう).",
          expect: { ja: "ギターは ひくことが できません。でも、うたうことが できます。", jaPlain: "ぎたーはひくことができません。でも、うたうことができます。", romaji: "Gitaa wa hiku koto ga dekimasen. Demo, utau koto ga dekimasu.", es: "No puedo tocar guitarra. Pero puedo cantar.", accept: ["ひくことができません", "うたうことができます", "できません"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！にほんごで うたうことが できますか。", jaPlain: "いいですね。にほんごでうたうことができますか。", romaji: "Ii desu ne! Nihongo de utau koto ga dekimasu ka.", es: "¡Bien! ¿Puedes cantar en japonés?" },
          task: "Di que puedes cantar un poco en japonés.",
          expect: { ja: "はい、にほんごで すこし うたうことが できます。", jaPlain: "はい、にほんごですこしうたうことができます。", romaji: "Hai, nihongo de sukoshi utau koto ga dekimasu.", es: "Sí, puedo cantar un poco en japonés.", accept: ["にほんごですこしうたうことができます", "すこしうたうことができます", "うたうことができます"], dynamic: null }
        },
        {
          ai: { ja: "すばらしい！りょうりと うたで、たのしい パーティーに しましょう！", jaPlain: "すばらしい。りょうりとうたで、たのしいぱーてぃーにしましょう。", romaji: "Subarashii! Ryouri to uta de, tanoshii paatii ni shimashou!", es: "¡Maravilloso! ¡Con comida y canciones, hagamos una fiesta divertida!" },
          task: "Acepta: \"Sí, hagamos una fiesta divertida.\"",
          expect: { ja: "はい、たのしい パーティーに しましょう。", jaPlain: "はい、たのしいぱーてぃーにしましょう。", romaji: "Hai, tanoshii paatii ni shimashou.", es: "Sí, hagamos una fiesta divertida.", accept: ["たのしいぱーてぃーにしましょう", "しましょう"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 8: 形容詞で詳しく描写する ===================== */

  /* ---------- u8_c1: 〜くて・で（形容詞をつなげる）---------- */
  "u8_c1": [
    /* 会話1 — 旅行先の街を描写 */
    {
      settingEs: "Hablas con tu amiga sobre la ciudad que visitaste durante las vacaciones. Describe cómo era usando adjetivos conectados.",
      closingJa: "すてきな りょこうでしたね！またいっしょに 行きましょう。",
      closingEs: "¡Fue un viaje genial! Vamos juntos la próxima vez.",
      steps: [
        {
          ai: { ja: "やすみに りょこうしましたか。まちは どうでしたか。", jaPlain: "やすみにりょこうしましたか。まちはどうでしたか。", romaji: "Yasumi ni ryokou shimashita ka. Machi wa dou deshita ka.", es: "¿Viajaste en vacaciones? ¿Cómo era la ciudad?" },
          task: "Di que la ciudad era grande y animada (大きくて、にぎやか).",
          expect: { ja: "まちは 大きくて、にぎやかでした。", jaPlain: "まちはおおきくて、にぎやかでした。", romaji: "Machi wa ookikute, nigiyaka deshita.", es: "La ciudad era grande y animada.", accept: ["おおきくて", "にぎやかでした", "おおきくてにぎやか"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！食べ物は どうでしたか。", jaPlain: "いいですね。たべものはどうでしたか。", romaji: "Ii desu ne! Tabemono wa dou deshita ka.", es: "¡Qué bien! ¿Cómo era la comida?" },
          task: "Di que la comida era barata y deliciosa (やすくて、おいしかった).",
          expect: { ja: "りょうりは やすくて、おいしかったです。", jaPlain: "りょうりはやすくて、おいしかったです。", romaji: "Ryouri wa yasukute, oishikatta desu.", es: "La comida era barata y deliciosa.", accept: ["やすくて", "おいしかったです", "やすくておいしかった"], dynamic: null }
        },
        {
          ai: { ja: "おいしい りょうりは さいこうですね。ホテルは どうでしたか。", jaPlain: "おいしいりょうりはさいこうですね。ほてるはどうでしたか。", romaji: "Oishii ryouri wa saikou desu ne. Hoteru wa dou deshita ka.", es: "¡La comida rica es lo mejor! ¿Y el hotel?" },
          task: "Di que el hotel era limpio y tranquilo (きれいで、しずか).",
          expect: { ja: "ホテルは きれいで、しずかでした。", jaPlain: "ほてるはきれいで、しずかでした。", romaji: "Hoteru wa kirei de, shizuka deshita.", es: "El hotel era limpio y tranquilo.", accept: ["きれいで", "しずかでした", "きれいでしずか"], dynamic: null }
        },
        {
          ai: { ja: "すてきですね！また 行きたいですか。", jaPlain: "すてきですね。またいきたいですか。", romaji: "Suteki desu ne! Mata ikitai desu ka.", es: "¡Qué bonito! ¿Quieres ir otra vez?" },
          task: "Di que te gusta la ciudad y quieres ir de nuevo (すきで、また行きたい).",
          expect: { ja: "はい、まちが すきで、また 行きたいです。", jaPlain: "はい、まちがすきで、またいきたいです。", romaji: "Hai, machi ga suki de, mata ikitai desu.", es: "Sí, me gusta la ciudad y quiero ir otra vez.", accept: ["すきで", "またいきたい", "いきたいです"], dynamic: null }
        }
      ]
    },
    /* 会話2 — レストランの料理 */
    {
      settingEs: "Tu amigo quiere ir a un restaurante nuevo. Le describes cómo es.",
      closingJa: "じゃあ、こんど いっしょに 行きましょう！",
      closingEs: "¡Entonces vamos juntos la próxima vez!",
      steps: [
        {
          ai: { ja: "あたらしい レストランに 行きましたか。みせは どうでしたか。", jaPlain: "あたらしいれすとらんにいきましたか。みせはどうでしたか。", romaji: "Atarashii resutoran ni ikimashita ka. Mise wa dou deshita ka.", es: "¿Fuiste al restaurante nuevo? ¿Cómo era?" },
          task: "Di que era nuevo y bonito (あたらしくて、きれい).",
          expect: { ja: "あたらしくて、きれいな レストランでした。", jaPlain: "あたらしくて、きれいなれすとらんでした。", romaji: "Atarashikute, kirei na resutoran deshita.", es: "Era un restaurante nuevo y bonito.", accept: ["あたらしくて", "きれいな", "あたらしくてきれい"], dynamic: null }
        },
        {
          ai: { ja: "へえ！りょうりは どうでしたか。", jaPlain: "へえ。りょうりはどうでしたか。", romaji: "Hee! Ryouri wa dou deshita ka.", es: "¡Oh! ¿Y la comida?" },
          task: "Di que la comida era barata y deliciosa (やすくて、おいしい).",
          expect: { ja: "りょうりは やすくて、おいしかったです。", jaPlain: "りょうりはやすくて、おいしかったです。", romaji: "Ryouri wa yasukute, oishikatta desu.", es: "La comida era barata y deliciosa.", accept: ["やすくて", "おいしかったです", "やすくておいしかった"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。みせの なかは どうでしたか。", jaPlain: "いいですね。みせのなかはどうでしたか。", romaji: "Ii desu ne. Mise no naka wa dou deshita ka.", es: "Qué bien. ¿Cómo era el interior?" },
          task: "Di que era amplio y tranquilo (ひろくて、しずか).",
          expect: { ja: "ひろくて、しずかでした。", jaPlain: "ひろくて、しずかでした。", romaji: "Hirokute, shizuka deshita.", es: "Era amplio y tranquilo.", accept: ["ひろくて", "しずかでした", "ひろくてしずか"], dynamic: null }
        },
        {
          ai: { ja: "とても よさそうですね。いっしょに 行きましょうか。", jaPlain: "とてもよさそうですね。いっしょにいきましょうか。", romaji: "Totemo yosa sou desu ne. Issho ni ikimashou ka.", es: "Suena muy bien. ¿Vamos juntos?" },
          task: "Acepta la invitación: \"Sí, vamos juntos.\"",
          expect: { ja: "はい、いっしょに 行きましょう。", jaPlain: "はい、いっしょにいきましょう。", romaji: "Hai, issho ni ikimashou.", es: "Sí, vamos juntos.", accept: ["いっしょにいきましょう", "いきましょう"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 新しいアパート */
    {
      settingEs: "Tu compañero de clase se mudó a un nuevo departamento. Le preguntas cómo es.",
      closingJa: "いいですね！あそびに 行きたいです。",
      closingEs: "¡Qué bien! Quiero ir a visitarte.",
      steps: [
        {
          ai: { ja: "あたらしい アパートに ひっこしましたね。へやは どうですか。", jaPlain: "あたらしいあぱーとにひっこしましたね。へやはどうですか。", romaji: "Atarashii apaato ni hikkoshimashita ne. Heya wa dou desu ka.", es: "Te mudaste a un nuevo departamento. ¿Cómo es la habitación?" },
          task: "Di que la habitación es amplia y luminosa (ひろくて、あかるい).",
          expect: { ja: "へやは ひろくて、あかるいです。", jaPlain: "へやはひろくて、あかるいです。", romaji: "Heya wa hirokute, akarui desu.", es: "La habitación es amplia y luminosa.", accept: ["ひろくて", "あかるいです", "ひろくてあかるい"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！まわりは どうですか。", jaPlain: "いいですね。まわりはどうですか。", romaji: "Ii desu ne! Mawari wa dou desu ka.", es: "¡Qué bien! ¿Cómo es el barrio?" },
          task: "Di que es tranquilo y conveniente (しずかで、べんり).",
          expect: { ja: "しずかで、べんりです。", jaPlain: "しずかで、べんりです。", romaji: "Shizuka de, benri desu.", es: "Es tranquilo y conveniente.", accept: ["しずかで", "べんりです", "しずかでべんり"], dynamic: null }
        },
        {
          ai: { ja: "えきからは ちかいですか。", jaPlain: "えきからはちかいですか。", romaji: "Eki kara wa chikai desu ka.", es: "¿Está cerca de la estación?" },
          task: "Di que está cerca de la estación y las compras son convenientes (ちかくて、べんり).",
          expect: { ja: "はい、えきに ちかくて、かいものも べんりです。", jaPlain: "はい、えきにちかくて、かいものもべんりです。", romaji: "Hai, eki ni chikakute, kaimono mo benri desu.", es: "Sí, está cerca de la estación y las compras son convenientes.", accept: ["ちかくて", "べんりです", "ちかくてべんり"], dynamic: null }
        },
        {
          ai: { ja: "すてきな アパートですね！うらやましいです。", jaPlain: "すてきなあぱーとですね。うらやましいです。", romaji: "Suteki na apaato desu ne! Urayamashii desu.", es: "¡Qué departamento tan lindo! Qué envidia." },
          task: "Di que te gusta el barrio y estás contento (すきで、うれしい).",
          expect: { ja: "ありがとうございます。まちが すきで、うれしいです。", jaPlain: "ありがとうございます。まちがすきで、うれしいです。", romaji: "Arigatou gozaimasu. Machi ga suki de, ureshii desu.", es: "Gracias. Me gusta el barrio y estoy contento.", accept: ["すきで", "うれしいです", "ありがとう"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u8_c2: 〜くなります/になります（変化）---------- */
  "u8_c2": [
    /* 会話1 — 季節の変化（天気） */
    {
      settingEs: "Hablas con tu profesora sobre cómo cambia el clima según la estación.",
      closingJa: "きせつの へんかは おもしろいですね！",
      closingEs: "¡Los cambios de estación son interesantes!",
      steps: [
        {
          ai: { ja: "さいきん、てんきは どうですか。はるに なりましたね。", jaPlain: "さいきん、てんきはどうですか。はるになりましたね。", romaji: "Saikin, tenki wa dou desu ka. Haru ni narimashita ne.", es: "Últimamente, ¿cómo está el clima? Ya llegó la primavera." },
          task: "Di que se ha vuelto cálido (あたたかくなりました).",
          expect: { ja: "はい、あたたかくなりました。", jaPlain: "はい、あたたかくなりました。", romaji: "Hai, atatakaku narimashita.", es: "Sí, se ha vuelto cálido.", accept: ["あたたかくなりました", "あたたかくなった"], dynamic: null }
        },
        {
          ai: { ja: "そうですね。日が ながくなりましたね。なつは どうなりますか。", jaPlain: "そうですね。ひがながくなりましたね。なつはどうなりますか。", romaji: "Sou desu ne. Hi ga nagaku narimashita ne. Natsu wa dou narimasu ka.", es: "Así es. Los días se alargaron. ¿Cómo se pone en verano?" },
          task: "Di que en verano se pone caluroso (あつくなります).",
          expect: { ja: "なつは あつくなります。", jaPlain: "なつはあつくなります。", romaji: "Natsu wa atsuku narimasu.", es: "En verano se pone caluroso.", accept: ["あつくなります", "あつくなる"], dynamic: null }
        },
        {
          ai: { ja: "あつい なつは たいへんですね。あきは どうですか。", jaPlain: "あついなつはたいへんですね。あきはどうですか。", romaji: "Atsui natsu wa taihen desu ne. Aki wa dou desu ka.", es: "El verano caluroso es difícil. ¿Y el otoño?" },
          task: "Di que en otoño se pone fresco (すずしくなります).",
          expect: { ja: "あきは すずしくなります。", jaPlain: "あきはすずしくなります。", romaji: "Aki wa suzushiku narimasu.", es: "En otoño se pone fresco.", accept: ["すずしくなります", "すずしくなる"], dynamic: null }
        },
        {
          ai: { ja: "にほんの あきは きれいですよ。ふゆは さむくなりますか。", jaPlain: "にほんのあきはきれいですよ。ふゆはさむくなりますか。", romaji: "Nihon no aki wa kirei desu yo. Fuyu wa samuku narimasu ka.", es: "El otoño en Japón es bonito. ¿Se pone frío en invierno?" },
          task: "Di que sí, se pone muy frío (とても さむくなります).",
          expect: { ja: "はい、とても さむくなります。", jaPlain: "はい、とてもさむくなります。", romaji: "Hai, totemo samuku narimasu.", es: "Sí, se pone muy frío.", accept: ["さむくなります", "さむくなる", "とてもさむくなります"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 日本語学習の変化 */
    {
      settingEs: "Tu profesora te pregunta cómo ha cambiado tu aprendizaje del japonés.",
      closingJa: "すばらしいですね！これからも がんばりましょう！",
      closingEs: "¡Maravilloso! ¡Sigamos esforzándonos!",
      steps: [
        {
          ai: { ja: "にほんごの べんきょうは どうですか。かわりましたか。", jaPlain: "にほんごのべんきょうはどうですか。かわりましたか。", romaji: "Nihongo no benkyou wa dou desu ka. Kawarimashita ka.", es: "¿Cómo va el estudio del japonés? ¿Ha cambiado algo?" },
          task: "Di que tu japonés ha mejorado un poco (じょうずになりました).",
          expect: { ja: "はい、にほんごが すこし じょうずに なりました。", jaPlain: "はい、にほんごがすこしじょうずになりました。", romaji: "Hai, nihongo ga sukoshi jouzu ni narimashita.", es: "Sí, mi japonés ha mejorado un poco.", accept: ["じょうずになりました", "じょうずになった"], dynamic: null }
        },
        {
          ai: { ja: "すごいですね！かんじは どうですか。", jaPlain: "すごいですね。かんじはどうですか。", romaji: "Sugoi desu ne! Kanji wa dou desu ka.", es: "¡Genial! ¿Qué tal los kanji?" },
          task: "Di que te empezaron a gustar los kanji (すきになりました).",
          expect: { ja: "かんじが すきに なりました。", jaPlain: "かんじがすきになりました。", romaji: "Kanji ga suki ni narimashita.", es: "Me empezaron a gustar los kanji.", accept: ["すきになりました", "すきになった"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。むずかしい ところは ありますか。", jaPlain: "いいですね。むずかしいところはありますか。", romaji: "Ii desu ne. Muzukashii tokoro wa arimasu ka.", es: "Qué bien. ¿Hay partes difíciles?" },
          task: "Di que la gramática se ha vuelto difícil (むずかしくなりました).",
          expect: { ja: "ぶんぽうが むずかしくなりました。", jaPlain: "ぶんぽうがむずかしくなりました。", romaji: "Bunpou ga muzukashiku narimashita.", es: "La gramática se ha vuelto difícil.", accept: ["むずかしくなりました", "むずかしくなった"], dynamic: null }
        },
        {
          ai: { ja: "だいじょうぶですよ。まいにち れんしゅうしましょう！", jaPlain: "だいじょうぶですよ。まいにちれんしゅうしましょう。", romaji: "Daijoubu desu yo. Mainichi renshuu shimashou!", es: "¡No te preocupes! ¡Practiquemos todos los días!" },
          task: "Di que quieres mejorar más (もっと じょうずに なりたい).",
          expect: { ja: "はい、もっと じょうずに なりたいです。", jaPlain: "はい、もっとじょうずになりたいです。", romaji: "Hai, motto jouzu ni naritai desu.", es: "Sí, quiero mejorar más.", accept: ["じょうずになりたいです", "じょうずになりたい", "もっとじょうずに"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 街の変化 */
    {
      settingEs: "Hablas con tu vecino sobre cómo ha cambiado el barrio últimamente.",
      closingJa: "いい まちに なりましたね！",
      closingEs: "¡Se ha convertido en un buen barrio!",
      steps: [
        {
          ai: { ja: "この まちは さいきん かわりましたね。どう おもいますか。", jaPlain: "このまちはさいきんかわりましたね。どうおもいますか。", romaji: "Kono machi wa saikin kawarimashita ne. Dou omoimasu ka.", es: "Este barrio ha cambiado últimamente. ¿Qué opinas?" },
          task: "Di que se ha vuelto animado (にぎやかになりました).",
          expect: { ja: "はい、にぎやかに なりました。", jaPlain: "はい、にぎやかになりました。", romaji: "Hai, nigiyaka ni narimashita.", es: "Sí, se ha vuelto animado.", accept: ["にぎやかになりました", "にぎやかになった"], dynamic: null }
        },
        {
          ai: { ja: "そうですね。あたらしい みせも できましたね。こうえんは どうですか。", jaPlain: "そうですね。あたらしいみせもできましたね。こうえんはどうですか。", romaji: "Sou desu ne. Atarashii mise mo dekimashita ne. Kouen wa dou desu ka.", es: "Así es. También abrieron tiendas nuevas. ¿Y el parque?" },
          task: "Di que el parque se ha vuelto bonito (きれいになりました).",
          expect: { ja: "こうえんが きれいに なりました。", jaPlain: "こうえんがきれいになりました。", romaji: "Kouen ga kirei ni narimashita.", es: "El parque se ha vuelto bonito.", accept: ["きれいになりました", "きれいになった"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。えきも あたらしくなりましたね。", jaPlain: "いいですね。えきもあたらしくなりましたね。", romaji: "Ii desu ne. Eki mo atarashiku narimashita ne.", es: "Qué bien. La estación también se renovó." },
          task: "Di que sí, la estación se renovó y se volvió conveniente (あたらしくなりました。べんりになりました).",
          expect: { ja: "はい、えきが あたらしくなりました。べんりに なりました。", jaPlain: "はい、えきがあたらしくなりました。べんりになりました。", romaji: "Hai, eki ga atarashiku narimashita. Benri ni narimashita.", es: "Sí, la estación se renovó. Se volvió conveniente.", accept: ["あたらしくなりました", "べんりになりました"], dynamic: null }
        },
        {
          ai: { ja: "これからも もっと いい まちに なるでしょうね。", jaPlain: "これからももっといいまちになるでしょうね。", romaji: "Kore kara mo motto ii machi ni naru deshou ne.", es: "Seguirá mejorando, ¿verdad?" },
          task: "Di que se volverá más conveniente (もっと べんりに なります).",
          expect: { ja: "はい、もっと べんりに なります。", jaPlain: "はい、もっとべんりになります。", romaji: "Hai, motto benri ni narimasu.", es: "Sí, se volverá más conveniente.", accept: ["べんりになります", "べんりになる", "もっとべんりに"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u8_c3: 〜とおもいます（意見を言う）---------- */
  "u8_c3": [
    /* 会話1 — 映画の感想 */
    {
      settingEs: "Acabas de ver una película con tu amigo. Comparten sus impresiones.",
      closingJa: "たのしい 映画でしたね！また 見ましょう！",
      closingEs: "¡Fue una película divertida! ¡Veamos otra!",
      steps: [
        {
          ai: { ja: "映画は どうでしたか。どう おもいますか。", jaPlain: "えいがはどうでしたか。どうおもいますか。", romaji: "Eiga wa dou deshita ka. Dou omoimasu ka.", es: "¿Qué tal la película? ¿Qué opinas?" },
          task: "Di que crees que fue muy interesante (おもしろいとおもいます).",
          expect: { ja: "とても おもしろいと おもいます。", jaPlain: "とてもおもしろいとおもいます。", romaji: "Totemo omoshiroi to omoimasu.", es: "Creo que fue muy interesante.", accept: ["おもしろいとおもいます", "おもしろかったとおもいます"], dynamic: null }
        },
        {
          ai: { ja: "わたしも そう おもいます！音楽は どうでしたか。", jaPlain: "わたしもそうおもいます。おんがくはどうでしたか。", romaji: "Watashi mo sou omoimasu! Ongaku wa dou deshita ka.", es: "¡Yo también opino lo mismo! ¿Qué tal la música?" },
          task: "Di que crees que la música fue muy buena (よかったとおもいます).",
          expect: { ja: "音楽が とても よかったと おもいます。", jaPlain: "おんがくがとてもよかったとおもいます。", romaji: "Ongaku ga totemo yokatta to omoimasu.", es: "Creo que la música fue muy buena.", accept: ["よかったとおもいます", "よかったとおもう"], dynamic: null }
        },
        {
          ai: { ja: "この えいがと まえの えいが、どちらが いいと おもいますか。", jaPlain: "このえいがとまえのえいが、どちらがいいとおもいますか。", romaji: "Kono eiga to mae no eiga, dochira ga ii to omoimasu ka.", es: "¿Cuál crees que es mejor, esta película o la anterior?" },
          task: "Di que crees que esta película es más interesante (この えいがの ほうが おもしろいと おもいます).",
          expect: { ja: "この えいがの ほうが おもしろいと おもいます。", jaPlain: "このえいがのほうがおもしろいとおもいます。", romaji: "Kono eiga no hou ga omoshiroi to omoimasu.", es: "Creo que esta película es más interesante.", accept: ["このえいがのほうがおもしろいとおもいます", "おもしろいとおもいます"], dynamic: null }
        },
        {
          ai: { ja: "そうですね！また いっしょに 映画を 見ましょう！", jaPlain: "そうですね。またいっしょにえいがをみましょう。", romaji: "Sou desu ne! Mata issho ni eiga o mimashou!", es: "¡Tienes razón! ¡Veamos otra película juntos!" },
          task: "Di que crees que la próxima película también será divertida.",
          expect: { ja: "はい、つぎの えいがも たのしいと おもいます。", jaPlain: "はい、つぎのえいがもたのしいとおもいます。", romaji: "Hai, tsugi no eiga mo tanoshii to omoimasu.", es: "Sí, creo que la próxima película también será divertida.", accept: ["たのしいとおもいます", "たのしいとおもう"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 旅行先の印象 */
    {
      settingEs: "Tu profesora te pregunta tus impresiones sobre Japón después de tu viaje.",
      closingJa: "にほんが すきに なりましたね！",
      closingEs: "¡Te ha gustado Japón!",
      steps: [
        {
          ai: { ja: "にほんの りょこうは どうでしたか。にほんは どんな くにだと おもいますか。", jaPlain: "にほんのりょこうはどうでしたか。にほんはどんなくにだとおもいますか。", romaji: "Nihon no ryokou wa dou deshita ka. Nihon wa donna kuni da to omoimasu ka.", es: "¿Qué tal tu viaje a Japón? ¿Qué tipo de país crees que es?" },
          task: "Di que crees que Japón es un país muy bonito (きれいなくにだとおもいます).",
          expect: { ja: "にほんは とても きれいな くにだと おもいます。", jaPlain: "にほんはとてもきれいなくにだとおもいます。", romaji: "Nihon wa totemo kirei na kuni da to omoimasu.", es: "Creo que Japón es un país muy bonito.", accept: ["きれいなくにだとおもいます", "きれいだとおもいます"], dynamic: null }
        },
        {
          ai: { ja: "そうですか。にほんの 食べ物は どうでしたか。", jaPlain: "そうですか。にほんのたべものはどうでしたか。", romaji: "Sou desu ka. Nihon no tabemono wa dou deshita ka.", es: "Ya veo. ¿Qué tal la comida japonesa?" },
          task: "Di que crees que la comida japonesa es deliciosa.",
          expect: { ja: "にほんの りょうりは おいしいと おもいます。", jaPlain: "にほんのりょうりはおいしいとおもいます。", romaji: "Nihon no ryouri wa oishii to omoimasu.", es: "Creo que la comida japonesa es deliciosa.", accept: ["おいしいとおもいます", "おいしかったとおもいます"], dynamic: null }
        },
        {
          ai: { ja: "にほんじんは どうでしたか。", jaPlain: "にほんじんはどうでしたか。", romaji: "Nihonjin wa dou deshita ka.", es: "¿Qué te parecieron los japoneses?" },
          task: "Di que crees que los japoneses son muy amables (しんせつだとおもいます).",
          expect: { ja: "にほんじんは とても しんせつだと おもいます。", jaPlain: "にほんじんはとてもしんせつだとおもいます。", romaji: "Nihonjin wa totemo shinsetsu da to omoimasu.", es: "Creo que los japoneses son muy amables.", accept: ["しんせつだとおもいます", "しんせつだとおもう"], dynamic: null }
        },
        {
          ai: { ja: "すてきな りょこうでしたね。また 行きたいですか。", jaPlain: "すてきなりょこうでしたね。またいきたいですか。", romaji: "Suteki na ryokou deshita ne. Mata ikitai desu ka.", es: "Fue un viaje genial. ¿Quieres ir otra vez?" },
          task: "Di que crees que Japón es maravilloso y quieres ir de nuevo.",
          expect: { ja: "はい、にほんは すばらしいと おもいます。また 行きたいです。", jaPlain: "はい、にほんはすばらしいとおもいます。またいきたいです。", romaji: "Hai, nihon wa subarashii to omoimasu. Mata ikitai desu.", es: "Sí, creo que Japón es maravilloso. Quiero ir otra vez.", accept: ["すばらしいとおもいます", "またいきたい"], dynamic: null }
        }
      ]
    },
    /* 会話3 — レストランの意見 */
    {
      settingEs: "Hablas con tu amigo sobre un restaurante nuevo que abrió cerca de la estación.",
      closingJa: "こんど いっしょに 行きましょう！",
      closingEs: "¡Vamos juntos la próxima vez!",
      steps: [
        {
          ai: { ja: "えきの ちかくに あたらしい レストランが できましたね。行きましたか。どうでしたか。", jaPlain: "えきのちかくにあたらしいれすとらんができましたね。いきましたか。どうでしたか。", romaji: "Eki no chikaku ni atarashii resutoran ga dekimashita ne. Ikimashita ka. Dou deshita ka.", es: "Abrieron un restaurante nuevo cerca de la estación. ¿Fuiste? ¿Qué tal?" },
          task: "Di que crees que es delicioso.",
          expect: { ja: "はい。おいしいと おもいます。", jaPlain: "はい。おいしいとおもいます。", romaji: "Hai. Oishii to omoimasu.", es: "Sí. Creo que es delicioso.", accept: ["おいしいとおもいます", "おいしかったとおもいます"], dynamic: null }
        },
        {
          ai: { ja: "へえ！ねだんは どうでしたか。", jaPlain: "へえ。ねだんはどうでしたか。", romaji: "Hee! Nedan wa dou deshita ka.", es: "¡Oh! ¿Qué tal el precio?" },
          task: "Di que crees que es un poco caro (すこし たかいとおもいます).",
          expect: { ja: "すこし たかいと おもいます。", jaPlain: "すこしたかいとおもいます。", romaji: "Sukoshi takai to omoimasu.", es: "Creo que es un poco caro.", accept: ["たかいとおもいます", "たかいとおもう", "すこしたかい"], dynamic: null }
        },
        {
          ai: { ja: "そうですか。あのみせと くらべて、どちらが いいですか。", jaPlain: "そうですか。あのみせとくらべて、どちらがいいですか。", romaji: "Sou desu ka. Ano mise to kurabete, dochira ga ii desu ka.", es: "Ya veo. Comparado con aquella tienda, ¿cuál es mejor?" },
          task: "Di que crees que el restaurante nuevo es más delicioso.",
          expect: { ja: "あたらしい みせの ほうが おいしいと おもいます。", jaPlain: "あたらしいみせのほうがおいしいとおもいます。", romaji: "Atarashii mise no hou ga oishii to omoimasu.", es: "Creo que el restaurante nuevo es más delicioso.", accept: ["あたらしいみせのほうがおいしいとおもいます", "おいしいとおもいます"], dynamic: null }
        },
        {
          ai: { ja: "こんど いっしょに 行きましょう！にんきに なると おもいますか。", jaPlain: "こんどいっしょにいきましょう。にんきになるとおもいますか。", romaji: "Kondo issho ni ikimashou! Ninki ni naru to omoimasu ka.", es: "¡Vamos juntos! ¿Crees que se volverá popular?" },
          task: "Di que crees que sí, se volverá popular (にんきになるとおもいます).",
          expect: { ja: "はい、にんきに なると おもいます。", jaPlain: "はい、にんきになるとおもいます。", romaji: "Hai, ninki ni naru to omoimasu.", es: "Sí, creo que se volverá popular.", accept: ["にんきになるとおもいます", "にんきになるとおもう", "なるとおもいます"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u8_c4: 形容詞の否定・過去形 ---------- */
  "u8_c4": [
    /* 会話1 — 昨日の天気 */
    {
      settingEs: "Hablas con tu amigo sobre el clima de ayer.",
      closingJa: "てんきは まいにち かわりますね！",
      closingEs: "¡El clima cambia todos los días!",
      steps: [
        {
          ai: { ja: "きのうの てんきは どうでしたか。あつかったですか。", jaPlain: "きのうのてんきはどうでしたか。あつかったですか。", romaji: "Kinou no tenki wa dou deshita ka. Atsukatta desu ka.", es: "¿Cómo estuvo el clima ayer? ¿Hizo calor?" },
          task: "Di que sí, hizo mucho calor (とても あつかったです).",
          expect: { ja: "はい、とても あつかったです。", jaPlain: "はい、とてもあつかったです。", romaji: "Hai, totemo atsukatta desu.", es: "Sí, hizo mucho calor.", accept: ["あつかったです", "あつかった", "とてもあつかった"], dynamic: null }
        },
        {
          ai: { ja: "たいへんでしたね。よるは すずしかったですか。", jaPlain: "たいへんでしたね。よるはすずしかったですか。", romaji: "Taihen deshita ne. Yoru wa suzushikatta desu ka.", es: "Qué difícil. ¿Estaba fresco por la noche?" },
          task: "Di que no, no estaba muy fresco (あまり すずしくなかったです).",
          expect: { ja: "いいえ、あまり すずしくなかったです。", jaPlain: "いいえ、あまりすずしくなかったです。", romaji: "Iie, amari suzushikunakatta desu.", es: "No, no estaba muy fresco.", accept: ["すずしくなかったです", "すずしくなかった", "あまりすずしくなかった"], dynamic: null }
        },
        {
          ai: { ja: "そうですか。おとといは どうでしたか。", jaPlain: "そうですか。おとといはどうでしたか。", romaji: "Sou desu ka. Ototoi wa dou deshita ka.", es: "Ya veo. ¿Y anteayer?" },
          task: "Di que anteayer hizo frío (さむかったです).",
          expect: { ja: "おとといは さむかったです。", jaPlain: "おとといはさむかったです。", romaji: "Ototoi wa samukatta desu.", es: "Anteayer hizo frío.", accept: ["さむかったです", "さむかった", "おとといはさむかった"], dynamic: null }
        },
        {
          ai: { ja: "さむかったですか！てんきは よくなかったですか。", jaPlain: "さむかったですか。てんきはよくなかったですか。", romaji: "Samukatta desu ka! Tenki wa yokunakatta desu ka.", es: "¿Hizo frío? ¿No hizo buen tiempo?" },
          task: "Di que el clima no fue muy bueno (あまり よくなかったです).",
          expect: { ja: "はい、てんきは あまり よくなかったです。", jaPlain: "はい、てんきはあまりよくなかったです。", romaji: "Hai, tenki wa amari yokunakatta desu.", es: "Sí, el clima no fue muy bueno.", accept: ["よくなかったです", "よくなかった", "あまりよくなかった"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 過去の旅行 */
    {
      settingEs: "Tu amigo te pregunta sobre un viaje que hiciste el año pasado.",
      closingJa: "たのしい りょこうでしたね！",
      closingEs: "¡Fue un viaje divertido!",
      steps: [
        {
          ai: { ja: "きょねんの りょこうは どうでしたか。たのしかったですか。", jaPlain: "きょねんのりょこうはどうでしたか。たのしかったですか。", romaji: "Kyonen no ryokou wa dou deshita ka. Tanoshikatta desu ka.", es: "¿Cómo fue tu viaje del año pasado? ¿Fue divertido?" },
          task: "Di que fue muy divertido (とても たのしかったです).",
          expect: { ja: "はい、とても たのしかったです。", jaPlain: "はい、とてもたのしかったです。", romaji: "Hai, totemo tanoshikatta desu.", es: "Sí, fue muy divertido.", accept: ["たのしかったです", "たのしかった", "とてもたのしかった"], dynamic: null }
        },
        {
          ai: { ja: "ホテルは きれいでしたか。", jaPlain: "ほてるはきれいでしたか。", romaji: "Hoteru wa kirei deshita ka.", es: "¿Estaba limpio el hotel?" },
          task: "Di que no estaba muy limpio (あまり きれいじゃなかったです).",
          expect: { ja: "いいえ、あまり きれいじゃなかったです。", jaPlain: "いいえ、あまりきれいじゃなかったです。", romaji: "Iie, amari kirei ja nakatta desu.", es: "No, no estaba muy limpio.", accept: ["きれいじゃなかったです", "きれいじゃなかった", "あまりきれいじゃなかった"], dynamic: null }
        },
        {
          ai: { ja: "そうでしたか。りょうりは おいしかったですか。", jaPlain: "そうでしたか。りょうりはおいしかったですか。", romaji: "Sou deshita ka. Ryouri wa oishikatta desu ka.", es: "Vaya. ¿La comida estaba rica?" },
          task: "Di que la comida estaba rica y además era barata.",
          expect: { ja: "はい、りょうりは おいしかったです。やすかったです。", jaPlain: "はい、りょうりはおいしかったです。やすかったです。", romaji: "Hai, ryouri wa oishikatta desu. Yasukatta desu.", es: "Sí, la comida estaba rica. Era barata.", accept: ["おいしかったです", "やすかったです", "おいしかった"], dynamic: null }
        },
        {
          ai: { ja: "まちは にぎやかでしたか。", jaPlain: "まちはにぎやかでしたか。", romaji: "Machi wa nigiyaka deshita ka.", es: "¿La ciudad era animada?" },
          task: "Di que sí, era animada, pero un poco ruidosa (にぎやかでした。でも、うるさかった).",
          expect: { ja: "はい、にぎやかでした。でも、すこし うるさかったです。", jaPlain: "はい、にぎやかでした。でも、すこしうるさかったです。", romaji: "Hai, nigiyaka deshita. Demo, sukoshi urusakatta desu.", es: "Sí, era animada. Pero un poco ruidosa.", accept: ["にぎやかでした", "うるさかったです", "うるさかった"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 前の学校 */
    {
      settingEs: "Hablas con tu nueva compañera de clase sobre tu escuela anterior.",
      closingJa: "いい がっこうでしたね！",
      closingEs: "¡Era una buena escuela!",
      steps: [
        {
          ai: { ja: "まえの がっこうは どうでしたか。大きかったですか。", jaPlain: "まえのがっこうはどうでしたか。おおきかったですか。", romaji: "Mae no gakkou wa dou deshita ka. Ookikatta desu ka.", es: "¿Cómo era tu escuela anterior? ¿Era grande?" },
          task: "Di que sí, era muy grande (とても 大きかったです).",
          expect: { ja: "はい、とても 大きかったです。", jaPlain: "はい、とてもおおきかったです。", romaji: "Hai, totemo ookikatta desu.", es: "Sí, era muy grande.", accept: ["おおきかったです", "おおきかった", "とてもおおきかった"], dynamic: null }
        },
        {
          ai: { ja: "そうですか。せんせいは どうでしたか。", jaPlain: "そうですか。せんせいはどうでしたか。", romaji: "Sou desu ka. Sensei wa dou deshita ka.", es: "Ya veo. ¿Cómo eran los profesores?" },
          task: "Di que los profesores eran muy amables (しんせつでした).",
          expect: { ja: "せんせいは とても しんせつでした。", jaPlain: "せんせいはとてもしんせつでした。", romaji: "Sensei wa totemo shinsetsu deshita.", es: "Los profesores eran muy amables.", accept: ["しんせつでした", "しんせつだった"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。べんきょうは むずかしかったですか。", jaPlain: "いいですね。べんきょうはむずかしかったですか。", romaji: "Ii desu ne. Benkyou wa muzukashikatta desu ka.", es: "Qué bien. ¿Los estudios eran difíciles?" },
          task: "Di que era un poco difícil, pero divertido (むずかしかった。でも、たのしかった).",
          expect: { ja: "すこし むずかしかったです。でも、たのしかったです。", jaPlain: "すこしむずかしかったです。でも、たのしかったです。", romaji: "Sukoshi muzukashikatta desu. Demo, tanoshikatta desu.", es: "Era un poco difícil. Pero era divertido.", accept: ["むずかしかったです", "たのしかったです", "むずかしかった"], dynamic: null }
        },
        {
          ai: { ja: "がっこうの しょくどうは おいしかったですか。", jaPlain: "がっこうのしょくどうはおいしかったですか。", romaji: "Gakkou no shokudou wa oishikatta desu ka.", es: "¿La cafetería de la escuela era rica?" },
          task: "Di que no era muy rica (あまり おいしくなかったです).",
          expect: { ja: "あまり おいしくなかったです。", jaPlain: "あまりおいしくなかったです。", romaji: "Amari oishikunakatta desu.", es: "No era muy rica.", accept: ["おいしくなかったです", "おいしくなかった", "あまりおいしくなかった"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u8_c5: 形容詞で詳しく描写する（Unit 8まとめ・5会話）---------- */
  "u8_c5": [
    /* 会話1 — 旅行の総合感想（くて/で + とおもいます + 過去形） */
    {
      settingEs: "Volviste de un viaje a una ciudad japonesa. Tu profesora te pregunta sobre todo.",
      closingJa: "すてきな りょこうでしたね！また 行きましょう！",
      closingEs: "¡Fue un viaje genial! ¡Vamos otra vez!",
      steps: [
        {
          ai: { ja: "りょこうは どうでしたか。まちは どんな ところでしたか。", jaPlain: "りょこうはどうでしたか。まちはどんなところでしたか。", romaji: "Ryokou wa dou deshita ka. Machi wa donna tokoro deshita ka.", es: "¿Cómo fue el viaje? ¿Cómo era la ciudad?" },
          task: "Di que la ciudad era bonita y animada (きれいで、にぎやか).",
          expect: { ja: "まちは きれいで、にぎやかでした。", jaPlain: "まちはきれいで、にぎやかでした。", romaji: "Machi wa kirei de, nigiyaka deshita.", es: "La ciudad era bonita y animada.", accept: ["きれいで", "にぎやかでした", "きれいでにぎやか"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。食べ物は どうでしたか。", jaPlain: "いいですね。たべものはどうでしたか。", romaji: "Ii desu ne. Tabemono wa dou deshita ka.", es: "Qué bien. ¿Y la comida?" },
          task: "Di que la comida era deliciosa y barata (おいしくて、やすかった).",
          expect: { ja: "りょうりは おいしくて、やすかったです。", jaPlain: "りょうりはおいしくて、やすかったです。", romaji: "Ryouri wa oishikute, yasukatta desu.", es: "La comida era deliciosa y barata.", accept: ["おいしくて", "やすかったです", "おいしくてやすかった"], dynamic: null }
        },
        {
          ai: { ja: "てんきは どうでしたか。さむかったですか。", jaPlain: "てんきはどうでしたか。さむかったですか。", romaji: "Tenki wa dou deshita ka. Samukatta desu ka.", es: "¿Y el clima? ¿Hacía frío?" },
          task: "Di que no hacía frío, sino que hacía calor (さむくなかったです。あたたかかったです).",
          expect: { ja: "いいえ、さむくなかったです。あたたかかったです。", jaPlain: "いいえ、さむくなかったです。あたたかかったです。", romaji: "Iie, samukunakatta desu. Atatakakatta desu.", es: "No, no hacía frío. Hacía calor.", accept: ["さむくなかったです", "あたたかかったです", "さむくなかった"], dynamic: null }
        },
        {
          ai: { ja: "りょこうは たのしかったですか。どう おもいますか。", jaPlain: "りょこうはたのしかったですか。どうおもいますか。", romaji: "Ryokou wa tanoshikatta desu ka. Dou omoimasu ka.", es: "¿El viaje fue divertido? ¿Qué opinas?" },
          task: "Di que crees que fue muy divertido y quieres ir de nuevo.",
          expect: { ja: "とても たのしかったと おもいます。また 行きたいです。", jaPlain: "とてもたのしかったとおもいます。またいきたいです。", romaji: "Totemo tanoshikatta to omoimasu. Mata ikitai desu.", es: "Creo que fue muy divertido. Quiero ir otra vez.", accept: ["たのしかったとおもいます", "またいきたい", "たのしかった"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 引っ越し先の街（くて/で + なります + とおもいます） */
    {
      settingEs: "Te mudaste a un nuevo barrio. Tu amigo te pregunta cómo es la zona.",
      closingJa: "いい まちですね！あそびに 行きたいです！",
      closingEs: "¡Qué buen barrio! ¡Quiero ir a visitarte!",
      steps: [
        {
          ai: { ja: "あたらしい まちは どうですか。", jaPlain: "あたらしいまちはどうですか。", romaji: "Atarashii machi wa dou desu ka.", es: "¿Cómo es el nuevo barrio?" },
          task: "Di que es tranquilo y conveniente (しずかで、べんり).",
          expect: { ja: "しずかで、べんりです。", jaPlain: "しずかで、べんりです。", romaji: "Shizuka de, benri desu.", es: "Es tranquilo y conveniente.", accept: ["しずかで", "べんりです", "しずかでべんり"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。この まちは さいきん かわりましたか。", jaPlain: "いいですね。このまちはさいきんかわりましたか。", romaji: "Ii desu ne. Kono machi wa saikin kawarimashita ka.", es: "Qué bien. ¿Ha cambiado el barrio últimamente?" },
          task: "Di que se abrieron tiendas nuevas y se volvió animado (にぎやかになりました).",
          expect: { ja: "あたらしい みせが できて、にぎやかに なりました。", jaPlain: "あたらしいみせができて、にぎやかになりました。", romaji: "Atarashii mise ga dekite, nigiyaka ni narimashita.", es: "Abrieron tiendas nuevas y se volvió animado.", accept: ["にぎやかになりました", "にぎやかになった"], dynamic: null }
        },
        {
          ai: { ja: "これから もっと にぎやかに なると おもいますか。", jaPlain: "これからもっとにぎやかになるとおもいますか。", romaji: "Kore kara motto nigiyaka ni naru to omoimasu ka.", es: "¿Crees que se volverá más animado?" },
          task: "Di que crees que se volverá más conveniente (べんりになるとおもいます).",
          expect: { ja: "はい、もっと べんりに なると おもいます。", jaPlain: "はい、もっとべんりになるとおもいます。", romaji: "Hai, motto benri ni naru to omoimasu.", es: "Sí, creo que se volverá más conveniente.", accept: ["べんりになるとおもいます", "べんりになるとおもう"], dynamic: null }
        },
        {
          ai: { ja: "へやは どうですか。", jaPlain: "へやはどうですか。", romaji: "Heya wa dou desu ka.", es: "¿Y la habitación?" },
          task: "Di que es amplia y luminosa, y te gusta (ひろくて、あかるい。すき).",
          expect: { ja: "ひろくて、あかるいです。とても すきです。", jaPlain: "ひろくて、あかるいです。とてもすきです。", romaji: "Hirokute, akarui desu. Totemo suki desu.", es: "Es amplia y luminosa. Me gusta mucho.", accept: ["ひろくて", "あかるいです", "すきです"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 学期の振り返り（過去形 + とおもいます + なります） */
    {
      settingEs: "Es fin de semestre. Tu profesora habla contigo sobre el semestre pasado.",
      closingJa: "らいがっき、もっと がんばりましょう！",
      closingEs: "¡Esforcémonos más el próximo semestre!",
      steps: [
        {
          ai: { ja: "こんがっきは どうでしたか。たのしかったですか。", jaPlain: "こんがっきはどうでしたか。たのしかったですか。", romaji: "Kongakki wa dou deshita ka. Tanoshikatta desu ka.", es: "¿Cómo fue este semestre? ¿Fue divertido?" },
          task: "Di que fue muy divertido (とても たのしかったです).",
          expect: { ja: "はい、とても たのしかったです。", jaPlain: "はい、とてもたのしかったです。", romaji: "Hai, totemo tanoshikatta desu.", es: "Sí, fue muy divertido.", accept: ["たのしかったです", "たのしかった"], dynamic: null }
        },
        {
          ai: { ja: "にほんごは むずかしかったですか。", jaPlain: "にほんごはむずかしかったですか。", romaji: "Nihongo wa muzukashikatta desu ka.", es: "¿El japonés fue difícil?" },
          task: "Di que fue un poco difícil, pero interesante (むずかしかったです。でも、おもしろかった).",
          expect: { ja: "すこし むずかしかったです。でも、おもしろかったです。", jaPlain: "すこしむずかしかったです。でも、おもしろかったです。", romaji: "Sukoshi muzukashikatta desu. Demo, omoshirokatta desu.", es: "Fue un poco difícil. Pero fue interesante.", accept: ["むずかしかったです", "おもしろかったです", "むずかしかった"], dynamic: null }
        },
        {
          ai: { ja: "にほんごが じょうずに なりましたね。どう おもいますか。", jaPlain: "にほんごがじょうずになりましたね。どうおもいますか。", romaji: "Nihongo ga jouzu ni narimashita ne. Dou omoimasu ka.", es: "Tu japonés ha mejorado. ¿Qué opinas?" },
          task: "Di que crees que has mejorado un poco (じょうずになったとおもいます).",
          expect: { ja: "すこし じょうずに なったと おもいます。", jaPlain: "すこしじょうずになったとおもいます。", romaji: "Sukoshi jouzu ni natta to omoimasu.", es: "Creo que he mejorado un poco.", accept: ["じょうずになったとおもいます", "じょうずになったとおもう", "じょうずになりました"], dynamic: null }
        },
        {
          ai: { ja: "すばらしいですね！らいがっきも がんばりましょう！", jaPlain: "すばらしいですね。らいがっきもがんばりましょう。", romaji: "Subarashii desu ne! Raigakki mo ganbarimashou!", es: "¡Maravilloso! ¡Esforcémonos el próximo semestre también!" },
          task: "Di que quieres mejorar más (もっと じょうずになりたいです).",
          expect: { ja: "はい、もっと じょうずに なりたいです。", jaPlain: "はい、もっとじょうずになりたいです。", romaji: "Hai, motto jouzu ni naritai desu.", es: "Sí, quiero mejorar más.", accept: ["じょうずになりたいです", "じょうずになりたい", "がんばります"], dynamic: null }
        }
      ]
    },
    /* 会話4 — レストラン巡り（くて/で + とおもいます + 過去形） */
    {
      settingEs: "Hablas con tus amigos sobre los restaurantes que visitaron esta semana.",
      closingJa: "おいしい レストランが たくさん ありますね！",
      closingEs: "¡Hay muchos restaurantes ricos!",
      steps: [
        {
          ai: { ja: "きのう、あたらしい レストランに 行きました。どうでしたか。", jaPlain: "きのう、あたらしいれすとらんにいきました。どうでしたか。", romaji: "Kinou, atarashii resutoran ni ikimashita. Dou deshita ka.", es: "Fui a un restaurante nuevo ayer. ¿Cómo fue?" },
          task: "Di que la comida era deliciosa y barata (おいしくて、やすかった).",
          expect: { ja: "りょうりは おいしくて、やすかったです。", jaPlain: "りょうりはおいしくて、やすかったです。", romaji: "Ryouri wa oishikute, yasukatta desu.", es: "La comida era deliciosa y barata.", accept: ["おいしくて", "やすかったです", "おいしくてやすかった"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。みせは どうでしたか。", jaPlain: "いいですね。みせはどうでしたか。", romaji: "Ii desu ne. Mise wa dou deshita ka.", es: "Qué bien. ¿Y el local?" },
          task: "Di que era bonito y tranquilo (きれいで、しずか).",
          expect: { ja: "きれいで、しずかでした。", jaPlain: "きれいで、しずかでした。", romaji: "Kirei de, shizuka deshita.", es: "Era bonito y tranquilo.", accept: ["きれいで", "しずかでした", "きれいでしずか"], dynamic: null }
        },
        {
          ai: { ja: "まえに 行った レストランと くらべて、どう おもいますか。", jaPlain: "まえにいったれすとらんとくらべて、どうおもいますか。", romaji: "Mae ni itta resutoran to kurabete, dou omoimasu ka.", es: "Comparado con el restaurante anterior, ¿qué opinas?" },
          task: "Di que crees que el nuevo es más delicioso.",
          expect: { ja: "あたらしい レストランの ほうが おいしいと おもいます。", jaPlain: "あたらしいれすとらんのほうがおいしいとおもいます。", romaji: "Atarashii resutoran no hou ga oishii to omoimasu.", es: "Creo que el nuevo es más delicioso.", accept: ["おいしいとおもいます", "あたらしいれすとらんのほうが"], dynamic: null }
        },
        {
          ai: { ja: "こんど また いっしょに 行きましょう！", jaPlain: "こんどまたいっしょにいきましょう。", romaji: "Kondo mata issho ni ikimashou!", es: "¡Vamos juntos otra vez!" },
          task: "Di que crees que ese restaurante se volverá popular.",
          expect: { ja: "はい、あの レストランは にんきに なると おもいます。", jaPlain: "はい、あのれすとらんはにんきになるとおもいます。", romaji: "Hai, ano resutoran wa ninki ni naru to omoimasu.", es: "Sí, creo que ese restaurante se volverá popular.", accept: ["にんきになるとおもいます", "いきましょう", "にんきになる"], dynamic: null }
        }
      ]
    },
    /* 会話5 — 季節と街の変化（なります + くて/で + とおもいます） */
    {
      settingEs: "Hablas con tu vecino sobre cómo la estación afecta al barrio.",
      closingJa: "この まちの はるは いちばん すきです！",
      closingEs: "¡La primavera de este barrio es mi favorita!",
      steps: [
        {
          ai: { ja: "さいきん あたたかくなりましたね。", jaPlain: "さいきんあたたかくなりましたね。", romaji: "Saikin atatakaku narimashita ne.", es: "Se ha calentado últimamente." },
          task: "Di que sí, llegó la primavera y se puso cálido (あたたかくなりました).",
          expect: { ja: "はい、はるに なって、あたたかくなりました。", jaPlain: "はい、はるになって、あたたかくなりました。", romaji: "Hai, haru ni natte, atatakaku narimashita.", es: "Sí, llegó la primavera y se puso cálido.", accept: ["あたたかくなりました", "あたたかくなった"], dynamic: null }
        },
        {
          ai: { ja: "この まちは はるが きれいですね。こうえんは どうですか。", jaPlain: "このまちははるがきれいですね。こうえんはどうですか。", romaji: "Kono machi wa haru ga kirei desu ne. Kouen wa dou desu ka.", es: "La primavera de este barrio es bonita. ¿Y el parque?" },
          task: "Di que el parque es bonito y se ha vuelto animado (きれいで、にぎやかになりました).",
          expect: { ja: "こうえんが きれいで、にぎやかに なりました。", jaPlain: "こうえんがきれいで、にぎやかになりました。", romaji: "Kouen ga kirei de, nigiyaka ni narimashita.", es: "El parque está bonito y se ha vuelto animado.", accept: ["きれいで", "にぎやかになりました"], dynamic: null }
        },
        {
          ai: { ja: "なつは あつくなりますね。なつの この まちは どう おもいますか。", jaPlain: "なつはあつくなりますね。なつのこのまちはどうおもいますか。", romaji: "Natsu wa atsuku narimasu ne. Natsu no kono machi wa dou omoimasu ka.", es: "En verano se pone caluroso. ¿Qué opinas del barrio en verano?" },
          task: "Di que crees que es caluroso y difícil (あつくて、たいへんだとおもいます).",
          expect: { ja: "あつくて、たいへんだと おもいます。", jaPlain: "あつくて、たいへんだとおもいます。", romaji: "Atsukute, taihen da to omoimasu.", es: "Creo que es caluroso y difícil.", accept: ["あつくて", "たいへんだとおもいます", "あつくてたいへん"], dynamic: null }
        },
        {
          ai: { ja: "でも、なつの おまつりは たのしいですよ！", jaPlain: "でも、なつのおまつりはたのしいですよ。", romaji: "Demo, natsu no omatsuri wa tanoshii desu yo!", es: "¡Pero el festival de verano es divertido!" },
          task: "Di que crees que el festival será divertido.",
          expect: { ja: "はい、おまつりは たのしいと おもいます。", jaPlain: "はい、おまつりはたのしいとおもいます。", romaji: "Hai, omatsuri wa tanoshii to omoimasu.", es: "Sí, creo que el festival será divertido.", accept: ["たのしいとおもいます", "たのしいとおもう", "たのしい"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u8_c6: 〜と言いました（引用・伝聞）---------- */
  "u8_c6": [
    /* 会話1 — 先生の伝言 */
    {
      settingEs: "Tu amigo no vino a clase hoy. Le cuentas lo que dijo la profesora.",
      closingJa: "おしえてくれて ありがとう！がんばりましょう！",
      closingEs: "¡Gracias por decirme! ¡Esforcémonos!",
      steps: [
        {
          ai: { ja: "きょう がっこうを やすみました。せんせいは 何と いいましたか。", jaPlain: "きょうがっこうをやすみました。せんせいはなんといいましたか。", romaji: "Kyou gakkou o yasumimashita. Sensei wa nan to iimashita ka.", es: "Hoy falté a la escuela. ¿Qué dijo la profesora?" },
          task: "Di que la profesora dijo: \"Mañana hay examen\" (「あした テストが あります」と いいました).",
          expect: { ja: "せんせいは「あした テストが あります」と いいました。", jaPlain: "せんせいは「あしたてすとがあります」といいました。", romaji: "Sensei wa 'ashita tesuto ga arimasu' to iimashita.", es: "La profesora dijo: \"Mañana hay examen.\"", accept: ["あしたてすとがあります", "といいました", "てすとがあります"], dynamic: null }
        },
        {
          ai: { ja: "えっ、テストですか！ほかに 何と いいましたか。", jaPlain: "えっ、てすとですか。ほかになんといいましたか。", romaji: "E, tesuto desu ka! Hoka ni nan to iimashita ka.", es: "¿¡Examen!? ¿Dijo algo más?" },
          task: "Di que dijo: \"Traigan el libro de texto\" (「きょうかしょを もってきてください」).",
          expect: { ja: "「きょうかしょを もってきてください」と いいました。", jaPlain: "「きょうかしょをもってきてください」といいました。", romaji: "'Kyoukasho o motte kite kudasai' to iimashita.", es: "Dijo: \"Traigan el libro de texto.\"", accept: ["きょうかしょをもってきてください", "といいました"], dynamic: null }
        },
        {
          ai: { ja: "わかりました。しゅくだいは ありますか。", jaPlain: "わかりました。しゅくだいはありますか。", romaji: "Wakarimashita. Shukudai wa arimasu ka.", es: "Entendido. ¿Hay tarea?" },
          task: "Di que la profesora dijo: \"Entreguen la tarea\" (「しゅくだいを だしてください」).",
          expect: { ja: "はい、せんせいは「しゅくだいを だしてください」と いいました。", jaPlain: "はい、せんせいは「しゅくだいをだしてください」といいました。", romaji: "Hai, sensei wa 'shukudai o dashite kudasai' to iimashita.", es: "Sí, la profesora dijo: \"Entreguen la tarea.\"", accept: ["しゅくだいをだしてください", "といいました"], dynamic: null }
        },
        {
          ai: { ja: "ありがとうございます！テスト、がんばりましょう！", jaPlain: "ありがとうございます。てすと、がんばりましょう。", romaji: "Arigatou gozaimasu! Tesuto, ganbarimashou!", es: "¡Gracias! ¡Esforcémonos en el examen!" },
          task: "Di que la profesora dijo: \"Esfuércense\" (「がんばってください」).",
          expect: { ja: "せんせいは「がんばってください」と いいました。", jaPlain: "せんせいは「がんばってください」といいました。", romaji: "Sensei wa 'ganbatte kudasai' to iimashita.", es: "La profesora dijo: \"Esfuércense.\"", accept: ["がんばってくださいといいました", "がんばってください", "といいました"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 友達の噂話 */
    {
      settingEs: "Hablas con tu amiga sobre lo que dijeron otros compañeros sobre sus planes.",
      closingJa: "みんな にほんが すきですね（笑／risa）",
      closingEs: "A todos les gusta Japón (risas).",
      steps: [
        {
          ai: { ja: "きのう カルロスくんと はなしましたか。何と いいましたか。", jaPlain: "きのうかるろすくんとはなしましたか。なんといいましたか。", romaji: "Kinou Karurosu-kun to hanashimashita ka. Nan to iimashita ka.", es: "¿Hablaste con Carlos ayer? ¿Qué dijo?" },
          task: "Di que Carlos dijo: \"Quiero ir a Japón\" (「にほんに 行きたいです」).",
          expect: { ja: "カルロスくんは「にほんに 行きたいです」と いいました。", jaPlain: "かるろすくんは「にほんにいきたいです」といいました。", romaji: "Karurosu-kun wa 'nihon ni ikitai desu' to iimashita.", es: "Carlos dijo: \"Quiero ir a Japón.\"", accept: ["にほんにいきたいです", "といいました", "いきたいです"], dynamic: null }
        },
        {
          ai: { ja: "へえ！マリアさんは 何と いいましたか。", jaPlain: "へえ。まりあさんはなんといいましたか。", romaji: "Hee! Maria-san wa nan to iimashita ka.", es: "¡Oh! ¿Y qué dijo María?" },
          task: "Di que María dijo: \"Me gusta el japonés\" (「にほんごが すきです」).",
          expect: { ja: "マリアさんは「にほんごが すきです」と いいました。", jaPlain: "まりあさんは「にほんごがすきです」といいました。", romaji: "Maria-san wa 'nihongo ga suki desu' to iimashita.", es: "María dijo: \"Me gusta el japonés.\"", accept: ["にほんごがすきです", "といいました", "すきです"], dynamic: null }
        },
        {
          ai: { ja: "みんな にほんが すきですね（笑／risa）。ほかに 何と いいましたか。", jaPlain: "みんなにほんがすきですね。ほかになんといいましたか。", romaji: "Minna nihon ga suki desu ne (risa). Hoka ni nan to iimashita ka.", es: "A todos les gusta Japón (risas). ¿Dijeron algo más?" },
          task: "Di que Carlos dijo: \"La comida japonesa es deliciosa\" (「にほんの りょうりが おいしいです」).",
          expect: { ja: "カルロスくんは「にほんの りょうりが おいしいです」と いいました。", jaPlain: "かるろすくんは「にほんのりょうりがおいしいです」といいました。", romaji: "Karurosu-kun wa 'nihon no ryouri ga oishii desu' to iimashita.", es: "Carlos dijo: \"La comida japonesa es deliciosa.\"", accept: ["にほんのりょうりがおいしいです", "といいました", "おいしいです"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。こんど みんなで にほんりょうりを 食べに 行きましょう！", jaPlain: "いいですね。こんどみんなでにほんりょうりをたべにいきましょう。", romaji: "Ii desu ne. Kondo minna de nihon ryouri o tabe ni ikimashou!", es: "Qué bien. ¡Vamos todos a comer comida japonesa!" },
          task: "Di que Carlos también dijo: \"Vamos juntos\" (「いっしょに 行きましょう」).",
          expect: { ja: "はい、カルロスくんも「いっしょに 行きましょう」と いいました。", jaPlain: "はい、かるろすくんも「いっしょにいきましょう」といいました。", romaji: "Hai, Karurosu-kun mo 'issho ni ikimashou' to iimashita.", es: "Sí, Carlos también dijo: \"Vamos juntos.\"", accept: ["いっしょにいきましょう", "といいました", "いきましょう"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 天気予報/ニュース */
    {
      settingEs: "Hablas con tu compañero de clase sobre lo que dijeron en las noticias y el pronóstico del tiempo.",
      closingJa: "ニュースを みると べんりですね！",
      closingEs: "¡Ver las noticias es útil!",
      steps: [
        {
          ai: { ja: "けさ ニュースを みましたか。てんきよほうは 何と いいましたか。", jaPlain: "けさにゅーすをみましたか。てんきよほうはなんといいましたか。", romaji: "Kesa nyuusu o mimashita ka. Tenki yohou wa nan to iimashita ka.", es: "¿Viste las noticias esta mañana? ¿Qué dijo el pronóstico?" },
          task: "Di que el pronóstico dijo: \"Mañana llueve\" (「あしたは あめです」).",
          expect: { ja: "てんきよほうは「あしたは あめです」と いいました。", jaPlain: "てんきよほうは「あしたはあめです」といいました。", romaji: "Tenki yohou wa 'ashita wa ame desu' to iimashita.", es: "El pronóstico dijo: \"Mañana llueve.\"", accept: ["あしたはあめです", "といいました", "あめです"], dynamic: null }
        },
        {
          ai: { ja: "あめですか。かさを もっていきましょう。しゅうまつは どうですか。", jaPlain: "あめですか。かさをもっていきましょう。しゅうまつはどうですか。", romaji: "Ame desu ka. Kasa o motte ikimashou. Shuumatsu wa dou desu ka.", es: "¿Lluvia? Llevemos paraguas. ¿Y el fin de semana?" },
          task: "Di que dijeron: \"El fin de semana estará despejado\" (「しゅうまつは はれです」).",
          expect: { ja: "「しゅうまつは はれです」と いいました。", jaPlain: "「しゅうまつははれです」といいました。", romaji: "'Shuumatsu wa hare desu' to iimashita.", es: "Dijeron: \"El fin de semana estará despejado.\"", accept: ["しゅうまつははれです", "といいました", "はれです"], dynamic: null }
        },
        {
          ai: { ja: "よかったですね！ほかに ニュースが ありましたか。", jaPlain: "よかったですね。ほかににゅーすがありましたか。", romaji: "Yokatta desu ne! Hoka ni nyuusu ga arimashita ka.", es: "¡Qué bien! ¿Hubo otras noticias?" },
          task: "Di que en las noticias dijeron: \"Se abrirá una nueva estación\" (「あたらしい えきが できます」).",
          expect: { ja: "ニュースで「あたらしい えきが できます」と いいました。", jaPlain: "にゅーすで「あたらしいえきができます」といいました。", romaji: "Nyuusu de 'atarashii eki ga dekimasu' to iimashita.", es: "En las noticias dijeron: \"Se abrirá una nueva estación.\"", accept: ["あたらしいえきができます", "といいました", "えきができます"], dynamic: null }
        },
        {
          ai: { ja: "あたらしい えきですか！べんりに なりますね。", jaPlain: "あたらしいえきですか。べんりになりますね。", romaji: "Atarashii eki desu ka! Benri ni narimasu ne.", es: "¿Una nueva estación? Se volverá más conveniente." },
          task: "Di que en las noticias dijeron: \"La ciudad se volverá más conveniente\" (「まちが もっと べんりに なります」).",
          expect: { ja: "はい、ニュースで「まちが もっと べんりに なります」と いいました。", jaPlain: "はい、にゅーすで「まちがもっとべんりになります」といいました。", romaji: "Hai, nyuusu de 'machi ga motto benri ni narimasu' to iimashita.", es: "Sí, en las noticias dijeron: \"La ciudad se volverá más conveniente.\"", accept: ["まちがもっとべんりになります", "といいました", "べんりになります"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u8_c7: 〜でしょう（推量・確認）---------- */
  "u8_c7": [
    /* 会話1 — 明日の天気 */
    {
      settingEs: "Hablas con tu amigo sobre cómo crees que estará el clima mañana.",
      closingJa: "てんきが よくなると いいですね！",
      closingEs: "¡Ojalá mejore el clima!",
      steps: [
        {
          ai: { ja: "あしたの てんきは どうでしょうか。あめが ふるでしょうか。", jaPlain: "あしたのてんきはどうでしょうか。あめがふるでしょうか。", romaji: "Ashita no tenki wa dou deshou ka. Ame ga furu deshou ka.", es: "¿Cómo estará el clima mañana? ¿Lloverá?" },
          task: "Di que probablemente mañana llueva (たぶん あめでしょう).",
          expect: { ja: "たぶん あしたは あめでしょう。", jaPlain: "たぶんあしたはあめでしょう。", romaji: "Tabun ashita wa ame deshou.", es: "Probablemente mañana llueva.", accept: ["あめでしょう", "あめでしょ"], dynamic: null }
        },
        {
          ai: { ja: "そうですか。かさを もっていきましょう。しゅうまつは どうでしょうか。", jaPlain: "そうですか。かさをもっていきましょう。しゅうまつはどうでしょうか。", romaji: "Sou desu ka. Kasa o motte ikimashou. Shuumatsu wa dou deshou ka.", es: "Ya veo. Llevemos paraguas. ¿Y el fin de semana?" },
          task: "Di que el fin de semana probablemente esté despejado (はれでしょう).",
          expect: { ja: "しゅうまつは はれでしょう。", jaPlain: "しゅうまつははれでしょう。", romaji: "Shuumatsu wa hare deshou.", es: "El fin de semana probablemente esté despejado.", accept: ["はれでしょう", "はれでしょ"], dynamic: null }
        },
        {
          ai: { ja: "よかった！あつくなるでしょうか。", jaPlain: "よかった。あつくなるでしょうか。", romaji: "Yokatta! Atsuku naru deshou ka.", es: "¡Qué bien! ¿Se pondrá caluroso?" },
          task: "Di que sí, probablemente haga calor (あついでしょう).",
          expect: { ja: "はい、あついでしょう。", jaPlain: "はい、あついでしょう。", romaji: "Hai, atsui deshou.", es: "Sí, probablemente haga calor.", accept: ["あついでしょう", "あついでしょ", "あつくなるでしょう"], dynamic: null }
        },
        {
          ai: { ja: "あつい ひは アイスクリームを 食べましょう（笑／risa）", jaPlain: "あついひはあいすくりーむをたべましょう。", romaji: "Atsui hi wa aisukuriimu o tabemashou (risa).", es: "Los días calurosos comamos helado (risas)." },
          task: "Di que la piscina será divertida (プールは たのしいでしょう).",
          expect: { ja: "はい、プールは たのしいでしょう。", jaPlain: "はい、ぷーるはたのしいでしょう。", romaji: "Hai, puuru wa tanoshii deshou.", es: "Sí, la piscina será divertida.", accept: ["たのしいでしょう", "たのしいでしょ", "ぷーるはたのしい"], dynamic: null }
        }
      ]
    },
    /* 会話2 — テスト結果の予想 */
    {
      settingEs: "Mañana tienes un examen de japonés. Hablas con tu amigo sobre cómo crees que les irá.",
      closingJa: "がんばりましょう！きっと だいじょうぶですよ！",
      closingEs: "¡Esforcémonos! ¡Seguro que estarán bien!",
      steps: [
        {
          ai: { ja: "あしたは にほんごの テストですね。むずかしいでしょうか。", jaPlain: "あしたはにほんごのてすとですね。むずかしいでしょうか。", romaji: "Ashita wa nihongo no tesuto desu ne. Muzukashii deshou ka.", es: "Mañana es el examen de japonés. ¿Será difícil?" },
          task: "Di que probablemente sea difícil (むずかしいでしょう).",
          expect: { ja: "たぶん テストは むずかしいでしょう。", jaPlain: "たぶんてすとはむずかしいでしょう。", romaji: "Tabun tesuto wa muzukashii deshou.", es: "Probablemente el examen sea difícil.", accept: ["むずかしいでしょう", "むずかしいでしょ"], dynamic: null }
        },
        {
          ai: { ja: "ちゃんと べんきょうしましたか。だいじょうぶでしょうか。", jaPlain: "ちゃんとべんきょうしましたか。だいじょうぶでしょうか。", romaji: "Chanto benkyou shimashita ka. Daijoubu deshou ka.", es: "¿Estudiaste bien? ¿Estarás bien?" },
          task: "Di que sí, probablemente estará bien (だいじょうぶでしょう).",
          expect: { ja: "はい、たぶん だいじょうぶでしょう。", jaPlain: "はい、たぶんだいじょうぶでしょう。", romaji: "Hai, tabun daijoubu deshou.", es: "Sí, probablemente esté bien.", accept: ["だいじょうぶでしょう", "だいじょうぶでしょ"], dynamic: null }
        },
        {
          ai: { ja: "ぶんぽうの もんだいは かんたんでしょうか。", jaPlain: "ぶんぽうのもんだいはかんたんでしょうか。", romaji: "Bunpou no mondai wa kantan deshou ka.", es: "¿Los problemas de gramática serán fáciles?" },
          task: "Di que la gramática probablemente sea un poco difícil.",
          expect: { ja: "ぶんぽうは すこし むずかしいでしょう。", jaPlain: "ぶんぽうはすこしむずかしいでしょう。", romaji: "Bunpou wa sukoshi muzukashii deshou.", es: "La gramática probablemente sea un poco difícil.", accept: ["むずかしいでしょう", "すこしむずかしいでしょう", "むずかしいでしょ"], dynamic: null }
        },
        {
          ai: { ja: "がんばりましょう！きっと いい けっかに なりますよ！", jaPlain: "がんばりましょう。きっといいけっかになりますよ。", romaji: "Ganbarimashou! Kitto ii kekka ni narimasu yo!", es: "¡Esforcémonos! ¡Seguro que tendremos buenos resultados!" },
          task: "Di que el examen probablemente estará bien, y que te esforzarás.",
          expect: { ja: "はい、テストは だいじょうぶでしょう。がんばります。", jaPlain: "はい、てすとはだいじょうぶでしょう。がんばります。", romaji: "Hai, tesuto wa daijoubu deshou. Ganbarimasu.", es: "Sí, el examen probablemente estará bien. Me esforzaré.", accept: ["だいじょうぶでしょう", "がんばります"], dynamic: null }
        }
      ]
    },
    /* 会話3 — パーティーの推量 */
    {
      settingEs: "Tu amigo organiza una fiesta este fin de semana. Hablan sobre cómo será.",
      closingJa: "たのしい パーティーに なりますね！たのしみです！",
      closingEs: "¡Va a ser una fiesta divertida! ¡Qué emoción!",
      steps: [
        {
          ai: { ja: "しゅうまつに パーティーを しますよ！たのしいでしょうか。", jaPlain: "しゅうまつにぱーてぃーをしますよ。たのしいでしょうか。", romaji: "Shuumatsu ni paatii o shimasu yo! Tanoshii deshou ka.", es: "¡Hago una fiesta el fin de semana! ¿Será divertida?" },
          task: "Di que probablemente será divertida (たのしいでしょう).",
          expect: { ja: "はい、たのしいでしょう。", jaPlain: "はい、たのしいでしょう。", romaji: "Hai, tanoshii deshou.", es: "Sí, probablemente será divertida.", accept: ["たのしいでしょう", "たのしいでしょ"], dynamic: null }
        },
        {
          ai: { ja: "りょうりを たくさん 作りますよ。おいしいでしょうか。", jaPlain: "りょうりをたくさんつくりますよ。おいしいでしょうか。", romaji: "Ryouri o takusan tsukurimasu yo. Oishii deshou ka.", es: "Voy a cocinar mucho. ¿Estará rico?" },
          task: "Di que seguro que estará delicioso (きっと おいしいでしょう).",
          expect: { ja: "きっと おいしいでしょう。", jaPlain: "きっとおいしいでしょう。", romaji: "Kitto oishii deshou.", es: "Seguro que estará delicioso.", accept: ["おいしいでしょう", "おいしいでしょ", "きっとおいしい"], dynamic: null }
        },
        {
          ai: { ja: "友だちを たくさん よびますよ。にぎやかでしょうか。", jaPlain: "ともだちをたくさんよびますよ。にぎやかでしょうか。", romaji: "Tomodachi o takusan yobimasu yo. Nigiyaka deshou ka.", es: "Voy a invitar a muchos amigos. ¿Será animada?" },
          task: "Di que probablemente será animada (にぎやかでしょう).",
          expect: { ja: "はい、にぎやかでしょう。", jaPlain: "はい、にぎやかでしょう。", romaji: "Hai, nigiyaka deshou.", es: "Sí, probablemente será animada.", accept: ["にぎやかでしょう", "にぎやかでしょ"], dynamic: null }
        },
        {
          ai: { ja: "音楽も ありますよ！いい パーティーに なるでしょう！", jaPlain: "おんがくもありますよ。いいぱーてぃーになるでしょう。", romaji: "Ongaku mo arimasu yo! Ii paatii ni naru deshou!", es: "¡También habrá música! ¡Será una buena fiesta!" },
          task: "Di que será una fiesta maravillosa (すてきなパーティーでしょう).",
          expect: { ja: "はい、すてきな パーティーでしょう。", jaPlain: "はい、すてきなぱーてぃーでしょう。", romaji: "Hai, suteki na paatii deshou.", es: "Sí, será una fiesta maravillosa.", accept: ["すてきなぱーてぃーでしょう", "ぱーてぃーでしょう", "すてきな"], dynamic: null }
        }
      ]
    }
  ],

  /* ======================================================================
   * UNIT 9 — Familia y personas
   * ==================================================================== */

  /* ---------- u9_c1: 家族の人数（〜は〜が〜人います）---------- */
  "u9_c1": [
    /* 会話1 — 新しい友達とカジュアルに */
    {
      settingEs: "Un compañero nuevo te pregunta sobre tu familia durante el recreo.",
      closingJa: "にぎやかな 家族ですね！はなしてくれて ありがとう！",
      closingEs: "¡Qué familia tan animada! ¡Gracias por contarme!",
      steps: [
        {
          ai: { ja: "家族は 何人ですか。", jaPlain: "かぞくはなんにんですか。", romaji: "Kazoku wa nannin desu ka.", es: "¿Cuántos son en tu familia?" },
          task: "Di que tu familia es de 4 personas usando 〜人います (かぞくが よにん います).",
          expect: { ja: "私は 家族が よにん います。", jaPlain: "わたしはかぞくがよにんいます。", romaji: "Watashi wa kazoku ga yonin imasu.", es: "Mi familia es de cuatro personas.", accept: ["かぞくがよにんいます", "よにんいます", "かぞくはよにんです", "よにんです"], dynamic: null }
        },
        {
          ai: { ja: "そうですか。きょうだいは いますか。", jaPlain: "そうですか。きょうだいはいますか。", romaji: "Sou desu ka. Kyoudai wa imasu ka.", es: "Ya veo. ¿Tienes hermanos?" },
          task: "Di que tienes un hermano mayor (あにが ひとり います).",
          expect: { ja: "兄が ひとり います。", jaPlain: "あにがひとりいます。", romaji: "Ani ga hitori imasu.", es: "Tengo un hermano mayor.", accept: ["あにがひとりいます", "あにがひとり", "あにがいます"], dynamic: null }
        },
        {
          ai: { ja: "へえ！ほかに きょうだいは いますか。", jaPlain: "へえ。ほかにきょうだいはいますか。", romaji: "Hee! Hoka ni kyoudai wa imasu ka.", es: "¡Oh! ¿Tienes más hermanos?" },
          task: "Di que también tienes una hermana menor (いもうとも ひとり います).",
          expect: { ja: "いもうとも ひとり います。", jaPlain: "いもうともひとりいます。", romaji: "Imouto mo hitori imasu.", es: "También tengo una hermana menor.", accept: ["いもうともひとりいます", "いもうとがひとりいます", "いもうとがひとり", "いもうともいます"], dynamic: null }
        },
        {
          ai: { ja: "あなたを いれて よにんですね。いい 家族ですね！", jaPlain: "あなたをいれてよにんですね。いいかぞくですね。", romaji: "Anata o irete yonin desu ne. Ii kazoku desu ne!", es: "Contigo son cuatro, ¿verdad? ¡Qué buena familia!" },
          task: "Di que sí, con tus padres son cuatro (りょうしんと 私で よにんです).",
          expect: { ja: "はい、りょうしんと 私で よにんです。", jaPlain: "はい、りょうしんとわたしでよにんです。", romaji: "Hai, ryoushin to watashi de yonin desu.", es: "Sí, con mis padres somos cuatro.", accept: ["りょうしんとわたしでよにんです", "よにんです", "はいよにんです"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 先生にていねいに */
    {
      settingEs: "Tu profesora de japonés te pregunta con respeto sobre tu familia.",
      closingJa: "すてきな ごかぞくですね。",
      closingEs: "Qué linda familia tiene.",
      steps: [
        {
          ai: { ja: "{name}さんの 家族は 何人ですか。", jaPlain: "さんのかぞくはなんにんですか。", romaji: "{name}-san no kazoku wa nannin desu ka.", es: "{name}, ¿cuántos son en tu familia?" },
          task: "Di que tu familia es de 5 personas (かぞくが ごにん います).",
          expect: { ja: "家族が ごにん います。", jaPlain: "かぞくがごにんいます。", romaji: "Kazoku ga gonin imasu.", es: "Mi familia es de cinco personas.", accept: ["かぞくがごにんいます", "ごにんいます", "ごにんです"], dynamic: null }
        },
        {
          ai: { ja: "ごりょうしんは おげんきですか。", jaPlain: "ごりょうしんはおげんきですか。", romaji: "Go-ryoushin wa o-genki desu ka.", es: "¿Sus padres están bien?" },
          task: "Di que sí, tus padres están bien (りょうしんは げんきです).",
          expect: { ja: "はい、りょうしんは げんきです。", jaPlain: "はい、りょうしんはげんきです。", romaji: "Hai, ryoushin wa genki desu.", es: "Sí, mis padres están bien.", accept: ["りょうしんはげんきです", "げんきです"], dynamic: null }
        },
        {
          ai: { ja: "きょうだいは 何人 いますか。", jaPlain: "きょうだいはなんにんいますか。", romaji: "Kyoudai wa nannin imasu ka.", es: "¿Cuántos hermanos tienes?" },
          task: "Di que tienes dos hermanos (きょうだいが ふたり います).",
          expect: { ja: "きょうだいが ふたり います。兄と あねです。", jaPlain: "きょうだいがふたりいます。あにとあねです。", romaji: "Kyoudai ga futari imasu. Ani to ane desu.", es: "Tengo dos hermanos. Un hermano mayor y una hermana mayor.", accept: ["きょうだいがふたりいます", "ふたりいます", "あにとあね"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 新しい知人にペットも紹介 */
    {
      settingEs: "En una fiesta conoces a alguien y le hablas de tu familia y tu mascota.",
      closingJa: "ペットも 家族ですね！かわいいでしょう！",
      closingEs: "¡La mascota también es familia! ¡Seguro es adorable!",
      steps: [
        {
          ai: { ja: "はじめまして。ごかぞくは 何人ですか。", jaPlain: "はじめまして。ごかぞくはなんにんですか。", romaji: "Hajimemashite. Go-kazoku wa nannin desu ka.", es: "Mucho gusto. ¿Cuántos son en tu familia?" },
          task: "Di que tu familia es de 3 personas (かぞくが さんにん います).",
          expect: { ja: "家族が さんにん います。", jaPlain: "かぞくがさんにんいます。", romaji: "Kazoku ga sannin imasu.", es: "Mi familia es de tres personas.", accept: ["かぞくがさんにんいます", "さんにんいます", "さんにんです"], dynamic: null }
        },
        {
          ai: { ja: "そうですか。おとうとや いもうとは いますか。", jaPlain: "そうですか。おとうとやいもうとはいますか。", romaji: "Sou desu ka. Otouto ya imouto wa imasu ka.", es: "Ya veo. ¿Tienes hermanos menores?" },
          task: "Di que no tienes hermanos (きょうだいは いません).",
          expect: { ja: "いいえ、きょうだいは いません。", jaPlain: "いいえ、きょうだいはいません。", romaji: "Iie, kyoudai wa imasen.", es: "No, no tengo hermanos.", accept: ["きょうだいはいません", "いません", "きょうだいはいない"], dynamic: null }
        },
        {
          ai: { ja: "ひとりっこですね。ペットは いますか。", jaPlain: "ひとりっこですね。ぺっとはいますか。", romaji: "Hitorikko desu ne. Petto wa imasu ka.", es: "Eres hijo único. ¿Tienes mascota?" },
          task: "Di que tienes dos perros (いぬが にひき います).",
          expect: { ja: "はい、いぬが にひき います。", jaPlain: "はい、いぬがにひきいます。", romaji: "Hai, inu ga nihiki imasu.", es: "Sí, tengo dos perros.", accept: ["いぬがにひきいます", "いぬがいます", "にひきいます"], dynamic: null }
        },
        {
          ai: { ja: "いぬが 二ひき！にぎやかでしょう。", jaPlain: "いぬがにひき。にぎやかでしょう。", romaji: "Inu ga nihiki! Nigiyaka deshou.", es: "¡Dos perros! Seguro es animado." },
          task: "Di que sí, con los perros son cinco (いぬと 家族で ごにんです).",
          expect: { ja: "はい、いぬと 家族で ごにんです。", jaPlain: "はい、いぬとかぞくでごにんです。", romaji: "Hai, inu to kazoku de gonin desu.", es: "Sí, con los perros somos cinco.", accept: ["いぬとかぞくでごにんです", "ごにんです", "ごにんいます"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u9_c2: 家族の職業・特徴（〜の〜は〜です）---------- */
  "u9_c2": [
    /* 会話1 — 友達に家族の仕事を話す */
    {
      settingEs: "Tu amiga te pregunta a qué se dedican tus padres.",
      closingJa: "すごい 家族ですね！じまんの 家族でしょう！",
      closingEs: "¡Qué familia tan increíble! ¡Seguro estás orgulloso!",
      steps: [
        {
          ai: { ja: "{name}さんの おとうさんの しごとは 何ですか。", jaPlain: "さんのおとうさんのしごとはなんですか。", romaji: "{name}-san no otousan no shigoto wa nan desu ka.", es: "{name}, ¿a qué se dedica tu papá?" },
          task: "Di que tu papá es médico (私の 父は 医者です).",
          expect: { ja: "私の 父は 医者です。", jaPlain: "わたしのちちはいしゃです。", romaji: "Watashi no chichi wa isha desu.", es: "Mi papá es médico.", accept: ["ちちはいしゃです", "ちちはいしゃ", "いしゃです"], dynamic: null }
        },
        {
          ai: { ja: "へえ、医者ですか！おかあさんは？", jaPlain: "へえ、いしゃですか。おかあさんは。", romaji: "Hee, isha desu ka! Okaasan wa?", es: "¡Oh, médico! ¿Y tu mamá?" },
          task: "Di que tu mamá es maestra (母は 先生です).",
          expect: { ja: "母は 先生です。", jaPlain: "ははせんせいです。", romaji: "Haha wa sensei desu.", es: "Mi mamá es maestra.", accept: ["ははせんせいです", "ははわせんせいです", "せんせいです"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。おかあさんは どんな 人ですか。", jaPlain: "いいですね。おかあさんはどんなひとですか。", romaji: "Ii desu ne. Okaasan wa donna hito desu ka.", es: "Qué bien. ¿Cómo es tu mamá?" },
          task: "Di que tu mamá es amable y cocina muy bien (母は やさしくて、りょうりが 上手です).",
          expect: { ja: "母は やさしくて、りょうりが 上手です。", jaPlain: "ははやさしくて、りょうりがじょうずです。", romaji: "Haha wa yasashikute, ryouri ga jouzu desu.", es: "Mi mamá es amable y cocina muy bien.", accept: ["やさしくてりょうりがじょうずです", "りょうりがじょうずです", "ははやさしいです"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 先生に家族を丁寧に紹介 */
    {
      settingEs: "Tu profesora quiere saber más sobre lo que hacen los miembros de tu familia.",
      closingJa: "ごかぞくは みんな がんばりやさんですね。",
      closingEs: "Toda tu familia es muy trabajadora.",
      steps: [
        {
          ai: { ja: "ごりょうしんは おしごとを していますか。", jaPlain: "ごりょうしんはおしごとをしていますか。", romaji: "Go-ryoushin wa o-shigoto o shite imasu ka.", es: "¿Tus padres trabajan?" },
          task: "Di que tu papá es empleado de empresa (父は 会社員です).",
          expect: { ja: "はい、父は 会社員です。", jaPlain: "はい、ちちはかいしゃいんです。", romaji: "Hai, chichi wa kaishain desu.", es: "Sí, mi papá es empleado de empresa.", accept: ["ちちはかいしゃいんです", "かいしゃいんです", "ちちはかいしゃいん"], dynamic: null }
        },
        {
          ai: { ja: "おとうさんは どんな 人ですか。", jaPlain: "おとうさんはどんなひとですか。", romaji: "Otousan wa donna hito desu ka.", es: "¿Cómo es tu papá?" },
          task: "Di que tu papá es serio y muy trabajador (父は まじめで、しごとが 上手です).",
          expect: { ja: "父は まじめで、しごとが 上手です。", jaPlain: "ちちはまじめで、しごとがじょうずです。", romaji: "Chichi wa majime de, shigoto ga jouzu desu.", es: "Mi papá es serio y muy bueno en su trabajo.", accept: ["まじめでしごとがじょうずです", "ちちはまじめです", "まじめです"], dynamic: null }
        },
        {
          ai: { ja: "おねえさんか おにいさんは いますか。", jaPlain: "おねえさんかおにいさんはいますか。", romaji: "Oneesan ka oniisan wa imasu ka.", es: "¿Tienes hermano o hermana mayor?" },
          task: "Di que tu hermana mayor es estudiante y muy alegre (あねは 学生で、げんきです).",
          expect: { ja: "あねは 学生で、げんきです。", jaPlain: "あねはがくせいで、げんきです。", romaji: "Ane wa gakusei de, genki desu.", es: "Mi hermana mayor es estudiante y muy alegre.", accept: ["あねはがくせいで、げんきです", "あねはがくせいです", "がくせいでげんきです"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 写真を見せながら紹介 */
    {
      settingEs: "Le muestras una foto de tu familia a un amigo y le explicas quién es cada uno.",
      closingJa: "みんな いい かおですね！すてきな しゃしんです。",
      closingEs: "¡Todos salen con buena cara! Qué linda foto.",
      steps: [
        {
          ai: { ja: "この しゃしんの 人は だれですか。", jaPlain: "このしゃしんのひとはだれですか。", romaji: "Kono shashin no hito wa dare desu ka.", es: "¿Quién es la persona de esta foto?" },
          task: "Di que es tu papá y que es cocinero (私の 父です。コックです).",
          expect: { ja: "私の 父です。コックです。", jaPlain: "わたしのちちです。こっくです。", romaji: "Watashi no chichi desu. Kokku desu.", es: "Es mi papá. Es cocinero.", accept: ["わたしのちちです", "ちちです", "こっくです"], dynamic: null }
        },
        {
          ai: { ja: "コックですか！りょうりが 上手でしょう。となりの 人は？", jaPlain: "こっくですか。りょうりがじょうずでしょう。となりのひとは。", romaji: "Kokku desu ka! Ryouri ga jouzu deshou. Tonari no hito wa?", es: "¡Cocinero! Seguro cocina bien. ¿Y la persona de al lado?" },
          task: "Di que es tu mamá y que es amable (母です。やさしい 人です).",
          expect: { ja: "母です。やさしい 人です。", jaPlain: "ははです。やさしいひとです。", romaji: "Haha desu. Yasashii hito desu.", es: "Es mi mamá. Es una persona amable.", accept: ["ははです", "やさしいひとです", "ははやさしいです"], dynamic: null }
        },
        {
          ai: { ja: "すてきですね。この 小さい 子は だれですか。", jaPlain: "すてきですね。このちいさいこはだれですか。", romaji: "Suteki desu ne. Kono chiisai ko wa dare desu ka.", es: "Qué lindo. ¿Y este niño pequeño quién es?" },
          task: "Di que es tu hermano menor y que es divertido (おとうとです。おもしろい 人です).",
          expect: { ja: "おとうとです。おもしろい 人です。", jaPlain: "おとうとです。おもしろいひとです。", romaji: "Otouto desu. Omoshiroi hito desu.", es: "Es mi hermano menor. Es una persona divertida.", accept: ["おとうとです", "おもしろいひとです", "おとうとはおもしろいです"], dynamic: null }
        },
        {
          ai: { ja: "みんな なかが いいですね！", jaPlain: "みんななかがいいですね。", romaji: "Minna naka ga ii desu ne!", es: "¡Se llevan muy bien!" },
          task: "Di que sí, tu familia es muy alegre (私の 家族は とても げんきです).",
          expect: { ja: "はい、私の 家族は とても げんきです。", jaPlain: "はい、わたしのかぞくはとてもげんきです。", romaji: "Hai, watashi no kazoku wa totemo genki desu.", es: "Sí, mi familia es muy alegre.", accept: ["かぞくはとてもげんきです", "かぞくはげんきです", "げんきです"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u9_c3: うち（身内）／そと（他人の家族）---------- */
  "u9_c3": [
    /* 会話1 — 友達のお父さんの職業を聞く */
    {
      settingEs: "Hablas con tu amigo Carlos sobre el trabajo de su papá y del tuyo.",
      closingJa: "おたがいの 家族の こと、よく わかりましたね！",
      closingEs: "¡Ahora conocemos bien a la familia del otro!",
      steps: [
        {
          ai: { ja: "カルロスくんの おとうさんは 医者ですね。すごいです。", jaPlain: "かるろすくんのおとうさんはいしゃですね。すごいです。", romaji: "Karurosu-kun no otousan wa isha desu ne. Sugoi desu.", es: "El papá de Carlos es médico, ¿verdad? Increíble." },
          task: "Pregunta cómo se dice: di que tu papá (身内) es maestro (私の 父は 先生です).",
          expect: { ja: "私の 父は 先生です。", jaPlain: "わたしのちちはせんせいです。", romaji: "Watashi no chichi wa sensei desu.", es: "Mi papá es maestro.", accept: ["ちちはせんせいです", "ちちはせんせい", "せんせいです"], dynamic: null }
        },
        {
          ai: { ja: "へえ、先生ですか！じゃあ、カルロスくんの おとうさんは？", jaPlain: "へえ、せんせいですか。じゃあ、かるろすくんのおとうさんは。", romaji: "Hee, sensei desu ka! Jaa, Karurosu-kun no otousan wa?", es: "¡Oh, maestro! Y el papá de Carlos, ¿qué hace?" },
          task: "Habla del papá de Carlos (そと) con 〜さんの: di que el papá de Carlos es médico (カルロスくんの おとうさんは 医者です).",
          expect: { ja: "カルロスくんの おとうさんは 医者です。", jaPlain: "かるろすくんのおとうさんはいしゃです。", romaji: "Karurosu-kun no otousan wa isha desu.", es: "El papá de Carlos es médico.", accept: ["かるろすくんのおとうさんはいしゃです", "おとうさんはいしゃです", "いしゃです"], dynamic: null }
        },
        {
          ai: { ja: "そうです。じゃあ、{name}さんの おかあさんは？", jaPlain: "そうです。じゃあ、さんのおかあさんは。", romaji: "Sou desu. Jaa, {name}-san no okaasan wa?", es: "Así es. Y tu mamá, ¿qué hace?" },
          task: "Habla de tu propia mamá (身内): di que tu mamá es empleada de empresa (母は 会社員です).",
          expect: { ja: "母は 会社員です。", jaPlain: "ははかいしゃいんです。", romaji: "Haha wa kaishain desu.", es: "Mi mamá es empleada de empresa.", accept: ["ははかいしゃいんです", "ははわかいしゃいんです", "かいしゃいんです"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 先生の家族について丁寧に聞く */
    {
      settingEs: "Tu profesora te cuenta de su familia y tú preguntas con respeto.",
      closingJa: "先生の ごかぞくの こと、うれしいです。ありがとうございます。",
      closingEs: "Me alegra saber de su familia. Muchas gracias.",
      steps: [
        {
          ai: { ja: "私の むすめは 学生です。あなたの ごかぞくは？", jaPlain: "わたしのむすめはがくせいです。あなたのごかぞくは。", romaji: "Watashi no musume wa gakusei desu. Anata no go-kazoku wa?", es: "Mi hija es estudiante. ¿Y tu familia?" },
          task: "Habla de tu hermana mayor (身内): di que tu hermana mayor también es estudiante (あねも 学生です).",
          expect: { ja: "あねも 学生です。", jaPlain: "あねもがくせいです。", romaji: "Ane mo gakusei desu.", es: "Mi hermana mayor también es estudiante.", accept: ["あねもがくせいです", "あねはがくせいです", "がくせいです"], dynamic: null }
        },
        {
          ai: { ja: "いっしょですね！先生の しゅじんは いしゃです。", jaPlain: "いっしょですね。せんせいのしゅじんはいしゃです。", romaji: "Issho desu ne! Sensei no shujin wa isha desu.", es: "¡Igual que tú! El esposo de la profesora es médico." },
          task: "Pregunta con respeto por el esposo de la profesora (そと): pregunta cómo es (先生の しゅじんは どんな 人ですか).",
          expect: { ja: "先生の しゅじんは どんな 人ですか。", jaPlain: "せんせいのしゅじんはどんなひとですか。", romaji: "Sensei no shujin wa donna hito desu ka.", es: "¿Cómo es el esposo de la profesora?", accept: ["せんせいのしゅじんはどんなひとですか", "しゅじんはどんなひとですか", "どんなひとですか"], dynamic: null }
        },
        {
          ai: { ja: "とても やさしくて、しごとが 上手です。あなたの おとうさんは？", jaPlain: "とてもやさしくて、しごとがじょうずです。あなたのおとうさんは。", romaji: "Totemo yasashikute, shigoto ga jouzu desu. Anata no otousan wa?", es: "Es muy amable y bueno en su trabajo. ¿Y tu papá?" },
          task: "Habla de tu propio papá (身内, sin 〜さん): di que tu papá es empleado de empresa y serio (私の 父は 会社員で、まじめです).",
          expect: { ja: "私の 父は 会社員で、まじめです。", jaPlain: "わたしのちちはかいしゃいんで、まじめです。", romaji: "Watashi no chichi wa kaishain de, majime desu.", es: "Mi papá es empleado de empresa y muy serio.", accept: ["ちちはかいしゃいんでまじめです", "かいしゃいんでまじめです", "ちちはかいしゃいんです"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 近所の家族と自分の家族を比べる */
    {
      settingEs: "En una reunión familiar comparas a tu familia con la de un vecino.",
      closingJa: "どちらの 家族も すてきですね！",
      closingEs: "¡Ambas familias son maravillosas!",
      steps: [
        {
          ai: { ja: "となりの たなかさんの おねえさんは きれいですね。", jaPlain: "となりのたなかさんのおねえさんはきれいですね。", romaji: "Tonari no Tanaka-san no oneesan wa kirei desu ne.", es: "La hermana mayor del vecino Tanaka es guapa, ¿no?" },
          task: "Habla de la hermana del Sr. Tanaka (そと): di que la hermana del Sr. Tanaka es amable (たなかさんの おねえさんは やさしいです).",
          expect: { ja: "たなかさんの おねえさんは やさしいです。", jaPlain: "たなかさんのおねえさんはやさしいです。", romaji: "Tanaka-san no oneesan wa yasashii desu.", es: "La hermana mayor del Sr. Tanaka es amable.", accept: ["たなかさんのおねえさんはやさしいです", "おねえさんはやさしいです", "やさしいです"], dynamic: null }
        },
        {
          ai: { ja: "{name}さんの おねえさんは どんな 人ですか。", jaPlain: "さんのおねえさんはどんなひとですか。", romaji: "{name}-san no oneesan wa donna hito desu ka.", es: "Y tu hermana mayor, ¿cómo es?" },
          task: "Habla de tu propia hermana (身内, sin 〜さん): di que tu hermana mayor es alegre y divertida (あねは げんきで、おもしろいです).",
          expect: { ja: "あねは げんきで、おもしろいです。", jaPlain: "あねはげんきで、おもしろいです。", romaji: "Ane wa genki de, omoshiroi desu.", es: "Mi hermana mayor es alegre y divertida.", accept: ["あねはげんきでおもしろいです", "あねはげんきです", "げんきでおもしろいです"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。たなかさんの 家族は 何人ですか。", jaPlain: "いいですね。たなかさんのかぞくはなんにんですか。", romaji: "Ii desu ne. Tanaka-san no kazoku wa nannin desu ka.", es: "Qué bien. ¿Cuántos son en la familia del Sr. Tanaka?" },
          task: "Habla de la familia de Tanaka (そと): di que la familia del Sr. Tanaka es de cuatro personas (たなかさんの 家族は よにんです).",
          expect: { ja: "たなかさんの 家族は よにんです。", jaPlain: "たなかさんのかぞくはよにんです。", romaji: "Tanaka-san no kazoku wa yonin desu.", es: "La familia del Sr. Tanaka es de cuatro personas.", accept: ["たなかさんのかぞくはよにんです", "かぞくはよにんです", "よにんです"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u9_c4: 家族について質問・応答（何人／何歳／どんな人）---------- */
  "u9_c4": [
    /* 会話1 — 友達に質問する側 */
    {
      settingEs: "Quieres conocer mejor a la familia de tu amiga, así que le haces preguntas.",
      closingJa: "たくさん 話して くれて ありがとう！",
      closingEs: "¡Gracias por contarme tantas cosas!",
      steps: [
        {
          ai: { ja: "私の 家族の こと、聞いて いいですよ。", jaPlain: "わたしのかぞくのこと、きいていいですよ。", romaji: "Watashi no kazoku no koto, kiite ii desu yo.", es: "Puedes preguntarme sobre mi familia." },
          task: "Pregunta cuántas personas hay en su familia (家族は 何人ですか).",
          expect: { ja: "家族は 何人ですか。", jaPlain: "かぞくはなんにんですか。", romaji: "Kazoku wa nannin desu ka.", es: "¿Cuántos son en tu familia?", accept: ["かぞくはなんにんですか", "なんにんですか", "なんにんいますか"], dynamic: null }
        },
        {
          ai: { ja: "家族は ごにんです。母も います。", jaPlain: "かぞくはごにんです。ははもいます。", romaji: "Kazoku wa gonin desu. Haha mo imasu.", es: "Somos cinco. También está mi mamá." },
          task: "Pregunta cuántos años tiene su mamá (おかあさんは 何歳ですか).",
          expect: { ja: "おかあさんは 何歳ですか。", jaPlain: "おかあさんはなんさいですか。", romaji: "Okaasan wa nansai desu ka.", es: "¿Cuántos años tiene tu mamá?", accept: ["おかあさんはなんさいですか", "なんさいですか", "おかあさんはいくつですか"], dynamic: null }
        },
        {
          ai: { ja: "母は よんじゅうごさいです。", jaPlain: "ははよんじゅうごさいです。", romaji: "Haha wa yonjuu-go-sai desu.", es: "Mi mamá tiene 45 años." },
          task: "Pregunta qué tipo de persona es su mamá (おかあさんは どんな 人ですか).",
          expect: { ja: "おかあさんは どんな 人ですか。", jaPlain: "おかあさんはどんなひとですか。", romaji: "Okaasan wa donna hito desu ka.", es: "¿Cómo es tu mamá?", accept: ["おかあさんはどんなひとですか", "どんなひとですか"], dynamic: null }
        },
        {
          ai: { ja: "とても やさしい 人です。りょうりが 上手ですよ。", jaPlain: "とてもやさしいひとです。りょうりがじょうずですよ。", romaji: "Totemo yasashii hito desu. Ryouri ga jouzu desu yo.", es: "Es muy amable. Cocina muy bien." },
          task: "Reacciona diciendo que qué bien / suena amable (やさしい おかあさんですね).",
          expect: { ja: "いいですね。やさしい おかあさんですね。", jaPlain: "いいですね。やさしいおかあさんですね。", romaji: "Ii desu ne. Yasashii okaasan desu ne.", es: "Qué bien. Tu mamá es muy amable.", accept: ["やさしいおかあさんですね", "いいですね", "やさしいですね"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 先生から質問される側（ていねい） */
    {
      settingEs: "Tu profesora te hace preguntas sobre tu familia y tú respondes con cortesía.",
      closingJa: "ごかぞくの こと、よく わかりました。ありがとう。",
      closingEs: "Entendí bien lo de tu familia. Gracias.",
      steps: [
        {
          ai: { ja: "{name}さんの 家族は 何人ですか。", jaPlain: "さんのかぞくはなんにんですか。", romaji: "{name}-san no kazoku wa nannin desu ka.", es: "{name}, ¿cuántos son en tu familia?" },
          task: "Responde que son cuatro (よにんです).",
          expect: { ja: "よにんです。", jaPlain: "よにんです。", romaji: "Yonin desu.", es: "Somos cuatro.", accept: ["よにんです", "かぞくはよにんです", "よにんいます"], dynamic: null }
        },
        {
          ai: { ja: "おとうさんは 何歳ですか。", jaPlain: "おとうさんはなんさいですか。", romaji: "Otousan wa nansai desu ka.", es: "¿Cuántos años tiene tu papá?" },
          task: "Responde que tu papá tiene 50 años (父は ごじゅっさいです).",
          expect: { ja: "父は ごじゅっさいです。", jaPlain: "ちちはごじゅっさいです。", romaji: "Chichi wa gojussai desu.", es: "Mi papá tiene 50 años.", accept: ["ちちはごじゅっさいです", "ごじゅっさいです", "ごじっさいです"], dynamic: null }
        },
        {
          ai: { ja: "おとうさんは どんな 人ですか。", jaPlain: "おとうさんはどんなひとですか。", romaji: "Otousan wa donna hito desu ka.", es: "¿Cómo es tu papá?" },
          task: "Responde que es serio pero amable (まじめですが、やさしいです).",
          expect: { ja: "父は まじめですが、やさしいです。", jaPlain: "ちちはまじめですが、やさしいです。", romaji: "Chichi wa majime desu ga, yasashii desu.", es: "Mi papá es serio pero amable.", accept: ["まじめですがやさしいです", "まじめでやさしいです", "やさしいです"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 相手の兄弟について深掘り */
    {
      settingEs: "Conoces a un nuevo amigo y le preguntas sobre sus hermanos.",
      closingJa: "きょうだいの こと、もっと 聞きたいです！",
      closingEs: "¡Quiero saber más de tus hermanos!",
      steps: [
        {
          ai: { ja: "私は きょうだいが たくさん いますよ。", jaPlain: "わたしはきょうだいがたくさんいますよ。", romaji: "Watashi wa kyoudai ga takusan imasu yo.", es: "Yo tengo muchos hermanos." },
          task: "Pregunta cuántos hermanos tiene (きょうだいは 何人 いますか).",
          expect: { ja: "きょうだいは 何人 いますか。", jaPlain: "きょうだいはなんにんいますか。", romaji: "Kyoudai wa nannin imasu ka.", es: "¿Cuántos hermanos tienes?", accept: ["きょうだいはなんにんいますか", "なんにんいますか", "なんにんですか"], dynamic: null }
        },
        {
          ai: { ja: "あにが ふたりと いもうとが ひとり います。", jaPlain: "あにがふたりといもうとがひとりいます。", romaji: "Ani ga futari to imouto ga hitori imasu.", es: "Tengo dos hermanos mayores y una hermana menor." },
          task: "Pregunta qué tipo de persona es su hermano mayor (おにいさんは どんな 人ですか).",
          expect: { ja: "おにいさんは どんな 人ですか。", jaPlain: "おにいさんはどんなひとですか。", romaji: "Oniisan wa donna hito desu ka.", es: "¿Cómo es tu hermano mayor?", accept: ["おにいさんはどんなひとですか", "どんなひとですか"], dynamic: null }
        },
        {
          ai: { ja: "あには おもしろくて、スポーツが 上手です。", jaPlain: "あにはおもしろくて、すぽーつがじょうずです。", romaji: "Ani wa omoshirokute, supootsu ga jouzu desu.", es: "Mi hermano es divertido y bueno en deportes." },
          task: "Pregunta cuántos años tiene su hermana menor (いもうとさんは 何歳ですか).",
          expect: { ja: "いもうとさんは 何歳ですか。", jaPlain: "いもうとさんはなんさいですか。", romaji: "Imoutosan wa nansai desu ka.", es: "¿Cuántos años tiene tu hermana menor?", accept: ["いもうとさんはなんさいですか", "なんさいですか", "いくつですか"], dynamic: null }
        },
        {
          ai: { ja: "いもうとは じゅうさんさいです。", jaPlain: "いもうとはじゅうさんさいです。", romaji: "Imouto wa juusan-sai desu.", es: "Mi hermana menor tiene 13 años." },
          task: "Reacciona diciendo que tiene una familia animada (にぎやかな 家族ですね).",
          expect: { ja: "にぎやかな 家族ですね！", jaPlain: "にぎやかなかぞくですね。", romaji: "Nigiyaka na kazoku desu ne!", es: "¡Qué familia tan animada!", accept: ["にぎやかなかぞくですね", "にぎやかですね", "いいかぞくですね"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u9_c5: 家族を総合紹介（職業・年齢・特徴）---------- */
  "u9_c5": [
    /* 会話1 — クラスで家族をスピーチ */
    {
      settingEs: "En clase presentas a tu familia frente a todos. La profesora te va guiando.",
      closingJa: "すばらしい しょうかいでした！はくしゅ！",
      closingEs: "¡Excelente presentación! ¡Un aplauso!",
      steps: [
        {
          ai: { ja: "では、家族を しょうかいして ください。何人 家族ですか。", jaPlain: "では、かぞくをしょうかいしてください。なんにんかぞくですか。", romaji: "Dewa, kazoku o shoukai shite kudasai. Nannin kazoku desu ka.", es: "Bien, presenta a tu familia. ¿De cuántas personas es?" },
          task: "Di que tu familia es de cinco personas (私の 家族は ごにんです).",
          expect: { ja: "私の 家族は ごにんです。", jaPlain: "わたしのかぞくはごにんです。", romaji: "Watashi no kazoku wa gonin desu.", es: "Mi familia es de cinco personas.", accept: ["かぞくはごにんです", "ごにんです", "ごにんかぞくです"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。おとうさんに ついて 話して ください。", jaPlain: "いいですね。おとうさんについてはなしてください。", romaji: "Ii desu ne. Otousan ni tsuite hanashite kudasai.", es: "Muy bien. Cuéntanos sobre tu papá." },
          task: "Di que tu papá es empleado de empresa y muy trabajador (父は 会社員で、まじめです).",
          expect: { ja: "父は 会社員で、まじめです。", jaPlain: "ちちはかいしゃいんで、まじめです。", romaji: "Chichi wa kaishain de, majime desu.", es: "Mi papá es empleado de empresa y muy serio.", accept: ["ちちはかいしゃいんでまじめです", "かいしゃいんでまじめです", "ちちはかいしゃいんです"], dynamic: null }
        },
        {
          ai: { ja: "おかあさんは どんな 人ですか。", jaPlain: "おかあさんはどんなひとですか。", romaji: "Okaasan wa donna hito desu ka.", es: "¿Cómo es tu mamá?" },
          task: "Di que tu mamá es amable y cocina muy bien (母は やさしくて、りょうりが 上手です).",
          expect: { ja: "母は やさしくて、りょうりが 上手です。", jaPlain: "ははやさしくて、りょうりがじょうずです。", romaji: "Haha wa yasashikute, ryouri ga jouzu desu.", es: "Mi mamá es amable y cocina muy bien.", accept: ["やさしくてりょうりがじょうずです", "りょうりがじょうずです", "ははやさしいです"], dynamic: null }
        },
        {
          ai: { ja: "きょうだいは いますか。", jaPlain: "きょうだいはいますか。", romaji: "Kyoudai wa imasu ka.", es: "¿Tienes hermanos?" },
          task: "Di que tienes un hermano menor de 10 años y que es divertido (おとうとが います。じゅっさいで、おもしろいです).",
          expect: { ja: "おとうとが います。じゅっさいで、おもしろいです。", jaPlain: "おとうとがいます。じゅっさいで、おもしろいです。", romaji: "Otouto ga imasu. Jussai de, omoshiroi desu.", es: "Tengo un hermano menor. Tiene 10 años y es divertido.", accept: ["おとうとがいます", "じゅっさいでおもしろいです", "おもしろいです"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 日本人の友達に家族を紹介 */
    {
      settingEs: "Un amigo japonés quiere conocer a tu familia. Se la describes con calidez.",
      closingJa: "いつか 会わせたいですね！",
      closingEs: "¡Algún día me gustaría presentártelos!",
      steps: [
        {
          ai: { ja: "{name}さんの 家族の こと、教えて ください。", jaPlain: "さんのかぞくのこと、おしえてください。", romaji: "{name}-san no kazoku no koto, oshiete kudasai.", es: "{name}, cuéntame sobre tu familia." },
          task: "Di que tu familia es de cuatro y todos son muy alegres (家族は よにんで、みんな げんきです).",
          expect: { ja: "家族は よにんで、みんな げんきです。", jaPlain: "かぞくはよにんで、みんなげんきです。", romaji: "Kazoku wa yonin de, minna genki desu.", es: "Mi familia es de cuatro y todos son muy alegres.", accept: ["かぞくはよにんでみんなげんきです", "よにんでみんなげんきです", "みんなげんきです"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！おとうさんは 何を して いますか。", jaPlain: "いいですね。おとうさんはなにをしていますか。", romaji: "Ii desu ne! Otousan wa nani o shite imasu ka.", es: "¡Qué bien! ¿A qué se dedica tu papá?" },
          task: "Di que tu papá es médico y que es una persona amable (父は 医者で、しんせつな 人です).",
          expect: { ja: "父は 医者で、しんせつな 人です。", jaPlain: "ちちはいしゃで、しんせつなひとです。", romaji: "Chichi wa isha de, shinsetsu na hito desu.", es: "Mi papá es médico y es una persona amable.", accept: ["ちちはいしゃでしんせつなひとです", "いしゃでしんせつです", "ちちはいしゃです"], dynamic: null }
        },
        {
          ai: { ja: "すてきな おとうさんですね。おかあさんは？", jaPlain: "すてきなおとうさんですね。おかあさんは。", romaji: "Suteki na otousan desu ne. Okaasan wa?", es: "Qué papá tan genial. ¿Y tu mamá?" },
          task: "Di que tu mamá es maestra, tiene 42 años y es muy alegre (母は 先生で、よんじゅうにさいで、げんきです).",
          expect: { ja: "母は 先生で、よんじゅうにさいで、げんきです。", jaPlain: "ははせんせいで、よんじゅうにさいで、げんきです。", romaji: "Haha wa sensei de, yonjuu-ni-sai de, genki desu.", es: "Mi mamá es maestra, tiene 42 años y es muy alegre.", accept: ["ははせんせいでげんきです", "せんせいでげんきです", "ははせんせいです"], dynamic: null }
        }
      ]
    },
    /* 会話3 — おじいさん・おばあさんも含めた大家族 */
    {
      settingEs: "Le hablas a un conocido sobre tu familia grande, incluidos tus abuelos.",
      closingJa: "大きい 家族は あたたかいですね！",
      closingEs: "¡Las familias grandes son cálidas!",
      steps: [
        {
          ai: { ja: "{name}さんの 家族は 大きいですか。", jaPlain: "さんのかぞくはおおきいですか。", romaji: "{name}-san no kazoku wa ookii desu ka.", es: "{name}, ¿tu familia es grande?" },
          task: "Di que sí, tu familia es de seis personas (はい、家族は ろくにんです).",
          expect: { ja: "はい、家族は ろくにんです。", jaPlain: "はい、かぞくはろくにんです。", romaji: "Hai, kazoku wa rokunin desu.", es: "Sí, mi familia es de seis personas.", accept: ["かぞくはろくにんです", "ろくにんです", "ろくにんいます"], dynamic: null }
        },
        {
          ai: { ja: "ろくにん！おじいさんも いますか。", jaPlain: "ろくにん。おじいさんもいますか。", romaji: "Rokunin! Ojiisan mo imasu ka.", es: "¡Seis! ¿También está tu abuelo?" },
          task: "Di que sí, tu abuelo y tu abuela viven juntos y son muy amables (そふと そぼが います。とても やさしいです).",
          expect: { ja: "はい、そふと そぼが います。とても やさしいです。", jaPlain: "はい、そふとそぼがいます。とてもやさしいです。", romaji: "Hai, sofu to sobo ga imasu. Totemo yasashii desu.", es: "Sí, están mi abuelo y mi abuela. Son muy amables.", accept: ["そふとそぼがいます", "そふとそぼがいますとてもやさしいです", "やさしいです"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。おじいさんは 何歳ですか。", jaPlain: "いいですね。おじいさんはなんさいですか。", romaji: "Ii desu ne. Ojiisan wa nansai desu ka.", es: "Qué bien. ¿Cuántos años tiene tu abuelo?" },
          task: "Di que tu abuelo tiene 70 años y es muy sano (そふは ななじゅっさいで、げんきです).",
          expect: { ja: "そふは ななじゅっさいで、げんきです。", jaPlain: "そふはななじゅっさいで、げんきです。", romaji: "Sofu wa nanajussai de, genki desu.", es: "Mi abuelo tiene 70 años y está muy sano.", accept: ["そふはななじゅっさいでげんきです", "ななじゅっさいでげんきです", "そふはげんきです"], dynamic: null }
        },
        {
          ai: { ja: "げんきな おじいさんですね！すてきな 家族です。", jaPlain: "げんきなおじいさんですね。すてきなかぞくです。", romaji: "Genki na ojiisan desu ne! Suteki na kazoku desu.", es: "¡Qué abuelo tan sano! Qué linda familia." },
          task: "Di que sí, amas mucho a tu familia (はい、家族が 大すきです).",
          expect: { ja: "はい、家族が 大すきです。", jaPlain: "はい、かぞくがだいすきです。", romaji: "Hai, kazoku ga daisuki desu.", es: "Sí, quiero mucho a mi familia.", accept: ["かぞくがだいすきです", "だいすきです", "かぞくがすきです"], dynamic: null }
        }
      ]
    }
  ],

  /* ======================================================================
   * UNIT 10 — Horario diario
   * ==================================================================== */

  /* ---------- u10_c1: 朝のルーティン（〜てから）---------- */
  "u10_c1": [
    /* 会話1 — 友達と朝の習慣を話す */
    {
      settingEs: "Tu amiga te pregunta cómo es tu rutina de las mañanas.",
      closingJa: "けんこうてきな あさですね！いい いちにちを！",
      closingEs: "¡Qué mañana tan saludable! ¡Que tengas buen día!",
      steps: [
        {
          ai: { ja: "まいあさ、おきてから 何を しますか。", jaPlain: "まいあさ、おきてからなにをしますか。", romaji: "Maiasa, okite kara nani o shimasu ka.", es: "Cada mañana, ¿qué haces después de levantarte?" },
          task: "Di que después de levantarte te bañas (おきてから シャワーを あびます).",
          expect: { ja: "おきてから シャワーを あびます。", jaPlain: "おきてからしゃわーをあびます。", romaji: "Okite kara shawaa o abimasu.", es: "Después de levantarme me baño.", accept: ["おきてからしゃわーをあびます", "しゃわーをあびます", "しゃわーをあびる"], dynamic: null }
        },
        {
          ai: { ja: "そのあとは？", jaPlain: "そのあとは。", romaji: "Sono ato wa?", es: "¿Y después?" },
          task: "Di que después de lavarte los dientes desayunas (はを みがいてから ごはんを 食べます).",
          expect: { ja: "はを みがいてから ごはんを 食べます。", jaPlain: "はをみがいてからごはんをたべます。", romaji: "Ha o migaite kara gohan o tabemasu.", es: "Después de lavarme los dientes desayuno.", accept: ["はをみがいてからごはんをたべます", "ごはんをたべます", "はをみがいてから"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。ごはんの あとは？", jaPlain: "いいですね。ごはんのあとは。", romaji: "Ii desu ne. Gohan no ato wa?", es: "Qué bien. ¿Y después de comer?" },
          task: "Di que después de desayunar vas a la escuela (ごはんを 食べてから 学校に 行きます).",
          expect: { ja: "ごはんを 食べてから 学校に 行きます。", jaPlain: "ごはんをたべてからがっこうにいきます。", romaji: "Gohan o tabete kara gakkou ni ikimasu.", es: "Después de desayunar voy a la escuela.", accept: ["ごはんをたべてからがっこうにいきます", "がっこうにいきます", "たべてからがっこうにいきます"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 先生に生活習慣を報告 */
    {
      settingEs: "Tu profesora quiere saber si tienes buenos hábitos por la mañana.",
      closingJa: "とても いい しゅうかんですね。えらいです！",
      closingEs: "Qué buenos hábitos tienes. ¡Muy bien!",
      steps: [
        {
          ai: { ja: "{name}さんは まいあさ 何時に おきますか。", jaPlain: "さんはまいあさなんじにおきますか。", romaji: "{name}-san wa maiasa nanji ni okimasu ka.", es: "{name}, ¿a qué hora te levantas cada mañana?" },
          task: "Di que te levantas a las 6 y luego haces ejercicio (ろくじに おきてから うんどうを します).",
          expect: { ja: "ろくじに おきてから うんどうを します。", jaPlain: "ろくじにおきてからうんどうをします。", romaji: "Rokuji ni okite kara undou o shimasu.", es: "Me levanto a las 6 y luego hago ejercicio.", accept: ["ろくじにおきてからうんどうをします", "うんどうをします", "おきてからうんどうをします"], dynamic: null }
        },
        {
          ai: { ja: "けんこうてきですね。あさごはんは 食べますか。", jaPlain: "けんこうてきですね。あさごはんはたべますか。", romaji: "Kenkouteki desu ne. Asagohan wa tabemasu ka.", es: "Qué saludable. ¿Desayunas?" },
          task: "Di que después de hacer ejercicio desayunas (うんどうを してから あさごはんを 食べます).",
          expect: { ja: "うんどうを してから あさごはんを 食べます。", jaPlain: "うんどうをしてからあさごはんをたべます。", romaji: "Undou o shite kara asagohan o tabemasu.", es: "Después de hacer ejercicio desayuno.", accept: ["うんどうをしてからあさごはんをたべます", "あさごはんをたべます", "してからあさごはんをたべます"], dynamic: null }
        },
        {
          ai: { ja: "べんきょうは いつ しますか。", jaPlain: "べんきょうはいつしますか。", romaji: "Benkyou wa itsu shimasu ka.", es: "¿Cuándo estudias?" },
          task: "Di que después de comer estudias japonés (ごはんを 食べてから にほんごを べんきょうします).",
          expect: { ja: "ごはんを 食べてから にほんごを べんきょうします。", jaPlain: "ごはんをたべてからにほんごをべんきょうします。", romaji: "Gohan o tabete kara nihongo o benkyou shimasu.", es: "Después de comer estudio japonés.", accept: ["ごはんをたべてからにほんごをべんきょうします", "にほんごをべんきょうします", "たべてからべんきょうします"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 週末の朝の違い */
    {
      settingEs: "Charlas con un amigo sobre cómo cambia tu rutina los fines de semana.",
      closingJa: "しゅうまつの あさは ゆっくりですね！",
      closingEs: "¡Las mañanas del fin de semana son relajadas!",
      steps: [
        {
          ai: { ja: "しゅうまつの あさは 何を しますか。", jaPlain: "しゅうまつのあさはなにをしますか。", romaji: "Shuumatsu no asa wa nani o shimasu ka.", es: "¿Qué haces las mañanas del fin de semana?" },
          task: "Di que después de levantarte tarde tomas café (おそく おきてから コーヒーを のみます).",
          expect: { ja: "おそく おきてから コーヒーを のみます。", jaPlain: "おそくおきてからこーひーをのみます。", romaji: "Osoku okite kara koohii o nomimasu.", es: "Después de levantarme tarde tomo café.", accept: ["おそくおきてからこーひーをのみます", "こーひーをのみます", "おきてからこーひーをのみます"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。そのあとは？", jaPlain: "いいですね。そのあとは。", romaji: "Ii desu ne. Sono ato wa?", es: "Qué bien. ¿Y después?" },
          task: "Di que después de tomar café ves la tele (コーヒーを のんでから テレビを 見ます).",
          expect: { ja: "コーヒーを のんでから テレビを 見ます。", jaPlain: "こーひーをのんでからてれびをみます。", romaji: "Koohii o nonde kara terebi o mimasu.", es: "Después de tomar café veo la tele.", accept: ["こーひーをのんでからてれびをみます", "てれびをみます", "のんでからてれびをみます"], dynamic: null }
        },
        {
          ai: { ja: "ゆっくりですね！ひるは 何を しますか。", jaPlain: "ゆっくりですね。ひるはなにをしますか。", romaji: "Yukkuri desu ne! Hiru wa nani o shimasu ka.", es: "¡Qué relajado! ¿Y por la tarde?" },
          task: "Di que después de almorzar sales con amigos (ひるごはんを 食べてから ともだちと 出かけます).",
          expect: { ja: "ひるごはんを 食べてから ともだちと 出かけます。", jaPlain: "ひるごはんをたべてからともだちとでかけます。", romaji: "Hirugohan o tabete kara tomodachi to dekakemasu.", es: "Después de almorzar salgo con amigos.", accept: ["ひるごはんをたべてからともだちとでかけます", "ともだちとでかけます", "たべてからでかけます"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u10_c2: 経験を話す（〜たことがある／〜たあとで）---------- */
  "u10_c2": [
    /* 会話1 — 日本に行った経験 */
    {
      settingEs: "Tu amigo japonés te pregunta sobre tus experiencias en Japón.",
      closingJa: "また 日本に 行けると いいですね！",
      closingEs: "¡Ojalá puedas volver a Japón!",
      steps: [
        {
          ai: { ja: "日本に 行った ことが ありますか。", jaPlain: "にほんにいったことがありますか。", romaji: "Nihon ni itta koto ga arimasu ka.", es: "¿Has ido a Japón alguna vez?" },
          task: "Di que sí, has ido a Japón (日本に 行った ことが あります).",
          expect: { ja: "はい、日本に 行った ことが あります。", jaPlain: "はい、にほんにいったことがあります。", romaji: "Hai, nihon ni itta koto ga arimasu.", es: "Sí, he ido a Japón.", accept: ["にほんにいったことがあります", "いったことがあります", "あります"], dynamic: null }
        },
        {
          ai: { ja: "すごい！すしを 食べた ことが ありますか。", jaPlain: "すごい。すしをたべたことがありますか。", romaji: "Sugoi! Sushi o tabeta koto ga arimasu ka.", es: "¡Increíble! ¿Has comido sushi?" },
          task: "Di que sí, has comido sushi y estaba delicioso (すしを 食べた ことが あります。おいしかったです).",
          expect: { ja: "はい、すしを 食べた ことが あります。おいしかったです。", jaPlain: "はい、すしをたべたことがあります。おいしかったです。", romaji: "Hai, sushi o tabeta koto ga arimasu. Oishikatta desu.", es: "Sí, he comido sushi. Estaba delicioso.", accept: ["すしをたべたことがあります", "たべたことがあります", "おいしかったです"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。日本で 何を しましたか。", jaPlain: "いいですね。にほんでなにをしましたか。", romaji: "Ii desu ne. Nihon de nani o shimashita ka.", es: "Qué bien. ¿Qué hiciste en Japón?" },
          task: "Di que después de ver un templo comiste ramen (おてらを 見た あとで ラーメンを 食べました).",
          expect: { ja: "おてらを 見た あとで ラーメンを 食べました。", jaPlain: "おてらをみたあとでらーめんをたべました。", romaji: "Otera o mita ato de raamen o tabemashita.", es: "Después de ver un templo comí ramen.", accept: ["おてらをみたあとでらーめんをたべました", "らーめんをたべました", "みたあとでらーめんをたべました"], dynamic: null }
        }
      ]
    },
    /* 会話2 — いろいろな経験を聞かれる */
    {
      settingEs: "En una charla de clase la profesora pregunta por tus experiencias.",
      closingJa: "たくさん けいけんが ありますね！",
      closingEs: "¡Tienes muchas experiencias!",
      steps: [
        {
          ai: { ja: "{name}さんは にほんごの 本を 読んだ ことが ありますか。", jaPlain: "さんはにほんごのほんをよんだことがありますか。", romaji: "{name}-san wa nihongo no hon o yonda koto ga arimasu ka.", es: "{name}, ¿has leído un libro en japonés?" },
          task: "Di que sí, has leído un libro en japonés (にほんごの 本を 読んだ ことが あります).",
          expect: { ja: "はい、にほんごの 本を 読んだ ことが あります。", jaPlain: "はい、にほんごのほんをよんだことがあります。", romaji: "Hai, nihongo no hon o yonda koto ga arimasu.", es: "Sí, he leído un libro en japonés.", accept: ["ほんをよんだことがあります", "よんだことがあります", "あります"], dynamic: null }
        },
        {
          ai: { ja: "えらいですね！カラオケに 行った ことは ありますか。", jaPlain: "えらいですね。からおけにいったことはありますか。", romaji: "Erai desu ne! Karaoke ni itta koto wa arimasu ka.", es: "¡Qué bien! ¿Has ido al karaoke?" },
          task: "Di que no, nunca has ido al karaoke (カラオケに 行った ことが ありません).",
          expect: { ja: "いいえ、カラオケに 行った ことが ありません。", jaPlain: "いいえ、からおけにいったことがありません。", romaji: "Iie, karaoke ni itta koto ga arimasen.", es: "No, nunca he ido al karaoke.", accept: ["からおけにいったことがありません", "いったことがありません", "ありません"], dynamic: null }
        },
        {
          ai: { ja: "そうですか。じゃあ、いっしょに 行きましょう！", jaPlain: "そうですか。じゃあ、いっしょにいきましょう。", romaji: "Sou desu ka. Jaa, issho ni ikimashou!", es: "Ya veo. ¡Entonces vayamos juntos!" },
          task: "Di que después de la clase quieres ir (じゅぎょうの あとで 行きたいです).",
          expect: { ja: "じゅぎょうの あとで 行きたいです。", jaPlain: "じゅぎょうのあとでいきたいです。", romaji: "Jugyou no ato de ikitai desu.", es: "Después de la clase quiero ir.", accept: ["じゅぎょうのあとでいきたいです", "いきたいです", "あとでいきたいです"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 友達と思い出話 */
    {
      settingEs: "Recuerdas con un amigo cosas divertidas que han hecho.",
      closingJa: "いい おもいでですね！",
      closingEs: "¡Qué buenos recuerdos!",
      steps: [
        {
          ai: { ja: "うみで およいだ ことが ありますか。", jaPlain: "うみでおよいだことがありますか。", romaji: "Umi de oyoida koto ga arimasu ka.", es: "¿Has nadado en el mar?" },
          task: "Di que sí, has nadado en el mar muchas veces (うみで およいだ ことが あります).",
          expect: { ja: "はい、うみで およいだ ことが あります。", jaPlain: "はい、うみでおよいだことがあります。", romaji: "Hai, umi de oyoida koto ga arimasu.", es: "Sí, he nadado en el mar.", accept: ["うみでおよいだことがあります", "およいだことがあります", "あります"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！そのあと 何を しましたか。", jaPlain: "いいですね。そのあとなにをしましたか。", romaji: "Ii desu ne! Sono ato nani o shimashita ka.", es: "¡Qué bien! ¿Qué hiciste después?" },
          task: "Di que después de nadar comiste helado (およいだ あとで アイスクリームを 食べました).",
          expect: { ja: "およいだ あとで アイスクリームを 食べました。", jaPlain: "およいだあとであいすくりーむをたべました。", romaji: "Oyoida ato de aisukuriimu o tabemashita.", es: "Después de nadar comí helado.", accept: ["およいだあとであいすくりーむをたべました", "あいすくりーむをたべました", "あとでたべました"], dynamic: null }
        },
        {
          ai: { ja: "たのしそう！ふじさんに のぼった ことは ありますか。", jaPlain: "たのしそう。ふじさんにのぼったことはありますか。", romaji: "Tanoshisou! Fujisan ni nobotta koto wa arimasu ka.", es: "¡Suena divertido! ¿Has subido el monte Fuji?" },
          task: "Di que no, todavía no has subido el monte Fuji, pero quieres subir (まだ のぼった ことが ありません。のぼりたいです).",
          expect: { ja: "まだ のぼった ことが ありません。のぼりたいです。", jaPlain: "まだのぼったことがありません。のぼりたいです。", romaji: "Mada nobotta koto ga arimasen. Noboritai desu.", es: "Todavía no lo he subido, pero quiero subirlo.", accept: ["まだのぼったことがありません", "のぼったことがありません", "のぼりたいです"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u10_c3: 禁止・義務・不必要（ない形3文型）---------- */
  "u10_c3": [
    /* 会話1 — 図書館のルール */
    {
      settingEs: "Es tu primera vez en la biblioteca y el encargado te explica las reglas.",
      closingJa: "ルールを まもって、たのしく べんきょうしましょう！",
      closingEs: "¡Sigamos las reglas y estudiemos con gusto!",
      steps: [
        {
          ai: { ja: "としょかんでは 大きい こえで 話さないで ください。", jaPlain: "としょかんではおおきいこえではなさないでください。", romaji: "Toshokan de wa ookii koe de hanasanaide kudasai.", es: "En la biblioteca no hables en voz alta, por favor." },
          task: "Confirma que entendiste: repite que no debes hablar en voz alta (大きい こえで 話さないで ください / はい、わかりました).",
          expect: { ja: "はい、大きい こえで 話さないで ください、ですね。", jaPlain: "はい、おおきいこえではなさないでください、ですね。", romaji: "Hai, ookii koe de hanasanaide kudasai, desu ne.", es: "Sí, no hablar en voz alta, ¿verdad?", accept: ["はなさないでください", "おおきいこえではなさない", "はいわかりました"], dynamic: null }
        },
        {
          ai: { ja: "本を かりる ときは カードを 見せなければ なりません。", jaPlain: "ほんをかりるときはかーどをみせなければなりません。", romaji: "Hon o kariru toki wa kaado o misenakereba narimasen.", es: "Para pedir libros debes mostrar tu tarjeta." },
          task: "Pregunta si tú también debes mostrar la tarjeta (私も カードを 見せなければ なりませんか).",
          expect: { ja: "私も カードを 見せなければ なりませんか。", jaPlain: "わたしもかーどをみせなければなりませんか。", romaji: "Watashi mo kaado o misenakereba narimasen ka.", es: "¿Yo también debo mostrar la tarjeta?", accept: ["みせなければなりませんか", "かーどをみせなければなりません", "みせなければなりません"], dynamic: null }
        },
        {
          ai: { ja: "はい。でも、お金は はらわなくても いいですよ。", jaPlain: "はい。でも、おかねははらわなくてもいいですよ。", romaji: "Hai. Demo, okane wa harawanakute mo ii desu yo.", es: "Sí. Pero no tienes que pagar dinero." },
          task: "Alégrate y di que qué bien, entonces no tienes que pagar (じゃあ、お金を はらわなくても いいですね).",
          expect: { ja: "じゃあ、お金を はらわなくても いいですね。", jaPlain: "じゃあ、おかねをはらわなくてもいいですね。", romaji: "Jaa, okane o harawanakute mo ii desu ne.", es: "Entonces no tengo que pagar, ¿verdad?", accept: ["はらわなくてもいいですね", "はらわなくてもいいです", "おかねをはらわなくてもいい"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 病院で医者に言われる */
    {
      settingEs: "Estás un poco resfriado y el médico te da indicaciones.",
      closingJa: "おだいじに！はやく げんきに なって くださいね。",
      closingEs: "¡Cuídate! Recupérate pronto.",
      steps: [
        {
          ai: { ja: "かぜですね。きょうは おふろに 入らないで ください。", jaPlain: "かぜですね。きょうはおふろにはいらないでください。", romaji: "Kaze desu ne. Kyou wa ofuro ni hairanaide kudasai.", es: "Tienes gripe. Hoy no te bañes en la tina." },
          task: "Confirma preguntando si hoy no debes bañarte (きょうは おふろに 入らないで ください、ですか).",
          expect: { ja: "きょうは おふろに 入らないで ください、ですか。", jaPlain: "きょうはおふろにはいらないでください、ですか。", romaji: "Kyou wa ofuro ni hairanaide kudasai, desu ka.", es: "¿Hoy no debo bañarme en la tina?", accept: ["おふろにはいらないでください", "はいらないでください", "はいらない"], dynamic: null }
        },
        {
          ai: { ja: "そうです。くすりを のまなければ なりません。", jaPlain: "そうです。くすりをのまなければなりません。", romaji: "Sou desu. Kusuri o nomanakereba narimasen.", es: "Así es. Debes tomar la medicina." },
          task: "Pregunta cuántas veces al día debes tomar la medicina (くすりを 一日に 何回 のまなければ なりませんか).",
          expect: { ja: "くすりを 一日に 何回 のまなければ なりませんか。", jaPlain: "くすりをいちにちになんかいのまなければなりませんか。", romaji: "Kusuri o ichinichi ni nankai nomanakereba narimasen ka.", es: "¿Cuántas veces al día debo tomar la medicina?", accept: ["のまなければなりませんか", "なんかいのまなければなりません", "のまなければなりません"], dynamic: null }
        },
        {
          ai: { ja: "一日に 三回です。あしたは 学校に 行かなくても いいですよ。", jaPlain: "いちにちにさんかいです。あしたはがっこうにいかなくてもいいですよ。", romaji: "Ichinichi ni sankai desu. Ashita wa gakkou ni ikanakute mo ii desu yo.", es: "Tres veces al día. Mañana no tienes que ir a la escuela." },
          task: "Confirma aliviado que mañana no tienes que ir a la escuela (あしたは 学校に 行かなくても いいですね).",
          expect: { ja: "あしたは 学校に 行かなくても いいですね。", jaPlain: "あしたはがっこうにいかなくてもいいですね。", romaji: "Ashita wa gakkou ni ikanakute mo ii desu ne.", es: "Mañana no tengo que ir a la escuela, ¿verdad?", accept: ["いかなくてもいいですね", "がっこうにいかなくてもいいです", "いかなくてもいい"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 友達に部活のルールを説明 */
    {
      settingEs: "Le explicas a un amigo nuevo las reglas del club de deportes.",
      closingJa: "いっしょに がんばりましょう！",
      closingEs: "¡Esforcémonos juntos!",
      steps: [
        {
          ai: { ja: "このクラブの ルールを 教えて ください。", jaPlain: "このくらぶのるーるをおしえてください。", romaji: "Kono kurabu no ruuru o oshiete kudasai.", es: "Cuéntame las reglas de este club." },
          task: "Di que no se puede llegar tarde (おくれないで ください).",
          expect: { ja: "れんしゅうに おくれないで ください。", jaPlain: "れんしゅうにおくれないでください。", romaji: "Renshuu ni okurenaide kudasai.", es: "No llegues tarde a la práctica.", accept: ["おくれないでください", "れんしゅうにおくれない", "おくれない"], dynamic: null }
        },
        {
          ai: { ja: "わかりました。ほかには？", jaPlain: "わかりました。ほかには。", romaji: "Wakarimashita. Hoka ni wa?", es: "Entendido. ¿Algo más?" },
          task: "Di que hay que traer agua todos los días (まいにち 水を もってこなければ なりません).",
          expect: { ja: "まいにち 水を もってこなければ なりません。", jaPlain: "まいにちみずをもってこなければなりません。", romaji: "Mainichi mizu o motte konakereba narimasen.", es: "Todos los días hay que traer agua.", accept: ["みずをもってこなければなりません", "もってこなければなりません", "みずをもってくる"], dynamic: null }
        },
        {
          ai: { ja: "水ですね。おかねは いりますか。", jaPlain: "みずですね。おかねはいりますか。", romaji: "Mizu desu ne. Okane wa irimasu ka.", es: "Agua, entendido. ¿Se necesita dinero?" },
          task: "Di que no, no hace falta pagar dinero (お金は はらわなくても いいです).",
          expect: { ja: "いいえ、お金は はらわなくても いいです。", jaPlain: "いいえ、おかねははらわなくてもいいです。", romaji: "Iie, okane wa harawanakute mo ii desu.", es: "No, no hace falta pagar dinero.", accept: ["はらわなくてもいいです", "おかねははらわなくてもいい", "はらわなくてもいい"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u10_c4: 接続詞で文をつなぐ（だから/でも/そして/それから/それに）---------- */
  "u10_c4": [
    /* 会話1 — 試験前の会話 */
    {
      settingEs: "Mañana tienes un examen importante. Hablas con tu amigo sobre tus planes.",
      closingJa: "しっかり べんきょうして、がんばりましょう！",
      closingEs: "¡Estudiemos bien y esforcémonos!",
      steps: [
        {
          ai: { ja: "あした しけんが ありますね。きょうは どうしますか。", jaPlain: "あしたしけんがありますね。きょうはどうしますか。", romaji: "Ashita shiken ga arimasu ne. Kyou wa dou shimasu ka.", es: "Mañana hay examen. ¿Qué vas a hacer hoy?" },
          task: "Di que mañana hay examen, por eso hoy vas a estudiar (あした しけんが あります。だから、きょう べんきょうします).",
          expect: { ja: "あした しけんが あります。だから、きょう べんきょうします。", jaPlain: "あしたしけんがあります。だから、きょうべんきょうします。", romaji: "Ashita shiken ga arimasu. Dakara, kyou benkyou shimasu.", es: "Mañana hay examen. Por eso hoy voy a estudiar.", accept: ["だからきょうべんきょうします", "だからべんきょうします", "きょうべんきょうします"], dynamic: null }
        },
        {
          ai: { ja: "えらいですね。でも、つかれて いませんか。", jaPlain: "えらいですね。でも、つかれていませんか。", romaji: "Erai desu ne. Demo, tsukarete imasen ka.", es: "Qué bien. Pero, ¿no estás cansado?" },
          task: "Di que sí estás cansado, pero aun así te esforzarás (つかれました。でも、がんばります).",
          expect: { ja: "つかれました。でも、がんばります。", jaPlain: "つかれました。でも、がんばります。", romaji: "Tsukaremashita. Demo, ganbarimasu.", es: "Estoy cansado. Pero aun así me esforzaré.", accept: ["でもがんばります", "つかれましたでもがんばります", "がんばります"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。今日は 何を べんきょうしますか。", jaPlain: "いいですね。きょうはなにをべんきょうしますか。", romaji: "Ii desu ne. Kyou wa nani o benkyou shimasu ka.", es: "Muy bien. ¿Qué vas a estudiar hoy?" },
          task: "Di que vas a estudiar kanji y también gramática (かんじを べんきょうします。それから、ぶんぽうも べんきょうします).",
          expect: { ja: "かんじを べんきょうします。それから、ぶんぽうも べんきょうします。", jaPlain: "かんじをべんきょうします。それから、ぶんぽうもべんきょうします。", romaji: "Kanji o benkyou shimasu. Sorekara, bunpou mo benkyou shimasu.", es: "Voy a estudiar kanji. Y después, también gramática.", accept: ["それからぶんぽうもべんきょうします", "それからぶんぽうも", "ぶんぽうもべんきょうします"], dynamic: null }
        }
      ]
    },
    /* 会話2 — レストランのおすすめ */
    {
      settingEs: "Le recomiendas a un amigo tu restaurante favorito.",
      closingJa: "こんど いっしょに 行きましょう！",
      closingEs: "¡La próxima vamos juntos!",
      steps: [
        {
          ai: { ja: "おすすめの レストランは ありますか。", jaPlain: "おすすめのれすとらんはありますか。", romaji: "Osusume no resutoran wa arimasu ka.", es: "¿Tienes algún restaurante recomendado?" },
          task: "Di que hay uno bueno cerca de la estación y además es barato (えきの ちかくに あります。それに、やすいです).",
          expect: { ja: "えきの ちかくに あります。それに、やすいです。", jaPlain: "えきのちかくにあります。それに、やすいです。", romaji: "Eki no chikaku ni arimasu. Soreni, yasui desu.", es: "Hay uno cerca de la estación. Además, es barato.", accept: ["それにやすいです", "えきのちかくにありますそれにやすいです", "やすいです"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！りょうりは おいしいですか。", jaPlain: "いいですね。りょうりはおいしいですか。", romaji: "Ii desu ne! Ryouri wa oishii desu ka.", es: "¡Qué bien! ¿La comida es rica?" },
          task: "Di que la comida es deliciosa y además las personas son amables (りょうりが おいしいです。そして、店の 人が しんせつです).",
          expect: { ja: "りょうりが おいしいです。そして、店の 人が しんせつです。", jaPlain: "りょうりがおいしいです。そして、みせのひとがしんせつです。", romaji: "Ryouri ga oishii desu. Soshite, mise no hito ga shinsetsu desu.", es: "La comida es deliciosa. Y además, la gente es amable.", accept: ["そしてみせのひとがしんせつです", "そしてしんせつです", "みせのひとがしんせつです"], dynamic: null }
        },
        {
          ai: { ja: "行きたく なりました！でも、こんで いますか。", jaPlain: "いきたくなりました。でも、こんでいますか。", romaji: "Ikitaku narimashita! Demo, konde imasu ka.", es: "¡Ya quiero ir! Pero, ¿está lleno?" },
          task: "Di que a veces está lleno, pero por la mañana está vacío (ときどき こんで います。でも、あさは すいて います).",
          expect: { ja: "ときどき こんで います。でも、あさは すいて います。", jaPlain: "ときどきこんでいます。でも、あさはすいています。", romaji: "Tokidoki konde imasu. Demo, asa wa suite imasu.", es: "A veces está lleno. Pero por la mañana está vacío.", accept: ["でもあさはすいています", "あさはすいています", "でもあさはすいている"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 週末の計画を説明 */
    {
      settingEs: "Le cuentas a tu amiga tu plan detallado para el fin de semana.",
      closingJa: "たのしい しゅうまつに なりそうですね！",
      closingEs: "¡Parece que será un fin de semana divertido!",
      steps: [
        {
          ai: { ja: "しゅうまつは 何を しますか。", jaPlain: "しゅうまつはなにをしますか。", romaji: "Shuumatsu wa nani o shimasu ka.", es: "¿Qué vas a hacer el fin de semana?" },
          task: "Di que primero vas a estudiar y después ves una película (べんきょうします。それから、えいがを 見ます).",
          expect: { ja: "べんきょうします。それから、えいがを 見ます。", jaPlain: "べんきょうします。それから、えいがをみます。", romaji: "Benkyou shimasu. Sorekara, eiga o mimasu.", es: "Voy a estudiar. Y después, veo una película.", accept: ["それからえいがをみます", "それからえいがを", "えいがをみます"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！にちようびは？", jaPlain: "いいですね。にちようびは。", romaji: "Ii desu ne! Nichiyoubi wa?", es: "¡Qué bien! ¿Y el domingo?" },
          task: "Di que querías salir, pero hay examen, por eso vas a estudiar (出かけたいです。でも、しけんが あります。だから、べんきょうします).",
          expect: { ja: "出かけたいです。でも、しけんが あります。だから、べんきょうします。", jaPlain: "でかけたいです。でも、しけんがあります。だから、べんきょうします。", romaji: "Dekaketai desu. Demo, shiken ga arimasu. Dakara, benkyou shimasu.", es: "Quiero salir. Pero hay examen. Por eso voy a estudiar.", accept: ["でもしけんがありますだからべんきょうします", "だからべんきょうします", "でもしけんがあります"], dynamic: null }
        },
        {
          ai: { ja: "がんばりますね！べんきょうの あとは ゆっくり しますか。", jaPlain: "がんばりますね。べんきょうのあとはゆっくりしますか。", romaji: "Ganbarimasu ne! Benkyou no ato wa yukkuri shimasu ka.", es: "¡Te esfuerzas! ¿Después de estudiar vas a descansar?" },
          task: "Di que sí, después de estudiar descansas y además escuchas música (べんきょうの あとで やすみます。それに、音楽を 聞きます).",
          expect: { ja: "べんきょうの あとで やすみます。それに、音楽を 聞きます。", jaPlain: "べんきょうのあとでやすみます。それに、おんがくをききます。", romaji: "Benkyou no ato de yasumimasu. Soreni, ongaku o kikimasu.", es: "Después de estudiar descanso. Además, escucho música.", accept: ["それにおんがくをききます", "それにおんがくを", "おんがくをききます"], dynamic: null }
        }
      ]
    }
  ],

  /* ---------- u10_c5: 一日のスケジュール総合（ルーティン＋経験＋接続詞）---------- */
  "u10_c5": [
    /* 会話1 — 一日を最初から最後まで紹介 */
    {
      settingEs: "Tu amigo japonés quiere saber cómo es un día típico tuyo, de principio a fin.",
      closingJa: "いそがしいですが、いい いちにちですね！",
      closingEs: "¡Es un día ocupado, pero muy bueno!",
      steps: [
        {
          ai: { ja: "{name}さんの いちにちを 教えて ください。あさは 何を しますか。", jaPlain: "さんのいちにちをおしえてください。あさはなにをしますか。", romaji: "{name}-san no ichinichi o oshiete kudasai. Asa wa nani o shimasu ka.", es: "{name}, cuéntame tu día. ¿Qué haces en la mañana?" },
          task: "Di que cada mañana te levantas a las 6 y luego haces jogging (まいあさ ろくじに おきてから ジョギングを します).",
          expect: { ja: "まいあさ ろくじに おきてから ジョギングを します。", jaPlain: "まいあさろくじにおきてからじょぎんぐをします。", romaji: "Maiasa rokuji ni okite kara jogingu o shimasu.", es: "Cada mañana me levanto a las 6 y luego hago jogging.", accept: ["ろくじにおきてからじょぎんぐをします", "じょぎんぐをします", "おきてからじょぎんぐをします"], dynamic: null }
        },
        {
          ai: { ja: "けんこうてきですね！ひるは どうですか。", jaPlain: "けんこうてきですね。ひるはどうですか。", romaji: "Kenkouteki desu ne! Hiru wa dou desu ka.", es: "¡Qué saludable! ¿Y a mediodía?" },
          task: "Di que después de almorzar estudias japonés, y además haces la tarea (ひるごはんを 食べてから にほんごを べんきょうします。それに、しゅくだいも します).",
          expect: { ja: "ひるごはんを 食べてから にほんごを べんきょうします。それに、しゅくだいも します。", jaPlain: "ひるごはんをたべてからにほんごをべんきょうします。それに、しゅくだいもします。", romaji: "Hirugohan o tabete kara nihongo o benkyou shimasu. Soreni, shukudai mo shimasu.", es: "Después de almorzar estudio japonés. Además, hago la tarea.", accept: ["たべてからにほんごをべんきょうします", "それにしゅくだいもします", "にほんごをべんきょうします"], dynamic: null }
        },
        {
          ai: { ja: "よる は ゆっくり しますか。", jaPlain: "よるはゆっくりしますか。", romaji: "Yoru wa yukkuri shimasu ka.", es: "¿En la noche descansas?" },
          task: "Di que estás cansado, pero después de cenar ves la tele (つかれました。でも、ばんごはんの あとで テレビを 見ます).",
          expect: { ja: "つかれました。でも、ばんごはんの あとで テレビを 見ます。", jaPlain: "つかれました。でも、ばんごはんのあとでてれびをみます。", romaji: "Tsukaremashita. Demo, bangohan no ato de terebi o mimasu.", es: "Estoy cansado. Pero después de cenar veo la tele.", accept: ["でもばんごはんのあとでてれびをみます", "ばんごはんのあとでてれびをみます", "てれびをみます"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 忙しい一日と経験を混ぜる */
    {
      settingEs: "En clase cuentas cómo fue tu día de ayer, incluyendo algo nuevo que probaste.",
      closingJa: "いろいろ けいけんできて よかったですね！",
      closingEs: "¡Qué bueno que pudiste vivir tantas cosas!",
      steps: [
        {
          ai: { ja: "きのうは いそがしかったですか。", jaPlain: "きのうはいそがしかったですか。", romaji: "Kinou wa isogashikatta desu ka.", es: "¿Ayer estuviste ocupado?" },
          task: "Di que sí, ayer estuviste ocupado, pero fue divertido (いそがしかったです。でも、たのしかったです).",
          expect: { ja: "いそがしかったです。でも、たのしかったです。", jaPlain: "いそがしかったです。でも、たのしかったです。", romaji: "Isogashikatta desu. Demo, tanoshikatta desu.", es: "Estuve ocupado. Pero fue divertido.", accept: ["でもたのしかったです", "いそがしかったですでもたのしかったです", "たのしかったです"], dynamic: null }
        },
        {
          ai: { ja: "何を しましたか。", jaPlain: "なにをしましたか。", romaji: "Nani o shimashita ka.", es: "¿Qué hiciste?" },
          task: "Di que después de estudiar comiste comida japonesa por primera vez (べんきょうした あとで、はじめて にほんの りょうりを 食べました).",
          expect: { ja: "べんきょうした あとで、はじめて にほんの りょうりを 食べました。", jaPlain: "べんきょうしたあとで、はじめてにほんのりょうりをたべました。", romaji: "Benkyou shita ato de, hajimete nihon no ryouri o tabemashita.", es: "Después de estudiar, comí comida japonesa por primera vez.", accept: ["べんきょうしたあとで", "はじめてにほんのりょうりをたべました", "にほんのりょうりをたべました"], dynamic: null }
        },
        {
          ai: { ja: "へえ！にほんの りょうりを 食べた ことが ありませんでしたか。", jaPlain: "へえ。にほんのりょうりをたべたことがありませんでしたか。", romaji: "Hee! Nihon no ryouri o tabeta koto ga arimasen deshita ka.", es: "¡Oh! ¿No habías comido comida japonesa antes?" },
          task: "Di que no la habías comido, pero estaba deliciosa y quieres comer otra vez (食べた ことが ありませんでした。でも、おいしかったです。また 食べたいです).",
          expect: { ja: "食べた ことが ありませんでした。でも、おいしかったです。また 食べたいです。", jaPlain: "たべたことがありませんでした。でも、おいしかったです。またたべたいです。", romaji: "Tabeta koto ga arimasen deshita. Demo, oishikatta desu. Mata tabetai desu.", es: "No la había comido. Pero estaba deliciosa. Quiero comer otra vez.", accept: ["たべたことがありませんでした", "でもおいしかったです", "またたべたいです"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 理想の一日を語る */
    {
      settingEs: "Le describes a un amigo cómo sería tu día perfecto.",
      closingJa: "そんな いちにち、いつか かないますように！",
      closingEs: "¡Ojalá algún día tengas ese día perfecto!",
      steps: [
        {
          ai: { ja: "{name}さんの りそうの いちにちは どんな いちにちですか。", jaPlain: "さんのりそうのいちにちはどんないちにちですか。", romaji: "{name}-san no risou no ichinichi wa donna ichinichi desu ka.", es: "{name}, ¿cómo sería tu día perfecto?" },
          task: "Di que después de levantarte tarde, tomas café y no tienes que estudiar (おそく おきてから コーヒーを のみます。それに、べんきょうしなくても いいです).",
          expect: { ja: "おそく おきてから コーヒーを のみます。それに、べんきょうしなくても いいです。", jaPlain: "おそくおきてからこーひーをのみます。それに、べんきょうしなくてもいいです。", romaji: "Osoku okite kara koohii o nomimasu. Soreni, benkyou shinakute mo ii desu.", es: "Después de levantarme tarde tomo café. Además, no tengo que estudiar.", accept: ["それにべんきょうしなくてもいいです", "べんきょうしなくてもいいです", "こーひーをのみます"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！そのあとは 何を しますか。", jaPlain: "いいですね。そのあとはなにをしますか。", romaji: "Ii desu ne! Sono ato wa nani o shimasu ka.", es: "¡Qué bien! ¿Y después qué haces?" },
          task: "Di que sales con amigos y después van a comer comida deliciosa (ともだちと 出かけます。そして、おいしい ものを 食べに 行きます).",
          expect: { ja: "ともだちと 出かけます。そして、おいしい ものを 食べに 行きます。", jaPlain: "ともだちとでかけます。そして、おいしいものをたべにいきます。", romaji: "Tomodachi to dekakemasu. Soshite, oishii mono o tabe ni ikimasu.", es: "Salgo con amigos. Y luego vamos a comer algo delicioso.", accept: ["そしておいしいものをたべにいきます", "おいしいものをたべにいきます", "ともだちとでかけます"], dynamic: null }
        },
        {
          ai: { ja: "たのしそう！よるは？", jaPlain: "たのしそう。よるは。", romaji: "Tanoshisou! Yoru wa?", es: "¡Suena divertido! ¿Y en la noche?" },
          task: "Di que quieres ir a Japón, porque nunca has ido, por eso quieres viajar (日本に 行った ことが ありません。だから、りょこうしたいです).",
          expect: { ja: "日本に 行った ことが ありません。だから、りょこうしたいです。", jaPlain: "にほんにいったことがありません。だから、りょこうしたいです。", romaji: "Nihon ni itta koto ga arimasen. Dakara, ryokou shitai desu.", es: "Nunca he ido a Japón. Por eso quiero viajar.", accept: ["だからりょこうしたいです", "いったことがありません", "りょこうしたいです"], dynamic: null }
        }
      ]
    }
  ],

  /* ======================= u5_c6 — 助詞 は/に/で/を で段階的に文を作る ======================= */
  "u5_c6": [
    /* 会話1 — 朝の通学ルートを助詞で説明 */
    {
      settingEs: "Tu amigo japonés quiere saber cómo es tu mañana: cómo vas a la escuela y qué haces ahí.",
      closingJa: "まいにち たいへんですが、がんばって いますね！",
      closingEs: "¡Cada día es duro, pero te esfuerzas mucho!",
      steps: [
        {
          ai: { ja: "{name}さんは まいあさ 何で がっこうに 行きますか。", jaPlain: "さんはまいあさなにでがっこうにいきますか。", romaji: "{name}-san wa maiasa nan de gakkou ni ikimasu ka.", es: "{name}, ¿en qué vas a la escuela cada mañana?" },
          task: "Di que cada mañana vas a la escuela en autobús (まいあさ バスで がっこうに 行きます).",
          expect: { ja: "まいあさ バスで がっこうに 行きます。", jaPlain: "まいあさばすでがっこうにいきます。", romaji: "Maiasa basu de gakkou ni ikimasu.", es: "Cada mañana voy a la escuela en autobús.", accept: ["まいあさばすでがっこうにいきます", "ばすでがっこうにいきます", "がっこうにいきます"], dynamic: null }
        },
        {
          ai: { ja: "がっこうで 何を べんきょうしますか。", jaPlain: "がっこうでなにをべんきょうしますか。", romaji: "Gakkou de nani o benkyou shimasu ka.", es: "¿Qué estudias en la escuela?" },
          task: "Di que en la escuela estudias japonés (がっこうで にほんごを べんきょうします).",
          expect: { ja: "がっこうで にほんごを べんきょうします。", jaPlain: "がっこうでにほんごをべんきょうします。", romaji: "Gakkou de nihongo o benkyou shimasu.", es: "En la escuela estudio japonés.", accept: ["がっこうでにほんごをべんきょうします", "にほんごをべんきょうします", "がっこうでべんきょうします"], dynamic: null }
        },
        {
          ai: { ja: "ひるごはんは どこで 食べますか。", jaPlain: "ひるごはんはどこでたべますか。", romaji: "Hirugohan wa doko de tabemasu ka.", es: "¿Dónde almuerzas?" },
          task: "Di que comes el almuerzo en la cafetería con tus amigos (ともだちと しょくどうで ひるごはんを 食べます).",
          expect: { ja: "ともだちと しょくどうで ひるごはんを 食べます。", jaPlain: "ともだちとしょくどうでひるごはんをたべます。", romaji: "Tomodachi to shokudou de hirugohan o tabemasu.", es: "Como el almuerzo en la cafetería con mis amigos.", accept: ["しょくどうでひるごはんをたべます", "ともだちとしょくどうでひるごはんをたべます", "ひるごはんをたべます"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 週末の行き先と動作を助詞で */
    {
      settingEs: "Le cuentas a tu profesor a dónde vas el fin de semana y qué haces en cada lugar.",
      closingJa: "いい しゅうまつを すごして いますね！",
      closingEs: "¡Pasas muy bien los fines de semana!",
      steps: [
        {
          ai: { ja: "しゅうまつは どこに 行きますか。", jaPlain: "しゅうまつはどこにいきますか。", romaji: "Shuumatsu wa doko ni ikimasu ka.", es: "¿A dónde vas el fin de semana?" },
          task: "Di que el sábado vas al parque en bicicleta (どようびは じてんしゃで こうえんに 行きます).",
          expect: { ja: "どようびは じてんしゃで こうえんに 行きます。", jaPlain: "どようびはじてんしゃでこうえんにいきます。", romaji: "Doyoubi wa jitensha de kouen ni ikimasu.", es: "El sábado voy al parque en bicicleta.", accept: ["じてんしゃでこうえんにいきます", "こうえんにいきます", "どようびはこうえんにいきます"], dynamic: null }
        },
        {
          ai: { ja: "こうえんで 何を しますか。", jaPlain: "こうえんでなにをしますか。", romaji: "Kouen de nani o shimasu ka.", es: "¿Qué haces en el parque?" },
          task: "Di que en el parque sacas fotos (こうえんで しゃしんを とります).",
          expect: { ja: "こうえんで しゃしんを とります。", jaPlain: "こうえんでしゃしんをとります。", romaji: "Kouen de shashin o torimasu.", es: "En el parque saco fotos.", accept: ["こうえんでしゃしんをとります", "しゃしんをとります", "こうえんでとります"], dynamic: null }
        },
        {
          ai: { ja: "にちようびは 何を しますか。", jaPlain: "にちようびはなにをしますか。", romaji: "Nichiyoubi wa nani o shimasu ka.", es: "¿Y el domingo qué haces?" },
          task: "Di que el domingo lees libros en casa (にちようびは いえで ほんを 読みます).",
          expect: { ja: "にちようびは いえで ほんを 読みます。", jaPlain: "にちようびはいえでほんをよみます。", romaji: "Nichiyoubi wa ie de hon o yomimasu.", es: "El domingo leo libros en casa.", accept: ["いえでほんをよみます", "にちようびはいえでほんをよみます", "ほんをよみます"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 友達マリアの一日を助詞で説明 */
    {
      settingEs: "Le describes a un compañero la rutina diaria de tu amiga María.",
      closingJa: "マリアさんは まいにち がんばって いますね！",
      closingEs: "¡María se esfuerza cada día!",
      steps: [
        {
          ai: { ja: "マリアさんは まいあさ 何で がっこうに 行きますか。", jaPlain: "まりあさんはまいあさなにでがっこうにいきますか。", romaji: "Maria-san wa maiasa nan de gakkou ni ikimasu ka.", es: "¿En qué va María a la escuela cada mañana?" },
          task: "Di que María va a la escuela en autobús cada mañana (マリアさんは まいあさ バスで がっこうに 行きます).",
          expect: { ja: "マリアさんは まいあさ バスで がっこうに 行きます。", jaPlain: "まりあさんはまいあさばすでがっこうにいきます。", romaji: "Maria-san wa maiasa basu de gakkou ni ikimasu.", es: "María va a la escuela en autobús cada mañana.", accept: ["まいあさばすでがっこうにいきます", "ばすでがっこうにいきます", "がっこうにいきます"], dynamic: null }
        },
        {
          ai: { ja: "がっこうで 何を しますか。", jaPlain: "がっこうでなにをしますか。", romaji: "Gakkou de nani o shimasu ka.", es: "¿Qué hace en la escuela?" },
          task: "Di que en la escuela María estudia japonés con sus amigos (がっこうで ともだちと にほんごを べんきょうします).",
          expect: { ja: "がっこうで ともだちと にほんごを べんきょうします。", jaPlain: "がっこうでともだちとにほんごをべんきょうします。", romaji: "Gakkou de tomodachi to nihongo o benkyou shimasu.", es: "En la escuela estudia japonés con sus amigos.", accept: ["がっこうでにほんごをべんきょうします", "ともだちとにほんごをべんきょうします", "にほんごをべんきょうします"], dynamic: null }
        },
        {
          ai: { ja: "ばんは どこで ばんごはんを 食べますか。", jaPlain: "ばんはどこでばんごはんをたべますか。", romaji: "Ban wa doko de bangohan o tabemasu ka.", es: "¿Dónde cena?" },
          task: "Di que por la noche come en casa y luego escucha música (よるは いえで ばんごはんを 食べます。それから、おんがくを ききます).",
          expect: { ja: "よるは いえで ばんごはんを 食べます。それから、おんがくを ききます。", jaPlain: "よるはいえでばんごはんをたべます。それから、おんがくをききます。", romaji: "Yoru wa ie de bangohan o tabemasu. Sorekara, ongaku o kikimasu.", es: "Por la noche come en casa. Después escucha música.", accept: ["いえでばんごはんをたべます", "おんがくをききます", "よるはいえでばんごはんをたべます"], dynamic: null }
        }
      ]
    }
  ],

  /* ======================= u10_c6 — 〜てください / 〜ています（依頼・進行中） ======================= */
  "u10_c6": [
    /* 会話1 — 授業中に先生へお願い＋今していること */
    {
      settingEs: "Estás en clase de japonés y necesitas pedirle cosas a tu profesor.",
      closingJa: "いっしょに がんばりましょう。まいにち れんしゅうして くださいね。",
      closingEs: "Esforcémonos juntos. Practica todos los días, por favor.",
      steps: [
        {
          ai: { ja: "では、じゅぎょうを はじめます。しつもんは ありますか。", jaPlain: "では、じゅぎょうをはじめます。しつもんはありますか。", romaji: "Dewa, jugyou o hajimemasu. Shitsumon wa arimasu ka.", es: "Bien, empecemos la clase. ¿Tienes alguna pregunta?" },
          task: "Pídele al profesor que hable despacio, por favor (ゆっくり はなして ください).",
          expect: { ja: "ゆっくり はなして ください。", jaPlain: "ゆっくりはなしてください。", romaji: "Yukkuri hanashite kudasai.", es: "Hable despacio, por favor.", accept: ["ゆっくりはなしてください", "はなしてください", "ゆっくりはなして"], dynamic: null }
        },
        {
          ai: { ja: "わかりました。いま 何を して いますか。", jaPlain: "わかりました。いまなにをしていますか。", romaji: "Wakarimashita. Ima nani o shite imasu ka.", es: "Entendido. ¿Qué estás haciendo ahora?" },
          task: "Di que ahora estás buscando una palabra en el diccionario (いま じしょで ことばを しらべて います).",
          expect: { ja: "いま じしょで ことばを しらべて います。", jaPlain: "いまじしょでことばをしらべています。", romaji: "Ima jisho de kotoba o shirabete imasu.", es: "Ahora estoy buscando una palabra en el diccionario.", accept: ["いまじしょでことばをしらべています", "じしょでしらべています", "しらべています"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。まいにち べんきょうして いますか。", jaPlain: "いいですね。まいにちべんきょうしていますか。", romaji: "Ii desu ne. Mainichi benkyou shite imasu ka.", es: "Muy bien. ¿Estudias todos los días?" },
          task: "Di que sí, todos los días estás practicando japonés (まいにち にほんごを れんしゅうして います).",
          expect: { ja: "はい、まいにち にほんごを れんしゅうして います。", jaPlain: "はい、まいにちにほんごをれんしゅうしています。", romaji: "Hai, mainichi nihongo o renshuu shite imasu.", es: "Sí, todos los días estoy practicando japonés.", accept: ["まいにちにほんごをれんしゅうしています", "まいにちれんしゅうしています", "れんしゅうしています"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 電話で友達に「今何してる」＋お願い */
    {
      settingEs: "Llamas por teléfono a un amigo japonés y le preguntas qué está haciendo.",
      closingJa: "じゃあ、また あとで でんわして くださいね。",
      closingEs: "Entonces, llámame de nuevo más tarde, por favor.",
      steps: [
        {
          ai: { ja: "もしもし。いま 何を して いますか。", jaPlain: "もしもし。いまなにをしていますか。", romaji: "Moshimoshi. Ima nani o shite imasu ka.", es: "¿Aló? ¿Qué estás haciendo ahora?" },
          task: "Di que ahora estás estudiando japonés (いま にほんごを べんきょうして います).",
          expect: { ja: "いま にほんごを べんきょうして います。", jaPlain: "いまにほんごをべんきょうしています。", romaji: "Ima nihongo o benkyou shite imasu.", es: "Ahora estoy estudiando japonés.", accept: ["いまにほんごをべんきょうしています", "にほんごをべんきょうしています", "べんきょうしています"], dynamic: null }
        },
        {
          ai: { ja: "へえ！むずかしい ことばが ありますか。", jaPlain: "へえ。むずかしいことばがありますか。", romaji: "Hee! Muzukashii kotoba ga arimasu ka.", es: "¡Oh! ¿Hay palabras difíciles?" },
          task: "Di que hay muchas, y pídele que te enseñe un poco, por favor (たくさん あります。ちょっと おしえて ください).",
          expect: { ja: "たくさん あります。ちょっと おしえて ください。", jaPlain: "たくさんあります。ちょっとおしえてください。", romaji: "Takusan arimasu. Chotto oshiete kudasai.", es: "Hay muchas. Enséñame un poco, por favor.", accept: ["ちょっとおしえてください", "おしえてください", "たくさんあります"], dynamic: null }
        },
        {
          ai: { ja: "いいですよ。いま わたしは ばんごはんを 作って います。", jaPlain: "いいですよ。いまわたしはばんごはんをつくっています。", romaji: "Ii desu yo. Ima watashi wa bangohan o tsukutte imasu.", es: "Claro. Ahora yo estoy preparando la cena." },
          task: "Dile que espere un momento, por favor, y que después hablan (ちょっと まって ください。あとで はなしましょう).",
          expect: { ja: "ちょっと まって ください。あとで はなしましょう。", jaPlain: "ちょっとまってください。あとではなしましょう。", romaji: "Chotto matte kudasai. Ato de hanashimashou.", es: "Espera un momento, por favor. Después hablamos.", accept: ["ちょっとまってください", "まってください", "あとではなしましょう"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 図書館で係員に依頼＋進行中の説明 */
    {
      settingEs: "En la biblioteca le pides ayuda a la persona encargada.",
      closingJa: "いい べんきょうを して いますね。がんばって ください。",
      closingEs: "Estás estudiando muy bien. ¡Ánimo!",
      steps: [
        {
          ai: { ja: "こんにちは。何を さがして いますか。", jaPlain: "こんにちは。なにをさがしていますか。", romaji: "Konnichiwa. Nani o sagashite imasu ka.", es: "Hola. ¿Qué estás buscando?" },
          task: "Di que estás buscando un libro de japonés (にほんごの ほんを さがして います).",
          expect: { ja: "にほんごの ほんを さがして います。", jaPlain: "にほんごのほんをさがしています。", romaji: "Nihongo no hon o sagashite imasu.", es: "Estoy buscando un libro de japonés.", accept: ["にほんごのほんをさがしています", "ほんをさがしています", "さがしています"], dynamic: null }
        },
        {
          ai: { ja: "あそこに ありますよ。", jaPlain: "あそこにありますよ。", romaji: "Asoko ni arimasu yo.", es: "Están allá." },
          task: "Pídele que te enseñe el lugar, por favor (ばしょを おしえて ください).",
          expect: { ja: "ばしょを おしえて ください。", jaPlain: "ばしょをおしえてください。", romaji: "Basho o oshiete kudasai.", es: "Enséñame el lugar, por favor.", accept: ["ばしょをおしえてください", "おしえてください", "ばしょをおしえて"], dynamic: null }
        },
        {
          ai: { ja: "いま その ほんを 読んで いる 人が いますよ。", jaPlain: "いまそのほんをよんでいるひとがいますよ。", romaji: "Ima sono hon o yonde iru hito ga imasu yo.", es: "Ahora hay alguien leyendo ese libro." },
          task: "Di que entonces esperas, y pídele que te avise después, por favor (じゃあ、まって います。あとで おしえて ください).",
          expect: { ja: "じゃあ、まって います。あとで おしえて ください。", jaPlain: "じゃあ、まっています。あとでおしえてください。", romaji: "Jaa, matte imasu. Ato de oshiete kudasai.", es: "Entonces espero. Avísame después, por favor.", accept: ["まっています", "あとでおしえてください", "じゃあまっています"], dynamic: null }
        }
      ]
    }
  ],

  /* ======================= u10_c7 — 〜てもいいですか / 〜てはいけません（許可・禁止） ======================= */
  "u10_c7": [
    /* 会話1 — 美術館で許可を聞く／禁止される */
    {
      settingEs: "Visitas un museo y le preguntas al guía qué se puede y qué no se puede hacer.",
      closingJa: "ルールを まもって、たのしんで ください。",
      closingEs: "Respeta las reglas y disfruta, por favor.",
      steps: [
        {
          ai: { ja: "びじゅつかんへ ようこそ。", jaPlain: "びじゅつかんへようこそ。", romaji: "Bijutsukan e youkoso.", es: "Bienvenido al museo." },
          task: "Pregunta si puedes sacar fotos (しゃしんを とっても いいですか).",
          expect: { ja: "しゃしんを とっても いいですか。", jaPlain: "しゃしんをとってもいいですか。", romaji: "Shashin o totte mo ii desu ka.", es: "¿Puedo sacar fotos?", accept: ["しゃしんをとってもいいですか", "とってもいいですか", "しゃしんをとっても"], dynamic: null }
        },
        {
          ai: { ja: "すみません。ここで しゃしんを とっては いけません。", jaPlain: "すみません。ここでしゃしんをとってはいけません。", romaji: "Sumimasen. Koko de shashin o totte wa ikemasen.", es: "Lo siento. Aquí no se pueden sacar fotos." },
          task: "Di que entendiste y pregunta si puedes tomar agua (わかりました。みずを のんでも いいですか).",
          expect: { ja: "わかりました。みずを のんでも いいですか。", jaPlain: "わかりました。みずをのんでもいいですか。", romaji: "Wakarimashita. Mizu o nonde mo ii desu ka.", es: "Entendí. ¿Puedo tomar agua?", accept: ["みずをのんでもいいですか", "のんでもいいですか", "わかりました"], dynamic: null }
        },
        {
          ai: { ja: "いいえ、なかで みずを のんでは いけません。", jaPlain: "いいえ、なかでみずをのんではいけません。", romaji: "Iie, naka de mizu o nonde wa ikemasen.", es: "No, adentro no se puede tomar agua." },
          task: "Pregunta si puedes tocar los cuadros (えに さわっても いいですか).",
          expect: { ja: "えに さわっても いいですか。", jaPlain: "えにさわってもいいですか。", romaji: "E ni sawatte mo ii desu ka.", es: "¿Puedo tocar los cuadros?", accept: ["えにさわってもいいですか", "さわってもいいですか", "えにさわっても"], dynamic: null }
        },
        {
          ai: { ja: "いいえ、えに さわっては いけません。", jaPlain: "いいえ、えにさわってはいけません。", romaji: "Iie, e ni sawatte wa ikemasen.", es: "No, no se pueden tocar los cuadros." },
          task: "Di que entiendes y pregunta si puedes ver despacio (わかりました。ゆっくり 見ても いいですか).",
          expect: { ja: "わかりました。ゆっくり 見ても いいですか。", jaPlain: "わかりました。ゆっくりみてもいいですか。", romaji: "Wakarimashita. Yukkuri mite mo ii desu ka.", es: "Entiendo. ¿Puedo mirar despacio?", accept: ["ゆっくりみてもいいですか", "みてもいいですか", "わかりました"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 図書館で許可／禁止 */
    {
      settingEs: "En la biblioteca preguntas qué está permitido y qué no.",
      closingJa: "しずかに べんきょうして くださいね。",
      closingEs: "Estudia en silencio, por favor.",
      steps: [
        {
          ai: { ja: "としょかんは しずかな ばしょです。", jaPlain: "としょかんはしずかなばしょです。", romaji: "Toshokan wa shizuka na basho desu.", es: "La biblioteca es un lugar silencioso." },
          task: "Pregunta si puedes usar el celular aquí (ここで けいたいを つかっても いいですか).",
          expect: { ja: "ここで けいたいを つかっても いいですか。", jaPlain: "ここでけいたいをつかってもいいですか。", romaji: "Koko de keitai o tsukatte mo ii desu ka.", es: "¿Puedo usar el celular aquí?", accept: ["けいたいをつかってもいいですか", "つかってもいいですか", "ここでけいたいをつかっても"], dynamic: null }
        },
        {
          ai: { ja: "いいえ、ここで けいたいを つかっては いけません。", jaPlain: "いいえ、ここでけいたいをつかってはいけません。", romaji: "Iie, koko de keitai o tsukatte wa ikemasen.", es: "No, aquí no se puede usar el celular." },
          task: "Pregunta si puedes comer algo aquí (ここで 何か 食べても いいですか).",
          expect: { ja: "ここで 何か 食べても いいですか。", jaPlain: "ここでなにかたべてもいいですか。", romaji: "Koko de nanika tabete mo ii desu ka.", es: "¿Puedo comer algo aquí?", accept: ["なにかたべてもいいですか", "たべてもいいですか", "ここでたべても"], dynamic: null }
        },
        {
          ai: { ja: "すみません、ここで 食べては いけません。", jaPlain: "すみません、ここでたべてはいけません。", romaji: "Sumimasen, koko de tabete wa ikemasen.", es: "Lo siento, aquí no se puede comer." },
          task: "Pregunta si puedes leer libros aquí (じゃあ、ここで ほんを 読んでも いいですか).",
          expect: { ja: "じゃあ、ここで ほんを 読んでも いいですか。", jaPlain: "じゃあ、ここでほんをよんでもいいですか。", romaji: "Jaa, koko de hon o yonde mo ii desu ka.", es: "Entonces, ¿puedo leer libros aquí?", accept: ["ほんをよんでもいいですか", "よんでもいいですか", "ここでほんをよんでも"], dynamic: null }
        },
        {
          ai: { ja: "はい、それは いいですよ。どうぞ。", jaPlain: "はい、それはいいですよ。どうぞ。", romaji: "Hai, sore wa ii desu yo. Douzo.", es: "Sí, eso sí. Adelante." },
          task: "Da las gracias y confirma que no vas a usar el celular (ありがとう。けいたいを つかっては いけませんね).",
          expect: { ja: "ありがとう。けいたいを つかっては いけませんね。", jaPlain: "ありがとう。けいたいをつかってはいけませんね。", romaji: "Arigatou. Keitai o tsukatte wa ikemasen ne.", es: "Gracias. No debo usar el celular, ¿verdad?", accept: ["けいたいをつかってはいけません", "つかってはいけません", "ありがとう"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 電車の中で許可／禁止 */
    {
      settingEs: "En el tren, un pasajero te explica qué se puede y qué no se puede hacer.",
      closingJa: "マナーを まもって、きもちよく のって ください。",
      closingEs: "Respeta los modales y viaja cómodo, por favor.",
      steps: [
        {
          ai: { ja: "でんしゃの なかは こんで いますね。", jaPlain: "でんしゃのなかはこんでいますね。", romaji: "Densha no naka wa konde imasu ne.", es: "El tren está lleno, ¿no?" },
          task: "Pregunta si puedes hablar por teléfono aquí (ここで でんわを しても いいですか).",
          expect: { ja: "ここで でんわを しても いいですか。", jaPlain: "ここででんわをしてもいいですか。", romaji: "Koko de denwa o shite mo ii desu ka.", es: "¿Puedo hablar por teléfono aquí?", accept: ["でんわをしてもいいですか", "してもいいですか", "ここででんわをしても"], dynamic: null }
        },
        {
          ai: { ja: "いいえ、でんしゃの なかで でんわを しては いけません。", jaPlain: "いいえ、でんしゃのなかででんわをしてはいけません。", romaji: "Iie, densha no naka de denwa o shite wa ikemasen.", es: "No, dentro del tren no se puede hablar por teléfono." },
          task: "Di que entiendes y pregunta si puedes escuchar música (わかりました。おんがくを きいても いいですか).",
          expect: { ja: "わかりました。おんがくを きいても いいですか。", jaPlain: "わかりました。おんがくをきいてもいいですか。", romaji: "Wakarimashita. Ongaku o kiite mo ii desu ka.", es: "Entiendo. ¿Puedo escuchar música?", accept: ["おんがくをきいてもいいですか", "きいてもいいですか", "わかりました"], dynamic: null }
        },
        {
          ai: { ja: "はい、でも おおきい おとは いけませんよ。", jaPlain: "はい、でもおおきいおとはいけませんよ。", romaji: "Hai, demo ookii oto wa ikemasen yo.", es: "Sí, pero con volumen alto no." },
          task: "Pregunta si puedes comer algo aquí (ここで ものを 食べても いいですか).",
          expect: { ja: "ここで ものを 食べても いいですか。", jaPlain: "ここでものをたべてもいいですか。", romaji: "Koko de mono o tabete mo ii desu ka.", es: "¿Puedo comer algo aquí?", accept: ["ものをたべてもいいですか", "たべてもいいですか", "ここでたべても"], dynamic: null }
        },
        {
          ai: { ja: "いいえ、でんしゃで ものを 食べては いけません。", jaPlain: "いいえ、でんしゃでものをたべてはいけません。", romaji: "Iie, densha de mono o tabete wa ikemasen.", es: "No, en el tren no se puede comer." },
          task: "Confirma que en el tren no se puede comer (でんしゃで ものを 食べては いけませんね).",
          expect: { ja: "でんしゃで ものを 食べては いけませんね。", jaPlain: "でんしゃでものをたべてはいけませんね。", romaji: "Densha de mono o tabete wa ikemasen ne.", es: "En el tren no se puede comer, ¿verdad?", accept: ["でんしゃでものをたべてはいけません", "たべてはいけません", "ものをたべては"], dynamic: null }
        }
      ]
    }
  ],

  /* ======================= u10_c8 — 〜たり〜たりします / 〜ています（習慣・列挙） ======================= */
  "u10_c8": [
    /* 会話1 — 週末の過ごし方（列挙＋習慣） */
    {
      settingEs: "Tu amigo japonés te pregunta qué haces normalmente el fin de semana.",
      closingJa: "いい しゅうまつを すごして いますね！",
      closingEs: "¡Pasas muy bien los fines de semana!",
      steps: [
        {
          ai: { ja: "しゅうまつは ふつう 何を しますか。", jaPlain: "しゅうまつはふつうなにをしますか。", romaji: "Shuumatsu wa futsuu nani o shimasu ka.", es: "¿Qué sueles hacer los fines de semana?" },
          task: "Di que el fin de semana ves películas y lees libros (しゅうまつは えいがを 見たり、ほんを 読んだり します).",
          expect: { ja: "しゅうまつは えいがを 見たり、ほんを 読んだり します。", jaPlain: "しゅうまつはえいがをみたり、ほんをよんだりします。", romaji: "Shuumatsu wa eiga o mitari, hon o yondari shimasu.", es: "El fin de semana veo películas y leo libros.", accept: ["えいがをみたりほんをよんだりします", "みたりよんだりします", "えいがをみたり"], dynamic: null }
        },
        {
          ai: { ja: "いいですね。ほかにも 何か して いますか。", jaPlain: "いいですね。ほかにもなにかしていますか。", romaji: "Ii desu ne. Hoka ni mo nanika shite imasu ka.", es: "Qué bien. ¿Haces algo más?" },
          task: "Di que cada mañana estás haciendo jogging (まいあさ ジョギングを して います).",
          expect: { ja: "まいあさ ジョギングを して います。", jaPlain: "まいあさじょぎんぐをしています。", romaji: "Maiasa jogingu o shite imasu.", es: "Cada mañana estoy haciendo jogging.", accept: ["まいあさじょぎんぐをしています", "じょぎんぐをしています", "じょぎんぐをして"], dynamic: null }
        },
        {
          ai: { ja: "けんこうてきですね！ばんは どう すごしますか。", jaPlain: "けんこうてきですね。ばんはどうすごしますか。", romaji: "Kenkouteki desu ne! Ban wa dou sugoshimasu ka.", es: "¡Qué saludable! ¿Cómo pasas la noche?" },
          task: "Di que en la noche escuchas música o cocinas (よるは おんがくを きいたり、りょうりを 作ったり します).",
          expect: { ja: "よるは おんがくを きいたり、りょうりを 作ったり します。", jaPlain: "よるはおんがくをきいたり、りょうりをつくったりします。", romaji: "Yoru wa ongaku o kiitari, ryouri o tsukuttari shimasu.", es: "En la noche escucho música o cocino.", accept: ["おんがくをきいたりりょうりをつくったりします", "きいたりつくったりします", "おんがくをきいたり"], dynamic: null }
        }
      ]
    },
    /* 会話2 — 趣味について（列挙＋進行中） */
    {
      settingEs: "En clase hablas de tus pasatiempos con tus compañeros.",
      closingJa: "しゅみが たくさん あって、たのしんで いますね！",
      closingEs: "¡Tienes muchos pasatiempos y los disfrutas!",
      steps: [
        {
          ai: { ja: "{name}さんの しゅみは 何ですか。", jaPlain: "さんのしゅみはなんですか。", romaji: "{name}-san no shumi wa nan desu ka.", es: "{name}, ¿cuál es tu pasatiempo?" },
          task: "Di que tu pasatiempo es el deporte y ahora estás practicando fútbol (しゅみは スポーツです。いま サッカーを れんしゅうして います).",
          expect: { ja: "しゅみは スポーツです。いま サッカーを れんしゅうして います。", jaPlain: "しゅみはすぽーつです。いまさっかーをれんしゅうしています。", romaji: "Shumi wa supootsu desu. Ima sakkaa o renshuu shite imasu.", es: "Mi pasatiempo es el deporte. Ahora estoy practicando fútbol.", accept: ["さっかーをれんしゅうしています", "れんしゅうしています", "しゅみはすぽーつです"], dynamic: null }
        },
        {
          ai: { ja: "すごい！ほかの ひは 何を しますか。", jaPlain: "すごい。ほかのひはなにをしますか。", romaji: "Sugoi! Hoka no hi wa nani o shimasu ka.", es: "¡Genial! ¿Qué haces los otros días?" },
          task: "Di que otros días juegas videojuegos o ves la tele (ほかの ひは ゲームを したり、テレビを 見たり します).",
          expect: { ja: "ほかの ひは ゲームを したり、テレビを 見たり します。", jaPlain: "ほかのひはげーむをしたり、てれびをみたりします。", romaji: "Hoka no hi wa geemu o shitari, terebi o mitari shimasu.", es: "Otros días juego videojuegos o veo la tele.", accept: ["げーむをしたりてれびをみたりします", "したりみたりします", "げーむをしたり"], dynamic: null }
        },
        {
          ai: { ja: "たのしそう！いま あたらしい ことを して いますか。", jaPlain: "たのしそう。いまあたらしいことをしていますか。", romaji: "Tanoshisou! Ima atarashii koto o shite imasu ka.", es: "¡Suena divertido! ¿Ahora estás haciendo algo nuevo?" },
          task: "Di que ahora estás aprendiendo japonés y estudias todos los días (いま にほんごを ならって います。まいにち べんきょうして います).",
          expect: { ja: "いま にほんごを ならって います。まいにち べんきょうして います。", jaPlain: "いまにほんごをならっています。まいにちべんきょうしています。", romaji: "Ima nihongo o naratte imasu. Mainichi benkyou shite imasu.", es: "Ahora estoy aprendiendo japonés. Estudio todos los días.", accept: ["にほんごをならっています", "まいにちべんきょうしています", "ならっています"], dynamic: null }
        }
      ]
    },
    /* 会話3 — 休みの日の計画（列挙＋進行中の準備） */
    {
      settingEs: "Planeas con un amigo qué hacer en las próximas vacaciones.",
      closingJa: "たのしい やすみに なると いいですね！",
      closingEs: "¡Ojalá tengas unas vacaciones divertidas!",
      steps: [
        {
          ai: { ja: "こんどの やすみは 何を したいですか。", jaPlain: "こんどのやすみはなにをしたいですか。", romaji: "Kondo no yasumi wa nani o shitai desu ka.", es: "¿Qué quieres hacer en las próximas vacaciones?" },
          task: "Di que quieres viajar, sacar fotos y comer cosas ricas (りょこうして、しゃしんを とったり、おいしい ものを 食べたり したいです).",
          expect: { ja: "りょこうして、しゃしんを とったり、おいしい ものを 食べたり したいです。", jaPlain: "りょこうして、しゃしんをとったり、おいしいものをたべたりしたいです。", romaji: "Ryokou shite, shashin o tottari, oishii mono o tabetari shitai desu.", es: "Quiero viajar, sacar fotos y comer cosas ricas.", accept: ["しゃしんをとったりおいしいものをたべたり", "とったりたべたりしたいです", "しゃしんをとったり"], dynamic: null }
        },
        {
          ai: { ja: "いいですね！いま りょこうの じゅんびを して いますか。", jaPlain: "いいですね。いまりょこうのじゅんびをしていますか。", romaji: "Ii desu ne! Ima ryokou no junbi o shite imasu ka.", es: "¡Qué bien! ¿Ya estás preparando el viaje?" },
          task: "Di que ahora estás ahorrando dinero (いま おかねを ためて います).",
          expect: { ja: "いま おかねを ためて います。", jaPlain: "いまおかねをためています。", romaji: "Ima okane o tamete imasu.", es: "Ahora estoy ahorrando dinero.", accept: ["いまおかねをためています", "おかねをためています", "ためています"], dynamic: null }
        },
        {
          ai: { ja: "けいかくてきですね。やすみの まえは いそがしいですか。", jaPlain: "けいかくてきですね。やすみのまえはいそがしいですか。", romaji: "Keikakuteki desu ne. Yasumi no mae wa isogashii desu ka.", es: "Qué organizado. ¿Estás ocupado antes de las vacaciones?" },
          task: "Di que estás ocupado: trabajas y estudias (いそがしいです。はたらいたり、べんきょうしたり して います).",
          expect: { ja: "いそがしいです。はたらいたり、べんきょうしたり して います。", jaPlain: "いそがしいです。はたらいたり、べんきょうしたりしています。", romaji: "Isogashii desu. Hataraitari, benkyou shitari shite imasu.", es: "Estoy ocupado: trabajo y estudio.", accept: ["はたらいたりべんきょうしたりしています", "はたらいたりべんきょうしたり", "べんきょうしたりしています"], dynamic: null }
        }
      ]
    }
  ],

  /* ===================== Unit 8 (nueva): La forma て ===================== */
  /* u8t_c2 — 〜てください（依頼・指示）。ユーザー返答は全てかな＝[A17]採点安全 */
  "u8t_c2": [
    {
      settingEs: "Estás en la oficina. Ayuda y pide cosas a tus compañeros usando 〜てください.",
      closingJa: "ありがとう、たすかりました！",
      closingEs: "¡Gracias, me ayudaste!",
      steps: [
        {
          ai: { ja: "おはようございます。きょうは いそがしいですか。", jaPlain: "おはようございます。きょうはいそがしいですか。", romaji: "Ohayou gozaimasu. Kyou wa isogashii desu ka.", es: "Buenos días. ¿Estás ocupado hoy?" },
          task: "Pide que espere un poco (ちょっと まって ください).",
          expect: { ja: "ちょっと まって ください。", jaPlain: "ちょっとまってください。", romaji: "Chotto matte kudasai.", es: "Espera un momento, por favor.", accept: ["ちょっとまってください", "まってください"], dynamic: null }
        },
        {
          ai: { ja: "はい。あ、この かんじが よめません。", jaPlain: "はい。あ、このかんじがよめません。", romaji: "Hai. A, kono kanji ga yomemasen.", es: "Vale. Ah, no puedo leer este kanji." },
          task: "Pídele que lo lea despacio (ゆっくり よんで ください).",
          expect: { ja: "ゆっくり よんで ください。", jaPlain: "ゆっくりよんでください。", romaji: "Yukkuri yonde kudasai.", es: "Léelo despacio, por favor.", accept: ["ゆっくりよんでください", "よんでください"], dynamic: null }
        },
        {
          ai: { ja: "わかりました。じゃあ、この しょるいは？", jaPlain: "わかりました。じゃあ、このしょるいは？", romaji: "Wakarimashita. Jaa, kono shorui wa?", es: "Entendido. Entonces, ¿y estos documentos?" },
          task: "Pídele que los copie (コピーして ください).",
          expect: { ja: "コピーして ください。", jaPlain: "コピーしてください。", romaji: "Kopī shite kudasai.", es: "Haz una copia, por favor.", accept: ["こぴーしてください", "コピーしてください", "コピーして"], dynamic: null }
        }
      ]
    },
    {
      settingEs: "En clase, pides ayuda a tu profesora usando 〜てください.",
      closingJa: "よく できました！",
      closingEs: "¡Muy bien hecho!",
      steps: [
        {
          ai: { ja: "しつもんが ありますか。", jaPlain: "しつもんがありますか。", romaji: "Shitsumon ga arimasu ka.", es: "¿Tienes alguna pregunta?" },
          task: "Pídele que escriba un ejemplo (れいを かいて ください).",
          expect: { ja: "れいを かいて ください。", jaPlain: "れいをかいてください。", romaji: "Rei o kaite kudasai.", es: "Escribe un ejemplo, por favor.", accept: ["れいをかいてください", "かいてください"], dynamic: null }
        },
        {
          ai: { ja: "はい、かきました。わかりますか。", jaPlain: "はい、かきました。わかりますか。", romaji: "Hai, kakimashita. Wakarimasu ka.", es: "Listo, lo escribí. ¿Entiendes?" },
          task: "Pídele que hable más despacio (もっと ゆっくり はなして ください).",
          expect: { ja: "もっと ゆっくり はなして ください。", jaPlain: "もっとゆっくりはなしてください。", romaji: "Motto yukkuri hanashite kudasai.", es: "Habla más despacio, por favor.", accept: ["ゆっくりはなしてください", "はなしてください"], dynamic: null }
        },
        {
          ai: { ja: "だいじょうぶですか。", jaPlain: "だいじょうぶですか。", romaji: "Daijoubu desu ka.", es: "¿Todo bien?" },
          task: "Pídele que lo diga otra vez (もう いちど いって ください).",
          expect: { ja: "もう いちど いって ください。", jaPlain: "もういちどいってください。", romaji: "Mou ichido itte kudasai.", es: "Dilo otra vez, por favor.", accept: ["もういちどいってください", "いってください"], dynamic: null }
        }
      ]
    }
  ],

  /* u8t_c4 — 〜てもいいですか／〜てはいけません（許可を求める）。ユーザー返答は全てかな */
  "u8t_c4": [
    {
      settingEs: "Estás en el aula de informática. Pide permiso a tu profesora con 〜てもいいですか.",
      closingJa: "しつもんが じょうずですね！",
      closingEs: "¡Preguntas muy bien!",
      steps: [
        {
          ai: { ja: "じゅぎょうを はじめます。", jaPlain: "じゅぎょうをはじめます。", romaji: "Jugyou o hajimemasu.", es: "Vamos a empezar la clase." },
          task: "Pregunta si puedes tomar fotos (しゃしんを とっても いいですか).",
          expect: { ja: "しゃしんを とっても いいですか。", jaPlain: "しゃしんをとってもいいですか。", romaji: "Shashin o tottemo ii desu ka.", es: "¿Puedo tomar fotos?", accept: ["しゃしんをとってもいいですか", "とってもいいですか"], dynamic: null }
        },
        {
          ai: { ja: "はい、いいですよ。", jaPlain: "はい、いいですよ。", romaji: "Hai, ii desu yo.", es: "Sí, está bien." },
          task: "Pregunta si puedes usar el celular (けいたいを つかっても いいですか).",
          expect: { ja: "けいたいを つかっても いいですか。", jaPlain: "けいたいをつかってもいいですか。", romaji: "Keitai o tsukattemo ii desu ka.", es: "¿Puedo usar el celular?", accept: ["けいたいをつかってもいいですか", "つかってもいいですか"], dynamic: null }
        },
        {
          ai: { ja: "じゅぎょうちゅうは つかっては いけません。", jaPlain: "じゅぎょうちゅうはつかってはいけません。", romaji: "Jugyouchuu wa tsukatte wa ikemasen.", es: "Durante la clase no se puede usar." },
          task: "Pregunta si puedes beber agua (みずを のんでも いいですか).",
          expect: { ja: "みずを のんでも いいですか。", jaPlain: "みずをのんでもいいですか。", romaji: "Mizu o nondemo ii desu ka.", es: "¿Puedo beber agua?", accept: ["みずをのんでもいいですか", "のんでもいいですか"], dynamic: null }
        }
      ]
    },
    {
      settingEs: "Eres nuevo en la biblioteca. Pregunta las reglas con 〜てもいいですか.",
      closingJa: "よく わかりましたね！",
      closingEs: "¡Lo entendiste muy bien!",
      steps: [
        {
          ai: { ja: "としょかんへ ようこそ。", jaPlain: "としょかんへようこそ。", romaji: "Toshokan e youkoso.", es: "Bienvenido a la biblioteca." },
          task: "Pregunta si puedes entrar (はいっても いいですか).",
          expect: { ja: "はいっても いいですか。", jaPlain: "はいってもいいですか。", romaji: "Haittemo ii desu ka.", es: "¿Puedo entrar?", accept: ["はいってもいいですか", "はいっても"], dynamic: null }
        },
        {
          ai: { ja: "どうぞ。", jaPlain: "どうぞ。", romaji: "Douzo.", es: "Adelante." },
          task: "Pregunta si puedes comer aquí (ここで たべても いいですか).",
          expect: { ja: "ここで たべても いいですか。", jaPlain: "ここでたべてもいいですか。", romaji: "Koko de tabetemo ii desu ka.", es: "¿Puedo comer aquí?", accept: ["ここでたべてもいいですか", "たべてもいいですか"], dynamic: null }
        },
        {
          ai: { ja: "いいえ、ここで たべては いけません。", jaPlain: "いいえ、ここでたべてはいけません。", romaji: "Iie, koko de tabete wa ikemasen.", es: "No, aquí no se puede comer." },
          task: "Pregunta si puedes leer libros (ほんを よんでも いいですか).",
          expect: { ja: "ほんを よんでも いいですか。", jaPlain: "ほんをよんでもいいですか。", romaji: "Hon o yondemo ii desu ka.", es: "¿Puedo leer libros?", accept: ["ほんをよんでもいいですか", "よんでもいいですか"], dynamic: null }
        }
      ]
    }
  ],

  /* u8t_c5 — La forma て (repaso): primer día de trabajo。ユーザー返答は全てかな＝[A17]採点安全 */
  "u8t_c5": [
    {
      settingEs: "Es tu primer día en el café. Tu compañero te da instrucciones y tú pides permiso con la forma て.",
      closingJa: "はじめてなのに よく できましたね！",
      closingEs: "¡Para ser tu primer día, lo hiciste muy bien!",
      steps: [
        {
          ai: { ja: "おはようございます。まず なにを しますか？", jaPlain: "おはようございます。まずなにをしますか？", romaji: "Ohayou gozaimasu. Mazu nani o shimasu ka?", es: "Buenos días. ¿Qué hago primero?" },
          task: "Pídele que use el delantal (エプロンを つかって ください).",
          expect: { ja: "エプロンを つかって ください。", jaPlain: "エプロンをつかってください。", romaji: "Epuron o tsukatte kudasai.", es: "Usa el delantal, por favor.", accept: ["えぷろんをつかってください", "エプロンをつかってください", "つかってください"], dynamic: null }
        },
        {
          ai: { ja: "はい。しゃしんを とりたいです。", jaPlain: "はい。しゃしんをとりたいです。", romaji: "Hai. Shashin o toritai desu.", es: "Vale. Quiero tomar una foto." },
          task: "Dile que dentro de la tienda no se puede (しゃしんを とっては いけません).",
          expect: { ja: "しゃしんを とっては いけません。", jaPlain: "しゃしんをとってはいけません。", romaji: "Shashin o totte wa ikemasen.", es: "No se pueden tomar fotos.", accept: ["しゃしんをとってはいけません", "とってはいけません"], dynamic: null }
        },
        {
          ai: { ja: "わかりました。いま なにを して いますか？", jaPlain: "わかりました。いまなにをしていますか？", romaji: "Wakarimashita. Ima nani o shite imasu ka?", es: "Entendido. ¿Qué estás haciendo ahora?" },
          task: "Di que estás lavando los vasos (コップを あらって います).",
          expect: { ja: "コップを あらって います。", jaPlain: "コップをあらっています。", romaji: "Koppu o aratte imasu.", es: "Estoy lavando los vasos.", accept: ["こっぷをあらっています", "コップをあらっています", "あらっています"], dynamic: null }
        }
      ]
    },
    {
      settingEs: "En el descanso preguntas a tu compañero qué se puede hacer, usando la forma て.",
      closingJa: "しつもんが じょうずですね！",
      closingEs: "¡Preguntas muy bien!",
      steps: [
        {
          ai: { ja: "おつかれさま。やすみじかんですよ。", jaPlain: "おつかれさま。やすみじかんですよ。", romaji: "Otsukaresama. Yasumijikan desu yo.", es: "Buen trabajo. Es la hora del descanso." },
          task: "Pregunta si puedes usar el celular (ケータイを つかっても いいですか).",
          expect: { ja: "ケータイを つかっても いいですか。", jaPlain: "ケータイをつかってもいいですか。", romaji: "Kētai o tsukattemo ii desu ka.", es: "¿Puedo usar el celular?", accept: ["けーたいをつかってもいいですか", "ケータイをつかってもいいですか", "つかってもいいですか"], dynamic: null }
        },
        {
          ai: { ja: "はい、いいですよ。", jaPlain: "はい、いいですよ。", romaji: "Hai, ii desu yo.", es: "Sí, está bien." },
          task: "Pregunta si puedes comer aquí (ここで たべても いいですか).",
          expect: { ja: "ここで たべても いいですか。", jaPlain: "ここでたべてもいいですか。", romaji: "Koko de tabetemo ii desu ka.", es: "¿Puedo comer aquí?", accept: ["ここでたべてもいいですか", "たべてもいいですか"], dynamic: null }
        },
        {
          ai: { ja: "どうぞ。あ、コーヒーが ほしいですか？", jaPlain: "どうぞ。あ、コーヒーがほしいですか？", romaji: "Douzo. A, kōhī ga hoshii desu ka?", es: "Adelante. Ah, ¿quieres café?" },
          task: "Pídele que espere un momento (ちょっと まって ください).",
          expect: { ja: "ちょっと まって ください。", jaPlain: "ちょっとまってください。", romaji: "Chotto matte kudasai.", es: "Espera un momento, por favor.", accept: ["ちょっとまってください", "まってください"], dynamic: null }
        }
      ]
    }
  ]

};
