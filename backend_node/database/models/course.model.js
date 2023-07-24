
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor'
  },
  // video: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Video'
  // }
  url: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;