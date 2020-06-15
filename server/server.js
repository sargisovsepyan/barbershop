var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/WhatWeCanDoModel'),
  Task = require('./api/models/servicesModel'),
  Task = require('./api/models/galleryModel'),
  Task = require('./api/models/mastersModel'),
  Task = require('./api/models/bookModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/barbershop');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

const cors = require('cors');

app.use(cors());
app.options('*', cors());


var routes = require('./api/routes/bookRoutes');
routes(app);

var routes = require('./api/routes/WhatWeCanDoRoutes');
routes(app);

var routes = require('./api/routes/servicesRoutes');
routes(app);

var routes = require('./api/routes/galleryRoutes');
routes(app);

var routes = require('./api/routes/mastersRoutes');
routes(app);



app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);


