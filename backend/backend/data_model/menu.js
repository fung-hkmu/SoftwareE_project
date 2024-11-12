const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
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
  withDrink: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: true,
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

menuSchema.pre('validate', function(next) {
  if (this.provideTime.startTime >= this.provideTime.endTime) {
    return next(new Error('endTime must be after startTime'));
  }
  next();
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;