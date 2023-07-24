const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  
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

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;