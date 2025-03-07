const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

router.post(
  '/register',
  [
    check('name', 'Le nom est requis').not().isEmpty(),
    check('email', 'Email valide requis').isEmail(),
    check('password', 'Le mot de passe doit contenir au moins 6 caractères').isLength({ min: 6 }),
    check('userType', 'Type d\'utilisateur requis').not().isEmpty()
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('email', 'Email valide requis').isEmail(),
    check('password', 'Le mot de passe est requis').exists()
  ],
  authController.login
);

module.exports = router;
