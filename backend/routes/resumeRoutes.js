const express = require('express');
const router = express.Router();
const { analyzeResume, getMyResumes } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Upload and analyze resume
router.post('/analyze', protect, upload.single('resume'), analyzeResume);

// Get my resume history
router.get('/my-resumes', protect, getMyResumes);

module.exports = router;