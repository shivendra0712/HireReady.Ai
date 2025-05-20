import React from 'react'

const Interviews = () => {
    return (
        <div className="w-full h-full bg-[#18181B] rounded-2xl px-20">
            {/* Main content */}
            <div className="flex-1 p-8 overflow-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-xl font-medium">Interviews</h1>
                    <div className="flex items-center space-x-4">
                        <a href="/create-interview">
                            <button className="bg-[#BEF264] hover:bg-green-500 text-black font-medium py-2 px-4 rounded-md text-sm">
                                Create Interview
                            </button>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-4 text-sm text-[#7194aae2] font-medium mb-2">
                    <div>Interviewer</div>
                    <div>Job Title</div>
                    <div>Interview Type</div>
                    <div>Status</div>
                    <div>Created</div>
                    <div>Actions</div>
                </div>

                {/* Data Row */}
                <div className="grid grid-cols-6 gap-4 items-center text-sm border-t border-gray-700 pt-4">
                    {/* Interviewer */}
                    <div className="flex items-center gap-2">
                       
                        <span>James</span>
                    </div>

                    {/* Job Title */}
                    <div className="font-semibold text-white">Frontend Developer</div>

                    {/* Interview Type */}
                    <div className="text-white">Technical</div>

                    {/* Status */}
                    <div>
                        <span className="bg-green-700 text-green-100 text-xs px-3 py-1 rounded-md">
                            Completed
                        </span>
                    </div>

                    {/* Created */}
                    <div className="text-white">3 weeks ago</div>

                    {/* Actions */}
                    <div >
                     Feedback
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Interviews