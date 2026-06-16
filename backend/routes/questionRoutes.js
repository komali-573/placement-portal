const express = require('express');
const router = express.Router();
const {
  addQuestion,
  getQuestions,
  submitTest
} = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

// Add question (protected - admin only)
router.post('/add', protect, addQuestion);

// Get all questions (protected - students)
router.get('/', protect, getQuestions);

// Submit test (protected)
router.post('/submit', protect, submitTest);

module.exports = router;