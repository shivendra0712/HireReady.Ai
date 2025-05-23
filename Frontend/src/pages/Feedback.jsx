import React from 'react'
import { useNavigate } from 'react-router-dom'

const Feedback = () => {
    const navigate = useNavigate();

    return (
        <div className="flex w-full h-full bg-[#18181B] rounded-2xl px-20">
            {/* Main content */}
            <div className="flex-1 p-8 overflow-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <button onClick={() => { navigate(-1) }}> <i class="ri-arrow-left-s-line"></i>Interviews</button>

                </div>
                {/* <hr className='text-white/20' /> */}
                {/* Interview form */}
                <div className="mb-8 flex flex-col">
                    <div className="flex ">
                        <h2 className="text-xl font-semibold mb-2">Frontend Developer</h2>
                        <div className='ml-4'>
                            <span className="bg-green-700 text-green-100 text-xs px-3 py-1 rounded-md">
                                Completed
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-10">       
                        {/* Interview Type */}
                        <div className="text-white">Experience Level</div>
                        {/* Experience */}
                        <div className="text-white">Experience</div>
                        {/* Date */}
                        <div className="text-white">Date</div>
                    </div>
                </div>
                <div className="flex ">
                        <h2 className="text-lg font-semibold mb-2">Interview Conversation</h2>
                        <div className='ml-4'>
                          
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Feedback

