const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },
    questionNumber: {
      type: Number,
      default:0
    },
    aiQuestion: {
      type: [String],
      default:[]
    },
    userAnswer: {
      type: [String], 
      default:[]
    },
    userAnswerAudio: {
      type: String, 
    },
    aiAnswer: {
      type: [String], 
      default:[]
    },
    aiFeedback: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
