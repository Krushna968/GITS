// API Configuration
// This file manages the backend API URL for different environments

const API_CONFIG = {
  // Production backend (deployed on Render)
  production: 'https://swaasthyam-backend.onrender.com',
  
  // Development backend (local)
  development: 'http://localhost:5000',
};

// Automatically detect environment
// If deployed (Vercel), use production backend
// If local development, use localhost
const getApiUrl = () => {
  // Check if we're on Vercel/production
  if (window.location.hostname === 'swaasthyam.vercel.app' || 
      window.location.hostname.includes('vercel.app')) {
    return API_CONFIG.production;
  }
  
  // Check if we're on localhost
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1') {
    return API_CONFIG.development;
  }
  
  // Default to production for any other domain
  return API_CONFIG.production;
};

// Export the base API URL
export const API_BASE_URL = getApiUrl();

// Export API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  SEND_OTP: `${API_BASE_URL}/api/auth/send-otp`,
  VERIFY_OTP: `${API_BASE_URL}/api/auth/verify-otp`,
  
  // Chatbot endpoints
  CHATBOT_QUERY: `${API_BASE_URL}/api/chatbot/query`,
  CHATBOT_QUICK_REPLIES: `${API_BASE_URL}/api/chatbot/quick-replies`,
  CHATBOT_HEALTH: `${API_BASE_URL}/api/chatbot/health`,
  
  // Health endpoints
  HEALTH_RECORDS: `${API_BASE_URL}/api/health/records`,
  
  // Alert endpoints
  ALERTS: `${API_BASE_URL}/api/alerts`,
};

console.log('🔗 API Configuration:', {
  environment: window.location.hostname,
  apiBaseUrl: API_BASE_URL
});

export default API_BASE_URL;

