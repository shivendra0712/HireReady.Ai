import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { currentUserService } from '../API/authService'
import { viewInterviewByIdService, startInterviewByIdService, endInterviewByIdService } from '../API/interviewService'

const Join = () => {
  const { interviewId } = useParams();

  // console.log('this is a interview id in join ----->', interviewId);

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const localStreamRef = useRef(null);

  const [userName, setUserName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);
  const [userDuration, setUserDuration] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interview, setInterview] = useState(null);
  const [firstLevelCheckTogger, setFirstLevelCheckTogger] = useState(false)
  const [interviewerName, setInterviewerName] = useState('')
  const [status, setStatus] = useState('scheduled');



  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const response = await viewInterviewByIdService(interviewId); // ✅ calling API
        const data = response.data.data; // depends on your API response structure
        console.log("view interview by id service data -> ", data);
        setJobTitle(data.jobTitle)
        setInterviewerName(data.interviewerName)


      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchInterviewData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await currentUserService();
        const data = response.user;
        console.log(data);
        setUserName(data.username);

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  // Function to initialize media devices
  const initializeMedia = async (video = true, audio = true) => {
    try {
      // Clear any previous errors and set loading state
      setErrorMessage("");
      setIsLoading(true);

      // Stop any existing tracks
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => {
          track.stop();
        });
      }

      // Request permissions for camera and/or microphone
      const constraints = {
        video: video,
        audio: audio
      };

      console.log("Requesting media with constraints:", constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Save the stream reference
      localStreamRef.current = stream;

      // Update video element if it exists
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Ensure video plays when ready
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(e => {
            console.error("Error playing video:", e);
          });
        };
      }

      // Update state based on which tracks are available
      const hasVideoTrack = stream.getVideoTracks().length > 0;
      const hasAudioTrack = stream.getAudioTracks().length > 0;

      setIsCameraOn(hasVideoTrack);
      setIsMicOn(hasAudioTrack);

      console.log("Media initialized successfully:", { hasVideoTrack, hasAudioTrack });
      return true;
    } catch (error) {
      console.error("Error initializing media:", error);
      setErrorMessage(`Could not access media devices: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle camera
  const toggleCamera = async () => {
    try {
      // Prevent multiple clicks while processing
      if (isLoading) return;

      setIsLoading(true);

      if (isCameraOn) {
        // Turn off camera
        if (localStreamRef.current) {
          const videoTracks = localStreamRef.current.getVideoTracks();
          videoTracks.forEach(track => track.stop());

          // If mic is on, reinitialize with only audio
          if (isMicOn) {
            await initializeMedia(false, true);
          } else {
            // No audio either, clear everything
            if (videoRef.current) {
              videoRef.current.srcObject = null;
            }
            localStreamRef.current = null;
            setIsCameraOn(false);
          }
        }
      } else {
        // Turn on camera (keeping mic state)
        await initializeMedia(true, isMicOn);
      }
    } catch (error) {
      console.error("Error toggling camera:", error);
      setErrorMessage(`Error toggling camera: ${error.message}`);
      setIsCameraOn(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle microphone
  const toggleMicrophone = async () => {
    try {
      // Prevent multiple clicks while processing
      if (isLoading) return;

      setIsLoading(true);

      if (isMicOn) {
        // Turn off microphone
        if (localStreamRef.current) {
          const audioTracks = localStreamRef.current.getAudioTracks();
          audioTracks.forEach(track => track.stop());

          // If camera is on, reinitialize with only video
          if (isCameraOn) {
            await initializeMedia(true, false);
          } else {
            // No video either, clear everything
            if (videoRef.current) {
              videoRef.current.srcObject = null;
            }
            localStreamRef.current = null;
            setIsMicOn(false);
          }
        }
      } else {
        // Turn on microphone (keeping camera state)
        await initializeMedia(isCameraOn, true);
      }
    } catch (error) {
      console.error("Error toggling microphone:", error);
      setErrorMessage(`Error toggling microphone: ${error.message}`);
      setIsMicOn(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to start the interview
  const startInterview = async () => {
    if (!(isCameraOn || isMicOn)) {
      setErrorMessage("Please enable camera or microphone before starting the interview.");
      return;
    }

    try {
      setIsLoading(true);
      // Call API to update interview status
      
      console.log("check the status inprogress ", status)
      await startInterviewByIdService(interviewId, { isCameraOn, isMicOn, status: 'in_progress' });
      setStatus('in_progress')
      setFirstLevelCheckTogger(true)
      setIsInterviewStarted(true);

    } catch (error) {
      console.error("Error starting interview:", error);
      setErrorMessage(error.response?.data?.error || error.message || "Failed to start interview");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to end the interview
  const endInterview = async () => {
    try {
      setIsLoading(true);

      // Call API to update interview status
     
      console.log("check the status completed ", status)
      await endInterviewByIdService(interviewId, { userDuration, status:'completed' });
      setStatus('completed');
      setIsInterviewEnded(true);

      // Stop all media tracks
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());

        // Clear the video element
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }

        // Clear the stream reference
        localStreamRef.current = null;
      }

      // Reset states
      setIsCameraOn(false);
      setIsMicOn(false);
      navigate('/dashboard/interviews')
    } catch (error) {
      console.error("Error ending interview:", error);
      setErrorMessage(error.response?.data?.error || error.message || "Failed to end interview");
    } finally {
      setIsLoading(false);
    }
  };

  // Timer effect with cleanup
  useEffect(() => {
    let timer;
    if (isInterviewStarted && !isInterviewEnded) {
      timer = setInterval(() => {
        setUserDuration((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isInterviewStarted, isInterviewEnded]);

  // Cleanup media streams when component unmounts
  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Check browser compatibility on mount
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMessage("Your browser doesn't support camera and microphone access. Please use a modern browser like Chrome, Firefox, or Edge.");
    }
  }, []);

  // Fetch interview data on component mount
  useEffect(() => {
    const fetchInterviewData = async () => {
      if (!interviewId) return;

      try {
        setIsLoading(true);
        const response =await viewInterviewByIdService(interviewId);

        const interviewData = response.data;
        setInterview(interviewData);

        // Update state with interview data
        if (interviewData.jobTitle) {
          setJobTitle(interviewData.jobTitle);
        }

        // Check if interview is already started or ended
        if (interviewData.status === 'in_progress') {
          setIsInterviewStarted(true);
        } else if (interviewData.status === 'completed') {
          setIsInterviewStarted(true);
          setIsInterviewEnded(true);
        }

      } catch (error) {
        console.error("Error fetching interview data:", error);
        setErrorMessage(error.response?.data?.error || error.message || "Failed to load interview data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviewData();
  }, [interviewId]);


  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };


  return (
    <div>

      {firstLevelCheckTogger ? (<div className="flex flex-col w-screen h-screen bg-[#18181B] text-white py-6 px-8">
        {/* Main content */}
        <div className="w-full flex  bg-[#27272A] py-3 px-6 rounded-lg justify-between items-center">
          <h1>Job Title: {jobTitle}</h1>
          <button onClick={endInterview} className="bg-[#5B5B63] rounded-lg py-1 px-3">Interview Ended</button>

        </div>
        <div className="w-full  flex-1 flex items-center justify-center gap-10">

          <div className="w-[40%] max-h-2xl aspect-video bg-[#27272A] rounded-lg overflow-hidden relative">


            {/* Placeholder when camera is on */}
            {isCameraOn && (
              <div className="w-full h-full flex  flex-col  justify-end">
                <div className=" mb-4 ml-4">
                  <p className="text-lg text-white">{userName}</p>
                  {/* <p className="text-sm text-gray-400">Camera is currently off</p> */}
                </div>
              </div>
            )}
          </div>

          <div className="w-[40%] max-w-2xl aspect-video bg-[#27272A] rounded-lg overflow-hidden relative">
            <div className="w-full h-full flex  flex-col  justify-end">
              <div className=" mb-4 ml-4">
                <p className="text-lg">{interviewerName}</p>
                {/* <p className="text-sm text-gray-400">Camera is currently off</p> */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#18181B] flex justify-between items-center">
          <div className="text-gray-300">
            {isInterviewStarted ? formatTime(userDuration) : "00:00"}
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
      </div>) : (
        <div className="flex flex-col w-screen h-screen bg-[#18181B] text-white py-6 px-8">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-2xl aspect-video bg-[#27272A] rounded-lg overflow-hidden relative">
              {/* Video element - always present but may not show anything */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={!isMicOn}
                className={`w-full h-full object-cover ${isCameraOn ? 'block' : 'hidden'}`}
              />

              {/* Placeholder when camera is off */}
              {!isCameraOn && (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="text-center mb-4">
                    <p className="text-lg">{userName}</p>
                    <p className="text-sm text-gray-400">Camera is currently off</p>
                  </div>
                </div>
              )}



              {/* Media controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {/* Camera toggle button */}
                <button
                  onClick={toggleCamera}
                  disabled={isLoading}
                  className={`${isCameraOn ? "bg-green-600" : "bg-gray-800"} hover:bg-opacity-90 p-3 rounded-full relative ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isLoading ? (
                    <div className="animate-spin h-6 w-6 border-2 border-white rounded-full border-t-transparent"></div>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 text-white"
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
                      {!isCameraOn && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-0.5 h-8 bg-red-500 transform rotate-45 rounded-full"></div>
                        </div>
                      )}
                    </>
                  )}
                </button>

                {/* Microphone toggle button */}
                <button
                  onClick={toggleMicrophone}
                  disabled={isLoading}
                  className={`${isMicOn ? "bg-green-600" : "bg-gray-800"} hover:bg-opacity-90 p-3 rounded-full relative ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isLoading ? (
                    <div className="animate-spin h-6 w-6 border-2 border-white rounded-full border-t-transparent"></div>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                      {!isMicOn && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-0.5 h-8 bg-red-500 transform rotate-45 rounded-full"></div>
                        </div>
                      )}
                    </>
                  )}
                </button>

                {/* Interview control button */}
                {!isInterviewStarted ? (
                  <button
                    onClick={startInterview}
                    disabled={(!isCameraOn && !isMicOn) || isLoading}
                    className={`font-medium py-2 px-4 rounded-md ${(isCameraOn || isMicOn) && !isLoading
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}>
                    {isLoading ? "Please wait..." : "Start Interview"}
                  </button>
                ) : !isInterviewEnded ? (
                  <button
                    onClick={endInterview}
                    disabled={isLoading}
                    className={`bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    End Interview
                  </button>
                ) : (
                  <button
                    onClick={goToReport}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md">
                    View Report
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="p-4 bg-[#18181B] flex justify-between items-center">
            <div className="text-gray-300">
              {isInterviewStarted ? formatTime(userDuration) : "30 :00"}
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
        </div>)}
    </div>
  );
};

export default Join;
