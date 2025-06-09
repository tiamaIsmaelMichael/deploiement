const express = require('express');
const router = express.Router();

// Route de test
router.get('/', (req, res) => {
  res.send('Posts route fonctionne');
});

module.exports = router;
