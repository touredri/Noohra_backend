const AssessmentQuestion = require('../models/AssessmentQuestion');

// Créer une nouvelle question
exports.createQuestion = async (req, res) => {
  const { questionText, questionType, questionCategory } = req.body;
  try {
    const newQuestion = new AssessmentQuestion({ questionText, questionType, questionCategory });
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Obtenir toutes les questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await AssessmentQuestion.find();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Obtenir une question par ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await AssessmentQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ msg: 'Question non trouvée' });
    }
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Mettre à jour une question par ID
exports.updateQuestion = async (req, res) => {
  const { questionText, questionType, questionCategory } = req.body;
  try {
    let question = await AssessmentQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ msg: 'Question non trouvée' });
    }
    if (questionText) question.questionText = questionText;
    if (questionType) question.questionType = questionType;
    if (questionCategory) question.questionCategory = questionCategory;
    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};

// Supprimer une question par ID
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await AssessmentQuestion.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ msg: 'Question non trouvée' });
    }
    res.json({ msg: 'Question supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
};
