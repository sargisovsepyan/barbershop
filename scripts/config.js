'use strict';

const path = require('path');

const root = path.resolve(__dirname, '..');
const recoveryRoot = 'D:\\barbershop-db-recovery\\20261003-023106';
const mongoBin = path.join(
  recoveryRoot,
  'tools',
  'mongodb-4.0.28',
  'mongodb-win32-x86_64-2008plus-ssl-4.0.28',
  'bin'
);

const config = {
  root,
  runtimeDir: path.join(root, '.runtime'),
  stateFile: path.join(root, '.runtime', 'stack.json'),
  startupLockFile: path.join(root, '.runtime', 'startup.lock'),
  stopRequestFile: path.join(root, '.runtime', 'stop-request.json'),
  host: '127.0.0.1',
  startupTimeoutMs: 90000,
  shutdownTimeoutMs: 3000,
  database: {
    port: 27018,
    executable: path.join(mongoBin, 'mongod.exe'),
    shellExecutable: path.join(mongoBin, 'mongo.exe'),
    dbPath: path.join(recoveryRoot, 'compat-db', 'mongodb-4.0.28-wiredtiger'),
    logPath: path.join(recoveryRoot, 'logs', 'mongodb-4.0.28-compatible.log')
  },
  backend: {
    port: 3000,
    directory: path.join(root, 'backend'),
    packageFile: path.join(root, 'backend', 'package.json')
  },
  frontend: {
    port: 8080,
    directory: path.join(root, 'frontend'),
    packageFile: path.join(root, 'frontend', 'package.json')
  }
};

config.database.args = [
  '--dbpath', config.database.dbPath,
  '--storageEngine', 'wiredTiger',
  '--port', String(config.database.port),
  '--bind_ip', config.host,
  '--logpath', config.database.logPath,
  '--logappend'
];

module.exports = config;
