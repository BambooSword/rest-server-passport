const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
  },
  label: {
    type: String,
    default: '',
  },
  price: {
    type: Currency,
  },
  description: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

const Promotions = mongoose.model('Dish', promotionSchema);

module.exports = Promotions;