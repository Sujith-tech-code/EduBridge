const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  subject: { type: String, required: true },
  availability: { type: String },
  mode: { type: String, enum: ['online', 'offline', 'both'], default: 'both' },
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);