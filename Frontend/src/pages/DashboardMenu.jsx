import React from 'react'
import { useNavigate } from 'react-router-dom';

const DashboardMenu = () => {

   const navigate = useNavigate();

  return (
    <div className='w-full h-full'>
         {/* Sidebar */}
      <div className="w-full h-full bg-[#09090B] p-4 flex flex-col">
        {/* Logo */}
        <div className="flex items-center mb-8 pt-4">
          <div className="bg-green-500 w-8 h-8 rounded flex items-center justify-center mr-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-medium">HireReady.Ai</span>
          <span className="ml-2 text-xs font-medium bg-[#252B1A] text-[#BEF264] px-2 py-1 rounded">Early Access</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <div className="mb-8">
            <p className="text-gray-400 text-sm mb-2 font-medium">Main</p>
            <ul>
              <li className="">
                <div onClick={()=> navigate('/dashboard')} className="flex items-center text-gray-200 hover:text-white font-medium outline-none">
                  <img className='scale-70' src="/images/img1.png" alt="" />
                  Progress
                </div>
              </li>
              <li className="">
                <div onClick={()=> navigate('/dashboard/interviews')} className="flex items-center text-gray-200 hover:text-white font-medium">
                  <img className='scale-70' src="/images/img2.png" alt="" />
                  Interviews
                </div>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <p className="text-gray-400 text-sm mb-2 font-medium">Exposure</p>
            <ul>
              <li className="mb-2">
                <div  className="flex items-center text-gray-400 hover:text-white text-sm">
                   <img className='scale-70' src="/images/img3.png" alt="" />
                  Jobs
                  <span className="ml-2 text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">Coming soon</span>
                </div>
              </li>
              <li className="mb-2 ">
                <div  className="flex  items-center text-gray-400 hover:text-white text-sm">
                   <img className='scale-70' src="/images/img4.png" alt="" />
                  Resume builder
                  <span className="ml-2 text-xs bg-gray-800 text-gray-400 px-1 py-0.5 rounded">Coming soon</span>
                </div>
              </li>
              <li className="mb-2">
                <div  className="flex items-center text-gray-400 hover:text-white text-sm">
                  <img className='scale-70' src="/images/img5.png" alt="" />
                  Leaderboard
                  <span className="ml-2 text-xs bg-gray-800 text-gray-400 px-1 py-0.5 rounded">Coming soon</span>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        {/* Footer links */}
        <div className="mt-auto">
          <div  className="flex items-center  text-gray-200 hover:text-white font-medium">
            <img className='scale-70' src="/images/img6.png" alt="" />
            Feedback
          </div>
          <div  className="flex items-center text-gray-200 hover:text-white font-medium">
            <img className='scale-70' src="/images/img7.png" alt="" />
            Help
          </div>
        </div>

        {/* User profile */}
        <div className="mt-6 pt-6 border-t border-gray-800 flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-2">
            S
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Shivendra Patel</p>
            <p className="text-xs text-gray-500 truncate">shivendrapatel@123.com</p>
          </div>
          <button className="text-gray-300">
            {/* <i class="ri-arrow-up-s-line text-lg"></i> */}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardMenu