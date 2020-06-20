const express = require('express');
const bodyParser = require('body-parser');
const Reservation = require('../db/Reservation.js');

const app = express();
const PORT = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../client/dist`));



app.get('/reservation/:id', async (req, res) => {
  res.status(200).send(await Reservation.find({_id: req.params.id}).exec());
})



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
