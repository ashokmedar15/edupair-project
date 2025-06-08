const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  teachSkills: {
    type: [String],
    default: [],
    maxLength: 3
  },
  learnSkills: {
    type: [String],
    default: [],
    maxLength: 3
  }
});

module.exports = mongoose.model('User', userSchema);
