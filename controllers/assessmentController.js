const Assessment = require('../models/Assessment');

// Créer une nouvelle évaluation
exports.createAssessment = async (req, res) => {
  const { learner, assessmentDate, completionStatus, totalScore } = req.body;
  try {
    const newAssessment = new Assessment({
      learner,
      assessmentDate: assessmentDate || Date.now(),
      completionStatus,
      totalScore
    });
    const assessment = await newAssessment.save();
    res.status(201).json(assessment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Obtenir toutes les évaluations
exports.getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Obtenir une évaluation par ID
exports.getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ msg: 'Évaluation non trouvée' });
    }
    res.json(assessment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Mettre à jour une évaluation par ID
exports.updateAssessment = async (req, res) => {
  const { learner, assessmentDate, completionStatus, totalScore } = req.body;
  try {
    let assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ msg: 'Évaluation non trouvée' });
    }
    if (learner) assessment.learner = learner;
    if (assessmentDate) assessment.assessmentDate = assessmentDate;
    if (completionStatus) assessment.completionStatus = completionStatus;
    if (totalScore !== undefined) assessment.totalScore = totalScore;
    await assessment.save();
    res.json(assessment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Supprimer une évaluation par ID
exports.deleteAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndDelete(req.params.id);
    if (!assessment) {
      return res.status(404).json({ msg: 'Évaluation non trouvée' });
    }
    res.json({ msg: 'Évaluation supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};
