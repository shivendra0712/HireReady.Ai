import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUserService } from '../../API/authService'
import { viewAllInterviewService } from '../../API/interviewService';
import DashboardNav from './DashboardNav';


const Interviews = () => {
  const navigate = useNavigate();
  const [totalInterviews, setTotalInterviews] = useState(1);
  const [interviews, setInterviews] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await currentUserService(); // ✅ calling API
        const data = response.user; // depends on your API response structure
        console.log(" data -> ", data);
        setTotalInterviews(data.totalInterview);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const { data } = await viewAllInterviewService(); // ✅ calling API
        console.log(data)// depends on your API response structure
        setInterviews(data.data);
        console.log("user have given total interview data -> ", data.data);

        // setTotalInterviews(data.totalInterview);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchInterviewData();
  }, []);

  console.log(interviews);

  const timeHandler = (isoDate) => {
    const date = new Date(isoDate).toLocaleDateString('en-CA');
    return date;
  }
 
  return (
    <div className="w-full  min-h-full lg:p-2 bg-[#18181B] lg:rounded-2xl  px-6 py-4 lg:px-20">
      <DashboardNav />
      <div className="flex-1 py-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-medium">Interviews</h1>
          <button
            onClick={() => navigate('/dashboard/interviews/interview-create')}
            className="bg-[#BEF264] hover:bg-green-500 text-black font-medium py-2 px-4 rounded-md text-sm cursor-pointer outline-none"
          >
            Create Interview
          </button>
        </div>

        {/* Table Header */}
        {
          totalInterviews === 0 ? (
            <div className='flex justify-center items-center'>
              <h1>No interview yet?</h1>
            </div>
          ) : (
            <div className=" w-full overflow-x-auto overflow-y-hidden">
              <div className="min-w-[800px]">
                {/* Table Header */}
                <div className="grid grid-cols-6  gap-4 text-sm text-[#7194aae2] font-medium my-2">
                  <div>Interviewer</div>
                  <div>Job Title</div>
                  <div>Interview Type</div>
                  <div>Status</div>
                  <div>Created</div>
                  <div>Actions</div>
                </div>

                {/* Table Rows */}
                {interviews?.map((interview) => (
                  <div
                    key={interview._id}
                    className="grid grid-cols-6 gap-4 items-center text-sm border-t border-gray-700 py-4"
                  >
                    <div className="flex items-center gap-2 text-white font-medium">
                      <span>{interview.interviewerName}</span>
                    </div>
                    <div className="font-medium text-white">{interview.jobTitle}</div>
                    <div className="font-medium text-white ">{interview.interviewType}</div>
                    <div>
                      <span className="bg-[#1E2939] text-green-100 text-xs px-3 py-1 rounded-md font-medium">
                        {interview.status}
                      </span>
                    </div>
                    <div className="text-white">{timeHandler(interview.interviewDate)}</div>
                    <div>
                      <button
                        onClick={() =>
                          navigate(`/dashboard/interviews/feedback/${interview.interviewQuestion}`)
                        }
                        className="font-medium  bg-[#252B1A] text-[#BEF264] px-2 py-1 rounded cursor-pointer "
                      >
                        Feedback
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }

      </div>
    </div>
  );
};

export default Interviews;