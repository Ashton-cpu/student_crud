import axios from 'axios';

// Get base URL from environment or localStorage if user configured it in the UI
const getBaseUrl = () => {
  return localStorage.getItem('CUSTOM_API_BASE_URL') || import.meta.env.VITE_API_BASE_URL || '';
};

export const api = axios.create({
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor to dynamically apply baseURL
api.interceptors.request.use((config) => {
  const baseURL = getBaseUrl();
  if (baseURL) {
    config.baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  }
  return config;
});

export { getBaseUrl };
