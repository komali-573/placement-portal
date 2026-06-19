const express = require('express');
const router = express.Router();
const {
  addProblem,
  getProblems,
  getProblemById,
  submitCode
} = require('../controllers/problemController');
const { protect } = require('../middleware/authMiddleware');

// Add problem (admin)
router.post('/add', protect, addProblem);

// Get all problems
router.get('/', protect, getProblems);

// Get single problem
router.get('/:id', protect, getProblemById);

// Submit code
router.post('/submit', protect, submitCode);

module.exports = router;