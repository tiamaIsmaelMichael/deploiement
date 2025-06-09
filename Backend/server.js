const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // <- Assure-toi que le fichier existe et s'appelle bien ainsi

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes de l'API
app.use("/api/auth", authRoutes);   // Routes de connexion/inscription
app.use("/api/user", userRoutes);   // Routes de profil utilisateur

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connecté");

    // Lancer le serveur uniquement après connexion réussie
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// Route racine
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API du réseau social !");
});
