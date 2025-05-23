const express = require("express");
const router = express.Router();
const questionController = require("../../controllers/questionControllers/question.controller.js");

// Create a new question
router.post("/create", questionController.createQuestionController);

// Get all questions with optional filtering
// router.get("/view-all", questionController.viewAllQuestionsController);

// Get question by ID
router.get("/view/:id", questionController.viewQuestionController);

// Update question answer and related fields
router.put("/update-answer/:id", questionController.updateQuestionAnswerController);

// Skip a question
// router.put("/skip/:id", questionController.skipQuestionController);

// Generate AI feedback for a question
router.post("/generate-feedback/:id", questionController.generateFeedbackController);

// Delete a question
// router.delete("/delete/:id", questionController.deleteQuestionController);

module.exports = router;
