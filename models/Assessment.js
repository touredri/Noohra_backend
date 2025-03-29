const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  learner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assessmentDate: { type: Date, default: Date.now },
  completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
  totalScore: { type: Number, default: 0 }
});

// Index unique sur (learner, assessmentDate)
assessmentSchema.index({ learner: 1, assessmentDate: 1 }, { unique: true });

// Ajout d'un middleware pour mettre à jour le champ completionStatus
// assessmentSchema.pre('save', function (next) {
//   if (this.isModified('totalScore')) {
//     this.completionStatus = this.totalScore >= 50 ? 'Complete' : 'Incomplete';
//   }
//   next();
// });

// Création d'une propriété virtuelle "userId" qui renvoie la valeur de _id
userSchema.virtual('assessmentId').get(function() {
  return this._id.toHexString();
});

// Pour que la propriété virtuelle apparaisse dans les sorties JSON
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Assessment', assessmentSchema);
