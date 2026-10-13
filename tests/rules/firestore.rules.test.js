// Pruebas de firestore.rules en el emulador.
// Ejecutar desde la raíz: firebase emulators:exec --only firestore "npm --prefix tests/rules test"
const { test, before, after, beforeEach } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const { initializeTestEnvironment, assertSucceeds, assertFails } = require('@firebase/rules-unit-testing');
const { doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, writeBatch, increment, serverTimestamp, Timestamp } = require('firebase/firestore');

const ADMIN = { email: 'kenchisaka@academiachizu.com', email_verified: true };
const DAY = 86400000;
let env;
before(async () => {
  env = await initializeTestEnvironment({
    projectId: 'academia-chizu',
    firestore: { rules: fs.readFileSync(path.join(__dirname, '..', '..', 'firestore.rules'), 'utf8'), host: '127.0.0.1', port: 8085 }
  });
});
after(async () => { await env.cleanup(); });
beforeEach(async () => { await env.clearFirestore(); });

const asUser = (uid, claims) => env.authenticatedContext(uid, claims || { email: `${uid}@test.com`, email_verified: true }).firestore();
const asAdmin = () => env.authenticatedContext('admin1', ADMIN).firestore();
const progress = () => ({ learnedChars: ['あ'], scores: { kana_hiragana: 50 }, nm: { xp: { total: 10 } }, updatedAt: serverTimestamp() });
const seed = async (fn) => { let out; await env.withSecurityRulesDisabled(async ctx => { out = await fn(ctx.firestore()); }); return out; };
const seedUser = (uid, extra) => seed(db => setDoc(doc(db, 'users', uid), { learnedChars: [], email: `${uid}@test.com`, ...(extra || {}) }));
const seedCode = (code, extra) => seed(db => setDoc(doc(db, 'teacherCodes', code), { code, tier: 'premium', days: 90, maxUses: 2, uses: 0, active: true, ...(extra || {}) }));

// ====================== progreso / plan bloqueado ======================
test('usuario crea su documento con progreso (y su email)', async () => {
  await assertSucceeds(setDoc(doc(asUser('u1'), 'users', 'u1'), { ...progress(), email: 'u1@test.com' }));
});
test('usuario NO puede crear su documento con plan', async () => {
  await assertFails(setDoc(doc(asUser('u1'), 'users', 'u1'), { ...progress(), plan: { tier: 'premium', expiresAt: Timestamp.fromMillis(Date.now() + 9e9) } }));
});
test('usuario actualiza su progreso con set merge (como la web)', async () => {
  await seedUser('u1', { plan: { tier: 'basico', expiresAt: 1 } });
  await assertSucceeds(setDoc(doc(asUser('u1'), 'users', 'u1'), progress(), { merge: true }));
});
test('usuario NO puede modificar su plan (merge / update / reemplazo)', async () => {
  await seedUser('u1', { plan: { tier: 'basico', expiresAt: 1 } });
  const db = asUser('u1');
  await assertFails(setDoc(doc(db, 'users', 'u1'), { plan: { tier: 'premium', expiresAt: 9e12 } }, { merge: true }));
  await assertFails(updateDoc(doc(db, 'users', 'u1'), { 'plan.tier': 'premium' }));
  await assertFails(setDoc(doc(db, 'users', 'u1'), { learnedChars: [] }));
  await assertFails(deleteDoc(doc(db, 'users', 'u1')));
});
test('usuario NO puede inventarse un plan de código de profesor sin canje', async () => {
  await seedUser('u1');
  await seedCode('PROFE1');
  const plan = { tier: 'premium', source: 'teacher_code', code: 'PROFE1', expiresAt: Timestamp.fromMillis(Date.now() + 30 * DAY) };
  await assertFails(setDoc(doc(asUser('u1'), 'users', 'u1'), { plan }, { merge: true }));
});
test('usuario NO escribe campos desconocidos; lee solo lo suyo', async () => {
  await seedUser('u1');
  await assertFails(setDoc(doc(asUser('u1'), 'users', 'u1'), { admin: true }, { merge: true }));
  await assertSucceeds(getDoc(doc(asUser('u1'), 'users', 'u1')));
  await assertFails(getDoc(doc(asUser('u2'), 'users', 'u1')));
  await assertFails(setDoc(doc(asUser('u2'), 'users', 'u1'), progress()));
  await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(), 'users', 'u1')));
});
test('email del documento debe ser el del usuario', async () => {
  await seedUser('u1');
  await assertFails(setDoc(doc(asUser('u1'), 'users', 'u1'), { email: 'otro@test.com' }, { merge: true }));
  await assertFails(setDoc(doc(asUser('u1'), 'users', 'u1'), { email: 'U1@test.com' }, { merge: true }));   // se guarda en minúsculas
  await assertSucceeds(setDoc(doc(asUser('u1'), 'users', 'u1'), { email: 'u1@test.com' }, { merge: true }));
});
test('orders y colecciones desconocidas cerradas al cliente', async () => {
  const db = asUser('u1');
  await assertFails(setDoc(doc(db, 'orders', 'o1'), { uid: 'u1' }));
  await assertFails(getDoc(doc(db, 'orders', 'o1')));
});

// ====================== administrador ======================
test('admin (correo verificado) lee usuarios y escribe/quita el plan', async () => {
  await seedUser('u1');
  const db = asAdmin();
  await assertSucceeds(getDoc(doc(db, 'users', 'u1')));
  await assertSucceeds(setDoc(doc(db, 'users', 'u1'), { plan: { tier: 'basico', source: 'admin', expiresAt: new Date(Date.now() + 30 * DAY).toISOString() } }, { merge: true }));
  await assertSucceeds(updateDoc(doc(db, 'users', 'u1'), { plan: require('firebase/firestore').deleteField() }));
});
test('admin puede buscar por email (consulta)', async () => {
  await seedUser('u1');
  const { query, where } = require('firebase/firestore');
  const snap = await assertSucceeds(getDocs(query(collection(asAdmin(), 'users'), where('email', '==', 'u1@test.com'))));
  if (snap.size !== 1) throw new Error('no encontró al usuario');
});
test('admin: plan con tier desconocido se rechaza', async () => {
  await seedUser('u1');
  await assertFails(setDoc(doc(asAdmin(), 'users', 'u1'), { plan: { tier: 'diamante' } }, { merge: true }));
});
test('NO es admin: correo sin verificar, otro correo, o sesión de otro usuario', async () => {
  await seedUser('u1');
  const sinVerificar = env.authenticatedContext('x1', { email: ADMIN.email, email_verified: false }).firestore();
  const otro = env.authenticatedContext('x2', { email: 'otro@academiachizu.com', email_verified: true }).firestore();
  for (const db of [sinVerificar, otro, asUser('u2')]) {
    await assertFails(setDoc(doc(db, 'users', 'u1'), { plan: { tier: 'premium', source: 'admin', expiresAt: 'x' } }, { merge: true }));
    await assertFails(getDocs(collection(db, 'users')));
    await assertFails(getDocs(collection(db, 'teacherCodes')));
    await assertFails(setDoc(doc(db, 'adminLog', 'a1'), { action: 'x' }));
  }
});
test('admin crea códigos (validados), los lista y desactiva; adminLog solo admin', async () => {
  const db = asAdmin();
  const base = { code: 'PROFE1', tier: 'premium', days: 90, maxUses: 5, uses: 0, active: true };
  await assertSucceeds(setDoc(doc(db, 'teacherCodes', 'PROFE1'), base));
  await assertFails(setDoc(doc(db, 'teacherCodes', 'MAL1'), { ...base, tier: 'inicial' }));
  await assertFails(setDoc(doc(db, 'teacherCodes', 'MAL2'), { ...base, days: 0 }));
  await assertFails(setDoc(doc(db, 'teacherCodes', 'MAL3'), { ...base, days: 9999 }));
  await assertFails(setDoc(doc(db, 'teacherCodes', 'MAL4'), { ...base, uses: 5 }));
  await assertSucceeds(getDocs(collection(db, 'teacherCodes')));
  await assertSucceeds(updateDoc(doc(db, 'teacherCodes', 'PROFE1'), { active: false }));
  await assertSucceeds(setDoc(doc(db, 'adminLog', 'a1'), { action: 'x', at: serverTimestamp() }));
  await assertFails(deleteDoc(doc(db, 'teacherCodes', 'PROFE1')));
});

// ====================== canje de código de profesor ======================
const redeemBatch = (db, uid, code, o = {}) => {
  const b = writeBatch(db);
  b.set(doc(db, 'users', uid), { plan: {
    tier: o.tier || 'premium', source: 'teacher_code', code,
    expiresAt: Timestamp.fromMillis(Date.now() + (o.days || 90) * DAY)
  } }, { merge: true });
  if (!o.noCounter) b.update(doc(db, 'teacherCodes', code), { uses: increment(o.inc || 1) });
  if (!o.noFicha) b.set(doc(db, 'teacherCodes', code, 'redemptions', uid), { at: serverTimestamp(), uid });
  return b.commit();
};

test('canje correcto: plan + uso + ficha en un lote', async () => {
  await seedUser('u1'); await seedCode('PROFE1');
  await assertSucceeds(redeemBatch(asUser('u1'), 'u1', 'PROFE1'));
  const s = await seed(db => getDoc(doc(db, 'users', 'u1')));
  if (s.data().plan.tier !== 'premium' || s.data().plan.source !== 'teacher_code') throw new Error('plan no guardado');
  const c = await seed(db => getDoc(doc(db, 'teacherCodes', 'PROFE1')));
  if (c.data().uses !== 1) throw new Error('uses debía ser 1');
});
test('canje: el mismo usuario NO puede canjear dos veces el mismo código', async () => {
  await seedUser('u1'); await seedCode('PROFE1', { maxUses: 5 });
  await assertSucceeds(redeemBatch(asUser('u1'), 'u1', 'PROFE1'));
  await assertFails(redeemBatch(asUser('u1'), 'u1', 'PROFE1'));
});
test('canje: código agotado, desactivado o inexistente se rechaza', async () => {
  await seedUser('u1');
  await seedCode('LLENO', { maxUses: 1, uses: 1 });
  await seedCode('OFF', { active: false });
  await assertFails(redeemBatch(asUser('u1'), 'u1', 'LLENO'));
  await assertFails(redeemBatch(asUser('u1'), 'u1', 'OFF'));
  await assertFails(redeemBatch(asUser('u1'), 'u1', 'NOEXISTE'));
});
test('canje: último uso permitido, el siguiente usuario ya no', async () => {
  await seedUser('u1'); await seedUser('u2'); await seedUser('u3');
  await seedCode('PROFE1', { maxUses: 2 });
  await assertSucceeds(redeemBatch(asUser('u1'), 'u1', 'PROFE1'));
  await assertSucceeds(redeemBatch(asUser('u2'), 'u2', 'PROFE1'));
  await assertFails(redeemBatch(asUser('u3'), 'u3', 'PROFE1'));
});
test('canje: trampas (sin contador, sin ficha, contador +2, tier o duración distintos)', async () => {
  await seedUser('u1'); await seedCode('PROFE1', { tier: 'basico', days: 30, maxUses: 9 });
  const db = asUser('u1');
  await assertFails(redeemBatch(db, 'u1', 'PROFE1', { tier: 'basico', days: 30, noCounter: true }));
  await assertFails(redeemBatch(db, 'u1', 'PROFE1', { tier: 'basico', days: 30, noFicha: true }));
  await assertFails(redeemBatch(db, 'u1', 'PROFE1', { tier: 'basico', days: 30, inc: 2 }));
  await assertFails(redeemBatch(db, 'u1', 'PROFE1', { tier: 'premium', days: 30 }));   // pide más plan del que da el código
  await assertFails(redeemBatch(db, 'u1', 'PROFE1', { tier: 'basico', days: 365 }));   // pide más días de los del código
  await assertSucceeds(redeemBatch(db, 'u1', 'PROFE1', { tier: 'basico', days: 30 })); // lo legítimo sí
});
test('canje: no se puede sumar usos a nombre de otro ni escribir la ficha de otro', async () => {
  await seedUser('u1'); await seedUser('u2'); await seedCode('PROFE1', { maxUses: 9 });
  const db1 = asUser('u1');
  const b = writeBatch(db1);
  b.update(doc(db1, 'teacherCodes', 'PROFE1'), { uses: increment(1) });
  b.set(doc(db1, 'teacherCodes', 'PROFE1', 'redemptions', 'u2'), { at: serverTimestamp(), uid: 'u2' });
  await assertFails(b.commit());
  // subir el contador sin canje (vaciar un código)
  await assertFails(updateDoc(doc(db1, 'teacherCodes', 'PROFE1'), { uses: increment(1) }));
  // un usuario no puede listar ni cambiar el estado de los códigos
  await assertFails(getDocs(collection(db1, 'teacherCodes')));
  await assertFails(updateDoc(doc(db1, 'teacherCodes', 'PROFE1'), { active: false }));
  await assertSucceeds(getDoc(doc(db1, 'teacherCodes', 'PROFE1')));
});
