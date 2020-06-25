const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const Reservation = require('../db/Reservation.js');

const app = express();
const PORT = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../client/dist`));

app.get('/reservation/:id', async (req, res) => {
  const reservationData = await Reservation.find({ _id: req.params.id }).exec();
  if (reservationData.length === 0) {
    res.status(204).send('reservation does not exist');
  } else {
    const newCalendar = makeMonths(reservationData[0].calendar);
    reservationData.push(newCalendar);
    reservationData[0].calendar = undefined;
    res.status(200).send(reservationData);
  }
});

const makeMonths = (fullCalendar) => {
  let monthsObj = {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
    10: {},
    11: {},
  };
  for (let i = 0; i < fullCalendar.length; i += 1) {
    let currentMonth = fullCalendar[i]._id.getMonth();
    let currentDay = fullCalendar[i]._id.getDate();
    monthsObj[currentMonth][currentDay] = fullCalendar[i];
  }
  return monthsObj
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
