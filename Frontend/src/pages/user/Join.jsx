
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { currentUserService } from '../../API/authService';
import { viewInterviewByIdService, startInterviewByIdService, endInterviewByIdService } from '../../API/interviewService';
import { viewQuestionByIdService, updateAnswerByIdService } from "../../API/questionService";

const Join = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const localStreamRef = useRef(null);
  const recognitionRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);
  // const [userDuration, setUserDuration] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interview, setInterview] = useState(null);
  const [togger, setTogger] = useState(false);
  const [interviewerName, setInterviewerName] = useState("");
  const [status, setStatus] = useState("Scheduled");
  const [questionId, setQuestionId] = useState('');
  const [aiQuestionsInFrontend, setAiQuestionsInFrontend] = useState([]);
  const [userQuestionsInFrontend, setUserQuestionsInFrontend] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswersInFrontend, setUserAnswersInFrontend] = useState([]);
  const [hasAnswerCaptured, setHasAnswerCaptured] = useState(false);

  
  useEffect(() => {
    const fetchInterviewData = async () => {
      if (!interviewId) return;
      try {
        setIsLoading(true);
        const response = await viewInterviewByIdService(interviewId);
        const data = response.data.data;
        setInterview(data);
        setJobTitle(data.jobTitle);
        setInterviewerName(data.interviewerName);
        setQuestionId(data.interviewQuestion);

        if (data.status === 'in_progress') {
          setIsInterviewStarted(true);
        } else if (data.status === 'completed') {
          setIsInterviewStarted(false);
          setIsInterviewEnded(true);
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.error || "Failed to load interview");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterviewData();
  }, [interviewId]);


  useEffect(() => {
    const viewQuestionById = async () => {
      try {
        const response = await viewQuestionByIdService(questionId);
        const { aiQuestion } = response.data.data;
        setAiQuestionsInFrontend(aiQuestion);
      }
      catch (error) {
        setErrorMessage(error || "Failed to load interview");
      }
    }

    viewQuestionById();
  }, [questionId])



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await currentUserService();
        const data = response.user;
        setUserName(data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);


  const speakQuestion = (text, callback) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1; // Volume: 0.0 to 1.0
    utterance.rate = 1;   // Speed: 0.1 to 10
    utterance.pitch = 1;  // Pitch: 0 to 2
    utterance.onend = callback;
    synth.speak(utterance);
  };


  // 1. Question bolne ke liye — sirf ek baar
  useEffect(() => {
    if (!isInterviewStarted || isInterviewEnded || isMicOn) return;

    if (currentQuestionIndex < aiQuestionsInFrontend.length) {
      const question = aiQuestionsInFrontend[currentQuestionIndex];

      setUserQuestionsInFrontend(prev => {
        if (prev.length <= currentQuestionIndex) {
          return [...prev, question];
        }
        return prev;
      });


      // Disable mic here if active (just in case)
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }

      speakQuestion(question, () => {
        console.log("Question spoken. Now user can turn mic ON.");
        //  Mic ko yahi start mat karo
      });
    } else {
      endInterview();
    }
  }, [currentQuestionIndex, isInterviewStarted, isInterviewEnded]);

  useEffect(() => {
    if (isMicOn && recognitionRef.current === null) {
      console.log("Mic ON, starting recognition...");

      // Mute speakers if needed
      if (videoRef.current) {
        videoRef.current.muted = true;
      }
      startSpeechRecognition();
    }
  }, [isMicOn]);


  // 3. Jab mic OFF ho, answer record ho chuka hai, next question pe jao
  useEffect(() => {
  if (!isInterviewStarted || isInterviewEnded) return;

  if (!isMicOn && recognitionRef.current) {
    console.log("Mic turned off. Stopping recognition...");

    recognitionRef.current.stop();
    recognitionRef.current = null;

    // ✅ If answer was captured, go to next question
    if (hasAnswerCaptured) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // ✅ If no answer, still save empty string
      setUserAnswersInFrontend(prev => [...prev, ""]);
    }

    // Reset captured flag
    setHasAnswerCaptured(false);
  }
}, [isMicOn]);



  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognitionRef.current = recognition;

    recognition.start();

    recognition.onresult = (event) => {
      const userAnswer = event.results[0][0].transcript;
      console.log("Answer captured: ", userAnswer);
      setUserAnswersInFrontend(prev => [...prev, userAnswer]);
      setHasAnswerCaptured(true);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };


  const initializeMedia = async (video = true, audio = true) => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video, audio });
      localStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current.play().catch(console.error);
      }
      setIsCameraOn(stream.getVideoTracks().length > 0);
      setIsMicOn(stream.getAudioTracks().length > 0);
      return true;
    } catch (error) {
      setErrorMessage(`Could not access media devices: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCamera = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (isCameraOn) {
        localStreamRef.current?.getVideoTracks().forEach(track => track.stop());
        if (isMicOn) await initializeMedia(false, true);
        else {
          videoRef.current.srcObject = null;
          localStreamRef.current = null;
          setIsCameraOn(false);
        }
      } else await initializeMedia(true, isMicOn);
    } catch (error) {
      setErrorMessage(`Error toggling camera: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMicrophone = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (localStreamRef.current) {
        const audioTracks = localStreamRef.current.getAudioTracks();
        if (audioTracks.length > 0) {
          audioTracks[0].enabled = !isMicOn;
          setIsMicOn(!isMicOn);
        } else if (!isMicOn) {
          // mic was off, and no track found — get new audio track and add
          const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const newAudioTrack = newStream.getAudioTracks()[0];
          localStreamRef.current.addTrack(newAudioTrack);
          setIsMicOn(true);
        }
      }
    } catch (error) {
      setErrorMessage(`Error toggling microphone: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };


  const startInterview = async () => {
    if (!(isCameraOn || isMicOn)) {
      setErrorMessage("Please enable camera or microphone before starting the interview.");
      return;
    }
    try {
      setIsLoading(true);
      await startInterviewByIdService(interviewId, { isCameraOn, isMicOn, status: 'In_progress' });
      setStatus('In_progress');
      setTogger(true);
      setIsInterviewStarted(true);
      setIsInterviewEnded(false);
      setCurrentQuestionIndex(0);
      setUserAnswersInFrontend([]);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Failed to start interview");
    } finally {
      setIsLoading(false);
    }
  };

  const endInterview = async () => {
    try {
      setIsLoading(true);
      const userDuration = Math.floor(secondsElapsed / 60); // you can send this to backend
      await endInterviewByIdService(interviewId, { userDuration, status: 'Completed' });
      const response = await updateAnswerByIdService(questionId, { userQuestionsInFrontend, userAnswersInFrontend });

      console.log('response by backend userAnswersInFrontend by user --------> ', response.data.data);
      setStatus('Completed');
      setIsInterviewEnded(true);
      setIsInterviewStarted(false);
      localStreamRef.current?.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      localStreamRef.current = null;
      setIsCameraOn(false);
      setIsMicOn(false);
      navigate('/dashboard/interviews');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Failed to end interview");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (isInterviewStarted && !isInterviewEnded) {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000); // runs every second
    }

    return () => clearInterval(timer);
  }, [isInterviewStarted, isInterviewEnded]);


  const formatTime = (totalSeconds) => {

    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${String(min).padStart(2, '0')} : ${String(sec).padStart(2, '0')}`;
  };


  useEffect(() => {
    return () => localStreamRef.current?.getTracks().forEach(track => track.stop());
  }, []);

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMessage("Your browser doesn't support camera/microphone access. Use Chrome, Firefox, or Edge.");
    }
  }, []);

  return (
    <div>
      <div className="beforeInterview Div flex flex-col w-screen min-h-screen bg-[#18181B] text-white px-6 py-4 lg:px-2">

        {togger ? (<div className="w-full flex  bg-[#27272A] py-3 px-6 rounded-lg justify-between items-center my-4">
          <h1>Job Title: {jobTitle}</h1>
          {/* <button onClick={endInterview} className="bg-[#5B5B63] rounded-lg py-1 px-3">Interview Ended</button> */}

        </div>) : ""}

        <div className="flex-1 flex flex-col md:flex-row lg:flex-row items-center justify-center gap-10">
          <div className="leftDiv w-[16rem] h-[10rem] lg:w-[24rem] lg:h-[24rem] max-w-xl max-h-2xl aspect-video bg-[#242427] rounded-lg overflow-hidden relative">
            {/* Video element - always present but may not show anything */}
            <video
              ref={videoRef}
              autoPlay

              // muted={!isMicOn}
              className={`w-full h-full object-cover ${isCameraOn ? 'block' : 'hidden'}`}
            />

            {/* Placeholder when camera is off */}
            {!isCameraOn && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="text-center mb-4">

                  <p className="text-sm text-gray-400">Camera is currently off</p>
                </div>
              </div>
            )}

            {/* Media controls */}
            <div className="absolute bottom-4 w-full px-4 flex justify-between items-center">
              {/* Left: Username */}
              <p className="text-lg text-white">{userName}</p>

              {/* Center: Camera toggle button */}
              <div className="flex justify-center w-full absolute left-0">
                <button
                  onClick={toggleCamera}
                  disabled={isLoading}
                  className={`${isCameraOn ? "bg-green-600" : "bg-gray-800"
                    } hover:bg-opacity-90 p-3 rounded-full relative ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {isLoading ? (
                    <div className="animate-spin h-6 w-6 border-2 border-white rounded-full border-t-transparent"></div>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
              </div>
            </div>

          </div>
          {togger ? (
            <div className="rightDiv w-[16rem] h-[10rem] lg:w-[24rem] lg:h-[24rem] max-w-xl max-h-2xl aspect-video bg-[#242427] rounded-lg overflow-hidden relative flex justify-center items-center">
              <div className="w-20 h-20 lg:w-30 lg:h-30  rounded-full">
                <img className="w-full h-full bg-cover rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              </div>
              <div className="absolute left-4 bottom-4"> <p className="text-base">{interviewerName}</p></div>
            </div>
          ) : ""}
        </div>

        {togger ? (
          <div className="absolute bottom-22 left-1/2 transform -translate-x-1/2 flex space-x-4">
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
          </div>
        ) : ""}

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {!isInterviewStarted ? (
            <button
              onClick={startInterview}
              disabled={(!isCameraOn) || isLoading}
              className={`font-medium py-2 px-4 rounded-lg block ${(isCameraOn) && !isLoading
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}>
              {isLoading ? "Please wait..." : "Start Interview"}
            </button>
          ) : !isInterviewEnded ? (
            <button
              onClick={endInterview}
              disabled={isLoading}
              className={`bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 block rounded-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
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

        <div className="p-1 lg:p-4 bg-[#18181B] flex justify-between items-center">
          <div className="text-gray-300">
            {isInterviewStarted ? formatTime(secondsElapsed) : "30 : 00"}
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
    </div >
  );
};

export default Join;
