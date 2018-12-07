const mongoose = require('mongoose');

const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
  rating:  {
      type: Number,
      min: 1,
      max: 5,
      required: true
  },
  comment:  {
      type: String,
      required: true
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});
const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
  },
  category: {
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
  comments:[commentSchema]
}, {
  timestamps: true
});

const Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;