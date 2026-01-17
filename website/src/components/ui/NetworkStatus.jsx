import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw, AlertTriangle, X, CheckCircle } from 'lucide-react';

// Toast notification for network status
const NetworkToast = ({ type, message, subMessage, onDismiss, onRetry }) => {
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);
  const duration = type === 'offline' ? 10000 : 5000; // Offline stays longer

  useEffect(() => {
    // Start countdown
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining > 0) {
        timerRef.current = requestAnimationFrame(tick);
      } else {
        onDismiss?.();
      }
    };

    timerRef.current = requestAnimationFrame(tick);

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [duration, onDismiss]);

  const getConfig = () => {
    switch (type) {
      case 'offline':
        return {
          icon: WifiOff,
          bg: 'bg-red-600',
          progressBg: 'bg-red-400',
          iconBg: 'bg-red-500',
        };
      case 'slow':
        return {
          icon: AlertTriangle,
          bg: 'bg-amber-600',
          progressBg: 'bg-amber-400',
          iconBg: 'bg-amber-500',
        };
      case 'online':
        return {
          icon: CheckCircle,
          bg: 'bg-green-600',
          progressBg: 'bg-green-400',
          iconBg: 'bg-green-500',
        };
      default:
        return {
          icon: Wifi,
          bg: 'bg-gray-600',
          progressBg: 'bg-gray-400',
          iconBg: 'bg-gray-500',
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`relative overflow-hidden ${config.bg} rounded-xl shadow-2xl min-w-[320px] max-w-[400px]`}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <motion.div
          className={`h-full ${config.progressBg}`}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="p-4 pr-12">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg ${config.iconBg} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">{message}</p>
            {subMessage && (
              <p className="text-white/80 text-xs mt-0.5">{subMessage}</p>
            )}
            {type === 'offline' && onRetry && (
              <button
                onClick={onRetry}
                className="mt-2 flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-lg transition-all"
              >
                <RefreshCw className="w-3 h-3" />
                Retry Connection
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// Main NetworkStatus component
const NetworkStatus = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);
  const lastNotificationRef = useRef({ type: null, time: 0 });

  // Debounce notifications to avoid spam
  const showNotification = useCallback((type, message, subMessage) => {
    const now = Date.now();
    const last = lastNotificationRef.current;

    // Don't show same notification type within 10 seconds
    if (last.type === type && now - last.time < 10000) {
      return;
    }

    lastNotificationRef.current = { type, time: now };

    const id = `${type}-${now}`;
    setNotifications(prev => {
      // Remove existing notifications of same type
      const filtered = prev.filter(n => n.type !== type);
      return [...filtered, { id, type, message, subMessage }];
    });
  }, []);

  const dismissNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        showNotification('online', 'Back online', 'Your connection has been restored');
        setWasOffline(false);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      showNotification('offline', "You're offline", 'Check your internet connection');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial state
    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline, showNotification]);

  // Monitor connection quality using Network Information API
  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
      const checkConnection = () => {
        // Only show slow connection warning if actually online
        if (!navigator.onLine) return;

        const slowTypes = ['slow-2g', '2g'];
        const isSlow = slowTypes.includes(connection.effectiveType);
        const isLowBandwidth = connection.downlink && connection.downlink < 0.5;
        const isHighLatency = connection.rtt && connection.rtt > 1000;

        if (isSlow || isLowBandwidth || isHighLatency) {
          showNotification('slow', 'Slow connection', 'Some features may take longer to load');
        }
      };

      // Check on mount and on change
      checkConnection();
      connection.addEventListener('change', checkConnection);

      return () => {
        connection.removeEventListener('change', checkConnection);
      };
    }
  }, [showNotification]);

  // Listen for slow request events from API
  useEffect(() => {
    const handleSlowRequest = (e) => {
      // Only show if online (API timeout while online = slow connection)
      if (navigator.onLine) {
        showNotification('slow', 'Slow connection detected', 'Request took longer than expected');
      }
    };

    window.addEventListener('slowRequest', handleSlowRequest);

    return () => {
      window.removeEventListener('slowRequest', handleSlowRequest);
    };
  }, [showNotification]);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className="fixed top-20 right-4 z-[60] flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <NetworkToast
            key={notification.id}
            type={notification.type}
            message={notification.message}
            subMessage={notification.subMessage}
            onDismiss={() => dismissNotification(notification.id)}
            onRetry={notification.type === 'offline' ? handleRetry : undefined}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NetworkStatus;
