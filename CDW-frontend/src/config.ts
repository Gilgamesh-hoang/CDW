// API Configuration
export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8182/api/v1';

// Log the API URL to help with debugging
console.log('API_URL configured as:', API_URL);
