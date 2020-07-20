const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  Tests: {
    required: true,
    type: Number
  },
  Confirmed: {
    required: true,
    type: Number
  },
  Active: {
    required: true,
    type: Number
  },
  Recovered: {
    required: true,
    type: Number
  },
  Deaths: {
    required: true,
    type: Number
  },
  Date: {
    required: true,
    type: Date
  },
});

module.exports = mongoose.model('data2', DataSchema);
