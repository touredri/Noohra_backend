const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assessmentResponseController = require('../controllers/assessmentResponseController');

/**
 * @swagger
 * /assessmentResponses:
 *   post:
 *     summary: Create a new assessment response
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              assessment:
 *                type: string
 *                description: assessment id
 *               learner:
 *                 type: string
 *                 description: learner id
 *               question:
 *                 type: string
 *                 description: question id
 *               responseValue:
 *                 type: string
 *                 description: response value learner's response
 *             required:
 *               - assessment
 *               - learner
 *               - question
 *               - responseValue
 *     responses:
 *       201:
 *         description: Réponse créée
 */
router.post('/', auth, assessmentResponseController.createResponse);

/**
 * @swagger
 * /assessmentResponses:
 *   get:
 *     summary: Get all assessment responses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des réponses
 */
router.get('/', auth, assessmentResponseController.getResponses);

/**
 * @swagger
 * /assessmentResponses/{id}:
 *   get:
 *     summary: Get an assessment response by ID
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
 *         description: Réponse trouvée
 */
router.get('/:id', auth, assessmentResponseController.getResponseById);

/**
 * @swagger
 * /assessmentResponses/{id}:
 *   put:
 *     summary: Update an assessment response by ID
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
 *         description: Réponse mise à jour
 */
router.put('/:id', auth, assessmentResponseController.updateResponse);

/**
 * @swagger
 * /assessmentResponses/{id}:
 *   delete:
 *     summary: Delete an assessment response by ID
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
 *         description: Réponse supprimée
 */
router.delete('/:id', auth, assessmentResponseController.deleteResponse);

module.exports = router;
