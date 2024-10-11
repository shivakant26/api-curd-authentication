const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const transporter = require('../configs/nodeMailer');

const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({
      message: 'User created successfully!',
      data: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      // Create a JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role }, // Payload with user ID and role
        process.env.JWT_SECRET || 'your_jwt_secret', // Secret key from environment variable
        { expiresIn: '1h' } // Token expiration time
      );
  
      res.status(200).json({
        message: 'Login successful!',
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  const resetPassword = async (req, res) => {
    try {
      const { resetToken } = req.params;
      const { newPassword } = req.body;
  
      // Find user by reset token and check if the token is still valid
      const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() }, // Check if the token is not expired
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
      }
  
      // Hash the new password and update the user record
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined; // Clear the reset token
      user.resetPasswordExpires = undefined; // Clear the expiration
  
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  const requestPasswordReset = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User with this email does not exist.' });
      }
  
      // Generate a reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
  
      // Set the reset token and its expiration time (1 hour from now)
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
      // Save the updated user with reset token and expiry
      await user.save();
  
      // Send reset email
      const resetUrl = `http://${req.headers.host}/api/reset-password/${resetToken}`;
  
      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset',
        text: `You are receiving this email because you (or someone else) requested a password reset for your account.\n\n
               Please click on the following link, or paste it into your browser to complete the process:\n\n
               ${resetUrl}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({
        message: 'Password reset link sent to your email.',
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


  // Function to handle logout (e.g., clearing the cookie)
const logoutUser = async (req, res) => {
  try {
    // Clear the cookie (if using cookies to store JWT)
    res.clearCookie('token'); // assuming your token is stored as 'token'
    
    res.status(200).json({
      message: 'User logged out successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Logout failed',
      error: error.message,
    });
  }
};



module.exports = {
  createUser,
  loginUser,
  resetPassword,
  requestPasswordReset,
  logoutUser
};
