// Otorgar/extender un plan en users/{uid}.plan. Usado por admin, códigos de profesor y (luego) el webhook de Binance.
// Se ejecuta dentro de una transacción para que dos avisos o clics simultáneos no se pisen.
const DAY_MS = 86400000;

function toMs(v) {
  if (!v) return 0;
  if (typeof v === 'number') return v;
  if (typeof v.toMillis === 'function') return v.toMillis();
  return Date.parse(v) || 0;
}

/**
 * Calcula el nuevo plan. Si el usuario ya tiene el MISMO plan vigente, extiende desde su vencimiento;
 * si no (otro plan, vencido o sin plan), empieza hoy.
 */
function computePlan(current, tier, days, source, extra, now = Date.now()) {
  const curExp = toMs(current && current.expiresAt);
  const start = (current && current.tier === tier && curExp > now) ? curExp : now;
  return Object.assign({
    tier,
    expiresAt: new Date(start + days * DAY_MS).toISOString(),
    source
  }, extra || {});
}

/** Dentro de una transacción: lee users/{uid}, calcula y escribe el plan. Devuelve el plan nuevo. */
async function grantPlanTx(tx, db, uid, tier, days, source, extra) {
  const ref = db.doc(`users/${uid}`);
  const snap = await tx.get(ref);
  const current = snap.exists ? snap.data().plan : null;
  const plan = computePlan(current, tier, days, source, extra);
  tx.set(ref, { plan }, { merge: true });
  return plan;
}

module.exports = { computePlan, grantPlanTx, toMs, DAY_MS };
