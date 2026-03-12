// utils/api.ts
import axios from 'axios';

const api = axios.create({
  // Use the env variable first, fall back to Render (not localhost)
  baseURL: (process.env.NEXT_PUBLIC_API_BASE_URL || "https://saas-subscription-system.onrender.com").replace(/\/$/, ""),
  timeout: 60000, 
});

console.log("Current API Base URL:", api.defaults.baseURL);

// utils/api.ts
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    console.log("DEBUG: Token found in localStorage:", token); // <-- Add this
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});


export default api;