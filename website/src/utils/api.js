// website/src/utils/api.js

import axios from "axios";
import { logout, setSessionExpired } from "../redux/slices/authSlice";

// Store reference for dispatching actions
let store;

// Set store reference (call this in your main App component)
export const setStore = (storeInstance) => {
  store = storeInstance;
};

import { debounce } from 'lodash';

const debouncedSearch = debounce((searchTerm, callback) => {
  propertyAPI.getAll({ search: searchTerm }).then(callback);
}, 300);

// API Base URL - use local backend in development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8001/";

// Centralized token refresh function
export const refreshTokens = async (refresh) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}core/auth/refresh/`,
      { refresh },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return {
      access: data.access,
      refresh: data.refresh || refresh,
    };
  } catch (error) {
    console.error("Token Refresh Error:", error);
    throw error;
  }
};

// Enhanced API utilities WITHOUT caching
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

// Track if we're currently refreshing to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

// Process failed requests after token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

// Slow request threshold (ms)
const SLOW_REQUEST_THRESHOLD = 5000;

// Enhanced request interceptor
api.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.access;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }

  // Track request start time for slow request detection
  config.metadata = { startTime: Date.now() };

  return config;
});

// Enhanced response interceptor with token refresh logic
api.interceptors.response.use(
  (response) => {
    // Check if request was slow
    if (response.config.metadata?.startTime) {
      const duration = Date.now() - response.config.metadata.startTime;
      if (duration > SLOW_REQUEST_THRESHOLD) {
        // Emit slow request event
        window.dispatchEvent(new CustomEvent('slowRequest', {
          detail: { duration, url: response.config.url }
        }));
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is due to expired token
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const auth = JSON.parse(localStorage.getItem("auth"));
      const refreshToken = auth?.refresh;

      if (refreshToken) {
        try {
          // Attempt to refresh token
          const newTokens = await refreshTokens(refreshToken);
          
          // Update localStorage with new tokens
          const updatedAuth = {
            ...auth,
            access: newTokens.access,
            refresh: newTokens.refresh,
          };
          localStorage.setItem("auth", JSON.stringify(updatedAuth));

          // Update authorization header for original request
          originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
          
          processQueue(null, newTokens.access);
          isRefreshing = false;

          // Retry original request with new token
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed - log user out
          processQueue(refreshError, null);
          isRefreshing = false;

          // Clear auth data
          localStorage.removeItem("auth");

          // Dispatch session expired and logout actions if store is available
          if (store) {
            store.dispatch(setSessionExpired(true));
            store.dispatch(logout());
          }

          // Show user-friendly message
          console.error("Session expired. Please log in again.");

          return Promise.reject({
            ...refreshError,
            isAuthError: true,
            isSessionExpired: true,
            message: "Your session has expired. Please log in again."
          });
        }
      } else {
        // No refresh token available - user needs to login
        isRefreshing = false;
        localStorage.removeItem("auth");

        if (store) {
          store.dispatch(setSessionExpired(true));
          store.dispatch(logout());
        }

        return Promise.reject({
          ...error,
          isAuthError: true,
          isSessionExpired: true,
          message: "Please log in to continue."
        });
      }
    }

    // Handle other types of errors
    if (error.code === 'ECONNABORTED') {
      // Emit slow request event for timeouts
      window.dispatchEvent(new CustomEvent('slowRequest', {
        detail: { duration: 'timeout', url: error.config?.url }
      }));
      return Promise.reject({
        ...error,
        isNetworkError: true,
        message: "Request timeout. Please check your connection and try again."
      });
    }

    // Handle network errors (no internet)
    if (error.code === 'ERR_NETWORK' || !navigator.onLine) {
      return Promise.reject({
        ...error,
        isNetworkError: true,
        isOffline: true,
        message: "Unable to connect. Please check your internet connection."
      });
    }

    if (error.response?.status >= 500) {
      return Promise.reject({
        ...error,
        isServerError: true,
        message: "Server error. Our team has been notified. Please try again later."
      });
    }

    if (error.response?.status === 429) {
      return Promise.reject({
        ...error,
        isRateLimited: true,
        message: "Too many requests. Please wait a moment and try again."
      });
    }

    if (error.response?.status === 404) {
      return Promise.reject({
        ...error,
        isNotFound: true,
        message: "The requested resource was not found."
      });
    }

    return Promise.reject(error);
  }
);

const clearInvalidAuth = () => {
  localStorage.removeItem("auth");
  if (store) {
    store.dispatch(logout());
  }
};

// API functions WITHOUT caching
export const propertyAPI = {
  getAll: async (params = {}) => {
    try {
      // First try without authentication for public endpoints
      const response = await axios.get(`${API_BASE_URL}properties/`, {
        params,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response;
    } catch (error) {
      // If we get a 403, it might be because we're sending a bad token
      if (error.response?.status === 403) {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (auth?.access) {
          // We have a token that's causing issues, clear it and retry
          console.log("Clearing invalid token and retrying...");
          clearInvalidAuth();

          // Retry without authentication
          return axios.get(`${API_BASE_URL}properties/`, {
            params,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
        }
      }
      throw error;
    }
  },

  getAllAdmin: async (params = {}) => {
    // Use authenticated endpoint to get ALL properties (including unpublished)
    return api.get('/properties/', { params });
  },

  getById: async (id) => {
    try {
      // Try public endpoint first for shared links
      const response = await axios.get(
        `${API_BASE_URL}public/properties/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      if (error.response?.status === 404) {
        // Property not found or not public, try authenticated endpoint
        try {
          return await api.get(`/properties/${id}/`);
        } catch (authError) {
          throw authError;
        }
      }
      throw error;
    }
  },

  // These require authentication
  create: (data) => api.post("/properties/", data),
  update: (id, data) => api.patch(`/properties/${id}/`, data),
  delete: (id) => api.delete(`/properties/${id}/`),
  getUserProperties: (userId) => api.get("/properties/", { params: { user_id: userId } }),
  getStats: (id) => api.get(`/properties/${id}/stats/`),
  // Share works for both authenticated and unauthenticated users
  share: (id) => publicApi.post(`/properties/${id}/share/`),
  getShared: (token) => publicApi.get(`/shared-properties/${token}/`),
  // Inquiry works for both authenticated and unauthenticated users
  inquiry: (id, data) => publicApi.post(`/properties/${id}/inquiry/`, data),
  // Filter options (cached on server)
  getFilterOptions: () => publicApi.get('/properties/filter-options/'),
};

export const alertAPI = {
  create: (data) => api.post("/property-alerts/", data),
  getAll: () => api.get("/property-alerts/"),
  delete: (id) => api.delete(`/property-alerts/${id}/`),
};

export const authAPI = {
  login: (data) => api.post("/auth/login/", data),
  register: (data) => api.post("/auth/register/", data),
  logout: () => api.post("/auth/logout/"),
  refresh: (refresh) => refreshTokens(refresh),
  resendVerificationEmail: (email) =>
    api.post("/resend-verification/", { email }),
  verifyEmail: (uid, token) => api.post("/verify-email/", { uid, token }),
  resetPassword: (email) => api.post("/reset-password/", { email }),
  changePassword: (data) => api.post("/change-password/", data),
  verifyResetCode: (uid, token) =>
    api.post("/verify-reset-code/", { uid, token }),
};

export const userAPI = {
  getProfile: () => api.get("/profile/"),
  updateProfile: (data) => api.put("/profile/", data),
  getDashboard: () => api.get("/dashboard/user/"),
};

export const recommendationsAPI = {
  getAll: () => api.get("/recommendations/"),
  getById: (id) => api.get(`/recommendations/${id}/`),
};

export const mortgageAPI = {
  calculate: (data) => api.post("/mortgage/", data),
};

export const adminAPI = {
  getAllUsers: () => api.get("/admin/users/"),
  updateUser: (id, data) => api.patch(`/admin/users/${id}/`, data),
  getDashboard: () => api.get("/dashboard/admin/"),
  getStats: () => api.get("/admin/stats/"),
  getUserStats: (userId) => api.get(`/admin/stats/?user_id=${userId}`),
  adminlogActivity: (userId) => api.get(`/admin/logs/?user_id=${userId}`),
  getUserLogs: (userId) => api.get(`/admin/logs/?user_id=${userId}`),
  getActions: () => api.get("/admin/actions/"),
  resetPassword: (userId, newPassword) =>
    api.post(`/admin/users/${userId}/reset_password/`, {
      new_password: newPassword,
    }),
};

export default api;