import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";

const Section1 = () => {
  const { user } = useSelector((state) => state.userReducer)
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  return (
    <div className="relative">
      <nav className="container px-6 md:px-8 py-6 flex justify-between items-center gap-5">
        {/* Logo */}
        <div className="flex items-center outline-none">
          <div className="w-6 h-6 md:w-7 md:h-6 rounded-xl flex items-center justify-center mr-2">
            <img src="/images/logo.png" alt="" />
          </div>
          <span className="text-lg md:text-xl font-normal lg:font-medium">HireReady.Ai</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 lg:gap-14">
          <NavLink to={'#features'} className="text-base font-medium hover:text-white/90 outline-none">Features</NavLink>
          <NavLink to={'#pricing'} className="text-base font-medium hover:text-white/90 outline-none">Pricing</NavLink>
          <NavLink to={'#testimonials'} className="text-base font-medium hover:text-white/90 outline-none">Testimonials</NavLink>
        </div>

        {/* Desktop Login/Dashboard Button */}
        <div className='hidden md:block'>
          {user ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="sticky text-base font-medium py-2 px-4 bg-transparent hover:bg-white/10 rounded-lg flex items-center transition-all duration-200 outline-none cursor-pointer"
            >
              Dashboard <i className="ri-arrow-right-line mt-1 ml-1"></i>
            </button>
          ) : (
            <button
              onClick={() => { navigate('login') }}
              className="sticky text-base font-medium py-2 px-4 bg-transparent hover:bg-white/10 rounded-lg flex items-center transition-all duration-200 outline-none cursor-pointer"
            >
              LogIn <i className="ri-arrow-right-line mt-1 ml-1"></i>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white/80 hover:text-white transition-colors outline-none"
        >
          <i className="ri-menu-line text-lg"></i>
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-black text-white transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>

        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-xl flex items-center justify-center mr-2">
              <img src="/images/logo.png" alt="" />
            </div>
            <span className="text-lg font-medium">HireReady.Ai</span>
          </div>
          <button
            onClick={closeMobileMenu}
            className="text-white/80 hover:text-white transition-colors outline-none p-1"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <div className="flex-1 py-6">
            <div className="space-y-1 px-6">
              <button
                onClick={() => scrollToSection('#features')}
                className="w-full text-left text-base font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors outline-none"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('#pricing')}
                className="w-full text-left text-base font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors outline-none"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('#testimonials')}
                className="w-full text-left text-base font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-colors outline-none"
              >
                Testimonials
              </button>
            </div>
          </div>

          {/* Login/Dashboard Button */}
          <div className="my-20 border-t border-gray-800 bg-amber-300 text-black">
            {user ? (
              <button
                onClick={() => handleNavigation('/dashboard')}
                className="w-full text-base font-medium py-3 px-4 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 outline-none cursor-pointer"
              >
                Dashboard
                <i className="ri-arrow-right-line ml-2"></i>
              </button>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="w-full text-base font-medium py-3 px-4 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 outline-none cursor-pointer"
              >
                Log In
                <i className="ri-arrow-right-line ml-2"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container px-4 py-10 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-medium mb-4">
            Job Interviews
            <br />
            Don't Have to Suck
            <br />
            Anymore!
          </h1>

          <p className="text-lg md:text-xl mt-8 mb-12 md:px-14 lg:px-24 text-[#BCBBC0]">
            HireReady is an innovative AI-powered interview preparation platform
            designed to help job seekers excel in their interviews.
          </p>

          {/* Testimonials */}
          <div className="flex justify-center">
            {/* Avatars */}
            <div className="flex justify-center mb-4">
              <div className="flex flex-row-reverse -space-x-1">
                {[
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
                  "https://randomuser.me/api/portraits/women/2.jpg",
                  "https://randomuser.me/api/portraits/men/3.jpg",
                  "https://randomuser.me/api/portraits/women/4.jpg"
                ].map((imgSrc, index) => (
                  <div
                    key={index}
                    className="w-8 md:w-10 h-8 md:h-10 rounded-full border-2 border-white overflow-hidden bg-gray-300"
                  >
                    <img
                      src={imgSrc}
                      alt={`Avatar ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col items-start mb-8 ml-4 md:ml-4">
              <div className="flex md:ml-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm md:text-base md:ml-2 font-medium">
                7 preps love HireReady
              </span>
            </div>
          </div>

          {/* CTA Button */}
          {user ?  <button 
            onClick={() => navigate('/dashboard')}
            className="bg-[#BEF264] hover:bg-green-500 text-black font-medium py-2 px-4 rounded-lg text-sm inline-flex items-center transition-all duration-200 outline-none cursor-pointer"
          >
            Create Interview
            <i className="ri-arrow-right-line text-lg ml-1 mt-1"></i>
          </button> :  <button 
            onClick={() => navigate('/login')}
            className="bg-[#BEF264] hover:bg-green-500 text-black font-medium py-2 px-4 rounded-lg text-sm inline-flex items-center transition-all duration-200 outline-none cursor-pointer"
          >
            Create Interview
            <i className="ri-arrow-right-line text-lg ml-1 mt-1"></i>
          </button> }
         
        </div>
      </div>
    </div>
  )
}

export default Section1