const Question = require("../../models/questionModels/question.model.js");
const Interview = require("../../models/interviewModels/interview.model.js");
const CustomError = require("../../utils/customError.js");
const { useGemini } = require('../../services/googleGemini.js');
const { aiAnswerGemini } = require("../../services/aiAnswerGemini.js");

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

    const { userAnswersInFrontend, userQuestionsInFrontend } = req.body;

    console.log('userAnswer and userQuestion in backend ------> ', userAnswersInFrontend, userQuestionsInFrontend);

    const updated = await Question.findByIdAndUpdate(
      id, {
      userQuestion: userQuestionsInFrontend,
      userAnswer: userAnswersInFrontend
    },
      { new: true }
    );
    if (!updated) {
      return next(new CustomError('Question not found', 404));
    }

    //  console.log('updated questions and answer -------------> ', updated);
    const { userQuestion, userAnswer, aiAnswer } = updated;

    const aiAnswerGenerate = async (question, answer) => {
      return await aiAnswerGemini(question, answer); // Gemini se feedback laa raha hai
    };

    const newAiAnswers = [];

    for (let i = 0; i < userQuestion.length; i++) {
      const question = userQuestion[i];
      const answer = userAnswer[i] || ""; // Agar answer missing hai toh empty string

      try {
        const feedback = await aiAnswerGenerate(question, answer);
        console.log("Updated interview with single answer feedback:", feedback);
        newAiAnswers.push(feedback);
      } catch (error) {
        console.error(`Error on question ${i}:`, error);
        newAiAnswers.push("Error generating feedback");
      }
    }

    const cleanedAiAnswers = newAiAnswers.map(answer =>
      answer.replace(/\n/g, ' ').trim()
    );

    console.log("Updated interview with newAiAnswers feedback:", cleanedAiAnswers);
    // Ab updated object me set karo:
    updated.aiAnswer = cleanedAiAnswers;

    // Optionally update in DB:
    await updated.save(); // if it's a mongoose document

    console.log("Updated interview with AI feedback:", updated);


    res.status(200).json({ message: 'UserAnswer updated successfully', data: updated });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// Generate AI feedback for a question
const feedbackController = async (req, res, next) => {
  try {

    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return next(new CustomError('Question not found', 404));
    }

    res.status(200).json({ message: 'question feedback', data: question });

  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = {
  createQuestionController,
  viewQuestionController,
  updateQuestionAnswerController,
  feedbackController
}
