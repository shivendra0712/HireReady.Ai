import React, { lazy, useEffect } from 'react';
const DashboardContent = lazy(()=> import('./DashboardContent.jsx'));
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {

  const dispatch = useDispatch();
  
  const {user} = useSelector((state) => state.userReducer);
 
  if(!user) return <p>Loading..</p>

  return (
    <DashboardContent />
  );
};

export default Dashboard;

