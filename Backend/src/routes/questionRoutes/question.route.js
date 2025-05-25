const express = require("express");
const router = express.Router();
const questionController = require("../../controllers/questionControllers/question.controller.js");
const authMiddleware = require('../../middlewares/authMiddleware.js')

router.post("/create", authMiddleware , questionController.createQuestionController);
router.get("/view/:id", authMiddleware , questionController.viewQuestionController);
router.put("/update-answer/:id", authMiddleware , questionController.updateQuestionAnswerController);
router.put("/generate-feedback/:id", authMiddleware , questionController.generateFeedbackController);

module.exports = router;
