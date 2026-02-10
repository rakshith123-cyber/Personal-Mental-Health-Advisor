const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

router.put('/update', auth, async (req, res) => {
  try {
    const { name, age, preferredTopics } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, age, preferredTopics, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router;
