const mongoose = require('mongoose');

const energyListingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  energyAmount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  listedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('EnergyList', energyListingSchema);
