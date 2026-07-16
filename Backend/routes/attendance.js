const express = require('express');
const router = express.Router();
const { attendance } = require('../data/sampleData');

// GET /api/attendance
router.get('/', (req, res) => {
  res.json(attendance);
});

module.exports = router;
