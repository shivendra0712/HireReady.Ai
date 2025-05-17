const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
     aiQuestion: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["technical", "behavioral", "hr"],
      required: true,
    },
    role: {
      type: String,
      enum: [
        "frontend",
        "backend",
        "fullstack",
        "data_scientist",
        "devops",
        "android",
      ],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    userAnswer: {
      type: String, // optional: for MCQ validation
    },
    aiAnswer: {
      type: String, // GPT's explanation or model answer
    },
    aiFeedback: {
      type: String, // GPT's feedback on userAnswer
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
    }, // link to which interview this question belongs

  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
