const mongoose = require('mongoose');

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Email non valide'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String, // URL vers l'image
      default: '',
    },
    bio: {
      type: String,
      maxlength: 200,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
