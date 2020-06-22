const moment = require('moment');
require('./index.js');
const mongoose = require('mongoose');
const Reservation = require('./Reservation.js');

const today = moment();

const cost = 175;
const curr = 'USD';
const weekendMultipler = 1.2;

const sampleCalendarDates = [];
for (let i = 0; i < 365; i += 1) {
  const nextDay = today.add(1, 'days');
  const dayOfWeek = nextDay.day();
  const isWeekend = (dayOfWeek === 6) || (dayOfWeek === 0);
  const bookedRand = Math.floor(Math.random() * 2);
  const multplier = isWeekend ? weekendMultipler : 1;
  sampleCalendarDates.push({
    _id: nextDay.format('MM-DD-YYYY'), cost: cost * multplier, isBooked: bookedRand, costCurrency: curr,
  });
}

const rating = 4.5; /* Math.floor(Math.random()*5 + 1).toFix(1); */
const numberOfReviews = 563;
const capacity = 4;
const sampleReservation = {
  _id: 0,
  reviewAverage: rating,
  reviewCount: numberOfReviews,
  guestCapacity: capacity,
  calendar: sampleCalendarDates,
};

(function () {
  Reservation.create(sampleReservation)
    .then(() => mongoose.connection.close())
    .catch((err) => console.log('error in seeding ', err));
}());
