const Question = require("../../models/questionModels/question.model.js");
const CustomError = require("../../utils/customError.js");

const createQuestionController = async (req, res, next) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const viewAllQuestionsController = async (req, res, next) => {
  try {
    const filters = req.query; 
    const questions = await Question.find(filters);
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const viewQuestionController = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Not found" });
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateQuestionAnswerController = async (req, res, next) => {
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
     
    );
     res.status(200).json('sucessfully updated');
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteQuestionController = async (req, res, next) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createQuestionController,
  viewAllQuestionsController,
  viewQuestionController, 
  updateQuestionAnswerController , 
  deleteQuestionController
}
