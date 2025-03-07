const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assessmentController = require('../controllers/assessmentController');

// CRUD pour les évaluations
router.post('/', auth, assessmentController.createAssessment);
router.get('/', auth, assessmentController.getAssessments);
router.get('/:id', auth, assessmentController.getAssessmentById);
router.put('/:id', auth, assessmentController.updateAssessment);
router.delete('/:id', auth, assessmentController.deleteAssessment);

module.exports = router;
