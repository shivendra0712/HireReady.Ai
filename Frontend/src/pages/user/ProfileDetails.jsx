import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import { useDispatch, useSelector } from 'react-redux';
import { asyncDelete, asyncUpdate } from '../../store/actions/userAction';

const ProfileDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
      const {user} = useSelector((state) => state.userReducer);
    const [username, setUsername] = useState(`${user.username}`);
    const [email, setemail] = useState(`${user.email}`)

    const cancelHandler = () => {
        navigate(-1);
    };

    const deleteHandler = () => {
        dispatch(asyncDelete({email}));
        navigate('/');
        console.log('delete user');
    };

    const updateHandler = () => {
        dispatch(asyncUpdate({username, email}));
        navigate(-1);
        console.log('update user');
    };

    return (
        <div className="w-full min-h-full lg:p-2 bg-[#18181B] lg:rounded-2xl  px-6 py-4 lg:px-20">
            <DashboardNav />

            <div className="w-full min-h-full bg-[#18181B] flex items-center justify-center  py-8 lg:px-20">

                <div className="w-full max-w-xl bg-[#242429] rounded-xl shadow-md border border-[#2D2D2D] p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-white">Manage your account info.</h2>
                    <h3 className="text-lg font-semibold mb-6 text-white">Profile details</h3>

                    <div className="bg-[#1E1E20] p-5 sm:p-8 rounded-lg">
                        {/* Avatar */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#BEF264] hover:bg-green-500 text-xl flex items-center justify-center text-black font-bold">
                             {user.username.slice(0,1)}
                            </div>
                        </div>

                        {/* Username Field */}
                        <div className="mb-6">
                            <label className="text-sm font-medium block mb-1 text-white">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-[#0F0F10] border border-[#2D2D2D] px-3 py-2 rounded-md text-white outline-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                            <button
                                onClick={cancelHandler}
                                className="text-sm text-gray-400 hover:underline font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateHandler}
                                className="text-sm bg-[#8F8F91] hover:bg-[#a2a2a3] text-black font-medium px-4 py-2 rounded-md"
                            >
                                Update Account
                            </button>
                            <button
                                onClick={deleteHandler}
                                className="text-sm bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
