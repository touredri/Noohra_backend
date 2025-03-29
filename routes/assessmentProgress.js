// routes/assessment.js
const express = require('express');
const router = express.Router();
const assessmentProgressController = require('../controllers/assessmentProgressController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /assessment/progress:
 *   post:
 *     summary: Sauvegarder la progression d'un assessment
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
 *         description: Progression sauvegardée
 *       400:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/progress', auth, assessmentProgressController.saveAssessmentProgress);

module.exports = router;
