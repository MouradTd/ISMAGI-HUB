const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  // courses: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Course'
  // }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;