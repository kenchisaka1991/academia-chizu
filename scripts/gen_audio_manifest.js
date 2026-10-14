/**
 * index.html と JLPT データから、公開用の音声マニフェストと録音リストを生成する。
 *
 * 音声ファイルの唯一の命名規約:
 *   - シナリオ: audio/{canDoId}_l{n}.opus
 *   - Escuchar: audio/{canDoId}_esc{n}.opus
 *   - JLPT:     audio/jlpt_{examId}_l{n}.opus
 *
 * 使い方:
 *   node scripts/gen_audio_manifest.js
 *   node scripts/gen_audio_manifest.js --check
 *   node scripts/gen_audio_manifest.js --clean-legacy
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');
const OUT = path.join(ROOT, 'audio', 'audio_manifest.json');
const LISTA = path.join(ROOT, 'docs', 'grabacion_lista.md');
const source = fs.readFileSync(INDEX, 'utf8');

function fail(message) {
  console.error(message);
  process.exit(1);
}

function loadCanDos() {
  const start = source.indexOf('window.canDoData = window.canDoData');
  const lastPush = source.lastIndexOf('window.canDoData.push(');
  const end = source.indexOf('});', lastPush) + 3;
  if (start < 0 || lastPush < 0 || end < 3) fail('canDoData のデータ範囲が見つかりません。');
  const sandbox = { window: {} };
  try {
    // データ定義だけを評価する。DOM 参照は含めない。
    new Function('window', source.slice(start, end))(sandbox.window);
  } catch (error) {
    fail(`canDoData の読み込みに失敗しました: ${error.message}`);
  }
  return sandbox.window.canDoData || [];
}

function stripJa(html) {
  return String(html || '')
    .replace(/<rt>[^<]*<\/rt>/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

function loadJlptExams() {
  const sandbox = { window: {} };
  for (const name of ['jlpt_exams.js', 'jlpt_exams_b.js']) {
    const file = path.join(ROOT, 'data', name);
    if (fs.existsSync(file)) new Function('window', fs.readFileSync(file, 'utf8'))(sandbox.window);
  }
  return sandbox.window.JLPT_EXAMS || {};
}

function buildManifest() {
  const manifest = [];
  for (const cd of loadCanDos()) {
    if (cd.hidden === true) continue;
    ((cd.scenario && cd.scenario.lines) || []).forEach((line, index) => {
      const text = String(line.jaPlain || stripJa(line.ja)).trim();
      if (text) manifest.push({
        id: cd.id, kind: 'scenario', line: index + 1, speaker: line.speaker || 'A', text,
        file: `${cd.id}_l${index + 1}.opus`
      });
    });
    ((cd.escuchar && cd.escuchar.items) || []).forEach((item, index) => {
      const text = String(item.text || '').trim();
      if (text) manifest.push({
        id: cd.id, kind: 'escuchar', line: index + 1, speaker: 'esc', text,
        file: `${cd.id}_esc${index + 1}.opus`
      });
    });
  }
  for (const [examId, exam] of Object.entries(loadJlptExams())) {
    (exam.listening || []).forEach((item, index) => manifest.push({
      id: `jlpt_${examId}`, kind: 'jlpt', line: index + 1, speaker: 'jlpt', text: String(item.text || '').trim(),
      file: `jlpt_${examId}_l${index + 1}.opus`
    }));
  }
  return manifest;
}

function recordingList(manifest) {
  const table = rows => {
    let result = '| # | Archivo (audio/) | Texto en japonés | Can-do |\n|---|---|---|---|\n';
    rows.forEach((entry, index) => {
      result += `| ${index + 1} | \`${entry.file}\` | ${entry.text.replace(/\|/g, '\\|')} | ${entry.id} |\n`;
    });
    return result;
  };
  const scenario = manifest.filter(entry => entry.kind === 'scenario');
  const escuchar = manifest.filter(entry => entry.kind === 'escuchar');
  const jlpt = manifest.filter(entry => entry.kind === 'jlpt');
  return `# Lista de grabación de audio — NihongoMap

Convención única: todos los clips son Opus y se colocan en \`audio/\` con el nombre exacto de esta lista.
Si un archivo todavía no existe, la app avisa que el audio no está disponible e intenta usar la voz del dispositivo como respaldo.

## Conversión WAV → Opus (ffmpeg)

\`\`\`bash
ffmpeg -i entrada.wav -c:a libopus -b:a 28k -ac 1 audio/NOMBRE.opus
\`\`\`

Total: **${manifest.length}** clips (${scenario.length} de escena + ${escuchar.length} de Escuchar + ${jlpt.length} del Simulacro JLPT).

---

## 1. Escenas / diálogos (${scenario.length})

${table(scenario)}
## 2. Escuchar / comprensión auditiva (${escuchar.length})

${table(escuchar)}
## 3. Simulacro JLPT — escucha (${jlpt.length})

${table(jlpt)}`;
}

function cleanLegacyAudioFields() {
  const cleaned = source.replace(/\s*audio:\s*["']audio\/[A-Za-z0-9_-]+_[le]\d+(?:_[A-Za-z])?\.mp3["'],?/g, '');
  const removed = (source.match(/\s*audio:\s*["']audio\/[A-Za-z0-9_-]+_[le]\d+(?:_[A-Za-z])?\.mp3["'],?/g) || []).length;
  if (!removed) fail('削除対象の旧 MP3 audio フィールドが見つかりません。');
  fs.writeFileSync(INDEX, cleaned, 'utf8');
  console.log(`旧 MP3 audio フィールドを ${removed} 件削除しました。`);
}

if (process.argv.includes('--clean-legacy')) cleanLegacyAudioFields();
const manifest = buildManifest();
const manifestJson = `${JSON.stringify(manifest, null, 2)}\n`;
const list = recordingList(manifest);

if (process.argv.includes('--check')) {
  if (!fs.existsSync(OUT) || fs.readFileSync(OUT, 'utf8') !== manifestJson) fail('audio_manifest.json がコードと一致しません。生成を実行してください。');
  if (!fs.existsSync(LISTA) || fs.readFileSync(LISTA, 'utf8') !== list) fail('grabacion_lista.md がコードと一致しません。生成を実行してください。');
  if (manifest.some(entry => !entry.file.endsWith('.opus'))) fail('Opus 以外の音声名が検出されました。');
  console.log(`音声マニフェスト: ${manifest.length} 件（コードと一致）`);
} else {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.mkdirSync(path.dirname(LISTA), { recursive: true });
  fs.writeFileSync(OUT, manifestJson, 'utf8');
  fs.writeFileSync(LISTA, list, 'utf8');
  console.log(`音声マニフェストを生成しました: ${manifest.length} 件`);
}
