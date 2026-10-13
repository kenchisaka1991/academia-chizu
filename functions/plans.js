// Planes de pago que el SERVIDOR reconoce. Copia mínima de PLANS (index.html): solo tier, precio y duración.
// verify_app_static.js [A20] comprueba que coincide con PLANS del index.html (precios y tiers).
const PLANS = {
  basico:  { level: 1, name: 'Básico',  priceBs: 30, priceUsd: 4 },
  premium: { level: 2, name: 'Premium', priceBs: 60, priceUsd: 8 }
};
const PLAN_PERIOD_DAYS = 30;
module.exports = { PLANS, PLAN_PERIOD_DAYS };
