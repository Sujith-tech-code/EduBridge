const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  principalName: { type: String },
  principalMessage: { type: String },
  overview: { type: String },
  facilities: [String],
  gallery: [String], // image URLs
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);