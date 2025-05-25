const Interview = require('../../models/interviewModels/interview.model.js');
const Question = require('../../models/questionModels/question.model.js');
const User = require('../../models/userModels/user.model.js')
const CustomError = require("../../utils/customError.js");

// Create interview
const createController = async (req, res, next) => {
  try {
    const { jobTitle, interviewType, experience, interviewLevel } = req.body;

    if (!jobTitle && !interviewLevel && !experience && !interviewLevel) {
      return next(new CustomError('All fields is required', 400))
    }

    const interview = await Interview.create({
      userId: req.user._id,
      jobTitle,
      interviewType,
      experience,
      interviewLevel
    });

    if (!interview) {
      return next(new CustomError('Error in creating interview', 400));
    }
    const user = await req.user;


    // const newuser = await User.findById(user._id)

    user.userInterviews.push(interview._id)
    await user.save()

    res.status(201).json({ message: 'Interview create successfully', data: interview });

  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};


// Get all interviews with filtering options
const viewAllInterviewsController = async (req, res, next) => {
  try {

    const user = await req.user;

    // const newuser = await User.findById(user._id)

    // if (!newuser) {
    //   return next(new CustomError('user is not found', 404));
    // }

    const interviews = await Interview.find({ userId: user._id });

    if (!interviews) {
      return next(new CustomError('user is not give any interview', 404));
    }


    res.status(200).json({ message: 'user have given Interviews', data: interviews });

  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// Get interview by ID with related questions
const viewInterviewController = async (req, res, next) => {
  try {
    // Extract ID from params, ensuring the colon is handled
    const { id } = req.params;
    console.log(id)
    const user = await req.user;
    // const newuser = await User.findById(user._id)

    // if (!newuser) {
    //   return next(new CustomError('user is not found', 404));
    // }

    const interview = await Interview.findById(id);

    if (!interview) {
      return next(new CustomError('Interview not found', 404));
    }

    res.status(200).json({ message: 'user have given Interview', data: interview });

  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// Start interview - update status and startTime
const startInterviewController = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const user = await req.user;

    // const newuser = await User.findById(user._id)

    // if (!newuser) {
    //   return next(new CustomError('user is not found', 404));
    // }

    const { isCameraOn, isMicOn, status } = req.body;

    const updated = await Interview.findByIdAndUpdate(
      id,
      {
        status: status,
        isCameraOn: isCameraOn || false,
        isMicOn: isMicOn || false
      },
      { new: true }
    );

    if (!updated) {
      return next(new CustomError('Interview not found', 404));
    }

    res.status(200).json({ message: 'Interview started successfully', data: updated });

  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// End interview - update status, endTime, and calculate duration
const endInterviewController = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const user = await req.user;
    // const newuser = await User.findById(user._id)

    // if (!newuser) {
    //   return next(new CustomError('user is not found', 404));
    // }

    const { status, interviewDuration } = req.body;

    const updated = await Interview.findByIdAndUpdate(
      id,
      {
        status,
        interviewDuration,
        interviewDate: Date()
      },
      { new: true }
    );

    if (!updated) {
      return next(new CustomError('Interview not found', 404));
    }
    
    res.status(200).json({ message: 'Interview ended successfully', data: updated });

  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};


module.exports = {
  createController,
  viewAllInterviewsController,
  viewInterviewController,
  startInterviewController,
  endInterviewController
}