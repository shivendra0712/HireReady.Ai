import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {createInterviewService} from '../API/interviewService.js'

const Interview = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit =async (data) => {
    console.log('Form data:', data);
    const response = await createInterviewService(data);
    console.log(response);
    
<<<<<<< HEAD
    // navigate('/interview/join/1');
=======
    navigate('/interview/join/1');
>>>>>>> 5c8e2942e1892e8be3649848de49682990283c24
  };

 
  return (
    <div className="flex w-full h-full bg-[#18181B] rounded-2xl px-20">
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Create an interview</h1>
          <div className="flex items-center space-x-4">
            <div className="text-red-500 text-xs bg-[#2E1D1F] py-1 px-2 font-medium rounded-lg">
              <span className="font-bold">0</span> interviews left
            </div>
            <button className="bg-[#BEF264] hover:bg-green-500 text-black font-medium py-2 px-4 rounded-md text-sm">
              Buy more interviews
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Interview details</h2>
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
                  value="technical"
                  {...register("interviewType", { required: true })}
                  defaultChecked
                  className="form-radio text-green-500 focus:ring-green-500"
                />
                <span className="ml-2">Technical</span>
              </label>

              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  value="behaviour"
                  {...register("interviewType")}
                  className="form-radio text-green-500 focus:ring-green-500"
                />
                <span className="ml-2">Behaviour</span>
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
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
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
