const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assessmentController = require('../controllers/assessmentController');

/**
 * @swagger
 * /assessments:
 *   post:
 *     summary: Create a new assessment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               learner:
 *                 type: string
 *                 description: Learner id
 *               assessmentDate:
 *                 type: string
 *                 description: Date de l'évaluation
 *               completionStatus:
 *                 type: string
 *                 enum: ['Incomplete', 'Complete']
 *                 description: Statut de l'évaluation
 *               totalScore:
 *                 type: number
 *                 description: Score total de l'évaluation
 *             required:
 *               - learner
 *               - assessmentDate
 *     responses:
 *       201:
 *         description: Évaluation créée
 */
router.post('/', auth, assessmentController.createAssessment);

/**
 * @swagger
 * /assessments:
 *   get:
 *     summary: Get all assessments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des évaluations
 */
router.get('/', auth, assessmentController.getAssessments);

/**
 * @swagger
 * /assessments/{id}:
 *   get:
 *     summary: Get an assessment by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Évaluation trouvée
 */
router.get('/:id', auth, assessmentController.getAssessmentById);

/**
 * @swagger
 * /assessments/{id}:
 *   put:
 *     summary: Update an assessment by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Évaluation mise à jour
 */
router.put('/:id', auth, assessmentController.updateAssessment);

// update assessment completion status
/**
 * @swagger
 * /assessments/{id}/completionStatus:
 *   put:
 *     summary: Update assessment completion status by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completionStatus:
 *                 type: string
 *                 enum: ['Incomplete', 'Complete']
 *                 description: Statut de l'évaluation
 *             required:
 *               - completionStatus
 *     responses:
 *       200:
 *         description: Statut de l'évaluation mis à jour
 */
router.put('/:id/completionStatus', auth, assessmentController.updateAssessmentCompletionStatus);

/**
 * @swagger
 * /assessments/{id}:
 *   delete:
 *     summary: Delete an assessment by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Évaluation supprimée
 */
router.delete('/:id', auth, assessmentController.deleteAssessment);

module.exports = router;
