'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the task'
  },
  phone: {
    type: String,
    Required: 'Kindly enter the name of the task'
  },
  service: {
    type: String,
    Required: 'Kindly enter the name of the task'
  },
  dateOfService: {
    type: String,
    Required: 
    'Kindly enter the name of the task'
  },
  time: {
    type: String,
    Required: 'Kindly enter the name of the task'
  },
  note: {
    type: String,

  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('book', TaskSchema);