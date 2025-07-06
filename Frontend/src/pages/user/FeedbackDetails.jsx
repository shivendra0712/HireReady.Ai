import React, { lazy, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
const DashboardNav = lazy(()=> import('./DashboardNav'));
import { useDispatch, useSelector } from 'react-redux';
import { asyncUpdateFeedback } from '../../store/actions/userAction';


const FeedbackDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const [username, setUsername] = useState(`${user?.username}`);
  const [email, setemail] = useState(`${user?.email}`)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cancelHandler = () => {
    navigate(-1);
  };

  const onSubmit = (data) => {
    const {feedback} = data;
    dispatch(asyncUpdateFeedback({ feedback, email }));
    navigate(-1);
  };


  return (
    <div className="w-full h-full lg:p-2 bg-[#18181B] lg:rounded-2xl  px-6 py-4 lg:px-20">
      <DashboardNav />

      <div className="w-full h-full flex items-center justify-center  py-8 lg:px-20">

        <div className="w-full max-w-lg bg-[#242429] rounded-xl shadow-md border border-[#2D2D2D] p-6 sm:p-8">
          <h2 className="text-lg sm:text-2xl font-semibold mb-2 text-white/90">Your feedback matters</h2>
          <h3 className=" font-semibold mb-6 text-white/50">We would love to hear your thoughts, suggestions, and feedback.</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="h-auto">
              <textarea
                rows={6}
                {...register("feedback", { required: "feedback is required" })}
                className="w-full px-4 py-2 bg-[#2A2A3B] border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-white"
                placeholder="Your feedback..."
              ></textarea>
              {errors.feedback && (
                <p className="text-red-400 text-xs mt-1">{errors.feedback.message}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-5 pt-4">
              <button
                type="button"
                onClick={cancelHandler}
                className="text-sm text-white/80 hover:underline font-medium"
              >
                Cancel
              </button>
              <button
                className="bg-[#3F3F46] text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-[#52525B] transition-all"
              >
                Send
              </button>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
};

export default FeedbackDetails;
