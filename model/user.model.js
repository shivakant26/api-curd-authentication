const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'teacher', 'student', 'staff'],
    default: 'user', 
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, {
  timestamps: true,
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
