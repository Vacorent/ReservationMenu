const moment = require('moment');
require('./index.js');
const mongoose = require('mongoose');
const Reservation = require('./Reservation.js');

Reservation.collection.drop();

(function () {
  for (let i = 0; i < 101; i += 1) {
    const today = moment();

    const cost = Math.floor(Math.random() * 300) + 30;
    const curr = 'USD';
    const weekendMultipler = 1.2;

    const sampleCalendarDates = [];
    for (let j = 0; j < 330; j += 1) {
      const nextDay = today.add(1, 'days');
      const dayOfWeek = nextDay.day();
      const isWeekend = (dayOfWeek === 6) || (dayOfWeek === 0);
      const bookedRand = Math.floor(Math.random() * 2);
      const multplier = isWeekend ? weekendMultipler : 1;
      sampleCalendarDates.push({
        _id: nextDay.format('MM-DD-YYYY'), cost: Math.floor(cost * multplier), isBooked: bookedRand, costCurrency: curr,
      });
    }

    const rating = parseFloat(((Math.random() * 3) + 2).toFixed(2));
    const numberOfReviews = Math.floor(Math.random() * 700) + 25;
    const capacity = Math.floor(cost / 25);
    const sampleReservation = {
      _id: i,
      reviewAverage: rating,
      reviewCount: numberOfReviews,
      guestCapacity: capacity,
      calendar: sampleCalendarDates,
    };
    Reservation.create(sampleReservation)
      .then((res) => {
        if(res._id === 100) {
          console.log('seed complete');
          mongoose.connection.close()
        }
      });
  }
}());
