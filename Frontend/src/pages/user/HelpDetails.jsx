import React, { lazy, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DashboardNav = lazy(()=> import('./DashboardNav'));

const HelpDetails = () => {
  const navigate = useNavigate();

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-full lg:p-2 bg-[#18181B] lg:rounded-2xl  px-6 py-4 lg:px-20">
      <DashboardNav />

      <div className="w-full h-full  flex items-center justify-center  py-8 lg:px-20">
        <div className="w-full max-w-md bg-[#242429] rounded-xl shadow-md border border-[#2D2D2D] p-6 sm:p-8 text-white">

          <h2 className="text-lg sm:text-xl font-semibold mb-1">Welcome to iPrep Support</h2>
          <p className="text-sm text-white/60 font-medium mb-4">We would love to help you.</p>

          <p className="text-sm/7 font-medium text-white/80 mb-4">
            iPrep is an innovative AI-powered interview preparation platform designed to help job seekers excel in their interviews.
          </p>

          <p className="text-sm font-semibold">
            Contact us: <span className="text-[#BEF264]">patelshivendra817@gmail.com</span>
          </p>

          <div className="flex justify-end mt-6">
            <button onClick={cancelHandler} className="bg-[#3F3F46] text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-[#52525B] transition-all">
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HelpDetails;


