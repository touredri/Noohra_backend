const express = require('express');
const router = express.Router();
const assessmentProgressController = require('../controllers/assessmentProgressController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /assessmentProgress:
 *   post:
 *     summary: save assessment progress
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               assessmentId:
 *                 type: string
 *               progress:
 *                 type: number
 *               lastQuestion:
 *                 type: number
 *     responses:
 *       200:
 *         description: Assessment progress saved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', auth, assessmentProgressController.saveAssessmentProgress);

module.exports = router;
