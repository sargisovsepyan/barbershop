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

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/barbershop';

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

require('./api/routes/authRoutes')(app);
require('./api/routes/bookRoutes')(app);
require('./api/routes/WhatWeCanDoRoutes')(app);
require('./api/routes/servicesRoutes')(app);
require('./api/routes/galleryRoutes')(app);
require('./api/routes/mastersRoutes')(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

function start() {
  mongoose.connect(mongoUri, { useMongoClient: true }, function (error) {
    if (error) {
      console.error('MongoDB connection failed. Check MONGODB_URI and ensure MongoDB is running.');
    }
  });

  return app.listen(port, function () {
    console.log('Barbershop API server started on port ' + port);
  });
}

if (require.main === module) {
  start();
}

module.exports = { app: app, start: start };
