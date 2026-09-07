const express = require('express');
const User = require('../models/User');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

const router = express.Router();

/* GET ALL USERS */
router.get('/users', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

/* DELETE USER */
router.delete('/user/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;