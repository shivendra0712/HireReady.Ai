const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    }, // link to which interview this question belongs
    questionNumber: {
      type: Number,
      
    },
    aiQuestion: {
      type: [String],
      default:[]
    },
    category: {
      type: String,
      enum: ["technical", "behavioral"],
      required: true,
    },
    userAnswer: {
      type: [String], // User's recorded answer
      default:[]
    },
    userAnswerAudio: {
      type: String, // URL to audio file if recorded
    },
    aiAnswer: {
      type: String, // GPT's explanation or model answer
    },
    aiFeedback: {
      type: String, // GPT's feedback on userAnswer
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
questionSchema.index({ sessionId: 1, questionNumber: 1 });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
