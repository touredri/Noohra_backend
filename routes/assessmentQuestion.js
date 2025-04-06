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
 *               AssessmentType:
 *                 type: string
 *                 enum: ['ASD', 'ADHD']
 *                 description: Evaluation type
 *               questionText:
 *                 type: string
 *                 description: Question text
 *               questionType:
 *                 type: string
 *                 enum: ['multiple choice', 'text']
 *                 description: Type de question
 *               maxAge:
 *                 type: number
 *                 description: Maximum age for the question
 *               questionOptions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Options de la question
 *               questionAnswer:
 *                 type: Dynamic
 *                 description: question answer
 *             required:
 *               - AssessmentType
 *               - questionText
 *               - questionType
 *               - maxAge
 *               - questionAnswer
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *        description: Question already exists or invalid request
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
 * /assessmentQuestion:
 *   get:
 *     summary: Get assessment questions by assessment type & age
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              assessmentType:
 *                type: string
 *                enum: ['ASD', 'ADHD']
 *                description: Type d'évaluation
 *              maxAge:
 *                type: number
 *                description: maximum age for the question
 *            required:
 *              - assessmentType
 *              - maxAge
 *     responses:
 *       200:
 *         description: Liste des questions par type d'évaluation
 *         404:
 *         description: Aucune question trouvée pour cet âge
 */
router.get(
  '/assessmentType/:AssessmentType',
  auth,
  assessmentQuestionController.getQuestionsByAssessmentType
);

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
