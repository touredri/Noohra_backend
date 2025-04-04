const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String, default: 'default.jpg' },
  dateOfBirth: { type: Date },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  phone: { type: String },
  emergencyContact: {
    name: { type: String },
    phone: { type: String },
  },
  // Authentification
  // name: { type: String, required: true },
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

// Création d'une propriété virtuelle "userId" qui renvoie la valeur de _id
userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Pour que la propriété virtuelle apparaisse dans les sorties JSON
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
