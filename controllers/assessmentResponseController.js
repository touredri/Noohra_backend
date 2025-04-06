const Assessment = require('../models/Assessment');
const AssessmentQuestion = require('../models/AssessmentQuestion');
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
      timestamp: Date.now(),
    });
    // get question by id
    const questionDoc = AssessmentQuestion.findById(question);
    if (!questionDoc) {
      return res.status(404).json({ msg: 'Question not found' });
    }
    // get assessment by id
    const assessmentDoc = Assessment.findById(assessment);
    if (!assessmentDoc) {
      return res.status(404).json({ msg: 'Assessment not found' });
    }
    // get learner by id
    const learnerDoc = await Assessment.findById(learner);
    if (!learnerDoc) {
      return res.status(404).json({ msg: 'Learner not found' });
    }
    // Check if the response already exists
    const existingResponse = await AssessmentResponse.findOne({
      assessment,
      question,
      learner,
    });
    if (existingResponse) {
      return res.status(400).json({ msg: 'Response already exists' });
    }
    // check if responseValue is equal to questionAnswer then update the assessment score
    if (responseValue == question.questionAnswer) {
      assessmentDoc.totalScore += 1;
      await assessmentDoc.save();
    }
    const savedResponse = await newResponse.save();
    res
      .status(201)
      .msg('Answer created successfully')
      .json({ msg: 'Answer created successfully', response: savedResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Obtenir toutes les réponses
exports.getResponses = async (req, res) => {
  try {
    const responses = await AssessmentResponse.find();
    res.json(responses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get responses by assessment ID
exports.getResponsesByAssessmentId = async (req, res) => {
  try {
    const responses = await AssessmentResponse.find({
      assessment: req.params.assessmentId,
    });
    res.json(responses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Obtenir une réponse par ID
exports.getResponseById = async (req, res) => {
  try {
    const response = await AssessmentResponse.findById(req.params.id);
    if (!response) {
      return res.status(404).json({ msg: 'Answer not found' });
    }
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Mettre à jour une réponse par ID
exports.updateResponse = async (req, res) => {
  const { assessment, question, learner, responseValue } = req.body;
  try {
    let responseDoc = await AssessmentResponse.findById(req.params.id);
    if (!responseDoc) {
      return res.status(404).json({ msg: 'Answer not found' });
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
    res.status(500).json({ msg: 'Server error' });
  }
};

// Supprimer une réponse par ID
exports.deleteResponse = async (req, res) => {
  try {
    const responseDoc = await AssessmentResponse.findByIdAndDelete(
      req.params.id
    );
    if (!responseDoc) {
      return res.status(404).json({ msg: 'Answer not found' });
    }
    res.json({ msg: 'Réponse supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
