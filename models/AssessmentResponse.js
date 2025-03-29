const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentQuestion', required: true },
  learner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responseValue: { type: mongoose.Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Création d'une propriété virtuelle "userId" qui renvoie la valeur de _id
userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Pour que la propriété virtuelle apparaisse dans les sorties JSON
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('AssessmentResponse', responseSchema);
