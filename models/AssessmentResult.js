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

// Index unique sur (assessment, learner)
resultSchema.index({ assessment: 1, learner: 1 }, { unique: true });

// Création d'une propriété virtuelle "assessmentResultId" qui renvoie la valeur de _id
resultSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
// Pour que la propriété virtuelle apparaisse dans les sorties JSON
resultSchema.set('toJSON', { virtuals: true });
// Middleware pour mettre à jour le champ overallScore avant de sauvegarder
resultSchema.pre('save', function(next) {
  if (this.isModified('categoryScores')) {
    const scores = Object.values(this.categoryScores);
    this.overallScore = scores.reduce((acc, score) => acc + score, 0) / scores.length;
  }
  next();
});
// Middleware pour mettre à jour le champ dateGenerated avant de sauvegarder
resultSchema.pre('save', function(next) {
  if (this.isModified('dateGenerated')) {
    this.dateGenerated = new Date();
  }
  next();
});

module.exports = mongoose.model('AssessmentResult', resultSchema);
