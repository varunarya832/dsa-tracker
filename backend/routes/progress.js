const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Progress = require('../models/Progress');

 
router.get('/', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.userId });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

 
router.post('/:problemId', auth, async (req, res) => {
  try {
    const { completed, notes } = req.body;
    
    let progress = await Progress.findOneAndUpdate(
      { userId: req.userId, problemId: req.params.problemId },
      { 
        completed,
        notes,
        completedAt: completed ? new Date() : null
      },
      { new: true, upsert: true }
    );
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;