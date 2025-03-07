const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assessmentQuestionController = require('../controllers/assessmentQuestionController');

// Routes CRUD pour AssessmentQuestion
router.post('/', auth, assessmentQuestionController.createQuestion);
router.get('/', auth, assessmentQuestionController.getQuestions);
router.get('/:id', auth, assessmentQuestionController.getQuestionById);
router.put('/:id', auth, assessmentQuestionController.updateQuestion);
router.delete('/:id', auth, assessmentQuestionController.deleteQuestion);

module.exports = router;
