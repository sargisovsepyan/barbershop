'use strict';

const bookingService = require('../services/bookingService');

exports.options = async function (req, res, next) {
  try {
    const options = await bookingService.getOptions();
    return res.json({ data: options });
  } catch (error) {
    return next(error);
  }
};

exports.availability = async function (req, res, next) {
  try {
    const availability = await bookingService.getAvailability({
      serviceId: req.query.serviceId,
      masterId: req.query.masterId,
      date: req.query.date
    });
    return res.json({ data: availability });
  } catch (error) {
    return next(error);
  }
};

exports.create = async function (req, res, next) {
  try {
    const result = await bookingService.createAppointment(
      req.body,
      req.get('Idempotency-Key')
    );
    return res.status(result.replayed ? 200 : 201).json({
      data: { appointment: result.appointment },
      meta: { replayed: result.replayed }
    });
  } catch (error) {
    return next(error);
  }
};
