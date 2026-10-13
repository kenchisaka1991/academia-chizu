// Pruebas de las funciones de administración en el emulador (auth + firestore + functions).
// Ejecutar desde la raíz del proyecto:
//   firebase emulators:exec --only auth,firestore,functions "node --test functions/test/admin.test.js"
process.env.FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9099';
process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8085';
process.env.GCLOUD_PROJECT = 'academia-chizu';

const { test, before } = require('node:test');
const assert = require('node:assert/strict');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({ projectId: 'academia-chizu' });
const auth = getAuth();
const db = getFirestore();
const DAY = 86400000;
const FN = 'http://127.0.0.1:5001/academia-chizu/us-central1';

async function mkUser(email, claims) {
  const u = await auth.createUser({ email, password: 'clave-de-prueba-1', emailVerified: true });
  if (claims) await auth.setCustomUserClaims(u.uid, claims);
  return u;
}
async function tokenFor(email) {
  const r = await fetch('http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password: 'clave-de-prueba-1', returnSecureToken: true })
  });
  return (await r.json()).idToken;
}
async function call(name, data, token) {
  const headers = { 'content-type': 'application/json' };
  if (token) headers.authorization = 'Bearer ' + token;
  const r = await fetch(`${FN}/${name}`, { method: 'POST', headers, body: JSON.stringify({ data }) });
  return r.json();   // { result } o { error: { status, message } }
}

let adminTok, userTok, alumno;
before(async () => {
  await mkUser('admin@test.com', { admin: true });
  await mkUser('normal@test.com');
  alumno = await mkUser('alumno@test.com');
  adminTok = await tokenFor('admin@test.com');
  userTok = await tokenFor('normal@test.com');
});

const ADMIN_FUNCS = {
  adminBuscarUsuario: { email: 'alumno@test.com' },
  adminActivarPlan: { email: 'alumno@test.com', tier: 'basico', days: 30 },
  adminQuitarPlan: { email: 'alumno@test.com' },
  adminCrearCodigo: { tier: 'basico', days: 30, maxUses: 5 },
  adminDesactivarCodigo: { code: 'ABCD' },
  adminListarCodigos: {}
};

test('sin sesión: todas las funciones rechazan (UNAUTHENTICATED)', async () => {
  for (const [name, data] of Object.entries(ADMIN_FUNCS)) {
    const r = await call(name, data, null);
    assert.equal(r.error && r.error.status, 'UNAUTHENTICATED', name);
  }
});

test('usuario normal (sin claim admin): todas rechazan (PERMISSION_DENIED)', async () => {
  for (const [name, data] of Object.entries(ADMIN_FUNCS)) {
    const r = await call(name, data, userTok);
    assert.equal(r.error && r.error.status, 'PERMISSION_DENIED', name);
  }
  const snap = await db.doc(`users/${alumno.uid}`).get();
  assert.equal(snap.exists ? snap.data().plan : undefined, undefined, 'el usuario normal no logró crear plan');
});

test('admin busca usuario sin plan', async () => {
  const r = await call('adminBuscarUsuario', { email: ' ALUMNO@test.com ' }, adminTok);
  assert.equal(r.result.email, 'alumno@test.com');
  assert.equal(r.result.plan, null);
});

test('admin activa Básico 30 días → users/{uid}.plan', async () => {
  const t0 = Date.now();
  const r = await call('adminActivarPlan', { email: 'alumno@test.com', tier: 'basico', days: 30 }, adminTok);
  assert.equal(r.result.plan.tier, 'basico');
  assert.equal(r.result.plan.vigente, true);
  const doc = (await db.doc(`users/${alumno.uid}`).get()).data().plan;
  assert.equal(doc.source, 'admin');
  const exp = Date.parse(doc.expiresAt);
  assert.ok(Math.abs(exp - (t0 + 30 * DAY)) < 60000, 'vence en ~30 días');
});

test('mismo plan otra vez → extiende desde el vencimiento (60 días en total)', async () => {
  const t0 = Date.now();
  await call('adminActivarPlan', { email: 'alumno@test.com', tier: 'basico', days: 30 }, adminTok);
  const exp = Date.parse((await db.doc(`users/${alumno.uid}`).get()).data().plan.expiresAt);
  assert.ok(Math.abs(exp - (t0 + 60 * DAY)) < 120000, 'vence en ~60 días');
});

test('cambio a Premium → empieza hoy (no suma el Básico)', async () => {
  const t0 = Date.now();
  await call('adminActivarPlan', { email: 'alumno@test.com', tier: 'premium', days: 30 }, adminTok);
  const plan = (await db.doc(`users/${alumno.uid}`).get()).data().plan;
  assert.equal(plan.tier, 'premium');
  assert.ok(Math.abs(Date.parse(plan.expiresAt) - (t0 + 30 * DAY)) < 120000);
});

test('entradas inválidas se rechazan (INVALID_ARGUMENT / NOT_FOUND)', async () => {
  const bad = async (data, status) => {
    const r = await call('adminActivarPlan', data, adminTok);
    assert.equal(r.error && r.error.status, status, JSON.stringify(data));
  };
  await bad({ email: 'alumno@test.com', tier: 'inicial', days: 30 }, 'INVALID_ARGUMENT');
  await bad({ email: 'alumno@test.com', tier: 'dios', days: 30 }, 'INVALID_ARGUMENT');
  await bad({ email: 'alumno@test.com', tier: 'basico', days: 0 }, 'INVALID_ARGUMENT');
  await bad({ email: 'alumno@test.com', tier: 'basico', days: 1.5 }, 'INVALID_ARGUMENT');
  await bad({ email: 'alumno@test.com', tier: 'basico', days: 9999 }, 'INVALID_ARGUMENT');
  await bad({ email: 'no-es-email', tier: 'basico', days: 30 }, 'INVALID_ARGUMENT');
  await bad({ email: 'nadie@test.com', tier: 'basico', days: 30 }, 'NOT_FOUND');
});

test('admin quita el plan', async () => {
  const r = await call('adminQuitarPlan', { email: 'alumno@test.com' }, adminTok);
  assert.equal(r.result.plan, null);
  const data = (await db.doc(`users/${alumno.uid}`).get()).data();
  assert.equal(data.plan, undefined);
});

test('códigos de profesor: crear, duplicado, inválido, listar, desactivar', async () => {
  const c = await call('adminCrearCodigo', { code: 'aula-2026', tier: 'premium', days: 90, maxUses: 30 }, adminTok);
  assert.equal(c.result.code, 'AULA-2026');
  const stored = (await db.doc('teacherCodes/AULA-2026').get()).data();
  assert.deepEqual([stored.tier, stored.days, stored.maxUses, stored.uses, stored.active], ['premium', 90, 30, 0, true]);

  const dup = await call('adminCrearCodigo', { code: 'AULA-2026', tier: 'basico', days: 10, maxUses: 1 }, adminTok);
  assert.equal(dup.error.status, 'ALREADY_EXISTS');
  const bad = await call('adminCrearCodigo', { code: 'a b', tier: 'basico', days: 10, maxUses: 1 }, adminTok);
  assert.equal(bad.error.status, 'INVALID_ARGUMENT');
  const badTier = await call('adminCrearCodigo', { tier: 'inicial', days: 10, maxUses: 1 }, adminTok);
  assert.equal(badTier.error.status, 'INVALID_ARGUMENT');

  const auto = await call('adminCrearCodigo', { tier: 'basico', days: 30, maxUses: 2 }, adminTok);
  assert.match(auto.result.code, /^CHIZU-[A-Z2-9]{8}$/);

  const list = await call('adminListarCodigos', {}, adminTok);
  assert.ok(list.result.some(x => x.code === 'AULA-2026' && x.active));

  const off = await call('adminDesactivarCodigo', { code: 'AULA-2026' }, adminTok);
  assert.equal(off.result.active, false);
  assert.equal((await db.doc('teacherCodes/AULA-2026').get()).data().active, false);
  const missing = await call('adminDesactivarCodigo', { code: 'NOEXISTE1' }, adminTok);
  assert.equal(missing.error.status, 'NOT_FOUND');
});

test('queda registro en adminLog de cada acción', async () => {
  const snap = await db.collection('adminLog').get();
  const actions = snap.docs.map(d => d.data().action);
  for (const a of ['activarPlan', 'quitarPlan', 'crearCodigo', 'desactivarCodigo']) {
    assert.ok(actions.includes(a), 'falta log ' + a);
  }
  assert.ok(snap.docs.every(d => d.data().byEmail === 'admin@test.com'));
});
