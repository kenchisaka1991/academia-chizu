// Da (o quita) el rol de administrador a un usuario. Se ejecuta UNA vez desde tu PC, no desde la web.
//
//   Dar rol:   node functions/scripts/setAdmin.js correo@ejemplo.com
//   Quitar:    node functions/scripts/setAdmin.js correo@ejemplo.com --quitar
//
// Requiere la clave de cuenta de servicio (JSON) descargada de Firebase Console y guardada FUERA del repo:
//   PowerShell:  $env:GOOGLE_APPLICATION_CREDENTIALS="C:\ruta\segura\clave.json"
// El usuario debe haber iniciado sesión al menos una vez en la web (para que exista) y,
// después de recibir el rol, cerrar sesión y volver a entrar para que el rol se active.
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

(async () => {
  const email = (process.argv[2] || '').trim().toLowerCase();
  const quitar = process.argv.includes('--quitar');
  if (!email || email.startsWith('--')) {
    console.error('Uso: node functions/scripts/setAdmin.js correo@ejemplo.com [--quitar]');
    process.exit(1);
  }
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && !process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    console.error('Falta GOOGLE_APPLICATION_CREDENTIALS (ruta al JSON de la cuenta de servicio).');
    process.exit(1);
  }
  initializeApp({ credential: applicationDefault(), projectId: 'academia-chizu' });
  const auth = getAuth();
  const user = await auth.getUserByEmail(email);
  await auth.setCustomUserClaims(user.uid, quitar ? { admin: null } : { admin: true });
  const check = await auth.getUser(user.uid);
  console.log(`${quitar ? 'Rol admin QUITADO a' : 'Rol admin DADO a'} ${email} (uid ${user.uid}).`);
  console.log('Claims actuales:', JSON.stringify(check.customClaims || {}));
  console.log('Cierra sesión y vuelve a entrar en la web para que el cambio se active.');
})().catch(e => { console.error('Error:', e.message); process.exit(1); });
