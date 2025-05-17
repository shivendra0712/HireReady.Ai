const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    overallFeedback: {
      type: String, // AI or evaluator feedback
    },
  },
  {
    timestamps: true,
  }
);


const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
