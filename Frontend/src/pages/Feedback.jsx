import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Feedback = () => {
    const navigate = useNavigate();

    // Separate states for each value
    const [question, setQuestion] = useState("Hello, Shivendra! Welcome to your mock interview. I'm Liam, and I'm really excited to have this opportunity to chat with you today. I want this to be a friendly and supportive environment where you can showcase your skills and experiences. To start us off, could you please introduce yourself? Just click the mic icon to begin speaking, and then click it again when you're done.");

    const [answer, setAnswer] = useState("Hi, I'm Shivendra and I'm searching for job in United States. That's all about me.");

    const [feedback, setFeedback] = useState("Shivendra, thank you for your introduction. While you provided a brief response, it would be beneficial to include more details about your background, skills, and experiences to give a fuller picture of who you are. This will help potential employers understand your qualifications and what you can bring to their organization. For next time, consider mentioning your educational background, any relevant work experience, and specific skills or interests that relate to the job you're seeking. This will make your introduction more engaging and informative.");

    return (
        <div className="flex w-full h-full bg-[#18181B] rounded-2xl px-20">
            {/* Main content */}
            <div className="flex-1 p-8 overflow-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <button onClick={() => { navigate(-1) }}>
                        <i className="ri-arrow-left-s-line"></i> Interviews
                    </button>
                </div>

                {/* Interview Info */}
                <div className="mb-8 flex flex-col">
                    <div className="flex items-center">
                        <h2 className="text-xl font-semibold mb-2">Frontend Developer</h2>
                        <div className='ml-4'>
                            <span className="bg-green-700 text-green-100 text-xs px-3 py-1 rounded-md">
                                Completed
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-10 text-white">
                        <div>Experience Level</div>
                        <div>Experience</div>
                        <div>Date</div>
                    </div>
                </div>

                {/* Interview Q&A */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Interview Conversation</h2>

                    <div className="bg-[#1E1E1E] text-white p-6 rounded-lg shadow-md mx-auto mt-4 border border-gray-700 space-y-4">
                        {/* Question */}
                        <div>
                            <p className="font-semibold text-white">Question: 1</p>
                            <p className="text-gray-300 mt-1">{question}</p>
                        </div>

                        {/* Answer */}
                        <div>
                            <p className="font-semibold text-white">Answer</p>
                            <p className="text-gray-400 mt-1">{answer}</p>
                        </div>

                        {/* Feedback */}
                        <div>
                            <p className="font-semibold text-lime-400">Feedback</p>
                            <p className="text-gray-300 mt-1">{feedback}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback;
