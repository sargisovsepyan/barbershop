'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookingAppointmentSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'services',
    required: true
  },
  master: {
    type: Schema.Types.ObjectId,
    ref: 'masters',
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  masterName: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 80
  },
  normalizedPhone: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 16
  },
  comment: {
    type: String,
    maxlength: 500,
    default: ''
  },
  date: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/
  },
  startTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):[0-5]\d$/
  },
  endTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):[0-5]\d$/
  },
  startAt: {
    type: Date,
    required: true
  },
  endAt: {
    type: Date,
    required: true
  },
  durationMinutes: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  },
  lockKeys: {
    type: [String],
    required: true,
    select: false
  },
  idempotencyKeyHash: {
    type: String,
    required: true,
    minlength: 64,
    maxlength: 64,
    select: false
  },
  requestHash: {
    type: String,
    required: true,
    minlength: 64,
    maxlength: 64,
    select: false
  }
}, {
  timestamps: true,
  versionKey: false
});

// A unique multikey index makes one appointment insert the atomic owner of
// every minute it occupies. Overlapping durations for the same master cannot
// both be committed, while different masters may use the same clock time.
BookingAppointmentSchema.index(
  { master: 1, lockKeys: 1 },
  { unique: true, name: 'unique_master_booking_lock' }
);

BookingAppointmentSchema.index(
  { idempotencyKeyHash: 1 },
  { unique: true, name: 'unique_booking_idempotency_key' }
);

BookingAppointmentSchema.index({ master: 1, date: 1, startTime: 1 });

module.exports = mongoose.model('bookingAppointments', BookingAppointmentSchema);
