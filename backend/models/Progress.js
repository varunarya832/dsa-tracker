const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  problemId: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    default: '',
  },
  completedAt: {
    type: Date,
  },
});

progressSchema.index({ userId: 1, problemId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);