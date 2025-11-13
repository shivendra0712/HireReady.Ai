const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    interviewType: {
      type: String,
      enum: ["Technical", "Behaviour"],
      default: "Technical",
      required: true,
    },
    experience: {
      type: Number,
      min: 0,
      default: 0,
      required:true
    },
    interviewLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
      required:true
    },
    status: {
      type: String,
      enum: ["Scheduled", "In_progress", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    interviewDuration: {
      type: Number, 
      default: 30,
    },
    userDuration: {
      type: Number, 
      default: 0,
    },
    isCameraOn: {
      type: Boolean,
      default: false,
    },
    isMicOn: {
      type: Boolean,
      default: false,
    },
    overallFeedback: {
      type: String, 
    },
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    interviewerName: {
      type: String,
      default: "AI Interviewer",
    },
    interviewQuestion:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
    },
    interviewDate:{
        type: Date,
    }, 
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;


