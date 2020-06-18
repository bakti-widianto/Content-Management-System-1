var mongoose = require('mongoose');
var mapsSchema = new mongoose.Schema({
   title: String,
   lat: Number,
   long: Number
});

module.exports = mongoose.model('Maps', mapsSchema);