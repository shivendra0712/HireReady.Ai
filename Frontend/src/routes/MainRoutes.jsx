import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Feed from '../pages/Feed.jsx'
import PageNotFound from '../pages/PageNotFound.jsx'
import ProfileDetails from '../pages/user/ProfileDetails.jsx';
import FeedbackDetails from '../pages/user/FeedbackDetails.jsx';
import HelpDetails from '../pages/user/HelpDetails.jsx';
import PricingPage from '../pages/user/PricingPage.jsx';
const Interview = lazy(() => import('../pages/user/Interview.jsx'));
const Interviews = lazy(() => import('../pages/user/Interviews.jsx'));
const Join = lazy(() => import('../pages/user/Join.jsx'));
const DashboardMenu = lazy(() => import('../pages/user/DashboardMenu.jsx'));
const Dashboard = lazy(() => import('../pages/user/Dashboard.jsx'));
const Feedback = lazy(() => import('../pages/user/Feedback.jsx'));
const LoginForm = lazy(() => import('../pages/user/SignIn.jsx'));
const SignupForm = lazy(() => import('../pages/user/SignUp.jsx'));

const Layout = () => (
    <div className="w-screen h-screen flex bg-[#09090B] text-white">
        <div className="hidden lg:block lg:w-[21%] lg:h-full">
            <DashboardMenu />
        </div>
      
        <div className="w-full lg:w-[79%] lg:h-full  lg:p-2">
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/interviews" element={<Interviews />} />
                <Route path="/dashboard/interviews/interview-create" element={<Interview />} />
                <Route path="/dashboard/interviews/feedback/:id" element={<Feedback />} />
                <Route path="/dashboard/profile" element={<ProfileDetails />} />
                {/* <Route path="/dashboard/feedback-details" element={<FeedbackDetails />} />
                <Route path="/dashboard/help-details" element={<HelpDetails />} /> */}
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
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}


export default MainRoutes


