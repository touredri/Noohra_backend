const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// Obtenir tous les utilisateurs
router.get('/', auth, userController.getUsers);

// Obtenir un utilisateur par ID
router.get('/:id', auth, userController.getUserById);

// Mettre à jour un utilisateur par ID
router.put('/:id', auth, userController.updateUser);

// Supprimer un utilisateur par ID
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;

module.exports = router;
