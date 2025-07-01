import React, { lazy } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
const Profile = lazy(() => import('./Profile'))
import { useDispatch } from 'react-redux';

const DashboardMenu = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const feedbackHandler = () => {
    navigate('/dashboard/feedback-details');
  }
  const helpHandler = () => {
    navigate('/dashboard/help-details');
  }


  return (
    <>

      <div className='w-full h-full '>
        {/* Sidebar */}
        <div className="w-full h-full bg-[#09090B] px-6 py-4 flex flex-col">
          {/* Logo */}
          <div className="flex items-center mb-8 pt-2">
            <div className=" w-6 h-6 md:w-7 md:h-6 lg:w-7 lg:h-7 rounded-xl flex items-center justify-center mr-2">
              <img className='' src="/images/logo.png" alt="" />
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
                  <div onClick={() => navigate('/dashboard')} className="flex text-sm items-center text-gray-200 hover:text-white hover:bg-[#161617] hover:rounded-md font-medium outline-none">
                    <img className='scale-70' src="/images/img1.png" alt="" />
                    Progress
                  </div>
                </li>
                <li className="">
                  <div onClick={() => navigate('/dashboard/interviews')} className="flex text-sm items-center text-gray-200 hover:text-white font-medium hover:bg-[#161617] hover:rounded-md">
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
                  <div className="flex items-center text-gray-400  text-sm font-medium">
                    <img className='scale-70' src="/images/img3.png" alt="" />
                    Jobs
                    <span className="ml-2 text-xs bg-gray-800 text-gray-400 px-1 py-0.5 rounded">Coming soon</span>
                  </div>
                </li>
                <li className="mb-2 ">
                  <div className="flex  items-center text-gray-400  text-sm font-medium">
                    <img className='scale-70' src="/images/img4.png" alt="" />
                    Resume builder
                    <span className="ml-2 text-xs bg-gray-800 text-gray-400 px-1 py-0.5 rounded">Coming..</span>
                  </div>
                </li>
                <li className="mb-2">
                  <div className="flex items-center text-gray-400  text-sm font-medium">
                    <img className='scale-70' src="/images/img5.png" alt="" />
                    Leaderboard
                    <span className="ml-2 text-xs bg-gray-800 text-gray-400 px-0.5 py-0.5 rounded">Coming...</span>
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          {/* Footer links */}
          <div className="mt-auto">
            <div  onClick={feedbackHandler}  className="flex items-center  text-sm text-gray-200 hover:text-white font-medium hover:bg-[#161617] hover:rounded-md ">
              <img className='scale-70' src="/images/img6.png" alt="" />
              Feedback
            </div>
            <div  onClick={helpHandler} className="flex items-center text-sm text-gray-200 hover:text-white font-medium hover:bg-[#161617] hover:rounded-md ">
              <img className='scale-70' src="/images/img7.png" alt="" />
              Help
            </div>
          </div>

          <hr className='border text-white/10 my-4' />
          {/* User profile */}
          <Profile />
        </div>
      </div>

    </>
  )
}

export default DashboardMenu