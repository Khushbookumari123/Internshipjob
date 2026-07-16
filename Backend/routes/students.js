const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database'); // yahi se model aa raha hai

// GET /api/students
router.get('/', async (req, res) => {
  try {
    const students = await sequelize.models.Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/students/:id
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const student = await sequelize.models.Student.findByPk(id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/students - naya student banaye
router.post('/', async (req, res) => {
  try {
    const { name, department, roll, email, course, phone } = req.body; // frontend se sab aa raha
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const newStudent = await sequelize.models.Student.create({ 
      name, department, roll, email, course, phone 
    });
    res.status(201).json(newStudent);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/students/:id - student update kare
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const student = await sequelize.models.Student.findByPk(id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    await student.update(req.body); 
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/students/:id - student delete kare
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await sequelize.models.Student.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Student not found' });
    
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;