import React, { useEffect } from 'react';
import { clearError, setSessionExpired } from '../redux/slices/authSlice';

const SessionExpiryHandler = ({ dispatch, sessionExpired, isAuthenticated, onNavigate }) => {

  useEffect(() => {
    // Listen for auth errors globally
    const handleAuthError = (event) => {
      if (event.detail?.isAuthError) {
        dispatch(setSessionExpired(true));
      }
    };

    window.addEventListener('authError', handleAuthError);
    return () => window.removeEventListener('authError', handleAuthError);
  }, [dispatch]);

  useEffect(() => {
    if (sessionExpired && !isAuthenticated) {
      // Show notification and redirect to login
      const timer = setTimeout(() => {
        onNavigate('/login', { 
          message: 'Your session has expired. Please log in again.',
          from: window.location.pathname 
        });
        dispatch(setSessionExpired(false));
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [sessionExpired, isAuthenticated, onNavigate, dispatch]);

  // Show session expired modal/notification
  if (sessionExpired && !isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Session Expired</h3>
              <p className="text-sm text-gray-600">Your login session has expired</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">
            For your security, you`ve been logged out. Please log in again to continue.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                dispatch(setSessionExpired(false));
                dispatch(clearError());
                onNavigate('/login', { 
                  message: 'Please log in to continue.',
                  from: window.location.pathname 
                });
              }}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Log In Again
            </button>
            <button
              onClick={() => {
                dispatch(setSessionExpired(false));
                dispatch(clearError());
                onNavigate('/');
              }}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SessionExpiryHandler;