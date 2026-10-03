'use strict';

const fs = require('fs');

const config = require('./config');
const { readState, removeState, sleep, stopStoredComponent } = require('./lib');

const sessionId = process.argv[2];
const launcherPid = Number(process.argv[3]);

function launcherExists() {
  try {
    process.kill(launcherPid, 0);
    return true;
  } catch (_) {
    return false;
  }
}

async function main() {
  if (!sessionId || !Number.isInteger(launcherPid) || launcherPid <= 0) {
    return;
  }

  while (launcherExists()) {
    const current = readState();
    if (!current || current.sessionId !== sessionId) {
      return;
    }
    await sleep(500);
  }

  // Give a foreground SIGINT handler a moment to finish before taking over.
  await sleep(500);
  const state = readState();
  if (!state || state.sessionId !== sessionId) {
    return;
  }

  let failed = false;
  for (const name of ['frontend', 'backend', 'database']) {
    const record = state.components && state.components[name];
    if (!record) {
      continue;
    }
    try {
      await stopStoredComponent(name, record);
    } catch (_) {
      failed = true;
    }
  }

  fs.rmSync(config.stopRequestFile, { force: true });
  if (!failed) {
    removeState(sessionId);
  }
}

main().catch(() => {
  // The metadata remains available for a later `npm run stop` retry.
  process.exitCode = 1;
});
