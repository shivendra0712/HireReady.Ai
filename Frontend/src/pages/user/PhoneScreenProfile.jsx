import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncLogOut } from '../../store/actions/userAction';


const PhoneScreenProfile = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
          const {user} = useSelector((state) => state.userReducer);
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const profileRef = useRef(null)

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !profileRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMenuOpen])

    const profileHandler = () => {
        navigate('/dashboard/profile');
    }

    const logoutHandler = () => {
        dispatch(asyncLogOut());
        navigate('/');
        console.log('logout user');

    }
     
    return (
        <div className="relative">
            
            {/* Profile Icon */}
            <div
                ref={profileRef}
                className="profileIcon w-8 h-8 rounded-lg  flex items-center justify-center text-black font-bold cursor-pointer bg-[#BEF264] hover:bg-green-500 transition-colors duration-200"
                onClick={toggleMenu}
            >
                 {user?.username.slice(0,1)}
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div
                    ref={menuRef}
                    className="absolute top-10 right-0 w-48 bg-[#252528] border border-white/20 p-2 rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200"
                >
                    {/* My Profile Option */}
                    <div onClick={profileHandler} className="flex items-center px-4 py-3 text-white hover:bg-[#BEF264] hover:text-black font-medium rounded-md text-sm outline-none cursor-pointer transition-colors duration-150">

                        <i class="ri-user-line mr-2"></i>
                        <span className="text-sm font-medium">My profile</span>
                    </div>

                    {/* Sign Out Option */}
                    <div onClick={logoutHandler} className="flex items-center px-4 py-3 text-white  hover:bg-[#BEF264] hover:text-black font-medium rounded-md text-sm outline-none cursor-pointer transition-colors duration-150">
                        <i class="ri-logout-box-r-line mr-2"></i>
                        <span className="text-sm font-medium">Sign out</span>
                    </div>
                </div>
            )}


        </div>
    )
}

export default PhoneScreenProfile