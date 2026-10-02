'use strict';

const crypto = require('crypto');

const activeTokens = new Map();
const tokenLifetime = 8 * 60 * 60 * 1000;

function safelyMatches(actual, expected) {
  const actualBuffer = Buffer.from(String(actual || ''));
  const expectedBuffer = Buffer.from(String(expected || ''));

  return actualBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

function removeExpiredTokens() {
  const now = Date.now();

  activeTokens.forEach(function (expiresAt, token) {
    if (expiresAt <= now) {
      activeTokens.delete(token);
    }
  });
}

exports.login = function (req, res) {
  const configuredUser = process.env.ADMIN_USER;
  const configuredPassword = process.env.ADMIN_PASS;

  if (!configuredUser || !configuredPassword) {
    return res.status(503).json({ message: 'Admin access is not configured.' });
  }

  if (!safelyMatches(req.body.username, configuredUser) ||
      !safelyMatches(req.body.password, configuredPassword)) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  removeExpiredTokens();
  const token = crypto.randomBytes(32).toString('hex');
  activeTokens.set(token, Date.now() + tokenLifetime);

  return res.json({ token: token });
};

exports.requireAdmin = function (req, res, next) {
  const authorization = req.get('Authorization') || '';
  const match = authorization.match(/^Bearer\s+(.+)$/i);

  removeExpiredTokens();

  if (!match || !activeTokens.has(match[1])) {
    return res.status(401).json({ message: 'Admin authorization is required.' });
  }

  return next();
};
