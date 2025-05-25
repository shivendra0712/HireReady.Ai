const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    }, // link to which interview this question belongs
    questionNumber: {
      type: Number,
      default:0
    },
    aiQuestion: {
      type: [String],
      default:[]
    },
    userAnswer: {
      type: [String], // User's recorded answer
      default:[]
    },
    userAnswerAudio: {
      type: String, // URL to audio file if recorded
    },
    aiAnswer: {
      type: [String], // GPT's explanation or model answer
      default:[]
    },
    aiFeedback: {
      type: String, // GPT's feedback on userAnswer
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
