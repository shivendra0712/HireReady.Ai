import React from "react";
import { useNavigate } from "react-router-dom";

const Feed = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      {/* Navbar */}
      <nav className="container mx-auto px-4 md:px-18 lg:px-22 py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-green-500 w-8 h-8 rounded flex items-center justify-center mr-2">
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="text-xl font-medium">HireReady.Ai</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex md:gap-14">
          <a href="#features"  className="text-base font-medium hover:text-white/90">
            Features
          </a>
          <a href="#pricing" className="text-base font-medium hover:text-white/90">
            Pricing
          </a>
          <a href="#testimonials" className="text-base font-medium hover:text-white/90">
            Testimonials
          </a>
          <button
            onClick={()=> navigate('/dashboard')}
            className="flex items-center text-white text-base font-medium outline-none"
          >
            Dashboard
            {/* <i className="ri-arrow-right-line text-lg mx-1"></i> */}
          </button>
        </div>

        {/* profile Button */}
        <div>
            {/* <div className="w-14 h-14 bg-amber-500 rounded-full"></div> */}
            <button onClick={()=>{ navigate('login') }} className="bg-[#BEF264] hover:bg-green-500 text-black font-semibold py-2 px-6 rounded-lg ">LogIn</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Job Interviews
            <br />
            Don't Have to Suck
            <br />
            Anymore!
          </h1>

          <p className="text-xl mt-8 mb-12 md:px-14 lg:px-24">
            HireReady is an innovative AI-powered interview preparation platform
            designed to help job seekers excel in their interviews.
          </p>

          {/* Testimonials */}
          <div className="flex justify-center">
            {/* Avatars */}
            <div className="flex justify-center mb-4">
              <div className="flex -space-x-3">
                {["1", "2", "3", "4"].map((id) => (
                  <div
                    key={id}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-300"
                  >
                    {/* Replace with actual avatar images */}
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
         
            <button onClick={()=>navigate('/dashboard')} className="bg-[#bef264d6] hover:bg-green-500 text-black font-semibold py-2 px-6 rounded-lg inline-flex items-center">
              Create Interview
              <i className="ri-arrow-right-line text-lg mx-1"></i>
            </button>
         
        </div>
      </div>
    </div>
  );
};

export default Feed;
