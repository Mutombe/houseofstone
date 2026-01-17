// website/src/redux/slices/toastSlice.js
import { createSlice } from '@reduxjs/toolkit';

// User-friendly error messages mapping
const errorMessages = {
  // Network errors
  'Network Error': 'Unable to connect. Please check your internet connection.',
  'ERR_NETWORK': 'Unable to connect. Please check your internet connection.',
  'ECONNREFUSED': 'Server is not responding. Please try again later.',
  'timeout': 'Request timed out. Please try again.',

  // Authentication errors
  'Invalid credentials': 'Incorrect email or password. Please try again.',
  'No active account': 'Account not found. Please check your details.',
  'Token expired': 'Your session has expired. Please log in again.',
  'Authentication credentials were not provided': 'Please log in to continue.',
  'Permission denied': 'You don\'t have permission to do this.',

  // Validation errors
  'This field is required': 'Please fill in all required fields.',
  'This field may not be blank': 'Please fill in all required fields.',
  'Invalid email': 'Please enter a valid email address.',
  'Password too short': 'Password must be at least 8 characters.',

  // Server errors
  '500': 'Something went wrong on our end. Please try again later.',
  '502': 'Server is temporarily unavailable. Please try again.',
  '503': 'Service temporarily unavailable. Please try again later.',
  '404': 'The requested item was not found.',

  // CRUD operations
  'Delete failed': 'Unable to delete. Please try again.',
  'Update failed': 'Unable to save changes. Please try again.',
  'Create failed': 'Unable to create. Please try again.',
};

// Function to get user-friendly message
export const getUserFriendlyMessage = (error) => {
  if (!error) return 'Something went wrong. Please try again.';

  // Check if it's a string
  if (typeof error === 'string') {
    // Check for known error patterns
    for (const [key, message] of Object.entries(errorMessages)) {
      if (error.toLowerCase().includes(key.toLowerCase())) {
        return message;
      }
    }
    return error;
  }

  // Check if it's an axios error response
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    // Check status code first
    if (errorMessages[String(status)]) {
      return errorMessages[String(status)];
    }

    // Check for detail field (DRF standard)
    if (data?.detail) {
      for (const [key, message] of Object.entries(errorMessages)) {
        if (data.detail.toLowerCase().includes(key.toLowerCase())) {
          return message;
        }
      }
      return data.detail;
    }

    // Check for non_field_errors (DRF standard)
    if (data?.non_field_errors) {
      return Array.isArray(data.non_field_errors)
        ? data.non_field_errors[0]
        : data.non_field_errors;
    }

    // Check for field-specific errors
    if (typeof data === 'object') {
      const firstError = Object.values(data)[0];
      if (Array.isArray(firstError)) {
        return firstError[0];
      }
      if (typeof firstError === 'string') {
        return firstError;
      }
    }
  }

  // Check for message property
  if (error.message) {
    for (const [key, message] of Object.entries(errorMessages)) {
      if (error.message.toLowerCase().includes(key.toLowerCase())) {
        return message;
      }
    }
    return error.message;
  }

  return 'Something went wrong. Please try again.';
};

// Initial state
const initialState = {
  toasts: [],
};

// Generate unique ID
const generateId = () => `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Toast slice
const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action) => {
      const { type = 'info', title, message, duration = 5000 } = action.payload;
      state.toasts.push({
        id: generateId(),
        type,
        title,
        message,
        duration,
        createdAt: Date.now(),
      });
      // Limit to 5 toasts max
      if (state.toasts.length > 5) {
        state.toasts.shift();
      }
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    clearAllToasts: (state) => {
      state.toasts = [];
    },
  },
});

// Selectors
export const selectToasts = (state) => state.toast.toasts;

// Actions
export const { addToast, removeToast, clearAllToasts } = toastSlice.actions;

// Helper action creators for common toast types
export const showSuccess = (message, title = 'Success') =>
  addToast({ type: 'success', title, message, duration: 4000 });

export const showError = (error, title = 'Error') =>
  addToast({ type: 'error', title, message: getUserFriendlyMessage(error), duration: 6000 });

export const showWarning = (message, title = 'Warning') =>
  addToast({ type: 'warning', title, message, duration: 5000 });

export const showInfo = (message, title = 'Info') =>
  addToast({ type: 'info', title, message, duration: 4000 });

export default toastSlice.reducer;
