const express = require('express');
const bodyParser = require('body-parser');
const Reservation = require('../db/Reservation.js');
//const Users = require('../database-mongodb/User.js');

const app = express();
const PORT = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
