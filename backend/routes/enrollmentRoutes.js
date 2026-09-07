const express = require('express');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

/* ENROLL */
router.post('/enroll', isAuthenticated, async (req, res) => {
  try {
    const { courseId } = req.body;
    
    // or you can use below
    // const courseId = req.body.courseId;

    if (!courseId) {
      return res.status(400).json({ message: 'courseId is required' });
    }

    // Look up the course ourselves - never trust a client-supplied title
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollment = await new Enrollment({
      email: req.session.user,      // trust the session, not req.body
      courseTitle: course.title     // trust the DB, not req.body
    }).save();

    res.json({ message: 'Enrolled successfully', enrollment });
  } catch (err) {
    res.status(500).json({ message: 'Error enrolling' });
  }
});

/* GET ALL ENROLLMENTS (ADMIN ONLY) */
router.get('/enrollments', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching enrollments' });
  }
});

/* DELETE ENROLLMENT */
router.delete('/enrollment/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const deleted = await Enrollment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.json({ message: 'Enrollment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting enrollment' });
  }
});

module.exports = router;