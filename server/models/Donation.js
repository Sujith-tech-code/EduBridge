const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  phone: { type: String, required: true },
  bookTitle: { type: String, required: true },
  quantity: { type: Number, default: 1, min: 1 },
  condition: { type: String, enum: ['new', 'good', 'fair'], default: 'good' },
  preferredSchool: { type: String },
  status: { type: String, enum: ['pending', 'received'], default: 'pending' },
  trackingId: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);