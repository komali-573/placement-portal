const Resume = require('../models/Resume');
const pdfParse = require('pdf-parse');
const fs = require('fs');

// Simple rule-based "AI-style" analyzer (no external API needed)
const mockAnalyze = (text) => {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const lower = text.toLowerCase();

  const keywords = ['project', 'experience', 'skills', 'education', 'internship', 'github', 'linkedin'];
  const foundKeywords = keywords.filter(k => lower.includes(k));

  let score = 40;
  score += foundKeywords.length * 7;
  if (wordCount > 150) score += 10;
  if (wordCount > 300) score += 10;
  score = Math.min(score, 95);

  const strengths = [];
  const weaknesses = [];

  if (lower.includes('project')) strengths.push('Includes relevant projects');
  if (lower.includes('skills')) strengths.push('Lists technical skills clearly');
  if (lower.includes('github') || lower.includes('linkedin')) strengths.push('Includes professional links');
  if (strengths.length === 0) strengths.push('Resume has basic structure');

  if (!lower.includes('project')) weaknesses.push('No clear projects section found');
  if (!lower.includes('skills')) weaknesses.push('Skills section missing or unclear');
  if (wordCount < 150) weaknesses.push('Resume content seems too short');
  if (weaknesses.length === 0) weaknesses.push('Consider adding quantifiable achievements');

  return {
    score,
    feedback: `This resume scored ${score}/100 based on structure and keyword presence. It contains approximately ${wordCount} words and covers ${foundKeywords.length} of ${keywords.length} key resume sections.`,
    strengths,
    weaknesses
  };
};

// UPLOAD and analyze resume
const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    fs.unlinkSync(req.file.path);

    const analysis = mockAnalyze(extractedText);

    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      extractedText,
      score: analysis.score,
      feedback: analysis.feedback,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses
    });

    res.status(201).json(resume);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET user's resume history
const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).select('-extractedText');
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { analyzeResume, getMyResumes };