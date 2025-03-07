const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  questionText: { type: String, required: true },
  questionType: { type: String, enum: ['multiple choice', 'scale', 'text'], required: true },
  questionCategory: { type: String, required: true }
});

module.exports = mongoose.model('AssessmentQuestion', questionSchema);
