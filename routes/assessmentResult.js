const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assessmentResultController = require('../controllers/assessmentResultController');

// Routes CRUD pour AssessmentResult
router.post('/', auth, assessmentResultController.createResult);
router.get('/', auth, assessmentResultController.getResults);
router.get('/:id', auth, assessmentResultController.getResultById);
router.put('/:id', auth, assessmentResultController.updateResult);
router.delete('/:id', auth, assessmentResultController.deleteResult);

module.exports = router;
