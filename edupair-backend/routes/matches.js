const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId).select('teachSkills learnSkills');
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    const matches = await User.find({
      _id: { $ne: req.user.userId },
      teachSkills: { $in: currentUser.learnSkills },
      learnSkills: { $in: currentUser.teachSkills }
    }).select('name email bio teachSkills learnSkills');
    res.json(matches);
  } catch (error) {
    console.error('Error in /api/matches:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;