const Interview = require('../models/Interview');

// Question bank organized by role
const questionBank = {
  'frontend developer': [
    'What is the difference between let, const, and var in JavaScript?',
    'Explain how the Virtual DOM works in React.',
    'What is the difference between props and state?',
    'How would you optimize a slow-loading webpage?',
    'What are React hooks and why are they used?'
  ],
  'backend developer': [
    'What is the difference between SQL and NoSQL databases?',
    'Explain how middleware works in Express.js.',
    'What is JWT and how does it help with authentication?',
    'How do you handle errors in an asynchronous Node.js function?',
    'What is the difference between REST and GraphQL?'
  ],
  'full stack developer': [
    'Walk me through how data flows from a React frontend to a Node.js backend.',
    'How do you handle authentication across frontend and backend?',
    'What is CORS and why does it matter?',
    'How would you design a database schema for a blog application?',
    'What strategies do you use for deploying a full-stack app?'
  ],
  'general': [
    'Tell me about yourself.',
    'What are your biggest strengths and weaknesses?',
    'Describe a challenging project you worked on.',
    'Where do you see yourself in 5 years?',
    'Why should we hire you?'
  ]
};

// Simple rule-based feedback generator for an answer
const generateFeedback = (question, answer) => {
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;

  if (wordCount === 0) {
    return 'No answer provided. Try to attempt every question, even briefly.';
  }
  if (wordCount < 15) {
    return 'Your answer is quite short. Try to elaborate with examples or specific details.';
  }
  if (wordCount < 40) {
    return 'Decent answer. Adding a real example from your experience would make it stronger.';
  }
  return 'Good, detailed answer! Make sure to stay concise and structured in a real interview.';
};

// START a new interview session
const startInterview = async (req, res) => {
  try {
    const { role } = req.body;
    const roleKey = (role || 'general').toLowerCase();

    const questions = questionBank[roleKey] || questionBank['general'];

    const interview = await Interview.create({
      user: req.user._id,
      role: role || 'General',
      qa: questions.map(q => ({ question: q, answer: '', feedback: '' }))
    });

    res.status(201).json(interview);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SUBMIT answers for an interview session
const submitAnswers = async (req, res) => {
  try {
    const { interviewId, answers } = req.body;
    // answers = [{ questionIndex, answer }]

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    for (let item of answers) {
      const qaItem = interview.qa[item.questionIndex];
      if (qaItem) {
        qaItem.answer = item.answer;
        qaItem.feedback = generateFeedback(qaItem.question, item.answer);
      }
    }

    const totalWords = interview.qa.reduce((sum, qa) => sum + qa.answer.split(/\s+/).filter(Boolean).length, 0);
    interview.overallFeedback = `You answered ${interview.qa.filter(q => q.answer.trim()).length} of ${interview.qa.length} questions, with an average of ${Math.round(totalWords / interview.qa.length)} words per answer. Focus on giving specific examples to strengthen your responses.`;
    interview.status = 'completed';

    await interview.save();

    res.json(interview);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET interview history
const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { startInterview, submitAnswers, getMyInterviews };