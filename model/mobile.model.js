const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String 
  }
}, { timestamps: true });

const Mobile = mongoose.model('Mobile', mobileSchema);

module.exports = Mobile;
