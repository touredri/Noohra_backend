const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  learner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dateGenerated: { type: Date, default: Date.now },
  overallScore: { type: Number, required: true },
  categoryScores: { type: mongoose.Schema.Types.Mixed }, // Objet JSON pour scores par catégorie
  recommendedActivities: { type: String },
  notes: { type: String }
});

module.exports = mongoose.model('AssessmentResult', resultSchema);
