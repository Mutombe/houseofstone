import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Check token expiry
const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("Login Credentials:", credentials);
      const response = await api.post("auth/login/", credentials);
      console.log("Login Response:", response.data);
      return {
        access: response.data.access,
        refresh: response.data.refresh,
        user: response.data.user,
      };
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      
      // Handle specific error cases
      if (err.response?.status === 401) {
        return rejectWithValue({
          detail: "Invalid credentials. Please check your email and password."
        });
      }
      
      if (err.isAuthError) {
        return rejectWithValue({
          detail: err.message || "Authentication failed. Please try again."
        });
      }
      
      return rejectWithValue(
        err.response?.data || { detail: err.message || "Login Failed" }
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/register/", userData);
      return {
        access: response.data.access,
        refresh: response.data.refresh,
        user: response.data.user,
        detail: response.data?.detail || "Registration Successful",
      };
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      
      if (err.isAuthError) {
        return rejectWithValue({
          detail: err.message || "Registration failed. Please try again."
        });
      }
      
      return rejectWithValue(
        err.response?.data || { detail: err.message || "Registration Failed" }
      );
    }
  }
);

export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerification",
  async (email, { rejectWithValue }) => {
    try {
      await api.post("/resend-verification/", { email });
      return { email };
    } catch (err) {
      if (err.isAuthError) {
        return rejectWithValue({
          detail: err.message || "Session expired. Please log in again."
        });
      }
      return rejectWithValue(err.response?.data || { detail: "Failed to resend verification email" });
    }
  }
);

export const refreshTokens = async (refreshToken) => {
  const response = await api.post("auth/refresh/", { refresh: refreshToken });
  return {
    access: response.data.access,
    refresh: response.data.refresh,
  };
};

// Check authentication status
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      
      if (!auth?.access || !auth?.refresh) {
        throw new Error("No tokens found");
      }
      
      // Check if access token is expired
      if (isTokenExpired(auth.access)) {
        // Try to refresh token
        try {
          const newTokens = await refreshTokens(auth.refresh);
          const updatedAuth = {
            ...auth,
            access: newTokens.access,
            refresh: newTokens.refresh,
          };
          localStorage.setItem("auth", JSON.stringify(updatedAuth));
          return updatedAuth;
        } catch (refreshError) {
          // Refresh failed, logout user
          dispatch(logout());
          throw new Error("Session expired");
        }
      }
      
      return auth;
    } catch (err) {
      localStorage.removeItem("auth");
      return rejectWithValue({
        detail: "Please log in to continue.",
        requiresLogin: true
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    tokens: JSON.parse(localStorage.getItem("auth")),
    isAuthenticated: (() => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      return !!(auth?.access && !isTokenExpired(auth.access));
    })(),
    status: "idle",
    error: null,
    sessionExpired: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("auth");
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.sessionExpired = false;
      state.error = null;
      state.status = "idle";
    },
    clearError: (state) => {
      state.error = null;
    },
    setSessionExpired: (state, action) => {
      state.sessionExpired = action.payload;
      if (action.payload) {
        state.isAuthenticated = false;
        state.user = null;
        state.tokens = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.tokens = {
          access: action.payload.access,
          refresh: action.payload.refresh,
        };
        state.sessionExpired = false;
        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: action.payload.access,
            refresh: action.payload.refresh,
            user: action.payload.user,
          })
        );
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.payload || { detail: "Registration failed" };
        if (action.payload?.requiresLogin) {
          state.sessionExpired = true;
        }
      })
      
      // Login cases
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.sessionExpired = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tokens = {
          access: action.payload.access,
          refresh: action.payload.refresh,
        };
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.sessionExpired = false;
        state.error = null;
        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: action.payload.access,
            refresh: action.payload.refresh,
            user: action.payload.user,
          })
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || { detail: "Login failed" };
        state.isAuthenticated = false;
        if (action.payload?.requiresLogin) {
          state.sessionExpired = true;
        }
      })
      
      // Check auth cases
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.tokens = {
          access: action.payload.access,
          refresh: action.payload.refresh,
        };
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.sessionExpired = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.tokens = null;
        if (action.payload?.requiresLogin) {
          state.sessionExpired = true;
          state.error = action.payload;
        }
      })
      
      // Resend verification cases
      .addCase(resendVerificationEmail.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.error = action.payload || { detail: "Failed to resend verification email" };
        if (action.payload?.requiresLogin) {
          state.sessionExpired = true;
        }
      });
  },
});

export const { logout, clearError, setSessionExpired } = authSlice.actions;
export default authSlice.reducer;