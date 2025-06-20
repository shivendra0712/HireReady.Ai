const express = require("express");
const router = express.Router();
const questionController = require("../../controllers/questionControllers/question.controller.js");
const authMiddleware = require('../../middlewares/authMiddleware.js')

router.post("/create", authMiddleware , questionController.createQuestionController);
router.get("/view/:id", authMiddleware , questionController.viewQuestionController);
router.put("/update-answer/:id", authMiddleware , questionController.updateQuestionAnswerController);
router.get("/feedback/:id", authMiddleware , questionController.feedbackController);

module.exports = router;
