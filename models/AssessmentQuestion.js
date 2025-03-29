const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  questionText: { type: String, required: true },
  questionType: { type: String, enum: ['multiple choice', 'scale', 'text'], required: true },
  questionCategory: { type: String, required: true }
});

// Index unique sur (assessment, questionText)
questionSchema.index({ assessment: 1, questionText: 1 }, { unique: true });

// Création d'une propriété virtuelle "userId" qui renvoie la valeur de _id
userSchema.virtual('assessmentQuestionId').get(function() {
  return this._id.toHexString();
});

// Pour que la propriété virtuelle apparaisse dans les sorties JSON
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('AssessmentQuestion', questionSchema);
