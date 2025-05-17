const Interview = require('../../models/interviewModels/interview.model.js')
const CustomError = require("../../utils/customError.js");

// Create interview
const createController = async (req, res, next) => {
  try {
    const interview = await Interview.create(req.body);
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all interviews
const viewAllInterviewsController = async (req, res, next) => {
  try {
    const interviews = await Interview.find().populate("userId");
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get interview by ID
const viewInterviewController = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id).populate("userId");
    if (!interview) return res.status(404).json({ error: "Interview not found" });
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update interview
const updateController = async (req, res, next) => {
  try {
    const updated = await Interview.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Interview not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete interview
const deleteController = async (req, res, next) => {
  try {
    const deleted = await Interview.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Interview not found" });
    res.status(200).json({ message: "Interview deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createController,
    viewAllInterviewsController,
    viewInterviewController,
    updateController,
    deleteController
 }