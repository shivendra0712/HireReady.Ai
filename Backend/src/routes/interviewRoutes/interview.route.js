const express = require("express");
const router = express.Router();
const interviewController = require("../../controllers/interviewControllers/interview.controller.js");

// Create a new interview
router.post("/create", interviewController.createController);

// Get all interviews with optional filtering
router.get("/view-all", interviewController.viewAllInterviewsController);

// Get interview by ID with related questions
router.get("/view/:id", interviewController.viewInterviewController);

// Update interview details
// router.put("/update/:id", interviewController.updateController);

// Start an interview - update status and startTime
router.put("/start/:id", interviewController.startInterviewController);

// End an interview - update status, endTime, and calculate duration
router.put("/end/:id", interviewController.endInterviewController);

// Delete interview and its related questions
// router.delete("/delete/:id", interviewController.deleteController);

module.exports = router;

