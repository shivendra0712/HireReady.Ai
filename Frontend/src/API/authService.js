import axios from 'axios';

// Base URL for API calls
const API_URL = 'http://localhost:5000/api/auth';

// Create axios instance with credentials support
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.email - Email address
 * @param {string} userData.password - Password
 * @returns {Promise<Object>} - Response data
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Login a user
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - Email address
 * @param {string} credentials.password - Password
 * @returns {Promise<Object>} - Response data with token
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    
    // Store token in localStorage if needed
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Logout the current user
 * @returns {Promise<Object>} - Response data
 */
export const logout = async () => {
  try {
    const response = await api.post('/logout');
    
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get current user information
 * @returns {Promise<Object>} - User data
 */
export const getCurrentUser = async () => {
  try {
    // Add token to request if available
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await api.get('/current-user');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if authenticated
 */
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
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
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated
};
