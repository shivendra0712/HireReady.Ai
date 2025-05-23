const Interview = require('../../models/interviewModels/interview.model.js');
const Question = require('../../models/questionModels/question.model.js');
const CustomError = require("../../utils/customError.js");

// Create interview
const createController = async (req, res, next) => {
  try {
    // Create a new interview with the provided data
    const interview = await Interview.create(req.body);
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all interviews with filtering options
const viewAllInterviewsController = async (req, res, next) => {
  try {
    const { userId, status, interviewType, sort = '-createdAt' } = req.query;

    // Build filter object based on query parameters
    const filter = {};
    if (userId) filter.userId = userId;
    if (status) filter.status = status;
    if (interviewType) filter.interviewType = interviewType;

    // Find interviews with filters and sort
    const interviews = await Interview.find(filter)
      .populate("userId", "username email")
      .sort(sort)
      .lean();

    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get interview by ID with related questions
const viewInterviewController = async (req, res, next) => {
  try {
    // Extract ID from params, ensuring the colon is handled
    const interviewId = req.params.id.startsWith(':')
      ? req.params.id.substring(1)
      : req.params.id;

    // Find interview and populate user data
    const interview = await Interview.findById(interviewId)
      .populate("userId", "username email");

    if (!interview) return res.status(404).json({ error: "Interview not found" });

    // Find related questions for this interview
    const questions = await Question.find({ sessionId: interviewId })
      .sort('questionNumber')
      .lean();

    // Combine interview data with questions
    const result = {
      ...interview.toObject(),
      questions
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update interview
const updateController = async (req, res, next) => {
  try {
    // Extract ID from params, ensuring the colon is handled
    const interviewId = req.params.id.startsWith(':')
      ? req.params.id.substring(1)
      : req.params.id;

    // Calculate duration if both startTime and endTime are provided
    if (req.body.endTime && req.body.startTime) {
      const startTime = new Date(req.body.startTime);
      const endTime = new Date(req.body.endTime);
      req.body.duration = Math.floor((endTime - startTime) / 1000); // Duration in seconds
    }

    // Update the interview
    const updated = await Interview.findByIdAndUpdate(
      interviewId,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Interview not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Start interview - update status and startTime
const startInterviewController = async (req, res, next) => {
  try {
    // Extract ID from params, ensuring the colon is handled
    const interviewId = req.params.id.startsWith(':')
      ? req.params.id.substring(1)
      : req.params.id;

    // Update interview status and startTime
    const updated = await Interview.findByIdAndUpdate(
      interviewId,
      {
        status: 'in_progress',
        startTime: new Date(),
        isCameraOn: req.body.isCameraOn || false,
        isMicOn: req.body.isMicOn || false
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Interview not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// End interview - update status, endTime, and calculate duration
const endInterviewController = async (req, res, next) => {
  try {
    // Extract ID from params, ensuring the colon is handled
    const interviewId = req.params.id.startsWith(':')
      ? req.params.id.substring(1)
      : req.params.id;

    // Get the current interview to calculate duration
    const interview = await Interview.findById(interviewId);
    if (!interview) return res.status(404).json({ error: "Interview not found" });

    const endTime = new Date();
    const startTime = interview.startTime || interview.createdAt;
    const duration = Math.floor((endTime - startTime) / 1000); // Duration in seconds

    // Update interview with end details
    const updated = await Interview.findByIdAndUpdate(
      interviewId,
      {
        status: 'completed',
        endTime,
        duration,
        ...req.body // Allow additional updates from request body
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete interview and its related questions
const deleteController = async (req, res, next) => {
  try {
    // Extract ID from params, ensuring the colon is handled
    const interviewId = req.params.id.startsWith(':')
      ? req.params.id.substring(1)
      : req.params.id;

    // Start a session for transaction
    const session = await Interview.startSession();
    session.startTransaction();

    try {
      // Delete the interview
      const deleted = await Interview.findByIdAndDelete(interviewId).session(session);
      if (!deleted) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ error: "Interview not found" });
      }

      // Delete all related questions
      await Question.deleteMany({ sessionId: interviewId }).session(session);

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        message: "Interview and related questions deleted successfully"
      });
    } catch (error) {
      // If an error occurs, abort the transaction
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createController,
  viewAllInterviewsController,
  viewInterviewController,
  updateController,
  startInterviewController,
  endInterviewController,
  deleteController
}