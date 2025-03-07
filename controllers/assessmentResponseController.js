const AssessmentResponse = require('../models/AssessmentResponse');

// Créer une nouvelle réponse
exports.createResponse = async (req, res) => {
  const { assessment, question, learner, responseValue } = req.body;
  try {
    const newResponse = new AssessmentResponse({
      assessment,
      question,
      learner,
      responseValue,
      timestamp: Date.now()
    });
    const savedResponse = await newResponse.save();
    res.status(201).json(savedResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Obtenir toutes les réponses
exports.getResponses = async (req, res) => {
  try {
    const responses = await AssessmentResponse.find();
    res.json(responses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Obtenir une réponse par ID
exports.getResponseById = async (req, res) => {
  try {
    const response = await AssessmentResponse.findById(req.params.id);
    if (!response) {
      return res.status(404).json({ msg: 'Réponse non trouvée' });
    }
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Mettre à jour une réponse par ID
exports.updateResponse = async (req, res) => {
  const { assessment, question, learner, responseValue } = req.body;
  try {
    let responseDoc = await AssessmentResponse.findById(req.params.id);
    if (!responseDoc) {
      return res.status(404).json({ msg: 'Réponse non trouvée' });
    }
    if (assessment) responseDoc.assessment = assessment;
    if (question) responseDoc.question = question;
    if (learner) responseDoc.learner = learner;
    if (responseValue) responseDoc.responseValue = responseValue;
    // Optionnel : mise à jour du timestamp
    responseDoc.timestamp = Date.now();
    const updatedResponse = await responseDoc.save();
    res.json(updatedResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Supprimer une réponse par ID
exports.deleteResponse = async (req, res) => {
  try {
    const responseDoc = await AssessmentResponse.findByIdAndDelete(req.params.id);
    if (!responseDoc) {
      return res.status(404).json({ msg: 'Réponse non trouvée' });
    }
    res.json({ msg: 'Réponse supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};
