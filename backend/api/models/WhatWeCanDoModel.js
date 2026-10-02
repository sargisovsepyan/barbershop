'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  caption: {
    type: String,
    required: 'Please enter a caption.'
  },
  description: {
    type: String,
    required: 'Please enter a description.'
  },
  imgsrc: {
    type: String,
    required: 'Please enter an image source.'
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


module.exports = mongoose.model('WhatWeCanDo', TaskSchema);
