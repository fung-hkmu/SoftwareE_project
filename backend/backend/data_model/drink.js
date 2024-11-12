const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  priceWithSet: {
    type: Number,
    required: true,
    min: 0,
  },
  available: {
    type: Boolean,
    default: true,
  },
  provideTime: {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
});

const Drink = mongoose.model('Drink', drinkSchema);

module.exports = Drink;
