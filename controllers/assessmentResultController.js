const AssessmentResult = require('../models/AssessmentResult');

// Créer un nouveau résultat d'évaluation
exports.createResult = async (req, res) => {
  const {
    assessment,
    learner,
    overallScore,
    categoryScores,
    recommendedActivities,
    notes,
  } = req.body;
  try {
    const newResult = new AssessmentResult({
      assessment,
      learner,
      overallScore,
      categoryScores,
      recommendedActivities,
      notes,
      dateGenerated: Date.now(),
    });
    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Obtenir tous les résultats d'évaluation
exports.getResults = async (req, res) => {
  try {
    const results = await AssessmentResult.find();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Obtenir un résultat par ID
exports.getResultById = async (req, res) => {
  try {
    const result = await AssessmentResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ msg: 'Résultat non trouvé' });
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Mettre à jour un résultat par ID
exports.updateResult = async (req, res) => {
  const {
    assessment,
    learner,
    overallScore,
    categoryScores,
    recommendedActivities,
    notes,
  } = req.body;
  try {
    let result = await AssessmentResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ msg: 'Résultat non trouvé' });
    }
    if (assessment) result.assessment = assessment;
    if (learner) result.learner = learner;
    if (overallScore !== undefined) result.overallScore = overallScore;
    if (categoryScores) result.categoryScores = categoryScores;
    if (recommendedActivities)
      result.recommendedActivities = recommendedActivities;
    if (notes) result.notes = notes;
    // Optionnel : mise à jour de la date de génération
    result.dateGenerated = Date.now();
    const updatedResult = await result.save();
    res.json(updatedResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Supprimer un résultat par ID
exports.deleteResult = async (req, res) => {
  try {
    const result = await AssessmentResult.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ msg: 'Résultat non trouvé' });
    }
    res.json({ msg: 'Résultat supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
