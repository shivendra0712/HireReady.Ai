import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createInterviewService } from '../../API/interviewService.js'
import { createQuestionService } from '../../API/questionService.js'
import DashboardNav from './DashboardNav.jsx';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';



const Interview = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);


  const handleInterviewSubmit = (data) => {
    if (user?.available > 0) {
      onSubmit(data)
    } else {
      toast.warning("Please purchase more interviews.")
      paymentHandler();
    }
  };

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    const response = await createInterviewService(data);
    let interviewData = {
      interviewId: response.data.data._id
    }
    console.log(interviewData);
    const questionResponse = await createQuestionService(interviewData);

    console.log(questionResponse)
    // console.log(response.data.data);

    navigate(`/interview/join/${response.data.data._id}`);
  };

  const paymentHandler = () => {
    navigate('/pricing');
  }

  return (
    <div className="w-full min-h-full lg:p-2 bg-[#18181B] lg:rounded-2xl  px-6 py-4 lg:px-20">

      <DashboardNav />

      <div className="flex-1 py-8 px-2 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-between md:items-center mb-8">
          <h1 className="text-2xl font-semibold">Create an interview</h1>
          <div className="flex items-center space-x-4">

            <button onClick={paymentHandler} className="bg-[#BEF264] hover:bg-green-500 text-black font-medium py-2 px-4 rounded-md text-sm outline-none">
              Buy more interviews
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleInterviewSubmit)} className="mb-8">
          <h2 className="text-xl font-medium mb-2">Interview details</h2>
          <p className="text-gray-400 mb-6">Give the job details you want to apply for</p>

          {/* Job title */}
          <div className="mb-6">
            <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">Job title</label>
            <input
              type="text"
              id="jobTitle"
              {...register("jobTitle", { required: "Job title is required" })}
              className="w-full bg-[#242427] border border-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Frontend Developer"
            />
            {errors.jobTitle && <p className="text-red-500 text-xs">{errors.jobTitle.message}</p>}
          </div>

          {/* Experience */}
          <div className="mb-6">
            <label htmlFor="experience" className="block text-sm font-medium mb-2">Experience (in years)</label>
            <input
              type="number"
              id="experience"
              {...register("experience", {
                required: "Experience is required",
                min: { value: 0, message: "Min 0 years" },
                max: { value: 100, message: "Max 100 years" }
              })}
              className="w-full bg-[#242427] border border-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. 2"
            />
            {errors.experience && <p className="text-red-500 text-xs">{errors.experience.message}</p>}
          </div>

          {/* Interview type */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Interview Type</label>
            <div className="flex gap-6">
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  value="Technical"
                  {...register("interviewType", { required: true })}
                  defaultChecked
                  className="form-radio text-green-500 focus:ring-green-500"
                />
                <span className="ml-2 font-medium">Technical</span>
              </label>

              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  value="Behaviour"
                  {...register("interviewType")}
                  className="form-radio text-green-500 focus:ring-green-500"
                />
                <span className="ml-2 font-medium">Behaviour</span>
              </label>
            </div>
            {errors.interviewType && <p className="text-red-500 text-xs">Please select interview type</p>}
          </div>

          {/* Interview level */}
          <div className="mb-6">
            <label htmlFor="interviewLevel" className="block text-sm font-medium mb-2">Difficulty Level</label>
            <select
              id="interviewLevel"
              {...register("interviewLevel", { required: "Interview level is required" })}
              className="w-full bg-[#242427] border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {errors.interviewLevel && <p className="text-red-500 text-xs">{errors.interviewLevel.message}</p>}
          </div>

          {/* Continue button */}
          <div className="mt-8">
            <button
              type="submit"
              className="bg-[#BEF264] hover:bg-green-500 text-black text-sm font-medium py-2 px-6 rounded-md"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Interview;
