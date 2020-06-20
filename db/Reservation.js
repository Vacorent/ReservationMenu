const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const calendarDateSchema = new mongoose.Schema({
  _id: Date,
  isBooked: Boolean,
  cost: Number,
  costCurrency: String,
},
  {
  timestamps: false
  }
);

const resDataSchema = new mongoose.Schema({
  _id: Number,
  reviewAverage: Number,
  reviewCount: Number,
  guestCapacity: Number,
  calendar: [calendarDateSchema]
},
  {
    timestamps: false
  }
);

const Reservation = mongoose.model('reservations', resDataSchema);

module.exports = Reservation;
