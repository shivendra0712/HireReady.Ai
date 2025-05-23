// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Interview = () => {
//   const [jobTitle, setJobTitle] = useState('');
//   const [interviewLevel, setInterviewLevel] = useState("");
//   const [interviewType, setInterviewType] = useState('technical');
//   const [experience, setExperience] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   // const handleCreateInterview = async () => {
//   //   // Validate form
//   //   if (!jobTitle.trim()) {
//   //     setError('Job title is required');
//   //     return;
//   //   }

//   //   if (!interviewLevel) {
//   //     setError('Interview level is required');
//   //     return;
//   //   }

//   //   // Clear previous errors
//   //   setError('');
//   //   setIsLoading(true);

//   //   try {
//   //     // Create interview data object
//   //     const interviewData = {
//   //       userId: "64f9a4e4f3a7e9b9e0f3a7e9", // Hardcoded for now, replace with actual user ID
//   //       jobTitle,
//   //       interviewType,
//   //       experience: experience ? Number(experience) : 0,
//   //       interviewLevel,
//   //       status: 'scheduled',
//   //       interviewerName: 'AI Interviewer'
//   //     };

//   //     // Make direct API call to create interview
//   //     const response = await axios.post('http://localhost:5000/api/interview/create', interviewData, {
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         // Add authorization header if needed
//   //         // 'Authorization': `Bearer ${localStorage.getItem('token')}`
//   //       }
//   //     });

//   //     const createdInterview = response.data;

//   //     // Navigate to the interview join page with the new interview ID
//   //     navigate(`/interview/join/${createdInterview._id}`);
//   //   } catch (error) {
//   //     console.error('Error creating interview:', error);
//   //     setError(error.response?.data?.error || error.message || 'Failed to create interview. Please try again.');
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   return (
//     <div className="flex w-full h-full bg-[#18181B] rounded-2xl px-20">
//       {/* Main content */}
//       <div className="flex-1 p-8 overflow-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-bold">Create an interview</h1>
//           <div className="flex items-center space-x-4">
//             <div className="text-red-500 text-xs bg-[#2E1D1F] py-1 px-2   font-medium rounded-lg">
//               <span className="font-bold">0</span> interviews left
//             </div>
//             <button className="bg-[#BEF264] hover:bg-green-500 text-black  font-medium py-2 px-4 rounded-md text-sm">
//               Buy more interviews
//             </button>
//           </div>
//         </div>
//         {/* <hr className='text-white/20' /> */}
//         {/* Interview form */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">Interview details</h2>
//           <p className="text-gray-400 mb-6">Give the job details you want to apply for</p>

//           {/* Job title */}
//           <div className="mb-6">
//             <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
//               Job title
//             </label>
//             <input
//               type="text"
//               id="jobTitle"
//               className="w-full bg-[#242427] border border-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Frontend Developer"
//               value={jobTitle}
//               onChange={(e) => setJobTitle(e.target.value)}
//             />
//           </div>


//           <div className="mb-6">
//             <label htmlFor="experience" className="block text-sm font-medium mb-2">
//               Experience (in years)
//             </label>
//             <input
//               type="number"
//               id="experience"
//               className="w-full bg-[#242427] border border-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="e.g. 2"
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
//               min="0"
//               max='100'
//             />
//           </div>


//           {/* Job description */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-2">
//               Select Interview Type
//             </label>
//             <div className="flex gap-6">
//               <label className="flex items-center text-sm">
//                 <input
//                   type="radio"
//                   name="interviewType"
//                   value="technical"
//                   checked={interviewType === "technical"}
//                   onChange={(e) => setInterviewType(e.target.value)}
//                   className="form-radio text-green-500 focus:ring-green-500"
//                 />
//                 <span className="ml-2">Technical</span>
//               </label>

//               <label className="flex items-center text-sm">
//                 <input
//                   type="radio"
//                   name="interviewType"
//                   value="behaviour"
//                   checked={interviewType === "behaviour"}
//                   onChange={(e) => setInterviewType(e.target.value)}
//                   className="form-radio text-green-500 focus:ring-green-500"
//                 />
//                 <span className="ml-2">Behaviour</span>
//               </label>
//             </div>
//           </div>


//           <div className="mb-6">
//             <label htmlFor="interviewLevel" className="block text-sm font-medium mb-2">
//               Interview Level
//             </label>
//             <select
//               id="interviewLevel"
//               className="w-full bg-[#242427] border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={interviewLevel}
//               onChange={(e) => setInterviewLevel(e.target.value)}
//             >
//               <option value="">Select difficulty</option>
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>
//           </div>

//           {/* Interview type */}
//           {/* <div className="mb-6">
//             <div className="flex items-center space-x-2">
//               <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">
//                 1
//               </div>
//               <div className="font-medium">
//                 <span className={interviewType === 'technical' ? 'text-white' : 'text-gray-400'}>
//                   Technical
//                 </span>
//                 <span className="mx-2 text-gray-500">|</span>
//                 <span className="text-purple-500">Problem solving</span>
//               </div>
//             </div>
//           </div> */}

//           {/* Error message */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-md">
//               {error}
//             </div>
//           )}

//           {/* Continue button */}
//           <div className="mt-8">
//             <button
//               // onClick={handleCreateInterview}
//               disabled={isLoading}
//               className={`${
//                 isLoading
//                   ? "bg-gray-500 cursor-not-allowed"
//                   : "bg-[#BEF264] hover:bg-green-500"
//               } text-black text-sm font-medium py-2 px-6 rounded-md flex items-center`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Creating...
//                 </>
//               ) : (
//                 "Continue"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Interview;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Interview = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [interviewLevel, setInterviewLevel] = useState("");
  const [interviewType, setInterviewType] = useState('technical');
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const handleCreateInterview = () => {
    // In a real app, this would submit the form data to your backend
    navigate('/interview/join/1');
  };

  return (
    <div className="flex w-full h-full bg-[#18181B] rounded-2xl px-20">
      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Create an interview</h1>
          <div className="flex items-center space-x-4">
            <div className="text-red-500 text-xs bg-[#2E1D1F] py-1 px-2   font-medium rounded-lg">
              <span className="font-bold">0</span> interviews left
            </div>
            <button className="bg-[#BEF264] hover:bg-green-500 text-black  font-medium py-2 px-4 rounded-md text-sm">
              Buy more interviews
            </button>
          </div>
        </div>
        {/* <hr className='text-white/20' /> */}
        {/* Interview form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Interview details</h2>
          <p className="text-gray-400 mb-6">Give the job details you want to apply for</p>

          {/* Job title */}
          <div className="mb-6">
            <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
              Job title
            </label>
            <input
              type="text"
              id="jobTitle"
              className="w-full bg-[#242427] border border-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Frontend Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>


          <div className="mb-6">
            <label htmlFor="experience" className="block text-sm font-medium mb-2">
              Experience (in years)
            </label>
            <input
              type="number"
              id="experience"
              className="w-full bg-[#242427] border border-gray-700 rounded-md py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. 2"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              min="0"
              max='100'
            />
          </div>


          {/* Job description */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Select Interview Type
            </label>
            <div className="flex gap-6">
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="interviewType"
                  value="technical"
                  checked={interviewType === "technical"}
                  onChange={(e) => setInterviewType(e.target.value)}
                  className="form-radio text-green-500 focus:ring-green-500"
                />
                <span className="ml-2">Technical</span>
              </label>

              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="interviewType"
                  value="behaviour"
                  checked={interviewType === "behaviour"}
                  onChange={(e) => setInterviewType(e.target.value)}
                  className="form-radio text-green-500 focus:ring-green-500"
                />
                <span className="ml-2">Behaviour</span>
              </label>
            </div>
          </div>


          <div className="mb-6">
            <label htmlFor="interviewLevel" className="block text-sm font-medium mb-2">
              Interview Level
            </label>
            <select
              id="interviewLevel"
              className="w-full bg-[#242427] border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={interviewLevel}
              onChange={(e) => setInterviewLevel(e.target.value)}
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Interview type */}
          {/* <div className="mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div className="font-medium">
                <span className={interviewType === 'technical' ? 'text-white' : 'text-gray-400'}>
                  Technical
                </span>
                <span className="mx-2 text-gray-500">|</span>
                <span className="text-purple-500">Problem solving</span>
              </div>
            </div>
          </div> */}

          {/* Continue button */}
          <div className="mt-8">
            <button
              onClick={handleCreateInterview}
              className="bg-[#BEF264] hover:bg-green-500 text-black text-sm font-medium py-2 px-6 rounded-md"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;