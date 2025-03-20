const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assessmentResultController = require('../controllers/assessmentResultController');

/**
 * @swagger
 * /assessmentResults:
 *   post:
 *     summary: Create a new assessment result
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
 *                 description: ID de l'apprenant
 *               assessment:
 *                 type: string
 *                 description: ID de l'évaluation
 *             required:
 *               - learner
 *               - assessment
 *     responses:
 *       201:
 *         description: Résultat créé
 */
router.post('/', auth, assessmentResultController.createResult);

/**
 * @swagger
 * /assessmentResults:
 *   get:
 *     summary: Get all assessment results
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des résultats
 */
router.get('/', auth, assessmentResultController.getResults);

/**
 * @swagger
 * /assessmentResults/{id}:
 *   get:
 *     summary: Get an assessment result by ID
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
 *         description: Résultat trouvé
 */
router.get('/:id', auth, assessmentResultController.getResultById);

/**
 * @swagger
 * /assessmentResults/{id}:
 *   put:
 *     summary: Update an assessment result by ID
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
 *         description: Résultat mis à jour
 */
router.put('/:id', auth, assessmentResultController.updateResult);

/**
 * @swagger
 * /assessmentResults/{id}:
 *   delete:
 *     summary: Delete an assessment result by ID
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
 *         description: Résultat supprimé
 */
router.delete('/:id', auth, assessmentResultController.deleteResult);

module.exports = router;
