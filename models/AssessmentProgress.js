const mongoose = require('mongoose');
const { Schema } = mongoose;

const assessmentProgressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  assessmentId: { type: Schema.Types.ObjectId, required: true, ref: 'Assessment' },
  progress: { type: Number, required: true },
  lastQuestion: { type: Number, default: null },
  startedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false },
});

// Index unique sur (userId, assessmentId)
assessmentProgressSchema.index({ userId: 1, assessmentId: 1 }, { unique: true });

// Création d'une propriété virtuelle "userId" qui renvoie la valeur de _id
userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Pour que la propriété virtuelle apparaisse dans les sorties JSON
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('AssessmentProgress', assessmentProgressSchema);
