/**
 * @file Start point of unit and E2E testing.
 */
const server = require('./lib/server.js');
const unit   = require('./lib/unit.js');
const e2e    = require('./lib/e2e.js');
const config = require('./config.js');

config.set();

(async () => {
  await server.start(process.env.MY_PORT);
  await unit.report(process.env.MY_UNIT_URL); 
  await e2e.report(process.env.MY_E2E_FILE);
  process.exit();
})();
