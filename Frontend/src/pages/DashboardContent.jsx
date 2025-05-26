import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUserService } from '../API/authService' 

const DashboardContent = () => {
  const navigate = useNavigate();

  
  const [name, setName] = useState("Shivendra");
  const [totalInterviews, setTotalInterviews] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [completedInterviews, setCompletedInterviews] = useState(0);
  const [availableInterviews, setAvailableInterviews] = useState(1);
//   const [percentFromLastWeek, setPercentFromLastWeek] = useState("0%");
//   const [completionRate, setCompletionRate] = useState("100%");


useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await currentUserService(); // ✅ calling API
        // const data = response.user; // depends on your API response structure
          console.log(response);
        // setName(data.username);
        // setTotalInterviews(data.totalInterview);
        // setTotalTimeSpent(data.totalTime);
        // setCompletedInterviews(data.completeInterview);
        // setAvailableInterviews(data.available);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <div className='w-full h-full p-2 bg-[#18181B] rounded-2xl px-20'>
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Hello, {name} 👋</h1>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">Overview</h2>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/dashboard/interviews/interview-create')}
                className="bg-[#BEF264] hover:bg-green-500 text-black font-medium py-2 px-4 rounded-md text-sm"
              >
                Create Interview
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <OverviewCard title="Total interviews" value={totalInterviews} />
            <OverviewCard title="Total time spent" value={totalTimeSpent}  />
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
    <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-gray-500 mt-2">{note}</p>
  </div>
);

export default DashboardContent;
