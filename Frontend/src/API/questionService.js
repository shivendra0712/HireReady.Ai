import axios from 'axios';

// Base URL for API calls
const API_URL = 'http://localhost:5000/api/question';

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
 * Create a new question
 * @param {Object} questionData - Question data
 * @param {string} questionData.userId - User ID
 * @param {string} questionData.sessionId - Interview session ID
 * @param {number} questionData.questionNumber - Question number (optional)
 * @param {string} questionData.aiQuestion - Question text
 * @param {string} questionData.category - Question category
 * @param {string} questionData.role - Job role
 * @param {string} questionData.difficulty - Question difficulty
 * @returns {Promise<Object>} - Created question data
 */
export const createQuestion = async (questionData) => {
  try {
    const response = await api.post('/create', questionData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get all questions with optional filtering
 * @param {Object} filters - Optional filters
 * @param {string} filters.sessionId - Filter by interview session ID
 * @param {string} filters.userId - Filter by user ID
 * @param {string} filters.category - Filter by category
 * @param {string} filters.role - Filter by role
 * @param {string} filters.difficulty - Filter by difficulty
 * @param {string} filters.status - Filter by status
 * @param {string} filters.sort - Sort field (default: 'questionNumber')
 * @returns {Promise<Array>} - List of questions
 */
export const getAllQuestions = async (filters = {}) => {
  try {
    const response = await api.get('/view-all', { params: filters });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get question by ID
 * @param {string} questionId - Question ID
 * @returns {Promise<Object>} - Question data
 */
export const getQuestionById = async (questionId) => {
  try {
    const response = await api.get(`/view/${questionId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Update question answer and related fields
 * @param {string} questionId - Question ID
 * @param {Object} answerData - Answer data
 * @param {string} answerData.userAnswer - User's answer text
 * @param {string} answerData.userAnswerAudio - URL to audio recording (optional)
 * @returns {Promise<Object>} - Updated question data
 */
export const updateQuestionAnswer = async (questionId, answerData) => {
  try {
    const response = await api.put(`/update-answer/${questionId}`, answerData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Skip a question
 * @param {string} questionId - Question ID
 * @param {Object} data - Additional data (optional)
 * @returns {Promise<Object>} - Updated question data
 */
export const skipQuestion = async (questionId, data = {}) => {
  try {
    const response = await api.put(`/skip/${questionId}`, data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Generate AI feedback for a question
 * @param {string} questionId - Question ID
 * @returns {Promise<Object>} - Updated question data with feedback
 */
export const generateFeedback = async (questionId) => {
  try {
    const response = await api.post(`/generate-feedback/${questionId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Delete a question
 * @param {string} questionId - Question ID
 * @returns {Promise<Object>} - Response data
 */
export const deleteQuestion = async (questionId) => {
  try {
    const response = await api.delete(`/delete/${questionId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Upload audio recording for a question answer
 * @param {string} questionId - Question ID
 * @param {File} audioFile - Audio file to upload
 * @returns {Promise<Object>} - Response with audio URL
 */
export const uploadAnswerAudio = async (questionId, audioFile) => {
  try {
    // Create form data for file upload
    const formData = new FormData();
    formData.append('audio', audioFile);
    
    // Use different content type for file upload
    const response = await axios.post(
      `${API_URL}/upload-audio/${questionId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      }
    );
    
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
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionAnswer,
  skipQuestion,
  generateFeedback,
  deleteQuestion,
  uploadAnswerAudio
};
