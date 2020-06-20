const mongoose = require('mongoose');
const appbnbResUri = 'mongodb://localhost/resData';

mongoose.set('useUnifiedTopology', true);
const db = mongoose.connect(appbnbResUri, {useNewUrlParser: true});


module.exports = db;