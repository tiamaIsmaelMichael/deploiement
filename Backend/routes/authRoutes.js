// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Import des fonctions de contrôle
const { registerUser, loginUser } = require('../controllers/authController');

// Route d'inscription
// POST /api/auth/register
router.post('/register', registerUser);

// Route de connexion
// POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;
