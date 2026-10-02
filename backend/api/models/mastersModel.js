'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  imgsrc: {
    type: String,
    required: 'Please enter an image source.'
  },
  name: {
    type: String,
    required: 'Please enter a staff member name.'
  },
  position: {
    type: String,
    required: 'Please enter a staff position.'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});


module.exports = mongoose.model('masters', TaskSchema);
