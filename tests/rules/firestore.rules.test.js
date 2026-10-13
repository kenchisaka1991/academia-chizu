// Pruebas de firestore.rules en el emulador.
// Ejecutar desde la raiz: firebase emulators:exec --only firestore "npm --prefix tests/rules test"
const { test, before, after, beforeEach } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const { initializeTestEnvironment, assertSucceeds, assertFails } = require('@firebase/rules-unit-testing');
const { doc, getDoc, setDoc, updateDoc, deleteDoc, serverTimestamp } = require('firebase/firestore');

let env;
before(async () => {
  env = await initializeTestEnvironment({
    projectId: 'academia-chizu',
    firestore: { rules: fs.readFileSync(path.join(__dirname, '..', '..', 'firestore.rules'), 'utf8'), host: '127.0.0.1', port: 8085 }
  });
});
after(async () => { await env.cleanup(); });
beforeEach(async () => { await env.clearFirestore(); });

const progress = () => ({ learnedChars: ['あ'], scores: { kana_hiragana: 50 }, nm: { xp: { total: 10 } }, updatedAt: serverTimestamp() });
const seedWithPlan = (uid) => env.withSecurityRulesDisabled(async ctx => {
  await setDoc(doc(ctx.firestore(), 'users', uid), { learnedChars: [], plan: { tier: 'basico', expiresAt: 1 } });
});

test('usuario puede crear su documento con solo progreso', async () => {
  const db = env.authenticatedContext('u1').firestore();
  await assertSucceeds(setDoc(doc(db, 'users', 'u1'), progress()));
});
test('usuario NO puede crear su documento con plan', async () => {
  const db = env.authenticatedContext('u1').firestore();
  await assertFails(setDoc(doc(db, 'users', 'u1'), { ...progress(), plan: { tier: 'premium', expiresAt: 9e12 } }));
});
test('usuario puede actualizar su progreso (set merge, como la web)', async () => {
  await seedWithPlan('u1');
  const db = env.authenticatedContext('u1').firestore();
  await assertSucceeds(setDoc(doc(db, 'users', 'u1'), progress(), { merge: true }));
});
test('usuario NO puede modificar su plan (set merge)', async () => {
  await seedWithPlan('u1');
  const db = env.authenticatedContext('u1').firestore();
  await assertFails(setDoc(doc(db, 'users', 'u1'), { plan: { tier: 'premium', expiresAt: 9e12 } }, { merge: true }));
});
test('usuario NO puede modificar su plan (update)', async () => {
  await seedWithPlan('u1');
  const db = env.authenticatedContext('u1').firestore();
  await assertFails(updateDoc(doc(db, 'users', 'u1'), { 'plan.tier': 'premium' }));
});
test('usuario NO puede borrar el campo plan ni el documento', async () => {
  await seedWithPlan('u1');
  const db = env.authenticatedContext('u1').firestore();
  await assertFails(setDoc(doc(db, 'users', 'u1'), { learnedChars: [] })); // set sin merge reemplaza y elimina plan
  await assertFails(deleteDoc(doc(db, 'users', 'u1')));
});
test('usuario NO puede escribir campos desconocidos', async () => {
  await seedWithPlan('u1');
  const db = env.authenticatedContext('u1').firestore();
  await assertFails(setDoc(doc(db, 'users', 'u1'), { admin: true }, { merge: true }));
});
test('usuario lee su documento pero no el de otro', async () => {
  await seedWithPlan('u1');
  await assertSucceeds(getDoc(doc(env.authenticatedContext('u1').firestore(), 'users', 'u1')));
  await assertFails(getDoc(doc(env.authenticatedContext('u2').firestore(), 'users', 'u1')));
});
test('usuario NO puede escribir en el documento de otro', async () => {
  const db = env.authenticatedContext('u2').firestore();
  await assertFails(setDoc(doc(db, 'users', 'u1'), progress()));
});
test('anonimo no lee ni escribe', async () => {
  await seedWithPlan('u1');
  const db = env.unauthenticatedContext().firestore();
  await assertFails(getDoc(doc(db, 'users', 'u1')));
  await assertFails(setDoc(doc(db, 'users', 'u1'), progress()));
});
test('orders y teacherCodes cerrados al cliente', async () => {
  const db = env.authenticatedContext('u1').firestore();
  await assertFails(setDoc(doc(db, 'orders', 'o1'), { uid: 'u1', estado: 'pagado' }));
  await assertFails(getDoc(doc(db, 'orders', 'o1')));
  await assertFails(getDoc(doc(db, 'teacherCodes', 'c1')));
});
