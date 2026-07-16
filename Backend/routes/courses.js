const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');

// GET /api/courses - saare courses
router.get('/', async (req, res) => {
  try {
    const courses = await sequelize.models.Course.findAll();
    res.json(courses);
  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/courses/:id - 1 course
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const course = await sequelize.models.Course.findByPk(id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    console.log("GET ID ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/courses - naya course banaye
router.post('/', async (req, res) => {
  try {
    const { courseCode, courseName, department, credits, faculty, duration } = req.body;
    
    if (!courseCode || !courseName) 
      return res.status(400).json({ error: 'CourseCode and CourseName are required' });

    // duplicate check - DB me column 'code' hai
    const exist = await sequelize.models.Course.findOne({ where: { code: courseCode } });
    if(exist) return res.status(400).json({ error: "Course Code already exists" });

    const newCourse = await sequelize.models.Course.create({ 
      code: courseCode,         // frontend -> DB mapping
      name: courseName,         // frontend -> DB mapping
      department, 
      credits, 
      instructor: faculty,      // frontend -> DB mapping
      duration 
    });
    res.status(201).json(newCourse);
  } catch (err) {
    console.log("POST ERROR:", err);
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/courses/:id - course update kare
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const course = await sequelize.models.Course.findByPk(id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    const updateData = {
      code: req.body.courseCode || req.body.code,
      name: req.body.courseName || req.body.name,
      department: req.body.department,
      credits: req.body.credits,
      instructor: req.body.faculty || req.body.instructor,
      duration: req.body.duration
    };

    await course.update(updateData); 
    res.json(course);
  } catch (err) {
    console.log("PUT ERROR:", err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/courses/:id - course delete kare
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await sequelize.models.Course.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Course not found' });
    
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;