const mongoose = require('mongoose');

const qaSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, default: '' },
  feedback: { type: String, default: '' }
});

const interviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    required: true
  },
  qa: {
    type: [qaSchema],
    default: []
  },
  overallFeedback: {
    type: String
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Interview', interviewSchema);