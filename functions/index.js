const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { PLANS } = require('./plans');
const { grantPlanTx, toMs } = require('./grant');

initializeApp();
const db = getFirestore();
const opts = { region: 'us-central1' };

// ---------- utilidades ----------
function assertAdmin(req) {
  if (!req.auth) throw new HttpsError('unauthenticated', 'Inicia sesión.');
  if (req.auth.token.admin !== true) throw new HttpsError('permission-denied', 'No autorizado.');
}

function cleanEmail(v) {
  const e = String(v || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) || e.length > 254) throw new HttpsError('invalid-argument', 'Email no válido.');
  return e;
}

function cleanTier(v) {
  if (!Object.prototype.hasOwnProperty.call(PLANS, v)) throw new HttpsError('invalid-argument', 'Plan no válido.');
  return v;
}

function cleanInt(v, min, max, label) {
  const n = Number(v);
  if (!Number.isInteger(n) || n < min || n > max) throw new HttpsError('invalid-argument', `${label} debe ser un entero entre ${min} y ${max}.`);
  return n;
}

async function userByEmail(email) {
  try { return await getAuth().getUserByEmail(email); }
  catch (e) {
    if (e.code === 'auth/user-not-found') throw new HttpsError('not-found', 'No existe un usuario con ese email.');
    throw new HttpsError('internal', 'No se pudo buscar el usuario.');
  }
}

function logAdmin(req, action, target, detail) {
  return db.collection('adminLog').add({
    at: FieldValue.serverTimestamp(), by: req.auth.uid, byEmail: req.auth.token.email || null,
    action, target, detail: detail || null
  }).catch(() => {});
}

function planView(p) {
  if (!p) return null;
  const exp = toMs(p.expiresAt);
  return { tier: p.tier, source: p.source || null, expiresAt: exp || null, vigente: exp > Date.now() };
}

// ---------- administración de usuarios ----------
exports.adminBuscarUsuario = onCall(opts, async (req) => {
  assertAdmin(req);
  const u = await userByEmail(cleanEmail(req.data && req.data.email));
  const snap = await db.doc(`users/${u.uid}`).get();
  return {
    uid: u.uid, email: u.email, nombre: u.displayName || null,
    creado: u.metadata.creationTime, ultimoAcceso: u.metadata.lastSignInTime,
    plan: planView(snap.exists ? snap.data().plan : null)
  };
});

exports.adminActivarPlan = onCall(opts, async (req) => {
  assertAdmin(req);
  const d = req.data || {};
  const email = cleanEmail(d.email);
  const tier = cleanTier(d.tier);
  const days = cleanInt(d.days, 1, 366, 'Los días');
  const u = await userByEmail(email);
  const plan = await db.runTransaction(tx =>
    grantPlanTx(tx, db, u.uid, tier, days, 'admin', { grantedBy: req.auth.uid }));
  await logAdmin(req, 'activarPlan', u.uid, { email, tier, days });
  return { uid: u.uid, email, plan: planView(plan) };
});

exports.adminQuitarPlan = onCall(opts, async (req) => {
  assertAdmin(req);
  const u = await userByEmail(cleanEmail(req.data && req.data.email));
  await db.doc(`users/${u.uid}`).set({ plan: FieldValue.delete() }, { merge: true });
  await logAdmin(req, 'quitarPlan', u.uid, { email: u.email });
  return { uid: u.uid, email: u.email, plan: null };
});

// ---------- códigos de profesor ----------
const CODE_RE = /^[A-Z0-9][A-Z0-9-]{3,31}$/;
function randomCode() {
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = require('crypto').randomBytes(8);
  return 'CHIZU-' + Array.from(bytes, b => abc[b % abc.length]).join('');
}

exports.adminCrearCodigo = onCall(opts, async (req) => {
  assertAdmin(req);
  const d = req.data || {};
  const tier = cleanTier(d.tier);
  const days = cleanInt(d.days, 1, 366, 'Los días');
  const maxUses = cleanInt(d.maxUses, 1, 10000, 'Los usos máximos');
  const code = d.code ? String(d.code).trim().toUpperCase() : randomCode();
  if (!CODE_RE.test(code)) throw new HttpsError('invalid-argument', 'El código usa 4 a 32 letras mayúsculas, números o guiones.');
  const ref = db.doc(`teacherCodes/${code}`);
  try {
    await ref.create({ code, tier, days, maxUses, uses: 0, active: true, createdAt: FieldValue.serverTimestamp(), createdBy: req.auth.uid });
  } catch (e) {
    if (e.code === 6 || /ALREADY_EXISTS/.test(String(e.message))) throw new HttpsError('already-exists', 'Ese código ya existe.');
    throw new HttpsError('internal', 'No se pudo crear el código.');
  }
  await logAdmin(req, 'crearCodigo', code, { tier, days, maxUses });
  return { code, tier, days, maxUses, uses: 0, active: true };
});

exports.adminDesactivarCodigo = onCall(opts, async (req) => {
  assertAdmin(req);
  const code = String((req.data && req.data.code) || '').trim().toUpperCase();
  const active = !!(req.data && req.data.active === true);   // por defecto desactiva
  if (!CODE_RE.test(code)) throw new HttpsError('invalid-argument', 'Código no válido.');
  const ref = db.doc(`teacherCodes/${code}`);
  const snap = await ref.get();
  if (!snap.exists) throw new HttpsError('not-found', 'No existe ese código.');
  await ref.update({ active });
  await logAdmin(req, active ? 'activarCodigo' : 'desactivarCodigo', code, null);
  return { code, active };
});

exports.adminListarCodigos = onCall(opts, async (req) => {
  assertAdmin(req);
  const snap = await db.collection('teacherCodes').orderBy('createdAt', 'desc').limit(200).get();
  return snap.docs.map(s => {
    const c = s.data();
    return { code: c.code, tier: c.tier, days: c.days, maxUses: c.maxUses, uses: c.uses || 0, active: c.active === true };
  });
});
