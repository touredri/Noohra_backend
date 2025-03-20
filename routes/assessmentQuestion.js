const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assessmentQuestionController = require('../controllers/assessmentQuestionController');

/**
 * @swagger
 * /assessmentQuestions:
 *   post:
 *     summary: Create a new assessment question
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: Question
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Options de réponse
 *               correctAnswer:
 *                 type: string
 *                 description: Réponse correcte
 *             required:
 *               - question
 *               - options
 *               - correctAnswer
 *     responses:
 *       201:
 *         description: Question créée
 */
router.post('/', auth, assessmentQuestionController.createQuestion);

/**
 * @swagger
 * /assessmentQuestions:
 *   get:
 *     summary: Get all assessment questions
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
 *     summary: Get an assessment question by ID
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
 *     summary: Update an assessment question by ID
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
 *     summary: Delete an assessment question by ID
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
