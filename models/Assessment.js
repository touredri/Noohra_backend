const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  learner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assessmentDate: { type: Date, default: Date.now },
  completionStatus: { type: String, enum: ['Incomplete', 'Complete'], default: 'Incomplete' },
  totalScore: { type: Number, default: 0 }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
