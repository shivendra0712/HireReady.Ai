import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import { useDispatch, useSelector } from 'react-redux';

const DashboardContent = () => {
  
  const {user} = useSelector((state) => state.userReducer );
  const navigate = useNavigate();
  const [name, setName] = useState(`${user.username}`);
  const [totalInterviews, setTotalInterviews] = useState(user.totalInterview);
  const [totalTimeSpent, setTotalTimeSpent] = useState(user.totalTime);
  const [completedInterviews, setCompletedInterviews] = useState(user.completeInterview);
  const [availableInterviews, setAvailableInterviews] = useState(user.available);


console.log(totalInterviews , availableInterviews)


  return (
    <div className='w-full min-h-full lg:p-2 bg-[#18181B] lg:rounded-2xl  px-6 py-4 lg:px-20'>
    <DashboardNav />

      <div className="flex-1  py-6 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Hello, {name} 👋</h1>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className=" text-xl font-medium">Overview</h2>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/dashboard/interviews/interview-create')}
                className="0 text-black font bg-[#BEF264] hover:bg-green-50-medium py-2 px-4 rounded-md text-sm font-medium outline-none"
              >
                Create Interview
              </button>
            </div>
          </div>  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <OverviewCard title="Total interviews" value={totalInterviews} />
            <OverviewCard title="Total time spent" value={`${totalTimeSpent} min`} />
            <OverviewCard title="Completed interviews" value={completedInterviews}  />
            <OverviewCard title="Available interviews" value={availableInterviews} note="Free credit" />
          </div>
        </div>
      </div>
    </div>
  );
};

const OverviewCard = ({ title, value, note }) => (
  <div className="bg-gray-800 rounded-lg p-4">
    <h3 className="text-gray-400 font-medium mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-[#BEF264] mt-2 font-medium ">{note}</p>
  </div>
);

export default DashboardContent;
