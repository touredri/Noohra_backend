const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  AssessmentType: { type: String, enum: ['ASD', 'ADHD'], required: true },
  questionText: { type: String, required: true },
  questionType: {
    type: String,
    enum: ['multiple choice', 'text'],
    required: true,
  },
  maxAge: { type: Number, required: true },
  questionOptions: {
    type: [String],
    required: function () {
      return this.questionType === 'multiple choice';
    },
  },
  questionAnswer: {
    type: mongoose.Schema.Types.Mixed,
  },
});

// Index unique sur (assessment, questionText)
// questionSchema.index({ assessment: 1, questionText: 1 }, { unique: true });

// Création d'une propriété virtuelle "userId" qui renvoie la valeur de _id
questionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Pour que la propriété virtuelle apparaisse dans les sorties JSON
questionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('AssessmentQuestion', questionSchema);
