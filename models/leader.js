const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const leaderSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  abbr: {
    type: String,
  },
  designation: {
    type: String,
  }
}, {
  timestamps: true
});

const Leaders = mongoose.model('Dish', leaderSchema);

module.exports = Leaders;