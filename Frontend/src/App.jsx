import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Feed from './components/Feed'
import Dashboard from './Dashboard'
import Interview from './components/Interview'
import Interviews from './components/Interviews'
import Join from './components/Join'
import DashboardMenu from './components/DashboardMenu'

const Layout = () => (
  <div className="w-screen h-screen flex bg-[#09090B] text-white">
    <div className="w-[18%] h-full">
      <DashboardMenu />
    </div>
    <div className="w-[82%] h-full p-2">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-interview" element={<Interview />} />
        <Route path="/interview/join/:interviewId" element={<Join />} />
        <Route path="/interview/report/:interviewId" element={<Interview />} />
         <Route path="/interviews" element={<Interviews />} />
      </Routes>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App;
