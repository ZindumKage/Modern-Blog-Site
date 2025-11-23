import axios from "axios";

// Base URL for your backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token to requests if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: global response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    const message =
      error.response?.data?.message || error.message || "API request failed";
    return Promise.reject(new Error(message));
  }
);

export default api;