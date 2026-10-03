'use strict';

const childProcess = require('child_process');
const fs = require('fs');
const http = require('http');
const net = require('net');
const path = require('path');

const config = require('./config');

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function normalize(value) {
  return String(value || '').replace(/\//g, '\\').toLowerCase();
}

function samePath(left, right) {
  return normalize(path.resolve(left)) === normalize(path.resolve(right));
}

function ensureRuntimeDirectory() {
  fs.mkdirSync(config.runtimeDir, { recursive: true });
}

function readState() {
  try {
    return JSON.parse(fs.readFileSync(config.stateFile, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw new Error(`Could not read ${config.stateFile}: ${error.message}`);
  }
}

function writeState(state) {
  ensureRuntimeDirectory();
  const temporaryFile = `${config.stateFile}.${process.pid}.tmp`;
  fs.writeFileSync(temporaryFile, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
  fs.renameSync(temporaryFile, config.stateFile);
}

function removeState(sessionId) {
  const state = readState();
  if (!state || (sessionId && state.sessionId !== sessionId)) {
    return false;
  }

  fs.rmSync(config.stateFile, { force: true });
  return true;
}

function acquireStartupLock() {
  ensureRuntimeDirectory();
  try {
    const descriptor = fs.openSync(config.startupLockFile, 'wx');
    fs.writeFileSync(descriptor, `${process.pid}\n`, 'utf8');
    fs.closeSync(descriptor);
    return true;
  } catch (error) {
    if (error.code === 'EEXIST') {
      return false;
    }
    throw error;
  }
}

function releaseStartupLock() {
  fs.rmSync(config.startupLockFile, { force: true });
}

function netstatOutput() {
  const result = childProcess.spawnSync('netstat.exe', ['-ano'], {
    encoding: 'utf8',
    windowsHide: true
  });

  if (result.error) {
    throw new Error(`Could not inspect TCP ports: ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(`Could not inspect TCP ports (netstat exit ${result.status}).`);
  }

  return result.stdout;
}

function listeningPids(port) {
  const pids = new Set();
  for (const line of netstatOutput().split(/\r?\n/)) {
    const match = line.match(/^\s*TCP\s+(\S+)\s+\S+\s+LISTENING\s+(\d+)\s*$/i);
    if (!match) {
      continue;
    }

    const portMatch = match[1].match(/:(\d+)$/);
    if (portMatch && Number(portMatch[1]) === port) {
      pids.add(Number(match[2]));
    }
  }

  return [...pids];
}

function listeningPid(port) {
  const pids = listeningPids(port);
  if (pids.length > 1) {
    throw new Error(`Port ${port} has multiple listening owners (${pids.join(', ')}); refusing to guess.`);
  }
  return pids[0] || null;
}

function runPowerShell(script) {
  const result = childProcess.spawnSync(
    'powershell.exe',
    ['-NoLogo', '-NoProfile', '-NonInteractive', '-Command', script],
    { encoding: 'utf8', windowsHide: true }
  );

  if (result.error) {
    throw new Error(`Could not inspect Windows processes: ${result.error.message}`);
  }
  if (result.status !== 0 && result.status !== 3) {
    const detail = String(result.stderr || '').trim();
    throw new Error(`Could not inspect Windows processes${detail ? `: ${detail}` : '.'}`);
  }

  return String(result.stdout || '').trim();
}

function processInfo(pid) {
  if (!Number.isInteger(Number(pid)) || Number(pid) <= 0) {
    return null;
  }

  if (process.platform !== 'win32') {
    try {
      process.kill(Number(pid), 0);
      return { pid: Number(pid), creationTime: null, executablePath: null, commandLine: null };
    } catch (_) {
      return null;
    }
  }

  const script = [
    '[Console]::OutputEncoding = [System.Text.Encoding]::UTF8',
    `$p = Get-CimInstance Win32_Process -Filter \"ProcessId = ${Number(pid)}\" -ErrorAction SilentlyContinue`,
    'if ($null -eq $p) { exit 3 }',
    '$created = if ($p.CreationDate) { $p.CreationDate.ToUniversalTime().ToString("o") } else { $null }',
    '[pscustomobject]@{ pid = [int]$p.ProcessId; parentPid = [int]$p.ParentProcessId; name = $p.Name; executablePath = $p.ExecutablePath; commandLine = $p.CommandLine; creationTime = $created } | ConvertTo-Json -Compress'
  ].join('; ');

  const output = runPowerShell(script);
  return output ? JSON.parse(output) : null;
}

async function waitForProcessInfo(pid, timeoutMs = 3000) {
  const deadline = Date.now() + timeoutMs;
  do {
    const info = processInfo(pid);
    if (info) {
      return info;
    }
    await sleep(100);
  } while (Date.now() < deadline);
  return null;
}

function snapshotProcess(info) {
  return {
    pid: info.pid,
    creationTime: info.creationTime || null,
    executablePath: info.executablePath || null,
    commandLine: info.commandLine || null
  };
}

function matchesSnapshot(info, snapshot) {
  if (!info || !snapshot || info.pid !== snapshot.pid) {
    return false;
  }
  if (snapshot.creationTime && info.creationTime !== snapshot.creationTime) {
    return false;
  }
  if (snapshot.executablePath && !samePath(info.executablePath, snapshot.executablePath)) {
    return false;
  }
  if (snapshot.commandLine && info.commandLine !== snapshot.commandLine) {
    return false;
  }
  return true;
}

function isDatabaseProcess(info) {
  if (!info || !info.executablePath || !samePath(info.executablePath, config.database.executable)) {
    return false;
  }

  const command = normalize(info.commandLine);
  const required = [
    config.database.executable,
    `--dbpath ${config.database.dbPath}`,
    '--storageengine wiredtiger',
    `--port ${config.database.port}`,
    `--bind_ip ${config.host}`,
    `--logpath ${config.database.logPath}`,
    '--logappend'
  ];
  return required.every((part) => command.includes(normalize(part)));
}

async function request(url, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    const call = http.get(url, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        if (body.length < 1024 * 1024) {
          body += chunk;
        }
      });
      response.on('end', () => resolve({ statusCode: response.statusCode, body }));
    });
    call.setTimeout(timeoutMs, () => call.destroy(new Error(`Timed out requesting ${url}`)));
    call.on('error', reject);
  });
}

async function isBackendProcess(info) {
  if (!info || normalize(info.name) !== 'node.exe') {
    return false;
  }
  if (!/(^|[\\/\s"'])server\.js([\s"']|$)/i.test(info.commandLine || '')) {
    return false;
  }

  try {
    const probePath = '/__hairy_barbershop_launcher_probe__';
    const response = await request(`http://${config.host}:${config.backend.port}${probePath}`);
    const body = JSON.parse(response.body);
    return response.statusCode === 404 && body.url === `${probePath} not found`;
  } catch (_) {
    return false;
  }
}

function isFrontendProcess(info) {
  if (!info || normalize(info.name) !== 'node.exe') {
    return false;
  }
  const command = normalize(info.commandLine);
  const expectedDirectory = normalize(path.join(config.frontend.directory, 'node_modules'));
  return command.includes(expectedDirectory) && command.includes('webpack-dev-server') && command.includes('--mode development');
}

async function classifyPort(component, port) {
  const pid = listeningPid(port);
  if (!pid) {
    return { status: 'stopped', pid: null, info: null };
  }

  const info = processInfo(pid);
  let expected = false;
  if (component === 'database') {
    expected = isDatabaseProcess(info);
  } else if (component === 'backend') {
    expected = await isBackendProcess(info);
  } else if (component === 'frontend') {
    expected = isFrontendProcess(info);
  }

  return { status: expected ? 'running' : 'unrelated', pid, info };
}

async function waitForPort(port, timeoutMs, child) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (child && (child.exitCode !== null || child.signalCode !== null)) {
      throw new Error(`Process exited before port ${port} became ready.`);
    }

    const connected = await new Promise((resolve) => {
      const socket = net.createConnection({ host: config.host, port });
      socket.setTimeout(400);
      socket.once('connect', () => {
        socket.destroy();
        resolve(true);
      });
      socket.once('timeout', () => {
        socket.destroy();
        resolve(false);
      });
      socket.once('error', () => resolve(false));
    });

    if (connected) {
      return;
    }
    await sleep(200);
  }

  throw new Error(`Timed out waiting for ${config.host}:${port}.`);
}

async function waitForHttp(url, timeoutMs, child) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (child && (child.exitCode !== null || child.signalCode !== null)) {
      throw new Error(`Process exited before ${url} became ready.`);
    }
    try {
      const response = await request(url, 1000);
      if (response.statusCode >= 200 && response.statusCode < 400) {
        return response;
      }
    } catch (_) {
      // Retry while the service finishes starting.
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${url}.`);
}

function prefixStream(stream, prefix) {
  if (!stream) {
    return;
  }
  let remainder = '';
  stream.setEncoding('utf8');
  stream.on('data', (chunk) => {
    const lines = `${remainder}${chunk}`.split(/\r?\n/);
    remainder = lines.pop();
    for (const line of lines) {
      if (line.length > 0) {
        console.log(`[${prefix}] ${line}`);
      }
    }
  });
  stream.on('end', () => {
    if (remainder.length > 0) {
      console.log(`[${prefix}] ${remainder}`);
    }
  });
}

function npmCommand() {
  const npmCli = process.env.npm_execpath || path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');
  if (!fs.existsSync(npmCli)) {
    throw new Error(`Could not locate npm CLI at ${npmCli}. Run this launcher through \"npm start\".`);
  }
  return { executable: process.execPath, args: [npmCli, 'start'] };
}

function spawnNpmStart(directory, environment, prefix) {
  const command = npmCommand();
  const child = childProcess.spawn(command.executable, command.args, {
    cwd: directory,
    env: environment,
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe']
  });
  prefixStream(child.stdout, prefix);
  prefixStream(child.stderr, prefix);
  return child;
}

function isProcessRunning(pid) {
  return Boolean(processInfo(pid));
}

async function waitForProcessExit(pid, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  do {
    if (!isProcessRunning(pid)) {
      return true;
    }
    await sleep(200);
  } while (Date.now() < deadline);
  return !isProcessRunning(pid);
}

function taskkill(pid, force) {
  const args = ['/PID', String(pid), '/T'];
  if (force) {
    args.push('/F');
  }
  return childProcess.spawnSync('taskkill.exe', args, {
    encoding: 'utf8',
    windowsHide: true
  });
}

async function stopExactTree(snapshot, label, timeoutMs = config.shutdownTimeoutMs) {
  const current = processInfo(snapshot && snapshot.pid);
  if (!matchesSnapshot(current, snapshot)) {
    return { stopped: false, reason: 'identity mismatch or already stopped' };
  }

  if (process.platform !== 'win32') {
    process.kill(snapshot.pid, 'SIGTERM');
    if (!(await waitForProcessExit(snapshot.pid, timeoutMs))) {
      process.kill(snapshot.pid, 'SIGKILL');
    }
    return { stopped: true, forced: false };
  }

  const gentle = taskkill(snapshot.pid, false);
  let exited = await waitForProcessExit(snapshot.pid, gentle.status === 0 ? timeoutMs : 300);
  if (!exited) {
    const rechecked = processInfo(snapshot.pid);
    if (!matchesSnapshot(rechecked, snapshot)) {
      return { stopped: false, reason: 'identity changed before forced termination' };
    }
    taskkill(snapshot.pid, true);
    exited = await waitForProcessExit(snapshot.pid, 3000);
  }

  if (!exited) {
    throw new Error(`[${label}] exact process tree PID ${snapshot.pid} did not stop.`);
  }
  return { stopped: true };
}

async function stopDatabase(record) {
  const owner = listeningPid(config.database.port);
  if (!owner) {
    return { stopped: false, reason: 'already stopped' };
  }

  const info = processInfo(owner);
  const expectedPid = record.listener ? record.listener.pid : record.root.pid;
  const expectedSnapshot = record.listener || record.root;
  if (owner !== expectedPid || !matchesSnapshot(info, expectedSnapshot) || !isDatabaseProcess(info)) {
    return { stopped: false, reason: 'identity mismatch; left untouched' };
  }

  if (fs.existsSync(config.database.shellExecutable)) {
    childProcess.spawnSync(
      config.database.shellExecutable,
      [
        '--quiet',
        '--host', config.host,
        '--port', String(config.database.port),
        'admin',
        '--eval', 'db.shutdownServer({ force: false })'
      ],
      { encoding: 'utf8', windowsHide: true, timeout: config.shutdownTimeoutMs }
    );
  }

  if (await waitForProcessExit(owner, config.shutdownTimeoutMs)) {
    return { stopped: true, forced: false };
  }
  return stopExactTree(expectedSnapshot, 'db');
}

async function storedRecordIsLive(record) {
  if (!record || !record.root) {
    return false;
  }
  return matchesSnapshot(processInfo(record.root.pid), record.root) ||
    Boolean(record.listener && matchesSnapshot(processInfo(record.listener.pid), record.listener));
}

async function stopStoredComponent(name, record) {
  if (!record || !record.owned) {
    return { stopped: false, reason: 'not owned by launcher' };
  }
  if (name === 'database') {
    return stopDatabase(record);
  }

  if (record.root && matchesSnapshot(processInfo(record.root.pid), record.root)) {
    return stopExactTree(record.root, name);
  }
  if (record.listener && matchesSnapshot(processInfo(record.listener.pid), record.listener)) {
    return stopExactTree(record.listener, name);
  }
  return { stopped: false, reason: 'identity mismatch or already stopped' };
}

module.exports = {
  acquireStartupLock,
  classifyPort,
  ensureRuntimeDirectory,
  isBackendProcess,
  isDatabaseProcess,
  isFrontendProcess,
  listeningPid,
  matchesSnapshot,
  prefixStream,
  processInfo,
  readState,
  releaseStartupLock,
  removeState,
  request,
  sleep,
  snapshotProcess,
  spawnNpmStart,
  stopExactTree,
  stopStoredComponent,
  storedRecordIsLive,
  waitForHttp,
  waitForPort,
  waitForProcessExit,
  waitForProcessInfo,
  writeState
};
