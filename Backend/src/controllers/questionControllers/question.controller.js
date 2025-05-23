const Question = require("../../models/questionModels/question.model.js");
const Interview = require("../../models/interviewModels/interview.model.js");
const CustomError = require("../../utils/customError.js");

// Create a new question
const createQuestionController = async (req, res, next) => {
  try {
    // Check if the interview exists
    if (req.body.sessionId) {
      const interview = await Interview.findById(req.body.sessionId);
      if (!interview) {
        return res.status(404).json({ error: "Interview not found" });
      }
    }

    // If questionNumber is not provided, find the next available number
    if (!req.body.questionNumber && req.body.sessionId) {
      const lastQuestion = await Question.findOne(
        { sessionId: req.body.sessionId },
        {},
        { sort: { questionNumber: -1 } }
      );

      req.body.questionNumber = lastQuestion ? lastQuestion.questionNumber + 1 : 1;
    }

    // Set startTime if not provided
    if (!req.body.startTime) {
      req.body.startTime = new Date();
    }

    // Create the new question
    const newQuestion = await Question.create(req.body);
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all questions with filtering and sorting
const viewAllQuestionsController = async (req, res, next) => {
  try {
    const {
      sessionId,
      userId,
      category,
      role,
      difficulty,
      status,
      sort = 'questionNumber'
    } = req.query;

    // Build filter object based on query parameters
    const filter = {};
    if (sessionId) filter.sessionId = sessionId;
    if (userId) filter.userId = userId;
    if (category) filter.category = category;
    if (role) filter.role = role;
    if (difficulty) filter.difficulty = difficulty;
    if (status) filter.status = status;

    // Find questions with filters and sort
    const questions = await Question.find(filter)
      .sort(sort)
      .lean();

    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get question by ID
const viewQuestionController = async (req, res, next) => {
  try {
    // Extract ID from params, ensuring the colon is handled
    const questionId = req.params.id.startsWith(':')
      ? req.params.id.substring(1)
      : req.params.id;

    // Find the question and populate interview data
    const question = await Question.findById(questionId)
      .populate('sessionId', 'jobTitle interviewType status');

    if (!question) return res.status(404).json({ error: "Question not found" });

    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update question answer and related fields
const updateQuestionAnswerController = async (req, res, next) => {
  try {
    // Extract ID from params, ensuring the colon is handled
    const questionId = req.params.id.startsWith(':')
      ? req.params.id.substring(1)
      : req.params.id;

    // Find the current question
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    // If providing an answer, update status and set endTime
    if (req.body.userAnswer && question.status === 'pending') {
      req.body.status = 'answered';
      req.body.endTime = new Date();

      // Calculate answer duration if startTime exists
      if (question.startTime) {
        const startTime = new Date(question.startTime);
        const endTime = new Date(req.body.endTime);
        req.body.answerDuration = Math.floor((endTime - startTime) / 1000); // Duration in seconds
      }
    }

    // If providing AI feedback, update status
    if (req.body.aiFeedback && question.status === 'answered') {
      req.body.status = 'evaluated';
    }

    // Update the question
    const updated = await Question.findByIdAndUpdate(
      questionId,
      req.body,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Skip a question
const skipQuestionController = async (req, res, next) => {
  try {
    // Extract ID from params, ensuring the colon is handled
    const questionId = req.params.id.startsWith(':')
      ? req.params.id.substring(1)
      : req.params.id;

    // Update the question status to skipped
    const updated = await Question.findByIdAndUpdate(
      questionId,
      {
        status: 'skipped',
        endTime: new Date(),
        ...req.body // Allow additional updates
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Question not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a question
const deleteQuestionController = async (req, res, next) => {
  try {
    // Extract ID from params, ensuring the colon is handled
    const questionId = req.params.id.startsWith(':')
      ? req.params.id.substring(1)
      : req.params.id;

    // Delete the question
    const deleted = await Question.findByIdAndDelete(questionId);

    if (!deleted) return res.status(404).json({ error: "Question not found" });

    // If this was part of an interview, reorder remaining questions
    if (deleted.sessionId) {
      // Get all questions for this interview
      const questions = await Question.find({
        sessionId: deleted.sessionId,
        questionNumber: { $gt: deleted.questionNumber }
      });

      // Update question numbers for all subsequent questions
      for (const question of questions) {
        await Question.updateOne(
          { _id: question._id },
          { $inc: { questionNumber: -1 } }
        );
      }
    }

    res.status(200).json({
      message: "Question deleted successfully",
      deletedQuestion: deleted
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generate AI feedback for a question
const generateFeedbackController = async (req, res, next) => {
  try {
    // Extract ID from params, ensuring the colon is handled
    const questionId = req.params.id.startsWith(':')
      ? req.params.id.substring(1)
      : req.params.id;

    // Find the question
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    // Check if question has been answered
    if (question.status !== 'answered') {
      return res.status(400).json({
        error: "Cannot generate feedback for a question that hasn't been answered"
      });
    }

    // In a real implementation, this would call an AI service
    // For now, we'll simulate with a placeholder
    const feedback = `This is simulated AI feedback for the answer: "${question.userAnswer}"`;
    const score = Math.floor(Math.random() * 41) + 60; // Random score between 60-100

    // Update the question with feedback
    const updated = await Question.findByIdAndUpdate(
      questionId,
      {
        aiFeedback: feedback,
        score: score,
        status: 'evaluated'
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createQuestionController,
  viewAllQuestionsController,
  viewQuestionController,
  updateQuestionAnswerController,
  skipQuestionController,
  deleteQuestionController,
  generateFeedbackController
}
