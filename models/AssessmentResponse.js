const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentQuestion', required: true },
  learner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responseValue: { type: mongoose.Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AssessmentResponse', responseSchema);
