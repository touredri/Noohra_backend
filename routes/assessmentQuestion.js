const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assessmentQuestionController = require('../controllers/assessmentQuestionController');

/**
 * @swagger
 * /assessmentQuestions:
 *   post:
 *     summary: Créer une nouvelle question d'évaluation
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Question créée
 */
router.post('/', auth, assessmentQuestionController.createQuestion);

/**
 * @swagger
 * /assessmentQuestions:
 *   get:
 *     summary: Obtenir toutes les questions d'évaluation
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des questions
 */
router.get('/', auth, assessmentQuestionController.getQuestions);

/**
 * @swagger
 * /assessmentQuestions/{id}:
 *   get:
 *     summary: Obtenir une question d'évaluation par ID
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
 *         description: Question trouvée
 */
router.get('/:id', auth, assessmentQuestionController.getQuestionById);

/**
 * @swagger
 * /assessmentQuestions/{id}:
 *   put:
 *     summary: Mettre à jour une question d'évaluation par ID
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
 *         description: Question mise à jour
 */
router.put('/:id', auth, assessmentQuestionController.updateQuestion);

/**
 * @swagger
 * /assessmentQuestions/{id}:
 *   delete:
 *     summary: Supprimer une question d'évaluation par ID
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
 *         description: Question supprimée
 */
router.delete('/:id', auth, assessmentQuestionController.deleteQuestion);

module.exports = router;
