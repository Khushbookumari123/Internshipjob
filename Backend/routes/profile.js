const express = require('express');
const router = express.Router();
const { profile } = require('../data/sampleData');

// GET /api/profile
router.get('/', (req, res) => {
  res.json(profile);
});

module.exports = router;
