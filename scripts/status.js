'use strict';

const config = require('./config');
const { classifyPort, matchesSnapshot, processInfo, readState } = require('./lib');

const rows = [
  ['MongoDB', 'database', config.database.port],
  ['Backend', 'backend', config.backend.port],
  ['Frontend', 'frontend', config.frontend.port]
];

async function main() {
  const state = readState();
  const managed = Boolean(
    state &&
    state.launcher &&
    matchesSnapshot(processInfo(state.launcher.pid), state.launcher)
  );

  for (const [label, component, port] of rows) {
    const result = await classifyPort(component, port);
    if (result.status === 'running') {
      console.log(`${label.padEnd(9)} RUNNING :${port}`);
    } else if (result.status === 'unrelated') {
      console.log(`${label.padEnd(9)} OCCUPIED :${port} (unrelated PID ${result.pid})`);
    } else {
      console.log(`${label.padEnd(9)} STOPPED`);
    }
  }

  console.log(`Launcher  ${managed ? `RUNNING (PID ${state.launcher.pid})` : 'STOPPED'}`);
}

main().catch((error) => {
  console.error(`Status failed: ${error.message}`);
  process.exitCode = 1;
});
