const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assessmentResponseController = require('../controllers/assessmentResponseController');

/**
 * @swagger
 * /assessmentResponses:
 *   post:
 *     summary: Créer une nouvelle réponse d'évaluation
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Réponse créée
 */
router.post('/', auth, assessmentResponseController.createResponse);

/**
 * @swagger
 * /assessmentResponses:
 *   get:
 *     summary: Obtenir toutes les réponses d'évaluation
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
 *     summary: Obtenir une réponse d'évaluation par ID
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
 *     summary: Mettre à jour une réponse d'évaluation par ID
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
 *     summary: Supprimer une réponse d'évaluation par ID
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
