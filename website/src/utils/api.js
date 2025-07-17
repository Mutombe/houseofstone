import axios from "axios";

// Get the base URL based on environment
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return "https://houseofstone-backend.onrender.com/";
  }
  return "https://houseofstone-backend.onrender.com/";
};

// Centralized token refresh function
export const refreshTokens = async (refresh) => {
  try {
    const baseUrl = getBaseUrl();
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

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("auth"))?.access; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    // Otherwise use JSON
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// Add to existing utils.js
export const propertyAPI = {
  getAll: (params) => api.get("/properties/", { params }),
  getById: (id) => api.get(`/properties/${id}/`),
  create: (data) => api.post("/properties/", data),
  update: (id, data) => api.patch(`/properties/${id}/`, data),
  delete: (id) => api.delete(`/properties/${id}/`),
  getUserProperties: (userId) => api.get(`/properties/?user_id=${userId}`),
  getStats: (id) => api.get(`/property-stats/${id}/`),
  share: (id) => api.post(`/properties/${id}/share/`),
  getShared: (token) => api.get(`/shared-properties/${token}/`)
};

export const alertAPI = {
  create: (data) => api.post("/property-alerts/", data),
  getAll: () => api.get("/property-alerts/"),
  delete: (id) => api.delete(`/property-alerts/${id}/`)
};

export const authAPI = {
  login: (data) => api.post("/auth/login/", data),
  register: (data) => api.post("/auth/register/", data),
  logout: () => api.post("/auth/logout/"),
  refresh: (refresh) => refreshTokens(refresh),
  resendVerificationEmail: (email) => api.post("/resend-verification/", { email }),
  verifyEmail: (uid, token) => api.post("/verify-email/", { uid, token }),
  resetPassword: (email) => api.post("/reset-password/", { email }),
  changePassword: (data) => api.post("/change-password/", data),
  verifyResetCode: (uid, token) => api.post("/verify-reset-code/", { uid, token }),
}

export const userAPI = {
  getProfile: () => api.get("/profile/"),
  updateProfile: (data) => api.put("/profile/", data),
  getDashboard: () => api.get("/dashboard/user/")
};

export const recommendationsAPI = {
  getAll: () => api.get("/recommendations/"),
  getById: (id) => api.get(`/recommendations/${id}/`),
}

export const mortgageAPI = {
  calculate: (data) => api.post('/mortgage/', data)
};

export const adminAPI = {
  getAllUsers: () => api.get("/admin/users/"),
  updateUser: (id, data) => api.patch(`/admin/users/${id}/`, data),
  getDashboard: () => api.get("/dashboard/admin/"),
  getStats: () => api.get("/admin/stats/"),
  getUserStats: (userId) => api.get(`/admin/stats/?user_id=${userId}`),
  adminlogActivity: (userId) => api.get(`/admin/logs/?user_id=${userId}`),
  getUserLogs: (userId) => api.get(`/admin/logs/?user_id=${userId}`),
    getActions: () => api.get('/admin/actions/'),
  resetPassword: (userId, newPassword) => 
    api.post(`/admin/users/${userId}/reset_password/`, { new_password: newPassword })
}

export default api;