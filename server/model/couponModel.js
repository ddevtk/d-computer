const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    uppercase: true,
    required: true,
    min: [6, 'Too short'],
    max: [12, 'Too long'],
  },
  discount: {
    type: Number,
    required: true,
  },
  expireIn: {
    type: Date,
    required: true,
  },
});

exports.Coupon = mongoose.model('Coupon', couponSchema);
