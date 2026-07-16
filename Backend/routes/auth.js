const express = require('express');
const router = express.Router();

// Simple mock login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Mock check — replace with real auth logic
  if (email === 'admin@example.com' && password === 'password') {
    return res.json({ token: 'mock-jwt-token', user: { id: 1, name: 'Admin' } });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

module.exports = router;
