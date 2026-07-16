const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');
const { Student, Course } = sequelize.models;

// 1. Student ko Course me enroll kare
// POST /api/enroll
router.post('/', async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    
    const student = await Student.findByPk(studentId);
    const course = await Course.findByPk(courseId);
    
    if (!student || !course) return res.status(404).json({ error: 'Student or Course not found' });
    
    await student.addCourse(course); // Sequelize auto junction table me entry daal dega
    res.json({ message: `${student.name} enrolled in ${course.name}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. 1 Student ke saare Courses
// GET /api/enroll/student/1
router.get('/student/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, { include: Course });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. 1 Course ke saare Students
// GET /api/enroll/course/1
router.get('/course/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, { include: Student });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Enroll hatao
// DELETE /api/enroll
router.delete('/', async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const student = await Student.findByPk(studentId);
    const course = await Course.findByPk(courseId);
    await student.removeCourse(course);
    res.json({ message: 'Removed from course' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;