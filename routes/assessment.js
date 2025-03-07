const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assessmentController = require('../controllers/assessmentController');

/**
 * @swagger
 * /assessments:
 *   post:
 *     summary: Créer une nouvelle évaluation
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Évaluation créée
 */
router.post('/', auth, assessmentController.createAssessment);

/**
 * @swagger
 * /assessments:
 *   get:
 *     summary: Obtenir toutes les évaluations
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
 *     summary: Obtenir une évaluation par ID
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
 *     summary: Mettre à jour une évaluation par ID
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

/**
 * @swagger
 * /assessments/{id}:
 *   delete:
 *     summary: Supprimer une évaluation par ID
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
