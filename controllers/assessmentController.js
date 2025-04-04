const Assessment = require('../models/Assessment');

// Créer une nouvelle évaluation
exports.createAssessment = async (req, res) => {
  const { learner, assessmentDate, completionStatus, totalScore } = req.body;
  try {
    // get the userType from the token
    const userType = req.user.userType;
    // Check if the userType is 'Parent' or 'Therapist'
    if (userType !== 'Parent' && userType !== 'Therapist') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    // Vérification de l'existence de l'apprenant
    const learnerExists = await Assessment.findById(learner);
    if (!learnerExists) {
      return res.status(404).json({ msg: 'Learner not exist' });
    }
    // Vérification de l'existence de l'évaluation
    const assessmentExists = await Assessment.findOne({
      learner,
      assessmentDate,
    });
    if (assessmentExists) {
      return res.status(400).json({ msg: 'Évaluation déjà existante' });
    }
    // Création de l'évaluation
    // Si le statut de complétion n'est pas fourni, le définir sur 'Incomplete'
    const completionStatus = completionStatus || 'Incomplete';
    // Si le score total n'est pas fourni, le définir sur 0
    const totalScore = totalScore || 0;
    // Créer une nouvelle évaluation
    const newAssessment = new Assessment({
      learner,
      assessmentDate: assessmentDate || Date.now(),
      completionStatus,
      totalScore,
    });
    const assessment = await newAssessment.save();
    res.status(201).json(assessment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Obtenir toutes les évaluations
exports.getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
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
    res.status(500).json({ msg: 'Server error' });
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
    res.status(500).json({ msg: 'Server error' });
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
    res.status(500).json({ msg: 'Server error' });
  }
};
