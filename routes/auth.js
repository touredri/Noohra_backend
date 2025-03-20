const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userType:
 *                 type: string
 *                 enum: ['Learner', 'Parent', 'Therapist']
 *                 description: type of the user
 *     responses:
 *       201:
 *         description: Utilisateur enregistré
 */
router.post(
  '/register',
  [
    check('name', 'Le nom est requis').not().isEmpty(),
    check('email', 'Email valide requis').isEmail(),
    check(
      'password',
      'Le mot de passe doit contenir au moins 6 caractères'
    ).isLength({ min: 6 }),
    check('userType', "Type d'utilisateur requis").not().isEmpty(),
  ],
  authController.register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur connecté
 */
router.post(
  '/login',
  [
    check('email', 'Email valide requis').isEmail(),
    check('password', 'Le mot de passe est requis').exists(),
  ],
  authController.login
);

module.exports = router;
