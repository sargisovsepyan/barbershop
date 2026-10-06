'use strict';

module.exports = function (app) {
  const bookingController = require('../controllers/bookingController');
  const createRateLimiter = require('../middleware/rateLimit');
  const configuredMaximum = Number(process.env.BOOKING_RATE_LIMIT || 240);
  const bookingLimiter = createRateLimiter({
    windowMs: 5 * 60 * 1000,
    maximum: Number.isInteger(configuredMaximum) && configuredMaximum > 0
      ? configuredMaximum
      : 240
  });

  app.use('/api/booking', bookingLimiter);
  app.get('/api/booking/options', bookingController.options);
  app.get('/api/booking/availability', bookingController.availability);
  app.post('/api/booking/appointments', bookingController.create);
};
