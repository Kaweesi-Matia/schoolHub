const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String
});

module.exports = mongoose.model('Course', courseSchema);