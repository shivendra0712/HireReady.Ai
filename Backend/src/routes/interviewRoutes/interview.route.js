const express = require("express");
const router = express.Router();
const questionController = require("../../controllers/interviewControllers/interview.controller.js");

router.post("/create", questionController.createController);
router.get("/view-all-interview", questionController.viewAllInterviewsController);
router.get("/view-interview:id", questionController.viewInterviewController);
router.put("/update:id", questionController.updateController);
router.delete("/delete:id", questionController.deleteController);

module.exports = router;

