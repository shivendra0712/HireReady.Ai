import React, { useState  , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUserService } from '../API/authService'


const Interviews = () => {
  const navigate = useNavigate();

  // ✅ Separate state for each data field

  const [totalInterviews, setTotalInterviews] = useState(1);
  // const [interviewCheckTogger, setInterviewCheckTogger] = useState(false)
  const [interviewers, setInterviewers] = useState(['James']);
  const [jobTitles, setJobTitles] = useState(['Frontend Developer']);
  const [types, setTypes] = useState(['Technical']);
  const [statuses, setStatuses] = useState(['Completed']);
  const [createdDates, setCreatedDates] = useState(['3 weeks ago']);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await currentUserService(); // ✅ calling API
        const data = response.user; // depends on your API response structure
        console.log("inter total interview data -> ",data);
        setTotalInterviews(data.totalInterview);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const interviewData = interviewers.map((interviewer, index) => (
    <div
      key={index}
      className="grid grid-cols-6 gap-4 items-center text-sm border-t border-gray-700 pt-4"
    >
      <div className="flex items-center gap-2">
        <span>{interviewer}</span>
      </div>
      <div className="font-semibold text-white">{jobTitles[index]}</div>
      <div className="text-white">{types[index]}</div>
      <div>
        <span className="bg-green-700 text-green-100 text-xs px-3 py-1 rounded-md">
          {statuses[index]}
        </span>
      </div>
      <div className="text-white">{createdDates[index]}</div>
      <div>
        <button
          onClick={() => navigate('/dashboard/interviews/feedback')}
          className="text-white"
        >
          Feedback
        </button>
      </div>
    </div>
  ))

  return (
    <div className="w-full h-full bg-[#18181B] rounded-2xl px-20">
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-medium">Interviews</h1>
          <button
            onClick={() => navigate('/dashboard/interviews/interview-create')}
            className="bg-[#BEF264] hover:bg-green-500 text-black font-medium py-2 px-4 rounded-md text-sm"
          >
            Create Interview
          </button>
        </div>

        {/* Table Header */}
        {
          totalInterviews === 0 ? (<div className='flex justify-center items-center'>
            <h1>No interview yet?</h1>
          </div>) : (<div>
            <div className="grid grid-cols-6 gap-4 text-sm text-[#7194aae2] font-medium mb-2">
              <div>Interviewer</div>
              <div>Job Title</div>
              <div>Interview Type</div>
              <div>Status</div>
              <div>Created</div>
              <div>Actions</div>
            </div>
            {interviewData}
          </div>)
        }
      </div>
    </div>
  );
};

export default Interviews;
