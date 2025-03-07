const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['Learner', 'Parent', 'Therapist'], required: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },

  // Pour Learner
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  diagnosis: { type: String, enum: ['ASD', 'ADHD', 'Both'] },
  parentReference: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Pour Parent
  phone: { type: String },
  associatedLearners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // Pour Therapist
  qualification: { type: String },
  licenseNumber: { type: String },
  specialization: { type: String },
  therapistLearners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', userSchema);
