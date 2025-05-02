const mongoose = require('mongoose');

const renewableSourceSchema = new mongoose.Schema({
  location: String,
  capacity: Number,
  output: Number
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  number: String,
  walletAddress: {
    type: String,
    default: '',
  },
  renewableSources: [renewableSourceSchema]

});

module.exports = mongoose.model('User', userSchema);
