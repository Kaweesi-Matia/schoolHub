const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

/* REGISTER */
router.post('/register', async (req, res) => {
  const { email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    return res.json({ message: 'Passwords do not match' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.json({ message: 'User exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  await new User({
    email,
    password: hashedPassword,
    role
  }).save();

  res.json({ message: 'Registered successfully' });
});

/* LOGIN */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    req.session.user = user.email;
    req.session.role = user.role;

    return res.status(200).json({ email: user.email, role: user.role });

  } catch (err) {
    console.error('Login error:', err); // <-- you'll see what's actually failing
    res.status(500).json({ message: 'Server error' });
  }
}); 

/* LOGOUT */
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;