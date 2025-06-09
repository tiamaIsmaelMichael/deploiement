const User = require('../models/User');

const updateUser = async (req, res) => {
  const userId = req.headers['x-user-id']; // À sécuriser avec un token plus tard
  const { username, email } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Utilisateur non authentifié.' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json({ message: 'Profil mis à jour', updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

module.exports = { updateUser };
