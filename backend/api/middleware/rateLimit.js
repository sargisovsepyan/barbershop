'use strict';

module.exports = function createRateLimiter(options) {
  const windowMs = options.windowMs;
  const maximum = options.maximum;
  const buckets = new Map();

  return function rateLimit(req, res, next) {
    const now = Date.now();
    const key = req.ip || (req.connection && req.connection.remoteAddress) || 'unknown';
    let bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(key, bucket);
    }

    bucket.count += 1;
    res.set('X-RateLimit-Limit', String(maximum));
    res.set('X-RateLimit-Remaining', String(Math.max(0, maximum - bucket.count)));

    if (bucket.count > maximum) {
      res.set('Retry-After', String(Math.ceil((bucket.resetAt - now) / 1000)));
      return res.status(429).json({
        error: {
          code: 'RATE_LIMITED',
          message: 'Слишком много запросов. Попробуйте ещё раз немного позже.'
        }
      });
    }

    if (buckets.size > 5000) {
      buckets.forEach(function (entry, entryKey) {
        if (entry.resetAt <= now) {
          buckets.delete(entryKey);
        }
      });
    }

    return next();
  };
};
