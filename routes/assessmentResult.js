const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const assessmentResultController = require('../controllers/assessmentResultController');

/**
 * @swagger
 * /assessmentResults:
 *   post:
 *     summary: Créer un nouveau résultat d'évaluation
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Résultat créé
 */
router.post('/', auth, assessmentResultController.createResult);

/**
 * @swagger
 * /assessmentResults:
 *   get:
 *     summary: Obtenir tous les résultats d'évaluation
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
 *     summary: Obtenir un résultat d'évaluation par ID
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
 *     summary: Mettre à jour un résultat d'évaluation par ID
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
 *     summary: Supprimer un résultat d'évaluation par ID
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
