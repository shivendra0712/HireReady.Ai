import axios from 'axios';

// Base URL for API calls
const API_URL = 'http://localhost:5000/api/interview';

// Create axios instance with credentials support
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Create a new interview
 * @param {Object} interviewData - Interview data
 * @param {string} interviewData.userId - User ID
 * @param {string} interviewData.jobTitle - Job title
 * @param {string} interviewData.interviewType - Interview type (technical, behavioral, hr)
 * @param {number} interviewData.experience - Years of experience
 * @param {string} interviewData.interviewLevel - Interview level (beginner, intermediate, advanced)
 * @returns {Promise<Object>} - Created interview data
 */
export const createInterview = async (interviewData) => {
  try {
    const response = await api.post('/create', interviewData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get all interviews with optional filtering
 * @param {Object} filters - Optional filters
 * @param {string} filters.userId - Filter by user ID
 * @param {string} filters.status - Filter by status
 * @param {string} filters.interviewType - Filter by interview type
 * @param {string} filters.sort - Sort field and direction (e.g., '-createdAt')
 * @returns {Promise<Array>} - List of interviews
 */
export const getAllInterviews = async (filters = {}) => {
  try {
    const response = await api.get('/view-all', { params: filters });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get interview by ID with related questions
 * @param {string} interviewId - Interview ID
 * @returns {Promise<Object>} - Interview data with questions
 */
export const getInterviewById = async (interviewId) => {
  try {
    const response = await api.get(`/view/${interviewId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Update interview details
 * @param {string} interviewId - Interview ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} - Updated interview data
 */
export const updateInterview = async (interviewId, updateData) => {
  try {
    const response = await api.put(`/update/${interviewId}`, updateData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Start an interview - update status and startTime
 * @param {string} interviewId - Interview ID
 * @param {Object} data - Additional data
 * @param {boolean} data.isCameraOn - Camera status
 * @param {boolean} data.isMicOn - Microphone status
 * @returns {Promise<Object>} - Updated interview data
 */
export const startInterview = async (interviewId, data = {}) => {
  try {
    const response = await api.put(`/start/${interviewId}`, data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * End an interview - update status, endTime, and calculate duration
 * @param {string} interviewId - Interview ID
 * @param {Object} data - Additional data
 * @param {string} data.overallFeedback - Overall feedback
 * @param {number} data.overallScore - Overall score
 * @returns {Promise<Object>} - Updated interview data
 */
export const endInterview = async (interviewId, data = {}) => {
  try {
    const response = await api.put(`/end/${interviewId}`, data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Delete interview and its related questions
 * @param {string} interviewId - Interview ID
 * @returns {Promise<Object>} - Response data
 */
export const deleteInterview = async (interviewId) => {
  try {
    const response = await api.delete(`/delete/${interviewId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Handle API errors
 * @param {Error} error - Error object
 * @returns {Error} - Processed error
 */
const handleError = (error) => {
  // Extract error message from response if available
  const errorMessage = 
    error.response?.data?.error || 
    error.response?.data?.message || 
    error.message || 
    'An unknown error occurred';
  
  // Create a new error with the extracted message
  const processedError = new Error(errorMessage);
  
  // Add status code if available
  if (error.response) {
    processedError.status = error.response.status;
  }
  
  return processedError;
};

export default {
  createInterview,
  getAllInterviews,
  getInterviewById,
  updateInterview,
  startInterview,
  endInterview,
  deleteInterview
};
