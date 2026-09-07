const express = require('express');
const Course = require('../models/Course');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

/* ADD COURSE */
router.post('/course', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const course = await new Course({ title: req.body.title }).save();
    res.json({ message: 'Course added', course });
  } catch (err) {
    res.status(500).json({ message: 'Error adding course' });
  }
});

/* GET ALL COURSES */
router.get('/courses', isAuthenticated, async (req, res) => {
  try {
    const courses = await Course.find().sort({ _id: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

/* DELETE COURSE */
router.delete('/course/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course' });
  }
});

module.exports = router;