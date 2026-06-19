const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  phone: { type: String, required: true },
  bookTitle: { type: String },
  quantity: { type: Number, default: 1 },
  condition: { type: String, enum: ['new', 'good', 'fair'], default: 'good' },
  preferredSchool: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);