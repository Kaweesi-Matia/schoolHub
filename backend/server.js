const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();

/* MIDDLEWARE */
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true
  }
}));

/* DB */
mongoose.connect('mongodb://127.0.0.1:27017/schoolDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

/* ROUTES */
app.use('/api', authRoutes);
app.use('/api', courseRoutes);
app.use('/api', enrollmentRoutes);
app.use('/api', userRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));