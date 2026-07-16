const express = require('express');
const router = express.Router();
const { reports } = require('../data/sampleData');

// GET /api/reports
router.get('/', (req, res) => {
  res.json(reports);
});

module.exports = router;
