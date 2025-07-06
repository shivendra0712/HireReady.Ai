import React, { lazy, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { viewFeedbackByIdService } from '../../API/questionService';
import { viewInterviewByIdService } from '../../API/interviewService';
const DashboardNav = lazy(() => import('./DashboardNav'))

const Feedback = () => {
    const [feedbackdata, setFeedbackdata] = useState(null)
    const [interviewData, setInterviewData] = useState(null)
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const feedbackData = async () => {
            try {
                const { data } = await viewFeedbackByIdService(id); // ✅ calling API
                setFeedbackdata(data.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        feedbackData();
    }, []);

    const interviewId = feedbackdata?.interviewId;
   
    useEffect(() => {
        const interviewData = async () => {
            try {
                const { data } = await viewInterviewByIdService(interviewId); // ✅ calling API
                setInterviewData(data.data);

                // setTotalInterviews(data.totalInterview);
            } catch (error) {
                console.error("Error fetching user interview data:", error);
            }
        };
        interviewData();

    }, [interviewId]);


    const interviewFeedback = feedbackdata?.userQuestion?.map((question, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-700 rounded-lg bg-[#1E1E1E]">

            <div>
                <p className="font-semibold text-white">Question {index + 1} :</p>
                <p className="text-gray-300 mt-1">{question}</p>
            </div>

            <div className="mt-4">
                <p className="font-semibold text-white">Your Answer:</p>
                <p className="text-gray-400 mt-1">{feedbackdata?.userAnswer?.[index] || 'Not Answered'}</p>
            </div>

            <div className="mt-4">
                <p className="font-semibold text-lime-400">AI Feedback:</p>
                <p className="text-gray-300 mt-1">{feedbackdata?.aiAnswer?.[index] || 'No feedback available'}</p>
            </div>

        </div>
    ));

    const timeHandler = (isoDate) => {
        const date = new Date(isoDate).toLocaleDateString('en-CA');
        return date;
    }


    return (
        <div className=" w-full h-full lg:p-2 bg-[#18181B] lg:rounded-2xl  px-6 py-4 lg:px-20">
            {/* Main content */}

            <DashboardNav />

            <div style={{scrollbarWidth: 'none',msOverflowStyle: 'none',}} className="h-full flex-1 px-2 py-8 overflow-y-auto ">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 text-lg">
                    <button onClick={() => { navigate(-1) }}>
                        <i className="ri-arrow-left-s-line"></i> Interviews
                    </button>
                </div>


                <div className=" w-full overflow-x-auto overflow-y-hidden">
                    <div className="w-[900px] lg:w-[1000px] overflow-x-auto ">
                        {/* Table Header */}
                        <div className="w-full grid grid-cols-6  gap-4  text-sm text-[#7194aae2] font-medium my-2 break-words">

                            <div>Job Title</div>
                            <div>Experience (in years)</div>
                            <div>Difficulty Level</div>
                            <div>Created</div>
                            <div>Status</div>

                        </div>
                        <div
                            key={interviewData?._id}
                            className="grid grid-cols-6 gap-4  text-sm border-t border-gray-700 py-4"
                        >
                            <div className="flex items-center gap-2 text-white font-medium">
                                <span>{interviewData?.jobTitle}</span>
                            </div>
                            <div className="font-medium text-white">{interviewData?.experience}</div>
                            <div className="font-medium text-white ">{interviewData?.interviewLevel}</div>
                            <div className="text-white">{timeHandler(interviewData?.interviewDate)}</div>
                            <div>
                                <span className="font-medium  bg-[#252B1A] text-[#BEF264] px-2 py-1 rounded cursor-pointer ">
                                    {interviewData?.status}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Interview Q&A */}
                <div className='mt-8'>
                    <h2 className="text-lg font-semibold mb-2">Interview Conversation</h2>

                    <div className=" text-white  rounded-lg shadow-md mx-auto mt-4  space-y-4">
                        {interviewFeedback}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback;
