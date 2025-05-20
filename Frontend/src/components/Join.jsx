import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Join = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("Frontend Developer");
  const [userName, setUserName] = useState("Shivendra Patel");
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Mock function to handle video stream
  const startVideoStream = () => {
    console.log("Starting video stream");
    setIsVideoOn(true);
  };

  // Mock function to end the interview
  const endInterview = () => {
    setIsInterviewEnded(true);
  };

  // Timer effect with cleanup
  useEffect(() => {
    let timer;
    if (!isInterviewEnded) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isInterviewEnded]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const goToReport = () => {
    navigate(`/interview/report/${interviewId}`);
  };

  const goToHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col w-full  h-full bg-[#18181B] text-white">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center">
       
        <div className="w-full max-w-2xl aspect-video bg-[#27272A] rounded-lg overflow-hidden relative">
          {isVideoOn ? (
            <div className="w-full h-full flex items-center justify-center">
              {/* Mock video content */}
              <div className="text-center">
                <p className="text-lg">{userName}</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <button
                onClick={startVideoStream}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Start Video
              </button>
            </div>
          )}

          {/* Camera icon overlay */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-gray-800 bg-opacity-50 p-1 rounded">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-[#18181B] flex justify-between items-center">
        <div className="text-gray-300">{formatTime(elapsedTime)}</div>
        <div className="flex space-x-4">
          <button
            onClick={goToHome}
            className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md">
            Home
          </button>
          <button
            onClick={goToReport}
            className={`font-medium py-2 px-4 rounded-md ${
              isInterviewEnded
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!isInterviewEnded}>
            Go to interview report
          </button>
        </div>
        <div className="w-6 h-6">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Join;
