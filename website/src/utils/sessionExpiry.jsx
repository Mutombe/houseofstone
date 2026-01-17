import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clearError, setSessionExpired } from '../redux/slices/authSlice';
import { Clock, LogIn, Home, X, AlertCircle } from 'lucide-react';

const SessionExpiryHandler = ({ dispatch, sessionExpired, isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth errors globally
    const handleAuthError = (event) => {
      if (event.detail?.isAuthError || event.detail?.isSessionExpired) {
        dispatch(setSessionExpired(true));
      }
    };

    window.addEventListener('authError', handleAuthError);
    return () => window.removeEventListener('authError', handleAuthError);
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(setSessionExpired(false));
    dispatch(clearError());
    navigate('/login', {
      state: {
        message: 'Please log in to continue.',
        from: window.location.pathname
      }
    });
  };

  const handleDismiss = () => {
    dispatch(setSessionExpired(false));
    dispatch(clearError());
  };

  const handleGoHome = () => {
    dispatch(setSessionExpired(false));
    dispatch(clearError());
    navigate('/');
  };

  // Show session expired modal/notification
  if (!sessionExpired || isAuthenticated) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-[#0A1628] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
        >
          {/* Header with icon */}
          <div className="relative p-8 pb-0">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-amber-500" />
            </div>

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 pt-4 text-center">
            <h2 className="text-xl font-bold text-white mb-2">
              Session Expired
            </h2>
            <p className="text-gray-400 mb-6">
              For your security, your session has expired. Please log in again to
              continue accessing your account.
            </p>

            {/* Security reminder */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-medium text-white mb-1">
                    Why did this happen?
                  </p>
                  <p className="text-xs text-gray-400">
                    Sessions expire automatically after a period of inactivity to
                    protect your account. This is a standard security measure.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Log In Again
              </motion.button>

              <button
                onClick={handleGoHome}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/5 border border-white/10 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition-all"
              >
                <Home className="w-4 h-4" />
                Continue Browsing
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SessionExpiryHandler;
