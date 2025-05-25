const express = require("express");
const router = express.Router();
const interviewController = require("../../controllers/interviewControllers/interview.controller.js");
const authMiddleware = require('../../middlewares/authMiddleware.js')

router.post("/create", authMiddleware, interviewController.createController);
router.get("/view-all", authMiddleware, interviewController.viewAllInterviewsController);
router.get("/view/:id", authMiddleware, interviewController.viewInterviewController);
router.put("/start/:id", authMiddleware, interviewController.startInterviewController);
router.put("/end/:id", authMiddleware, interviewController.endInterviewController);

module.exports = router;


