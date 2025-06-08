const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const { name, bio, teachSkills, learnSkills } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, bio, teachSkills, learnSkills },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
