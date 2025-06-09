const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware simple d'authentification (à améliorer plus tard avec un vrai token)
const requireAuth = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ message: 'Non autorisé : identifiant manquant' });
  }
  req.userId = userId;
  next();
};

// ✅ Route pour mettre à jour le profil utilisateur
router.put('/update', requireAuth, async (req, res) => {
  const { username, email } = req.body;
  const userId = req.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({
      message: 'Profil mis à jour avec succès',
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
