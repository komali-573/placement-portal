const Problem = require('../models/Problem');
const Submission = require('../models/Submission');

// ADD a problem (admin)
const addProblem = async (req, res) => {
  try {
    const { title, description, difficulty, category, testCases, sampleInput, sampleOutput } = req.body;

    const problem = await Problem.create({
      title,
      description,
      difficulty,
      category,
      testCases,
      sampleInput,
      sampleOutput
    });

    res.status(201).json(problem);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all problems (students - hides hidden test cases)
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find().select('-testCases');
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single problem by id
const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).select('-testCases.expectedOutput');
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SAVE a code submission (execution comes later)
const submitCode = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    const submission = await Submission.create({
      user: req.user._id,
      problem: problemId,
      code,
      language,
      status: 'pending' // will become 'passed' / 'failed' once Judge0 is added
    });

    res.status(201).json({
      message: 'Submission saved! Code execution will be added soon.',
      submission
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProblem, getProblems, getProblemById, submitCode };