'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter a customer name.'
  },
  phone: {
    type: String,
    required: 'Please enter a phone number.'
  },
  service: {
    type: String,
    required: 'Please select a service.'
  },
  dateOfService: {
    type: String,
    required: 'Please select a service date.'
  },
  time: {
    type: String,
    required: 'Please select a service time.'
  },
  note: {
    type: String,

  },
  booked: {
    type: Boolean,
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('book', TaskSchema);
