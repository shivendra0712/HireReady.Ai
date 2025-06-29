// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import DashboardNav from './DashboardNav';
// import { useDispatch, useSelector } from 'react-redux';
// import { asyncDelete, asyncUpdate } from '../../store/actions/userAction';

// const HelpDetails = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//       const {user} = useSelector((state) => state.userReducer);
//     const [username, setUsername] = useState(`${user.username}`);
//     const [email, setemail] = useState(`${user.email}`)

//     // const cancelHandler = () => {
//     //     navigate(-1);
//     // };

//     // const deleteHandler = () => {
//     //     dispatch(asyncDelete({email}));
//     //     navigate('/');
//     //     console.log('delete user');
//     // };

//     // const updateHandler = () => {
//     //     dispatch(asyncUpdate({username, email}));
//     //     navigate(-1);
//     //     console.log('update user');
//     // };

//     return (
//         <div className="w-full min-h-full lg:p-2 bg-[#18181B] lg:rounded-2xl  px-6 py-4 lg:px-20">
//             <DashboardNav />

//             <div className="w-full min-h-full bg-[#18181B] flex items-center justify-center  py-8 lg:px-20">

//                 <div className="w-full max-w-xl bg-[#242429] rounded-xl shadow-md border border-[#2D2D2D] p-6 sm:p-8">
//                     <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">Manage your account info.</h2>
//                     <h3 className="text-lg font-semibold mb-6 text-white">Profile details</h3>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HelpDetails;


import React from 'react'

const HelpDetails = () => {
  return (
    <div>HelpDetails</div>
  )
}

export default HelpDetails