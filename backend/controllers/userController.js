
const bcrypt = require('bcryptjs'); // Missing import
const User = require("../models/User");
const { validateInput } = require('../utils/userValidation');


const getProfile = async (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, password, currentPassword } = req.body;
    
    const validationErrors = validateInput(name, email, password);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password) {
      if (!currentPassword) {
        return res.status(400).json({ 
          message: 'Current password is required to update password' 
        });
      }
      
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: user._id } // Exclude current user
      });
      
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    if (name && name.trim() !== user.name) {
      user.name = name.trim();
    }
    
    if (email && email.toLowerCase() !== user.email) {
      user.email = email.toLowerCase();
    }

    if (password) {
      const salt = await bcrypt.genSalt(12); 
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      message: 'Profile updated successfully',
    });

  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

module.exports = {
  getProfile,
  updateProfile
};