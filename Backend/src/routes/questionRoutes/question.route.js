const express = require("express");
const router = express.Router();
const questionController = require("../../controllers/questionControllers/question.controller.js");

router.post("/create", questionController.createQuestionController);
router.get("/view-all-questions", questionController.viewAllQuestionsController);
router.get("/view-question:id", questionController.viewQuestionController);
router.put("/update-question-answer:id", questionController.updateQuestionAnswerController);
router.delete("/delete:id", questionController.deleteQuestionController);

module.exports = router;
