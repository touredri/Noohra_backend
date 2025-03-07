const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assessmentResponseController = require('../controllers/assessmentResponseController');

// Routes CRUD pour AssessmentResponse
router.post('/', auth, assessmentResponseController.createResponse);
router.get('/', auth, assessmentResponseController.getResponses);
router.get('/:id', auth, assessmentResponseController.getResponseById);
router.put('/:id', auth, assessmentResponseController.updateResponse);
router.delete('/:id', auth, assessmentResponseController.deleteResponse);

module.exports = router;
