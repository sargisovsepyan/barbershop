'use strict';

const fs = require('fs');

const config = require('./config');
const {
  matchesSnapshot,
  processInfo,
  readState,
  removeState,
  stopExactTree,
  stopStoredComponent,
  waitForProcessExit
} = require('./lib');

async function main() {
  const state = readState();
  if (!state) {
    console.log('No launcher-owned Barbershop processes are recorded. Nothing was stopped.');
    return;
  }

  const launcher = state.launcher && processInfo(state.launcher.pid);
  if (matchesSnapshot(launcher, state.launcher) && state.launcher.pid !== process.pid) {
    fs.mkdirSync(config.runtimeDir, { recursive: true });
    fs.writeFileSync(
      config.stopRequestFile,
      `${JSON.stringify({ sessionId: state.sessionId, requestedAt: new Date().toISOString() })}\n`,
      'utf8'
    );
    if (await waitForProcessExit(state.launcher.pid, 12000)) {
      fs.rmSync(config.stopRequestFile, { force: true });
      removeState(state.sessionId);
      console.log('[launcher] stopped the managed Barbershop stack');
      return;
    }
    console.warn('[launcher] did not answer the stop request; checking each recorded process safely.');
  }

  let failed = false;
  for (const name of ['frontend', 'backend', 'database']) {
    const record = state.components && state.components[name];
    if (!record) {
      continue;
    }
    try {
      const result = await stopStoredComponent(name, record);
      console.log(`[${name === 'database' ? 'db' : name}] ${result.stopped ? 'stopped' : result.reason}`);
    } catch (error) {
      failed = true;
      console.error(error.message);
    }
  }

  if (state.launcher) {
    const current = processInfo(state.launcher.pid);
    if (matchesSnapshot(current, state.launcher) && state.launcher.pid !== process.pid) {
      try {
        await stopExactTree(state.launcher, 'launcher');
        console.log('[launcher] stopped');
      } catch (error) {
        failed = true;
        console.error(error.message);
      }
    }
  }

  if (!failed) {
    fs.rmSync(config.stopRequestFile, { force: true });
    removeState(state.sessionId);
  }
  process.exitCode = failed ? 1 : 0;
}

main().catch((error) => {
  console.error(`Stop failed: ${error.message}`);
  process.exitCode = 1;
});
