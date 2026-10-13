// Simulacro JLPT N5 — exámenes 1 (solo escucha), 2 y 3.  window.JLPT_EXAMS
// Examen 1: vocabulario/gramática/lectura viven en jlptQuestionBank (index.html); aquí solo su escucha.
// Formato: vocab/gram/reading = {q, options[4], answer, explainEs, ja?}
//          listening = {type:'meaning'|'response'|'detail', text(lo que se lee en voz alta), q, options[4], answer, explainEs}
// Audio: audio/jlpt_{examId}_l{n}.opus (n = posición en listening, desde 1). Si no existe → voz sintética.
(function () {
  const W = (window.JLPT_EXAMS = window.JLPT_EXAMS || {});
  const Q = (q, options, answer, explainEs, ja) => (ja ? { q, ja, options, answer, explainEs } : { q, options, answer, explainEs });
  const L = (type, text, q, options, answer, explainEs) => ({ type, text, q, options, answer, explainEs });
  const QM = '¿Qué significa lo que escuchas?';
  const QR = '¿Cuál es la mejor respuesta?';

  // ───────────── Examen 1: solo escucha ─────────────
  W.e1 = {
    name: 'Examen 1',
    listening: [
      L('response', 'いま なんじですか。', QR,
        ['三時半です。', 'いいえ、ちがいます。', '三人です。', 'きのうです。'], 0,
        '«¿Qué hora es ahora?» → se responde con una hora: 三時半です (las tres y media).'),
      L('response', 'おげんきですか。', QR,
        ['はい、げんきです。', 'はい、どうぞ。', 'いいえ、いません。', 'どういたしまして。'], 0,
        '«¿Cómo está?» → はい、げんきです (Sí, estoy bien).'),
      L('meaning', 'わたしは まいあさ コーヒーを のみます。', QM,
        ['Todas las mañanas tomo café.', 'Ayer tomé café.', 'Quiero tomar café.', 'No tomo café.'], 0,
        'まいあさ = todas las mañanas; のみます = tomo/bebo (presente habitual).'),
      L('meaning', 'この かばんは わたしのじゃ ありません。', QM,
        ['Esta bolsa no es mía.', 'Esta bolsa es mía.', 'No tengo bolsa.', 'Esta bolsa es nueva.'], 0,
        '「わたしのじゃ ありません」= no es mío.'),
      L('detail', 'あしたの テストは なんじからですか。九時からです。', '¿A qué hora empieza el examen de mañana?',
        ['A las 9', 'A las 10', 'A las 7', 'A las 8'], 0,
        'Pregunta: «¿Desde qué hora es el examen de mañana?» Respuesta: 九時から = desde las 9.'),
      L('detail', 'たんじょうびは いつですか。七月十日です。', '¿Cuándo es el cumpleaños?',
        ['El 10 de julio', 'El 7 de octubre', 'El 17 de julio', 'El 10 de junio'], 0,
        '七月 = julio (しちがつ); 十日 = día 10 (とおか).'),
      L('detail', 'わたしは まいにち バスで がっこうへ いきます。', '¿Cómo va a la escuela?',
        ['En bus', 'En tren', 'A pie', 'En bicicleta'], 0,
        'バスで = en bus (la partícula で indica el medio de transporte).'),
      L('detail', 'なにを のみますか。おちゃを おねがいします。', '¿Qué pide para beber?',
        ['Té', 'Café', 'Agua', 'Jugo'], 0,
        'おちゃ = té. «Té, por favor».')
    ]
  };

  // ───────────── Examen 2 ─────────────
  W.e2 = {
    name: 'Examen 2',
    vocab: [
      Q('¿Qué significa 「いただきます」?',
        ['Frase que se dice antes de comer', 'Hasta luego', 'Frase que se dice al terminar de comer', 'Bienvenido'], 0,
        'いただきます se dice antes de comer. Al terminar se dice ごちそうさまでした.'),
      Q('¿Cómo se lee 「水」?', ['みず', 'すい', 'あめ', 'ゆ'], 0,
        '水 = みず (agua). あめ es lluvia/caramelo y ゆ es agua caliente.', '水'),
      Q('¿Cómo se lee 「電車」?', ['でんしゃ', 'でんくるま', 'てんしゃ', 'でんち'], 0,
        '電車 = でんしゃ (tren eléctrico).', '電車'),
      Q('¿Cómo se lee 「先生」?', ['せんせい', 'せんせ', 'しんせい', 'せんぜい'], 0,
        '先生 = せんせい (profesor/a).', '先生'),
      Q('¿Cómo se lee 「来週」?', ['らいしゅう', 'らいしゅ', 'くるしゅう', 'らいげつ'], 0,
        '来週 = らいしゅう (la semana próxima). らいげつ es el mes próximo.', '来週'),
      Q('「___で 手紙を 出します。」 (Envío una carta en el correo.)',
        ['ゆうびんきょく', 'ぎんこう', 'びょういん', 'えき'], 0,
        'ゆうびんきょく = oficina de correos; ぎんこう = banco; びょういん = hospital; えき = estación.'),
      Q('「雨が ふっていますから、___を さします。」 (Como llueve, abro el ___.)',
        ['かさ', 'さいふ', 'とけい', 'はし'], 0,
        'かさ = paraguas (かさを さす). さいふ = billetera; とけい = reloj; はし = palillos.'),
      Q('¿Qué significa 「あたらしい」?', ['Nuevo', 'Viejo', 'Caro', 'Barato'], 0,
        'あたらしい = nuevo. Lo contrario es ふるい (viejo).')
    ],
    gram: [
      Q('「えんぴつ ___ 書きます。」 (Escribo con lápiz.)', ['で', 'を', 'に', 'が'], 0,
        'La partícula で indica el instrumento/medio: えんぴつで = con lápiz.'),
      Q('「あそこに 犬 ___ います。」 (Allá hay un perro.)', ['が', 'を', 'で', 'へ'], 0,
        'Con います/あります el sujeto que existe lleva が: 犬が います.'),
      Q('「毎日 バス ___ 会社へ 行きます。」 (Voy todos los días a la empresa en bus.)', ['で', 'に', 'を', 'が'], 0,
        'Medio de transporte → で: バスで.'),
      Q('「この 本は 私 ___ です。」 (Este libro es mío.)', ['の', 'が', 'を', 'に'], 0,
        '私の (です) = mío. の indica pertenencia.'),
      Q('「ちょっと 待って ___。」 (Espere un momento, por favor.)', ['ください', 'ます', 'ました', 'たい'], 0,
        '〜てください = por favor haga… 待ってください = espere, por favor.'),
      Q('「あしたは 雨が ふる ___。」 (Probablemente mañana llueva.)', ['でしょう', 'ですか', 'でした', 'ではありません'], 0,
        '〜でしょう expresa suposición: «probablemente…».'),
      Q('「日本語は ___ です。」 (El japonés es difícil.)', ['むずかしい', 'むずかしくて', 'むずかしかった', 'むずかしく'], 0,
        'Antes de です el adjetivo い queda en forma diccionario: むずかしい + です.'),
      Q('「きのうは 学校へ 行き ___ でした。」 (Ayer no fui a la escuela.)', ['ません', 'ない', 'なかった', 'ませんで'], 0,
        'Pasado negativo cortés: 〜ませんでした.'),
      Q('「手を 洗っ ___ から、食べます。」 (Me lavo las manos y luego como.)', ['て', 'た', 'ない', 'に'], 0,
        '〜てから = después de… 洗って + から.'),
      Q('「ここに 座っ ___ いいですか。」 (¿Puedo sentarme aquí?)', ['ても', 'ては', 'ないで', 'たら'], 0,
        '〜てもいいですか = ¿puedo…? (permiso). 〜ては いけません sería la prohibición.'),
      Q('「私は 犬が 二ひき ___。」 (Tengo dos perros.)', ['います', 'あります', 'します', 'きます'], 0,
        'Para animales y personas se usa います (existencia). あります es para cosas.'),
      Q('「このケーキは あのケーキ ___ 高いです。」 (Este pastel es más caro que aquel.)', ['より', 'ほど', 'から', 'まで'], 0,
        'AはBより〜です = A es más… que B.')
    ],
    passage: [
      'マリアさんへ',
      'らいしゅうの <ruby>日曜日<rt>にちようび</rt></ruby>に、ともだちの たんじょうびの パーティーを します。ばしょは わたしの うちです。じかんは <ruby>午後<rt>ごご</rt></ruby> 3じから 6じまでです。',
      'ケーキは わたしが つくります。マリアさんは のみものを ふたつ もって <ruby>来<rt>き</rt></ruby>て ください。　さとう'
    ],
    reading: [
      Q('¿Qué tipo de evento es?', ['Una fiesta de cumpleaños', 'Una boda', 'Una clase de cocina', 'Una reunión de trabajo'], 0,
        '「ともだちの たんじょうびの パーティー」= fiesta de cumpleaños de un amigo.'),
      Q('¿Dónde será?', ['En la casa de Satō', 'En un restaurante', 'En el parque', 'En la escuela'], 0,
        '「ばしょは わたしの うちです」= el lugar es mi casa (la de Satō).'),
      Q('¿A qué hora termina?', ['A las 6 de la tarde', 'A las 3 de la tarde', 'A las 6 de la mañana', 'A las 3 de la mañana'], 0,
        '「午後 3じから 6じまで」= de 3 a 6 de la tarde.'),
      Q('¿Qué debe llevar María?', ['Dos bebidas', 'Un pastel', 'Un regalo caro', 'Nada'], 0,
        '「のみものを ふたつ もって来てください」= traiga dos bebidas.'),
      Q('¿Quién prepara el pastel?', ['Satō', 'María', 'Un amigo', 'Una pastelería'], 0,
        '「ケーキは わたしが つくります」= el pastel lo preparo yo (Satō).')
    ],
    listening: [
      L('meaning', 'おなかが すきました。', QM,
        ['Tengo hambre.', 'Tengo sueño.', 'Estoy cansado.', 'Tengo sed.'], 0,
        'おなかが すきました = tengo hambre.'),
      L('response', 'おなまえは なんですか。', QR,
        ['マリアです。', 'はい、そうです。', 'さんさいです。', 'ボリビアから きました。'], 0,
        '«¿Cómo se llama?» → 「マリアです」(Me llamo María).'),
      L('response', 'あした いっしょに えいがを みませんか。', QR,
        ['ええ、いいですね。', 'いいえ、みました。', 'えいがは おもしろいです。', 'ありがとうございました。'], 0,
        '〜ませんか invita: «¿vemos una película juntos mañana?» → ええ、いいですね (¡sí, buena idea!).'),
      L('detail', 'すみません、トイレは どこですか。あの かどを まがって、みぎです。', '¿Dónde está el baño?',
        ['A la derecha, doblando la esquina', 'Al fondo a la izquierda', 'Al lado de la escalera', 'En el segundo piso'], 0,
        'あの かどを まがって = doblando aquella esquina; みぎ = derecha.'),
      L('detail', 'この シャツは いくらですか。二千五百えんです。ちょっと たかいですね。', '¿Cuánto cuesta la camisa?',
        ['2.500 yenes', '2.000 yenes', '1.500 yenes', '5.200 yenes'], 0,
        '二千五百えん = 2.500 yenes (にせん ごひゃく).'),
      L('detail', 'でんしゃは はちじ じゅうごふんに でます。', '¿A qué hora sale el tren?',
        ['8:15', '8:50', '7:15', '9:15'], 0,
        'はちじ じゅうごふん = 8:15.'),
      L('detail', 'きのうは あめでしたから、うちで ほんを よみました。', '¿Qué hizo ayer?',
        ['Se quedó en casa leyendo', 'Salió de paseo', 'Fue a la biblioteca', 'Vio una película'], 0,
        'Ayer llovió, así que leyó un libro en casa (うちで ほんを よみました).'),
      L('meaning', 'ここで しゃしんを とっては いけません。', QM,
        ['Aquí no se pueden tomar fotos.', 'Tome fotos aquí, por favor.', 'Se pueden tomar fotos.', 'Aquí no hay fotos.'], 0,
        '〜ては いけません = está prohibido… ここで しゃしんを とっては いけません = aquí no se puede fotografiar.')
    ]
  };

  // ───────────── Examen 3 ─────────────
  W.e3 = {
    name: 'Examen 3',
    vocab: [
      Q('¿Qué significa 「おやすみなさい」?', ['Buenas noches (antes de dormir)', 'Buenos días', 'Con permiso', 'Bienvenido'], 0,
        'おやすみなさい = que descanses / buenas noches al despedirse para dormir.'),
      Q('¿Cómo se lee 「大学」?', ['だいがく', 'おおがく', 'たいがく', 'だいかく'], 0,
        '大学 = だいがく (universidad).', '大学'),
      Q('¿Cómo se lee 「病院」?', ['びょういん', 'びよういん', 'ひょういん', 'びょうえん'], 0,
        '病院 = びょういん (hospital). びよういん (美容院) es una peluquería.', '病院'),
      Q('¿Cómo se lee 「木曜日」?', ['もくようび', 'きようび', 'もくよび', 'ぼくようび'], 0,
        '木曜日 = もくようび (jueves).', '木曜日'),
      Q('「へやの ___を つけます。」 (Enciendo la luz de la habitación.)', ['でんき', 'まど', 'いす', 'かぎ'], 0,
        'でんき = luz eléctrica (でんきを つけます). まど = ventana; いす = silla; かぎ = llave.'),
      Q('「あついですから、___を あけます。」 (Hace calor, así que abro la ___.)', ['まど', 'ほん', 'ふく', 'さかな'], 0,
        'まどを あけます = abro la ventana.'),
      Q('¿Qué significa 「ひろい」?', ['Amplio', 'Estrecho', 'Alto', 'Bajo'], 0,
        'ひろい = amplio/ancho. Lo contrario es せまい (estrecho).'),
      Q('「うちから 学校まで 歩いて 十分 ___。」 (De mi casa a la escuela se tardan 10 minutos a pie.)',
        ['かかります', 'あります', 'います', 'できます'], 0,
        'El tiempo que “toma” algo se expresa con かかります.')
    ],
    gram: [
      Q('「えき ___ 学校まで 歩きます。」 (Camino desde la estación hasta la escuela.)', ['から', 'に', 'を', 'が'], 0,
        '〜から〜まで = desde… hasta…'),
      Q('「ひとり ___ 旅行しました。」 (Viajé solo.)', ['で', 'と', 'に', 'を'], 0,
        'ひとりで = solo/a (cantidad de personas + で).'),
      Q('「これは だれ ___ かさですか。」 (¿De quién es este paraguas?)', ['の', 'を', 'に', 'で'], 0,
        'だれの = de quién (の indica posesión).'),
      Q('「薬を 飲ん ___、寝ました。」 (Tomé la medicina y me acosté.)', ['で', 'て', 'に', 'を'], 0,
        'Forma て de 飲む: 飲んで (los verbos en む cambian a んで).'),
      Q('「窓を 開け ___ ください。」 (Abra la ventana, por favor.)', ['て', 'で', 'に', 'を'], 0,
        '開ける → 開けて + ください.'),
      Q('「この カメラは 高 ___ です。」 (Esta cámara no es cara.)', ['くない', 'くなかった', 'くなく', 'かった'], 0,
        'Negativo de adjetivo い: 〜くない (+ です).'),
      Q('「きのうは 天気が よ ___。」 (Ayer hizo buen tiempo.)', ['かったです', 'いです', 'くないです', 'くて'], 0,
        'Pasado de よい: よかったです.'),
      Q('「日本語を 話す ___ が できます。」 (Puedo hablar japonés.)', ['こと', 'もの', 'ところ', 'とき'], 0,
        '〜ことが できます = puedo / soy capaz de…'),
      Q('「私は サッカー ___ 好きです。」 (Me gusta el fútbol.)', ['が', 'を', 'に', 'へ'], 0,
        'Con 好き el objeto del gusto lleva が: サッカーが 好きです.'),
      Q('「ベッドの 上 ___ ねこが います。」 (Sobre la cama hay un gato.)', ['に', 'を', 'へ', 'で'], 0,
        'El lugar donde algo existe se marca con に.'),
      Q('「もう 7時 ___ なりました。」 (Ya son las 7.)', ['に', 'を', 'が', 'で'], 0,
        '〜に なります = llegar a ser / convertirse en: 7時に なりました.'),
      Q('「質問が ありますか。―いいえ、___ ありません。」 (¿Tiene preguntas? — No, ninguna.)', ['なにも', 'なにか', 'だれも', 'どこも'], 0,
        'なにも + negativo = nada / ninguna cosa.')
    ],
    passage: [
      '<ruby>アルバイト<rt>あるばいと</rt></ruby>の おしらせ',
      'レストラン「さくら」で はたらく <ruby>人<rt>ひと</rt></ruby>を さがしています。',
      '<ruby>仕事<rt>しごと</rt></ruby>は <ruby>月曜日<rt>げつようび</rt></ruby>から <ruby>金曜日<rt>きんようび</rt></ruby>までです。ごご 5じから 9じまで はたらきます。',
      '1じかん 1,000えんです。にほんごが すこし はなせる <ruby>人<rt>ひと</rt></ruby>が いいです。きょうみが ある <ruby>人<rt>ひと</rt></ruby>は、でんわを して ください。'
    ],
    reading: [
      Q('¿Qué busca el restaurante?', ['Una persona que trabaje allí', 'Un cocinero famoso', 'Clientes nuevos', 'Un local más grande'], 0,
        '「はたらく人を さがしています」= buscamos a alguien que trabaje.'),
      Q('¿Qué días se trabaja?', ['De lunes a viernes', 'De martes a sábado', 'Solo fines de semana', 'Todos los días'], 0,
        '「月曜日から金曜日まで」= de lunes a viernes.'),
      Q('¿Cuántas horas se trabaja cada día?', ['4 horas', '5 horas', '9 horas', '8 horas'], 0,
        'De las 5 a las 9 de la tarde = 4 horas.'),
      Q('¿Cuánto se paga por hora?', ['1.000 yenes', '100 yenes', '10.000 yenes', '500 yenes'], 0,
        '「1じかん 1,000えん」= 1.000 yenes por hora.'),
      Q('¿Qué deben hacer los interesados?', ['Llamar por teléfono', 'Ir en persona mañana', 'Enviar una carta', 'Escribir un correo'], 0,
        '「でんわを して ください」= por favor llamen por teléfono.')
    ],
    listening: [
      L('response', 'しゅくだいは おわりましたか。', QR,
        ['はい、もう おわりました。', 'いいえ、しゅくだいは たかいです。', 'はい、じゅうにんです。', 'いいえ、いきません。'], 0,
        '«¿Terminó la tarea?» → はい、もう おわりました (Sí, ya terminé).'),
      L('response', 'いってきます。', QR,
        ['いってらっしゃい。', 'いらっしゃいませ。', 'いただきます。', 'ごちそうさま。'], 0,
        'Al salir de casa se dice いってきます; quien se queda responde いってらっしゃい.'),
      L('meaning', 'あしたは やすみですから、ゆっくり おきます。', QM,
        ['Mañana es día libre, así que me levantaré con calma.', 'Mañana trabajo temprano.', 'Hoy descanso todo el día.', 'Mañana voy a la escuela.'], 0,
        'やすみ = día libre; ゆっくり = con calma; おきます = me levanto.'),
      L('meaning', 'ここで たばこを すっては いけません。', QM,
        ['Aquí no se puede fumar.', 'Aquí se puede fumar.', 'Compre cigarrillos aquí.', 'No hay cigarrillos.'], 0,
        '〜ては いけません = prohibido. たばこを すう = fumar.'),
      L('detail', 'なんにん かぞくですか。ごにんです。ちち、はは、あに、わたし、いもうとです。', '¿Cuántas personas hay en la familia?',
        ['5', '4', '6', '3'], 0,
        'ごにん = 5 personas: padre, madre, hermano mayor, yo y hermana menor.'),
      L('detail', 'えきまで どのくらい かかりますか。バスで にじゅっぷんぐらいです。', '¿Cuánto se tarda hasta la estación?',
        ['Unos 20 minutos en bus', 'Unos 20 minutos a pie', 'Unos 10 minutos en bus', 'Una hora en bus'], 0,
        'バスで にじゅっぷん = 20 minutos en bus.'),
      L('detail', 'どんな スポーツが すきですか。テニスが すきです。サッカーは あまり すきじゃ ありません。', '¿Qué deporte le gusta?',
        ['El tenis', 'El fútbol', 'El béisbol', 'La natación'], 0,
        'テニスが すきです = me gusta el tenis; el fútbol no mucho.'),
      L('detail', 'きのう どこへ いきましたか。デパートへ いって、くつを かいました。', '¿Qué compró ayer?',
        ['Zapatos', 'Una camisa', 'Un libro', 'Un paraguas'], 0,
        'くつ = zapatos. «Fui a los grandes almacenes y compré zapatos».')
    ]
  };
})();
