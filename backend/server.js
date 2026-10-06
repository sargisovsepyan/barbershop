'use strict';

const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

require('./api/models/WhatWeCanDoModel');
require('./api/models/servicesModel');
require('./api/models/galleryModel');
require('./api/models/mastersModel');
require('./api/models/bookModel');
require('./api/models/bookingAppointmentModel');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/barbershop';
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:8080,http://127.0.0.1:8080')
  .split(',')
  .map(function (origin) { return origin.trim(); })
  .filter(Boolean);

mongoose.Promise = global.Promise;

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true, limit: '16kb' }));
app.use(bodyParser.json({ limit: '16kb', strict: true }));
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    const error = new Error('Origin is not allowed.');
    error.status = 403;
    error.code = 'CORS_ORIGIN_DENIED';
    return callback(error);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

require('./api/routes/authRoutes')(app);
require('./api/routes/bookRoutes')(app);
require('./api/routes/WhatWeCanDoRoutes')(app);
require('./api/routes/servicesRoutes')(app);
require('./api/routes/galleryRoutes')(app);
require('./api/routes/mastersRoutes')(app);
require('./api/routes/bookingRoutes')(app);

app.use(function (req, res) {
  res.status(404).json({
    url: req.originalUrl + ' not found',
    error: {
      code: 'NOT_FOUND',
      message: 'Ресурс не найден.'
    }
  });
});

app.use(function (error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  let status = Number(error.status || error.statusCode) || 500;
  let code = error.code || 'INTERNAL_ERROR';
  let message = error.message || 'Внутренняя ошибка сервера.';

  if (error.type === 'entity.too.large') {
    status = 413;
    code = 'PAYLOAD_TOO_LARGE';
    message = 'Запрос слишком большой.';
  } else if (error instanceof SyntaxError && error.status === 400) {
    code = 'INVALID_JSON';
    message = 'Некорректный JSON.';
  } else if (status >= 500) {
    code = 'INTERNAL_ERROR';
    message = 'Онлайн-запись временно недоступна.';
    console.error('Request failed without exposing client data:', error.name || 'Error');
  }

  const payload = { error: { code: code, message: message } };
  if (error.fields && status < 500) {
    payload.error.fields = error.fields;
  }
  return res.status(status).json(payload);
});

function start() {
  mongoose.connect(mongoUri, { useMongoClient: true }, function (error) {
    if (error) {
      console.error('MongoDB connection failed. Check MONGODB_URI and ensure MongoDB is running.');
      process.exitCode = 1;
      return;
    }

    const BookingAppointment = mongoose.model('bookingAppointments');
    BookingAppointment.ensureIndexes(function (indexError) {
      if (indexError) {
        console.error('Booking indexes could not be prepared.');
        process.exitCode = 1;
        return;
      }

      app.listen(port, function () {
        console.log('Barbershop API server started on port ' + port);
      });
    });
  });
}

if (require.main === module) {
  start();
}

module.exports = { app: app, start: start };
