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
      enum: ["technical", "behavioral"],
      default: "technical",
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
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
      required:true
    },
    status: {
      type: String,
      enum: ["scheduled", "in_progress", "completed", "cancelled"],
      default: "scheduled",
    },
    interviewDuration: {
      type: Number, // Duration in min.
      default: 30,
    },
    userInterviewDuration: {
      type: Number, // Duration in min.
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
      type: String, // AI or evaluator feedback
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
    Questions:{
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

// // Virtual for getting all questions related to this interview
// interviewSchema.virtual('questions', {
//   ref: 'Question',
//   localField: '_id',
//   foreignField: 'sessionId'
// });

// // Set toJSON option to include virtuals
// interviewSchema.set('toJSON', { virtuals: true });
// interviewSchema.set('toObject', { virtuals: true });

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
