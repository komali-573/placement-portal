const Question = require('../models/Question');

// ADD a question (admin only)
const addQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, category, difficulty, marks } = req.body;

    const newQuestion = await Question.create({
      question,
      options,
      correctAnswer,
      category,
      difficulty,
      marks
    });

    res.status(201).json(newQuestion);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all questions (for students)
const getQuestions = async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    // Hide correct answer from students
    const questions = await Question.find(filter).select('-correctAnswer');

    res.json(questions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SUBMIT test and get score
const submitTest = async (req, res) => {
  try {
    const { answers } = req.body;
    // answers = [{ questionId, selectedAnswer }]

    let score = 0;
    let total = 0;
    let results = [];

    for (let answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (question) {
        total += question.marks;
        const isCorrect = question.correctAnswer === answer.selectedAnswer;
        if (isCorrect) score += question.marks;

        results.push({
          questionId: answer.questionId,
          selectedAnswer: answer.selectedAnswer,
          correctAnswer: question.correctAnswer,
          isCorrect
        });
      }
    }

    res.json({
      score,
      total,
      percentage: Math.round((score / total) * 100),
      results
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addQuestion, getQuestions, submitTest };