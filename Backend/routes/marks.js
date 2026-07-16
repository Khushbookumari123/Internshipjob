const express = require('express');
const router = express.Router();
const { marks } = require('../data/sampleData');

// GET /api/marks
router.get('/', (req, res) => {
  res.json(marks);
});

module.exports = router;
