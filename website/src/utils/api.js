import axios from "axios";
import { logout } from "../redux/slices/authSlice";
// Store reference for dispatching actions
let store;

// Set store reference (call this in your main App component)
export const setStore = (storeInstance) => {
  store = storeInstance;
};

// Centralized token refresh function
export const refreshTokens = async (refresh) => {
  try {
    const baseUrl = "http://127.0.0.1:8000/";
    const { data } = await axios.post(
      `${baseUrl}core/auth/refresh/`,
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

// Enhanced API utilities with caching and pagination
const api = axios.create({
  baseURL: "https://houseofstone-backend.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  timeout: 30000, // 30 second timeout
});

// Simple in-memory cache for API responses
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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

// Cache helper functions
const getCacheKey = (url, params) => {
  const sortedParams = params
    ? Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join("&")
    : "";
  return `${url}?${sortedParams}`;
};

const isValidCache = (cacheEntry) => {
  return cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_DURATION;
};

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

  return config;
});

// Enhanced response interceptor with token refresh logic
api.interceptors.response.use(
  (response) => {
    // Cache GET requests
    if (response.config.method === "get" && response.config.cache !== false) {
      const cacheKey = getCacheKey(response.config.url, response.config.params);
      apiCache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });
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
          
          // Dispatch logout action if store is available
          if (store) {
            store.dispatch(logout());
          }
          
          // Show user-friendly message
          console.error("Session expired. Please log in again.");
          
          // You can also show a toast notification here
          // toast.error("Your session has expired. Please log in again.");
          
          return Promise.reject({
            ...refreshError,
            isAuthError: true,
            message: "Your session has expired. Please log in again."
          });
        }
      } else {
        // No refresh token available - user needs to login
        isRefreshing = false;
        localStorage.removeItem("auth");
        
        if (store) {
          store.dispatch(logout());
        }
        
        return Promise.reject({
          ...error,
          isAuthError: true,
          message: "Please log in to continue."
        });
      }
    }

    // Handle other types of errors
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        ...error,
        message: "Request timeout. Please try again."
      });
    }

    if (error.response?.status >= 500) {
      return Promise.reject({
        ...error,
        message: "Server error. Please try again later."
      });
    }

    return Promise.reject(error);
  }
);

// Add to existing utils.js
export const propertyAPI = {
  // Get all properties with caching and pagination
  getAll: async (params = {}, useCache = true) => {
    const cacheKey = getCacheKey("/properties/", params);

    if (useCache) {
      const cachedData = apiCache.get(cacheKey);
      if (isValidCache(cachedData)) {
        return { data: cachedData.data };
      }
    }

    // Add default pagination
    const defaultParams = {
      page_size: 20,
      ...params,
    };

    return api.get("/properties/", { params: defaultParams });

  },

  // Get property by ID with caching
  getById: async (id, useCache = true) => {
    const cacheKey = getCacheKey(`/properties/${id}/`);

    if (useCache) {
      const cachedData = apiCache.get(cacheKey);
      if (isValidCache(cachedData)) {
        return { data: cachedData.data };
      }
    }

    return api.get(`/properties/${id}/`);
  },

  // Create property
  create: (data) => {
    // Clear relevant caches after creation
    apiCache.clear();
    return api.post("/properties/", data);
  },

  // Update property
  update: (id, data) => {
    // Clear relevant caches after update
    for (let key of apiCache.keys()) {
      if (key.includes("/properties/") || key.includes(`/${id}/`)) {
        apiCache.delete(key);
      }
    }
    return api.patch(`/properties/${id}/`, data);
  },

  // Delete property
  delete: (id) => {
    // Clear relevant caches after deletion
    for (let key of apiCache.keys()) {
      if (key.includes("/properties/") || key.includes(`/${id}/`)) {
        apiCache.delete(key);
      }
    }
    return api.delete(`/properties/${id}/`);
  },

  // Get user properties with caching
  getUserProperties: (userId, useCache = true) => {
    return propertyAPI.getAll({ user_id: userId }, useCache);
  },

  // Get property stats
  getStats: (id) => api.get(`/properties/${id}/stats/`),

  // Share property
  share: (id) => api.post(`/properties/${id}/share/`),

  // Get shared property
  getShared: (token) => api.get(`/shared-properties/${token}/`),

  // Clear cache manually
  clearCache: () => apiCache.clear(),

  // Batch operations for better performance
  batchUpdate: (updates) => {
    const promises = updates.map(({ id, data }) =>
      api.patch(`/properties/${id}/`, data)
    );
    return Promise.all(promises);
  },
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