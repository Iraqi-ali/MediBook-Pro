const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['super', 'admin', 'doctor', 'patient', 'clinic', 'hospital', 'pharmacy', 'dental'], default: 'patient' },
  phone: { type: String },
  photo: { type: String },
  specialization: { type: String },
  clinicType: { type: String, enum: ['clinic', 'hospital', 'pharmacy', 'dental'] },
  social: {
    website: String,
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
  },
  location: {
    address: String,
    city: String,
    country: String,
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
