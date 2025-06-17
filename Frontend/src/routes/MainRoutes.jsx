import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Feed from '../pages/Feed.jsx'
import Interview from '../pages/user/Interview.jsx'
// import Interview from '../pages/Interview.jsx'
import Interviews from '../pages/user/Interviews.jsx'
import Join from '../pages/user/Join.jsx'
import DashboardMenu from '../pages/user/DashboardMenu.jsx'
import Dashboard from '../pages/user/Dashboard.jsx'
import Feedback from '../pages/user/Feedback.jsx'
import LoginForm from '../pages/user/SignIn.jsx'
import SignupForm from '../pages/user/SignUp.jsx'

const Layout = () => (
    <div className="w-screen h-screen flex bg-[#09090B] text-white">
        <div className="w-[18%] h-full">
            <DashboardMenu />
        </div>
        <div className="w-[82%] h-full p-2">
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/interviews" element={<Interviews />} />
                <Route path="/dashboard/interviews/interview-create" element={<Interview />} />
                <Route path="/dashboard/interviews/feedback" element={<Feedback />} />
                <Route path="/dashboard/interviews/interview/report/:interviewId" element={<Interview />} />
              
            </Routes>
        </div>
    </div>
);

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/*" element={<Layout />} />
            <Route path="/interview/join/:interviewId" element={<Join />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
        </Routes>
    )
}

export default MainRoutes


