import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Feed from '../pages/Feed.jsx'
import PageNotFound from '../pages/PageNotFound.jsx'
const ProfileDetails = lazy(()=> import('../pages/user/ProfileDetails.jsx'));
const FeedbackDetails = lazy(()=> import('../pages/user/FeedbackDetails.jsx'));
const HelpDetails = lazy(()=> import('../pages/user/HelpDetails.jsx'));
import Auth from './Auth.jsx';
import Unauth from './Unauth.jsx';
const PricingPage = lazy(()=> import('../pages/user/PricingPage.jsx'));
const Interview = lazy(() => import('../pages/user/Interview.jsx'));
const Interviews = lazy(() => import('../pages/user/Interviews.jsx'));
const Join = lazy(() => import('../pages/user/Join.jsx'));
const DashboardMenu = lazy(() => import('../pages/user/DashboardMenu.jsx'));
const Dashboard = lazy(() => import('../pages/user/Dashboard.jsx'));
const Feedback = lazy(() => import('../pages/user/Feedback.jsx'));
const LoginForm = lazy(() => import('../pages/user/SignIn.jsx'));
const SignupForm = lazy(() => import('../pages/user/SignUp.jsx'));

// const ProfileDetails = lazy(()=> import()) 


const Layout = () => (
    <div className="w-screen h-screen flex bg-[#09090B] text-white">
        <div className="hidden lg:block lg:w-[21%] lg:h-full">
            <DashboardMenu />
        </div>
      
        <div className="w-full lg:w-[79%] lg:h-full  lg:p-2">
            <Routes>
                <Route path="/dashboard" element={<Auth><Dashboard /></Auth>} />
                <Route path="/dashboard/interviews" element={<Auth><Interviews /></Auth>} />
                <Route path="/dashboard/interviews/interview-create" element={<Auth><Interview /></Auth>} />
                <Route path="/dashboard/interviews/feedback/:id" element={<Auth><Feedback /></Auth>} />
                <Route path="/dashboard/profile" element={<Auth><ProfileDetails /></Auth>} />
                <Route path="/dashboard/feedback-details" element={<Auth><FeedbackDetails /></Auth>} />
                <Route path="/dashboard/help-details" element={<Auth><HelpDetails /></Auth>} />
            </Routes>   
        </div>
    </div>
);

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/*" element={<Layout />} />
            <Route path="/interview/join/:interviewId" element={<Auth><Join /></Auth>} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/pricing" element={<PricingPage />}/>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}


export default MainRoutes


