const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const mockDb = require('../mockDb');

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await mockDb.findUserById(req.userId);
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

router.put('/update', auth, async (req, res) => {
  try {
    const { name, age, preferredTopics } = req.body;
    const user = await mockDb.updateUser(req.userId, {
      name,
      age,
      preferredTopics,
      updatedAt: new Date(),
    });

    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router;
