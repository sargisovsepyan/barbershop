'use strict';

const childProcess = require('child_process');
const fs = require('fs');

const config = require('./config');
const {
  acquireStartupLock,
  classifyPort,
  matchesSnapshot,
  prefixStream,
  processInfo,
  readState,
  releaseStartupLock,
  removeState,
  snapshotProcess,
  spawnNpmStart,
  stopStoredComponent,
  storedRecordIsLive,
  waitForHttp,
  waitForPort,
  waitForProcessInfo,
  writeState
} = require('./lib');

const sessionId = `${process.pid}-${Date.now()}`;
const launched = {};
let state = null;
let startupLockHeld = false;
let shuttingDown = false;
let ready = false;
let keepAlive = null;
let watchdogStarted = false;

function fail(message) {
  throw new Error(message);
}

function preflight() {
  const requiredFiles = [
    ['MongoDB 4.0 executable', config.database.executable, 'file'],
    ['Recovered MongoDB dbPath', config.database.dbPath, 'directory'],
    ['Backend directory', config.backend.directory, 'directory'],
    ['Backend package.json', config.backend.packageFile, 'file'],
    ['Frontend directory', config.frontend.directory, 'directory'],
    ['Frontend package.json', config.frontend.packageFile, 'file']
  ];

  const missing = requiredFiles.filter(([, target, kind]) => {
    try {
      const details = fs.statSync(target);
      return kind === 'file' ? !details.isFile() : !details.isDirectory();
    } catch (_) {
      return true;
    }
  });

  if (missing.length > 0) {
    const lines = missing.map(([label, target]) => `  - ${label}: ${target}`);
    fail(`Preflight failed. Required path${missing.length === 1 ? '' : 's'} missing:\n${lines.join('\n')}`);
  }
}

async function prepareState() {
  const existing = readState();
  if (!existing) {
    return;
  }

  const launcherLive = existing.launcher &&
    matchesSnapshot(processInfo(existing.launcher.pid), existing.launcher);
  const componentRecords = Object.values(existing.components || {});
  const liveRecords = [];
  for (const record of componentRecords) {
    if (await storedRecordIsLive(record)) {
      liveRecords.push(record);
    }
  }

  if (!launcherLive && liveRecords.length === 0) {
    removeState(existing.sessionId);
    return;
  }

  if (!launcherLive && liveRecords.length > 0) {
    fail('A previous launcher left verified Barbershop processes running. Run "npm run stop" before starting a new managed stack.');
  }
}

async function ensureState() {
  if (state) {
    return;
  }
  const launcherInfo = await waitForProcessInfo(process.pid);
  if (!launcherInfo) {
    fail('Could not record launcher process identity.');
  }
  state = {
    version: 1,
    sessionId,
    projectRoot: config.root,
    startedAt: new Date().toISOString(),
    launcher: snapshotProcess(launcherInfo),
    components: {}
  };
}

async function recordStartedComponent(name, child) {
  await ensureState();
  const info = await waitForProcessInfo(child.pid);
  if (!info) {
    fail(`[${name}] started process could not be inspected.`);
  }
  const record = {
    owned: true,
    root: snapshotProcess(info),
    listener: null
  };
  state.components[name] = record;
  launched[name] = { child, record, exited: false };
  child.once('exit', (code, signal) => {
    launched[name].exited = true;
    if (ready && !shuttingDown) {
      const detail = signal ? `signal ${signal}` : `code ${code}`;
      console.error(`[${name === 'database' ? 'db' : name}] exited unexpectedly (${detail}).`);
      shutdown(1).catch((error) => {
        console.error(error.message);
        process.exitCode = 1;
      });
    }
  });
  writeState(state);
  startWatchdog();
  return record;
}

function startWatchdog() {
  if (watchdogStarted) {
    return;
  }
  const watchdog = childProcess.spawn(
    process.execPath,
    [require('path').join(__dirname, 'watchdog.js'), sessionId, String(process.pid)],
    {
      cwd: config.root,
      detached: true,
      windowsHide: true,
      stdio: 'ignore'
    }
  );
  watchdog.unref();
  watchdogStarted = true;
}

function storeListener(record, pid) {
  const info = processInfo(pid);
  if (!info) {
    fail(`Listening process PID ${pid} disappeared during startup.`);
  }
  record.listener = snapshotProcess(info);
  writeState(state);
}

async function startDatabase() {
  const current = await classifyPort('database', config.database.port);
  if (current.status === 'running') {
    console.log('[db] already running');
    return;
  }
  if (current.status === 'unrelated') {
    fail(`[db] port ${config.database.port} belongs to unrelated PID ${current.pid}; nothing was killed.`);
  }

  console.log('[db] starting recovered MongoDB 4.0 compatibility instance...');
  const child = childProcess.spawn(config.database.executable, config.database.args, {
    cwd: require('path').dirname(config.database.executable),
    windowsHide: true,
    stdio: ['ignore', 'ignore', 'pipe']
  });
  prefixStream(child.stderr, 'db');
  const record = await recordStartedComponent('database', child);

  try {
    await waitForPort(config.database.port, config.startupTimeoutMs, child);
    const verified = await classifyPort('database', config.database.port);
    if (verified.status !== 'running') {
      fail(`[db] port ${config.database.port} did not belong to the expected recovered MongoDB process.`);
    }
    storeListener(record, verified.pid);
    console.log(`[db] ready on ${config.host}:${config.database.port}`);
  } catch (error) {
    fail(`[db] ${error.message}\n[db] MongoDB log: ${config.database.logPath}`);
  }
}

async function startBackend() {
  const current = await classifyPort('backend', config.backend.port);
  if (current.status === 'running') {
    console.log('[backend] already running');
    return;
  }
  if (current.status === 'unrelated') {
    fail(`[backend] port ${config.backend.port} belongs to unrelated PID ${current.pid}; nothing was killed.`);
  }

  console.log('[backend] starting...');
  const child = spawnNpmStart(config.backend.directory, { ...process.env }, 'backend');
  const record = await recordStartedComponent('backend', child);
  await waitForPort(config.backend.port, config.startupTimeoutMs, child);
  const verified = await classifyPort('backend', config.backend.port);
  if (verified.status !== 'running') {
    fail(`[backend] port ${config.backend.port} did not belong to the expected Barbershop API.`);
  }
  storeListener(record, verified.pid);
  console.log(`[backend] ready on http://localhost:${config.backend.port}`);
}

async function startFrontend() {
  const current = await classifyPort('frontend', config.frontend.port);
  if (current.status === 'running') {
    console.log('[frontend] already running');
    await waitForHttp(`http://localhost:${config.frontend.port}`, config.startupTimeoutMs);
    return;
  }
  if (current.status === 'unrelated') {
    fail(`[frontend] port ${config.frontend.port} belongs to unrelated PID ${current.pid}; nothing was killed.`);
  }

  console.log('[frontend] starting...');
  const environment = { ...process.env, NODE_OPTIONS: '--openssl-legacy-provider' };
  const child = spawnNpmStart(config.frontend.directory, environment, 'frontend');
  const record = await recordStartedComponent('frontend', child);
  await waitForHttp(`http://localhost:${config.frontend.port}`, config.startupTimeoutMs, child);
  const verified = await classifyPort('frontend', config.frontend.port);
  if (verified.status !== 'running') {
    fail(`[frontend] port ${config.frontend.port} did not belong to the expected Barbershop dev server.`);
  }
  storeListener(record, verified.pid);
  console.log(`[frontend] ready on http://localhost:${config.frontend.port}`);
}

async function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;
  clearInterval(keepAlive);
  if (startupLockHeld) {
    releaseStartupLock();
    startupLockHeld = false;
  }
  fs.rmSync(config.stopRequestFile, { force: true });

  if (Object.keys(launched).length > 0) {
    console.log('\nStopping launcher-owned Barbershop processes...');
  }

  for (const name of ['frontend', 'backend', 'database']) {
    const entry = launched[name];
    if (!entry) {
      continue;
    }
    try {
      const result = await stopStoredComponent(name, entry.record);
      console.log(`[${name === 'database' ? 'db' : name}] ${result.stopped ? 'stopped' : result.reason}`);
    } catch (error) {
      console.error(error.message);
      exitCode = 1;
    }
  }

  if (state) {
    removeState(sessionId);
  }
  process.exitCode = exitCode;
}

async function main() {
  preflight();
  await prepareState();

  startupLockHeld = acquireStartupLock();
  if (!startupLockHeld) {
    fail('Another Barbershop launcher is currently starting. Wait a moment and try again.');
  }

  await startDatabase();
  await startBackend();
  await startFrontend();

  const exitedComponent = Object.entries(launched).find(([, entry]) => entry.exited);
  if (exitedComponent) {
    fail(`[${exitedComponent[0]}] exited during startup.`);
  }

  releaseStartupLock();
  startupLockHeld = false;
  ready = true;

  console.log('');
  console.log('========================================');
  console.log(' Hairy Barbershop is running');
  console.log('========================================');
  console.log(`Database : mongodb://${config.host}:${config.database.port}`);
  console.log(`Backend  : http://localhost:${config.backend.port}`);
  console.log(`Frontend : http://localhost:${config.frontend.port}`);
  console.log('');
  console.log('Press Ctrl+C to stop the stack.');

  keepAlive = setInterval(() => {
    try {
      if (!fs.existsSync(config.stopRequestFile)) {
        return;
      }
      const request = JSON.parse(fs.readFileSync(config.stopRequestFile, 'utf8'));
      if (request.sessionId === sessionId) {
        shutdown(0).catch((error) => {
          console.error(error.message);
          process.exitCode = 1;
        });
      }
    } catch (error) {
      console.error(`Could not process stop request: ${error.message}`);
    }
  }, 250);
}

process.on('SIGINT', () => {
  shutdown(0).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
});

process.on('SIGTERM', () => {
  shutdown(0).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
});

main().catch(async (error) => {
  console.error(`\nStartup failed: ${error.message}`);
  await shutdown(1);
});
