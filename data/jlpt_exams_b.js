// Simulacro JLPT N5 — exámenes 4 y 5.  (continuación de data/jlpt_exams.js; mismo formato)
(function () {
  const W = (window.JLPT_EXAMS = window.JLPT_EXAMS || {});
  const Q = (q, options, answer, explainEs, ja) => (ja ? { q, ja, options, answer, explainEs } : { q, options, answer, explainEs });
  const L = (type, text, q, options, answer, explainEs) => ({ type, text, q, options, answer, explainEs });
  const QM = '¿Qué significa lo que escuchas?';
  const QR = '¿Cuál es la mejor respuesta?';

  // ───────────── Examen 4 ─────────────
  W.e4 = {
    name: 'Examen 4',
    vocab: [
      Q('¿Qué significa 「ごめんなさい」?', ['Lo siento', 'De nada', 'Gracias', 'Adiós'], 0,
        'ごめんなさい = lo siento / perdón (informal).'),
      Q('¿Cómo se lee 「新聞」?', ['しんぶん', 'しんもん', 'しんぷん', 'じんぶん'], 0,
        '新聞 = しんぶん (periódico).', '新聞'),
      Q('¿Cómo se lee 「午前」?', ['ごぜん', 'ごぜい', 'ごせん', 'こぜん'], 0,
        '午前 = ごぜん (a.m., por la mañana). 午後 = ごご (p.m.).', '午前'),
      Q('¿Cómo se lee 「天気」?', ['てんき', 'でんき', 'てんぎ', 'てんけ'], 0,
        '天気 = てんき (clima). 電気 = でんき (electricidad).', '天気'),
      Q('「たいへん さむいですから、___を きます。」 (Hace mucho frío, así que me pongo el ___.)',
        ['コート', 'くつ', 'ぼうし', 'めがね'], 0,
        'コート = abrigo. (Con prendas de cuerpo se usa きます.)'),
      Q('¿Cómo se lee 「三月」?', ['さんがつ', 'さんつき', 'みつき', 'さんげつ'], 0,
        '三月 = さんがつ (marzo). Los meses usan 〜がつ.', '三月'),
      Q('¿Qué significa 「ちかい」?', ['Cerca', 'Lejos', 'Rápido', 'Lento'], 0,
        'ちかい = cerca. Lo contrario es とおい (lejos).'),
      Q('¿Qué significa 「いもうと」?', ['Hermana menor', 'Hermano menor', 'Hermana mayor', 'Abuela'], 0,
        'いもうと = hermana menor (propia). おとうと = hermano menor; あね = hermana mayor.')
    ],
    gram: [
      Q('「きょうは 何 ___ しますか。」 (¿Qué hará hoy?)', ['を', 'に', 'で', 'へ'], 0,
        'する es transitivo: 何を しますか.'),
      Q('「ここ ___ 写真を 撮っては いけません。」 (Aquí no se pueden tomar fotos.)', ['で', 'を', 'に', 'の'], 0,
        'El lugar donde se realiza una acción → で: ここで.'),
      Q('「かばんの 中 ___ 本が 三さつ あります。」 (Dentro de la bolsa hay tres libros.)', ['に', 'を', 'で', 'と'], 0,
        'Lugar de existencia → に: かばんの 中に.'),
      Q('「でんしゃ ___ 乗ります。」 (Me subo al tren.)', ['に', 'を', 'で', 'が'], 0,
        '乗る (subirse) usa に: 電車に 乗ります.'),
      Q('「しゅくだいを し ___、あそびに 行きます。」 (Después de hacer la tarea voy a jugar.)', ['てから', 'まえに', 'ながら', 'たり'], 0,
        '〜てから = después de… しゅくだいを してから.'),
      Q('「ねる ___ に、歯を みがきます。」 (Antes de dormir me cepillo los dientes.)', ['まえ', 'あと', 'まで', 'から'], 0,
        '〜まえに = antes de… (verbo en forma diccionario + まえに).'),
      Q('「私は 日本語を 勉強 ___ います。」 (Estoy estudiando japonés.)', ['して', 'する', 'した', 'しない'], 0,
        '〜ています = acción en curso: 勉強して います.'),
      Q('「きれい ___ へやです。」 (Es una habitación limpia/bonita.)', ['な', 'い', 'の', 'で'], 0,
        'Los adjetivos な se unen al sustantivo con な: きれいな へや.'),
      Q('「この かばんは 高 ___ ありません。」 (Esta bolsa no es cara.)', ['く', 'い', 'かった', 'に'], 0,
        'Negativo cortés de adjetivo い: 〜くありません.'),
      Q('「ここは しずか ___ ありません。」 (Aquí no es tranquilo.)', ['では', 'に', 'で', 'の'], 0,
        'Negativo del adjetivo な: 〜では ありません (o 〜じゃ ありません).'),
      Q('「ここで 走ら ___ ください。」 (Por favor, no corra aquí.)', ['ないで', 'なくて', 'ないて', 'なく'], 0,
        '〜ないで ください = por favor no… 走らないで ください.'),
      Q('「手紙を 書き ___。」 (Quiero escribir una carta.)', ['たいです', 'たいました', 'たがります', 'たくいです'], 0,
        '〜たいです = quiero… 書きたいです.')
    ],
    passage: [
      '<ruby>日曜日<rt>にちようび</rt></ruby>の にっき',
      'けさ 8じに おきました。<ruby>天気<rt>てんき</rt></ruby>が よかったですから、ともだちと こうえんへ <ruby>行<rt>い</rt></ruby>きました。',
      'こうえんで サンドイッチを たべて、ボートに のりました。ごご 4じに うちへ かえりました。ばんごはんの あとで、おかあさんに でんわを しました。つかれましたが、たのしい <ruby>一日<rt>いちにち</rt></ruby>でした。'
    ],
    reading: [
      Q('¿Cómo estaba el tiempo?', ['Bueno', 'Lluvioso', 'Nevando', 'Muy frío'], 0,
        '「天気が よかった」= el tiempo estaba bueno.'),
      Q('¿Con quién fue al parque?', ['Con un amigo/una amiga', 'Con su madre', 'Con su profesor', 'Solo/a'], 0,
        '「ともだちと こうえんへ 行きました」.'),
      Q('¿Qué hizo en el parque?', ['Comió sándwiches y subió a un bote', 'Jugó al fútbol', 'Leyó un libro', 'Tomó fotos de flores'], 0,
        '「サンドイッチを たべて、ボートに のりました」.'),
      Q('¿A qué hora volvió a casa?', ['A las 4 de la tarde', 'A las 8 de la mañana', 'A las 4 de la mañana', 'A las 8 de la noche'], 0,
        '「ごご 4じに うちへ かえりました」= volvió a las 4 p.m.'),
      Q('¿Qué hizo después de la cena?', ['Llamó por teléfono a su madre', 'Se fue a dormir', 'Vio televisión', 'Salió con su amigo'], 0,
        '「ばんごはんの あとで、おかあさんに でんわを しました」.')
    ],
    listening: [
      L('response', 'コーヒーと おちゃと どちらが いいですか。', QR,
        ['おちゃが いいです。', 'はい、どちらも です。', 'いいえ、ちがいます。', 'あそこに あります。'], 0,
        '«¿Prefiere café o té?» → se elige uno: おちゃが いいです (el té, por favor).'),
      L('response', 'いらっしゃいませ。なんめいさまですか。', QR,
        ['ふたりです。', 'にじです。', 'ふたつです。', 'にほんです。'], 0,
        'なんめいさま = ¿cuántas personas? → ふたりです (dos personas).'),
      L('meaning', 'もう すこし ゆっくり はなして ください。', QM,
        ['Hable un poco más despacio, por favor.', 'Hable más fuerte, por favor.', 'Hable en japonés, por favor.', 'No hable, por favor.'], 0,
        'ゆっくり = despacio; はなして ください = por favor hable.'),
      L('meaning', 'あしたは あめでしょう。', QM,
        ['Probablemente mañana llueva.', 'Mañana no llueve.', 'Ayer llovió.', 'Hoy llueve mucho.'], 0,
        '〜でしょう = probablemente. あした = mañana; あめ = lluvia.'),
      L('detail', 'この ほんは いくらですか。せんにひゃくえんです。じゃ、これを ください。', '¿Cuánto cuesta el libro?',
        ['1.200 yenes', '1.020 yenes', '2.100 yenes', '12.000 yenes'], 0,
        'せんにひゃくえん = 1.200 yenes (千二百).'),
      L('detail', 'かいぎは なんじからですか。ごご いちじはんからです。', '¿A qué hora empieza la reunión?',
        ['A la 1:30 de la tarde', 'A las 11:30 de la mañana', 'A las 3:00 de la tarde', 'A la 1:00 de la tarde'], 0,
        'ごご いちじはん = 1:30 p.m. (はん = y media).'),
      L('detail', 'せんしゅうの にちようびは なにを しましたか。うちで そうじを して、せんたくを しました。', '¿Qué hizo el domingo pasado?',
        ['Limpió y lavó ropa en casa', 'Fue de compras', 'Visitó a sus padres', 'Estudió en la biblioteca'], 0,
        'そうじ = limpieza; せんたく = lavar la ropa.'),
      L('detail', 'どこに すんでいますか。とうきょうに すんでいます。かいしゃは しんじゅくに あります。', '¿Dónde está su empresa?',
        ['En Shinjuku', 'En Osaka', 'En Kioto', 'En Yokohama'], 0,
        'かいしゃは しんじゅくに あります = la empresa está en Shinjuku. Vive en Tokio.')
    ]
  };

  // ───────────── Examen 5 ─────────────
  W.e5 = {
    name: 'Examen 5',
    vocab: [
      Q('¿Qué significa 「おねがいします」?', ['Por favor (al pedir algo)', 'Perdón', 'Gracias', 'Felicidades'], 0,
        'おねがいします se usa al pedir o encargar algo con cortesía.'),
      Q('¿Cómo se lee 「金曜日」?', ['きんようび', 'かねようび', 'きんよび', 'こんようび'], 0,
        '金曜日 = きんようび (viernes).', '金曜日'),
      Q('¿Cómo se lee 「会社」?', ['かいしゃ', 'かいじゃ', 'あいしゃ', 'かいしや'], 0,
        '会社 = かいしゃ (empresa).', '会社'),
      Q('¿Cómo se lee 「安い」?', ['やすい', 'あんい', 'あすい', 'やさい'], 0,
        '安い = やすい (barato). やさい (野菜) significa verdura.', '安い'),
      Q('「___で 手を 洗います。」 (Me lavo las manos en el ___.)', ['トイレ', 'ベッド', 'エレベーター', 'まど'], 0,
        'En el トイレ (baño) hay lavamanos. Las demás opciones no son lugares para lavarse las manos.'),
      Q('¿Cómo se lee 「銀行」?', ['ぎんこう', 'きんこう', 'ぎんごう', 'ぎんぎょう'], 0,
        '銀行 = ぎんこう (banco).', '銀行'),
      Q('¿Qué significa 「たくさん」?', ['Mucho', 'Un poco', 'Nada', 'Todos'], 0,
        'たくさん = mucho/a(s). すこし = un poco.'),
      Q('¿Qué significa 「もう いちど」?', ['Una vez más', 'Ya', 'Todavía no', 'Siempre'], 0,
        'もう いちど = una vez más (para pedir que repitan).')
    ],
    gram: [
      Q('「八時 ___ 五時 ___ 働きます。」 (Trabajo de 8 a 5.)', ['から / まで', 'まで / から', 'に / で', 'を / に'], 0,
        '〜から〜まで = desde… hasta…'),
      Q('「これを 日本語 ___ 何と いいますか。」 (¿Cómo se dice esto en japonés?)', ['で', 'を', 'が', 'に'], 0,
        'El idioma en que se dice algo → で: 日本語で.'),
      Q('「兄は 車 ___ 持っています。」 (Mi hermano mayor tiene un auto.)', ['を', 'が', 'に', 'で'], 0,
        '持つ (tener/llevar) es transitivo → を.'),
      Q('「あの 人は 目 ___ 大きいです。」 (Aquella persona tiene los ojos grandes.)', ['が', 'を', 'に', 'で'], 0,
        'Descripción de una parte: 人は 目が 大きい (tema は + característica が).'),
      Q('「雨 ___ ふっています。」 (Está lloviendo.)', ['が', 'を', 'に', 'へ'], 0,
        'Fenómenos naturales llevan が: 雨が ふる.'),
      Q('「公園で 子どもが 遊ん ___ います。」 (Los niños están jugando en el parque.)', ['で', 'て', 'に', 'を'], 0,
        'Forma て de 遊ぶ: 遊んで + います.'),
      Q('「宿題を しなければ ___。」 (Tengo que hacer la tarea.)', ['なりません', 'なります', 'ならない', 'なりました'], 0,
        '〜なければ なりません = hay que…'),
      Q('「私は まだ 昼ごはんを 食べ ___。」 (Todavía no he almorzado.)', ['ていません', 'ました', 'ません', 'たくない'], 0,
        'まだ 〜ていません = todavía no he…'),
      Q('「東京と 大阪と どちら ___ 大きいですか。」 (¿Cuál es más grande, Tokio u Osaka?)', ['が', 'を', 'に', 'で'], 0,
        'どちらが 〜ですか = ¿cuál (de dos) es…?'),
      Q('「果物の 中で りんご ___ 一番 好きです。」 (De las frutas, la que más me gusta es la manzana.)', ['が', 'を', 'に', 'で'], 0,
        '〜の 中で〜が 一番〜 = de entre… lo más…'),
      Q('「わたしは 友だち ___ 本を あげました。」 (Le di un libro a mi amigo.)', ['に', 'を', 'が', 'で'], 0,
        'La persona que recibe lleva に: 友だちに あげました.'),
      Q('「あした 学校へ 来 ___ いいです。」 (Mañana no hace falta venir a la escuela.)', ['なくても', 'ないで', 'ても', 'たら'], 0,
        '〜なくても いいです = no hace falta…')
    ],
    passage: [
      'うみの はくぶつかん あんない',
      '<ruby>午前<rt>ごぜん</rt></ruby> 9じ から <ruby>午後<rt>ごご</rt></ruby> 5じ まで。<ruby>水曜日<rt>すいようび</rt></ruby>は やすみです。',
      'おとなは 800えん、こどもは 400えんです。6さいまでは <ruby>無料<rt>むりょう</rt></ruby>です。',
      'しゃしんを とっても いいですが、フラッシュは つかわないで ください。レストランは <ruby>二階<rt>にかい</rt></ruby>に あります。'
    ],
    reading: [
      Q('¿Qué día cierra el museo?', ['El miércoles', 'El lunes', 'El domingo', 'El viernes'], 0,
        '「水曜日は やすみです」= el miércoles está cerrado.'),
      Q('¿Cuánto paga un adulto?', ['800 yenes', '400 yenes', '1.000 yenes', '600 yenes'], 0,
        '「おとなは 800えん」.'),
      Q('¿Cuánto paga un niño de 5 años?', ['Nada, es gratis', '400 yenes', '800 yenes', '200 yenes'], 0,
        '「6さいまでは 無料」= hasta los 6 años es gratis.'),
      Q('¿Qué está prohibido al tomar fotos?', ['Usar flash', 'Usar celular', 'Fotografiar a personas', 'Usar trípode'], 0,
        '「フラッシュは つかわないで ください」= por favor no use flash.'),
      Q('¿Dónde está el restaurante?', ['En el segundo piso', 'En el primer piso', 'Fuera del museo', 'En el sótano'], 0,
        '「レストランは 二階に あります」= en el 2.º piso.')
    ],
    listening: [
      L('response', 'どうぞ よろしく おねがいします。', QR,
        ['こちらこそ、よろしく おねがいします。', 'いいえ、けっこうです。', 'どういたしまして。', 'おやすみなさい。'], 0,
        'Al presentarse se responde こちらこそ、よろしく (el gusto es mío).'),
      L('response', 'ちょっと てつだって くれませんか。', QR,
        ['ええ、いいですよ。', 'いいえ、ちがいます。', 'はい、おいしいです。', 'いってきます。'], 0,
        '«¿Me ayuda un momento?» → ええ、いいですよ (claro, con gusto).'),
      L('meaning', 'まだ しゅくだいが おわって いません。', QM,
        ['Todavía no he terminado la tarea.', 'Ya terminé la tarea.', 'No tengo tarea.', 'Mañana hago la tarea.'], 0,
        'まだ 〜ていません = todavía no…'),
      L('meaning', 'この みちを まっすぐ いって、ふたつめの かどを ひだりへ まがって ください。', QM,
        ['Siga recto y gire a la izquierda en la segunda esquina.', 'Gire a la derecha en la primera esquina.', 'Vuelva por este camino.', 'Cruce el puente y siga recto.'], 0,
        'まっすぐ = recto; ふたつめの かど = la segunda esquina; ひだり = izquierda.'),
      L('detail', 'なんじの でんしゃに のりますか。じゅうじ にじゅっぷんの でんしゃです。', '¿A qué hora es el tren?',
        ['10:20', '10:02', '12:10', '9:20'], 0,
        'じゅうじ にじゅっぷん = 10:20.'),
      L('detail', 'どれが あなたの かさですか。あの あかい かさです。', '¿Cuál es el paraguas de la persona?',
        ['El rojo', 'El azul', 'El negro', 'El blanco'], 0,
        'あかい = rojo.'),
      L('detail', 'しゅうまつは なにを しましたか。どようびは ともだちと かいものを して、にちようびは うちで やすみました。', '¿Qué hizo el domingo?',
        ['Descansó en casa', 'Fue de compras con un amigo', 'Fue a la playa', 'Trabajó'], 0,
        'Sábado: compras con un amigo. Domingo (にちようび): うちで やすみました = descansó en casa.'),
      L('detail', 'すみません、この ちかくに ゆうびんきょくは ありますか。はい、あの ぎんこうの となりに あります。', '¿Dónde está el correo?',
        ['Al lado del banco', 'Frente a la estación', 'Detrás del hospital', 'En el supermercado'], 0,
        'ぎんこうの となり = al lado del banco.')
    ]
  };
})();
