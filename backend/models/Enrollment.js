const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  email: String,
  courseTitle: String
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);