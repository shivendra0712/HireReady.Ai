const Question = require("../../models/questionModels/question.model.js");
const Interview = require("../../models/interviewModels/interview.model.js");
const CustomError = require("../../utils/customError.js");
const { useGemini } = require('../../services/googleGemini.js');

const createQuestionController = async (req, res, next) => {
  try {
    const { interviewId } = req.body;
    console.log("create question controller interviewId", interviewId);

    if (!interviewId) {
      return next(new CustomError('All fields are required', 400));
    }

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return next(new CustomError('Interview not found', 400));
    }

    // Create empty question
    const question = await Question.create({
      interviewId: interview._id,
    });

    if (!question) {
      return next(new CustomError('Question creation failed', 400));
    }

    const { jobTitle, experience, interviewType, interviewLevel } = interview;

    // Generate AI Questions
    const interviewQuestions = async (jobTitle, experience, interviewType, interviewLevel, questionId) => {
      const interviewQuestionsAiOutput = await useGemini(jobTitle, experience, interviewType, interviewLevel);

      const rawString = `${interviewQuestionsAiOutput}`;
      const geminiQuestions = rawString
        .trim()
        .split(/\d+\.\s+/)
        .filter(Boolean)
        .map(q => q.trim());

      console.log("Generated Gemini Questions:", geminiQuestions);

      // Update the question document
      const updatedQuestion = await Question.findById(questionId);
      updatedQuestion.aiQuestion = geminiQuestions; // directly assign array
      await updatedQuestion.save();

      console.log("Saved Updated Question:", updatedQuestion);
    };

    // ❗ Await this
    await interviewQuestions(jobTitle, experience, interviewType, interviewLevel, question._id);

    // Link to interview
    interview.interviewQuestion = question._id;
    await interview.save();

    res.status(201).json({ message: 'Questions created successfully', data: question });

    
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};




// Get question by ID
const viewQuestionController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return next(new CustomError('Question not found', 404));
    }
    res.status(200).json({ message: 'question', data: question });

  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// Update question answer and related fields
const updateQuestionAnswerController = async (req, res, next) => {
  try {

    const { id } = req.params;

    const question = await Question.findById(id);
    if (!question) {
      return next(new CustomError('Question not found', 404));
    }

    const { userAnswer } = req.body;

    const updated = await Question.findByIdAndUpdate(
      id, {
      userAnswer
    },
      { new: true }
    );

    if (!updated) {
      return next(new CustomError('Question not found', 404));
    }

    res.status(200).json({ message: 'UserAnswer updated successfully', data: updated });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// Generate AI feedback for a question
const generateFeedbackController = async (req, res, next) => {
  try {

    const { id } = req.params;

    const question = await Question.findById(id);
    if (!question) {
      return next(new CustomError('Question not found', 404));
    }

    const { aiAnswer } = req.body;

    const updated = await Question.findByIdAndUpdate(
      id, {
      aiAnswer
    },
      { new: true }
    );

    if (!updated) {
      return next(new CustomError('Question not found', 404));
    }

    res.status(200).json({ message: 'AiAnswer updated  successfully', data: updated });

    res.status(200).json(updated);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = {
  createQuestionController,
  viewQuestionController,
  updateQuestionAnswerController,
  generateFeedbackController
}
