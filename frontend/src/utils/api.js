import axios from "axios";
import toast from "react-hot-toast";

// Dynamic API base URL - works for both localhost and network access
const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  let baseUrl;

  // If accessing via localhost, use localhost
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    baseUrl = "http://localhost:5000/api/v1";
  } else {
    // If accessing via network IP, use the same IP with port 5000
    baseUrl = `http://${hostname}:5000/api/v1`;
  }

  console.log(`API Base URL: ${baseUrl} (hostname: ${hostname})`);
  return baseUrl;
};

const API_BASE_URL = getApiBaseUrl();

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    let message;
    if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
      message =
        "Cannot connect to server. Make sure the backend is running and accessible.";
    } else {
      message = error.response?.data?.message || "An error occurred";
    }

    toast.error(message);

    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (profileData) => api.put("/auth/profile", profileData),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  resendVerificationEmail: (email) =>
    api.post("/auth/resend-verification", { email }),
};

// Tasks API calls
export const tasksAPI = {
  getTasks: (params = {}) => api.get("/tasks", { params }),
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (taskData) => api.post("/tasks", taskData),
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export default api;
