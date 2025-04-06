const AssessmentQuestion = require('../models/AssessmentQuestion');

// Créer une nouvelle question
exports.createQuestion = async (req, res) => {
  const {
    AssessmentType,
    questionText,
    questionType,
    questionOptions,
    questionTextAnswer,
    maxAge,
  } = req.body;
  try {
    // get userType from the token
    const userType = req.user.userType;
    // check if the user is 'Therapist'
    if (userType !== 'Therapist') {
      return res
        .status(403)
        .json({
          msg: 'Access denied !! you should be a therapist in order to add a question',
        });
    }
    // Vérification de l'existence de la question
    const newQuestion = new AssessmentQuestion({
      AssessmentType,
      questionText,
      questionType,
      questionOptions,
      questionTextAnswer,
      maxAge,
    });
    const questionExists = await AssessmentQuestion.findOne({
      AssessmentType,
      questionText,
    });
    if (questionExists) {
      return res.status(400).json({ msg: 'Question already exist' });
    }
    // Si le type de question est 'multiple choice', vérifier que les options sont fournies
    if (questionType === 'multiple choice' && !questionOptions) {
      return res.status(400).json({
        msg: 'Options are required for multiple choice questions',
      });
    }
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Obtenir toutes les questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await AssessmentQuestion.find();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Obtenir toutes les questions par type d'évaluation
exports.getQuestionsByAssessmentType = async (req, res) => {
  const { assessmentType, maxAge } = req.body;
  try {
    const questions = await AssessmentQuestion.find({
      AssessmentType: assessmentType,
    });
    // Filtrer les questions par maxAge
    const filteredQuestions = questions.filter((question) => {
      return question.maxAge >= maxAge;
    });
    // Si aucune question ne correspond, renvoyer un message
    if (filteredQuestions.length === 0) {
      return res.status(404).json({ msg: 'No questions found for this age' });
    }
    // Si des questions correspondent, renvoyer la liste
    // des questions filtrées
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
// Obtenir toutes les questions par type de question
exports.getQuestionsByQuestionType = async (req, res) => {
  try {
    const questions = await AssessmentQuestion.find({
      questionType: req.params.questionType,
    });
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Obtenir une question par ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await AssessmentQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Mettre à jour une question par ID
exports.updateQuestion = async (req, res) => {
  const { questionText, questionType, questionCategory } = req.body;
  try {
    // get userType from the token
    const userType = req.user.userType;
    // check if the user is 'Therapist'
    if (userType !== 'Therapist') {
      return res
        .status(403)
        .json({
          msg: 'Access denied !! you should be a therapist in order to this action',
        });
    }
    let question = await AssessmentQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }
    if (questionText) question.questionText = questionText;
    if (questionType) question.questionType = questionType;
    if (questionCategory) question.questionCategory = questionCategory;
    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Supprimer une question par ID
exports.deleteQuestion = async (req, res) => {
  try {
    // get userType from the token
    const userType = req.user.userType;
    // check if the user is 'Therapist'
    if (userType !== 'Therapist') {
      return res
        .status(403)
        .json({
          msg: 'Access denied !! you should be a therapist in order to this action',
        });
    }
    const question = await AssessmentQuestion.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }
    res.json({ msg: 'Question supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
