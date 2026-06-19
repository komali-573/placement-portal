const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  isHidden: { type: Boolean, default: false }
});

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  category: {
    type: String,
    default: 'general'
  },
  testCases: {
    type: [testCaseSchema],
    required: true
  },
  sampleInput: {
    type: String
  },
  sampleOutput: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Problem', problemSchema);