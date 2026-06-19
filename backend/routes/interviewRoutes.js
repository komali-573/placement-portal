const express = require('express');
const router = express.Router();
const {
  startInterview,
  submitAnswers,
  getMyInterviews
} = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

// Start a new interview session
router.post('/start', protect, startInterview);

// Submit answers for a session
router.post('/submit', protect, submitAnswers);

// Get my interview history
router.get('/my-interviews', protect, getMyInterviews);

module.exports = router;