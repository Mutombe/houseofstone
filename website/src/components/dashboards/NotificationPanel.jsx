// website/src/components/dashboards/NotificationPanel.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BellRing,
  Building2,
  Users,
  DollarSign,
  AlertCircle,
  Check,
  X,
  MessageSquare,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Calendar,
  Trash2,
  CheckCheck,
} from "lucide-react";
import {
  selectAllNotifications,
  selectUnreadCount,
  selectNotificationsStatus,
  markNotificationRead,
  markAllNotificationsRead,
  removeNotification,
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../../redux/slices/notificationSlice";
import { NotificationSkeleton } from "../ui/Skeleton";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

// Get icon and color based on notification type
const getNotificationStyle = (type) => {
  switch (type) {
    // Property CRUD notifications
    case "property_created":
      return {
        icon: Building2,
        bgColor: "bg-emerald-500/20",
        iconColor: "text-emerald-400",
      };
    case "property_updated":
      return {
        icon: Building2,
        bgColor: "bg-blue-500/20",
        iconColor: "text-blue-400",
      };
    case "property_deleted":
      return {
        icon: Building2,
        bgColor: "bg-red-500/20",
        iconColor: "text-red-400",
      };
    case "property_status":
      return {
        icon: Building2,
        bgColor: "bg-yellow-500/20",
        iconColor: "text-yellow-400",
      };
    // Agent CRUD notifications
    case "agent_created":
      return {
        icon: Users,
        bgColor: "bg-emerald-500/20",
        iconColor: "text-emerald-400",
      };
    case "agent_updated":
      return {
        icon: Users,
        bgColor: "bg-blue-500/20",
        iconColor: "text-blue-400",
      };
    case "agent_deleted":
      return {
        icon: Users,
        bgColor: "bg-red-500/20",
        iconColor: "text-red-400",
      };
    // User notifications
    case "user_created":
      return {
        icon: FaRegCircleUser,
        bgColor: "bg-green-500/20",
        iconColor: "text-green-400",
      };
    case "user_updated":
      return {
        icon: FaRegCircleUser,
        bgColor: "bg-blue-500/20",
        iconColor: "text-blue-400",
      };
    // Inquiry and lead notifications
    case "inquiry_received":
    case "lead":
    case "inquiry":
      return {
        icon: MessageSquare,
        bgColor: "bg-blue-500/20",
        iconColor: "text-blue-400",
      };
    // Property share
    case "property_shared":
    case "share":
      return {
        icon: Share2,
        bgColor: "bg-indigo-500/20",
        iconColor: "text-indigo-400",
      };
    // Legacy types for backward compatibility
    case "property":
    case "listing":
      return {
        icon: Building2,
        bgColor: "bg-purple-500/20",
        iconColor: "text-purple-400",
      };
    case "user":
    case "registration":
      return {
        icon: FaRegCircleUser,
        bgColor: "bg-green-500/20",
        iconColor: "text-green-400",
      };
    case "alert":
    case "warning":
      return {
        icon: AlertCircle,
        bgColor: "bg-red-500/20",
        iconColor: "text-red-400",
      };
    case "update":
    case "price":
      return {
        icon: DollarSign,
        bgColor: "bg-yellow-500/20",
        iconColor: "text-yellow-400",
      };
    case "view":
      return {
        icon: Eye,
        bgColor: "bg-cyan-500/20",
        iconColor: "text-cyan-400",
      };
    case "favorite":
      return {
        icon: Heart,
        bgColor: "bg-pink-500/20",
        iconColor: "text-pink-400",
      };
    case "event":
      return {
        icon: Calendar,
        bgColor: "bg-orange-500/20",
        iconColor: "text-orange-400",
      };
    case "success":
    case "info":
      return {
        icon: Check,
        bgColor: "bg-emerald-500/20",
        iconColor: "text-emerald-400",
      };
    default:
      return {
        icon: BellRing,
        bgColor: "bg-[#C9A962]/20",
        iconColor: "text-[#C9A962]",
      };
  }
};

// Format relative time
const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString();
};

// Single notification item
const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
  const { icon: Icon, bgColor, iconColor } = getNotificationStyle(
    notification.type
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`px-6 py-4 transition-colors hover:bg-white/5 ${
        !notification.read ? "bg-[#C9A962]/5" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bgColor}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <p
              className={`text-sm font-semibold truncate ${
                !notification.read ? "text-[#C9A962]" : "text-white"
              }`}
            >
              {notification.title}
            </p>
            <p className="text-xs text-gray-500 whitespace-nowrap">
              {formatRelativeTime(notification.time)}
            </p>
          </div>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">
            {notification.message}
          </p>
          <div className="flex items-center gap-2 mt-2">
            {!notification.read && (
              <button
                onClick={() => onMarkRead(notification.id)}
                className="text-xs text-[#C9A962] hover:text-[#E8D5A3] flex items-center gap-1 transition-colors"
              >
                <IoCheckmarkDoneCircleOutline className="w-3 h-3" />
                Mark as read
              </button>
            )}
            <button
              onClick={() => onDelete(notification.id)}
              className="text-xs text-gray-500 hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Notification Panel Component
const NotificationPanel = ({ maxHeight = "max-h-[600px]", showHeader = true }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const unreadCount = useSelector(selectUnreadCount);
  const status = useSelector(selectNotificationsStatus);

  // Fetch notifications from backend on mount
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  // Refresh notifications periodically (every 60 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchNotifications());
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleMarkRead = (id) => {
    // Update locally first for optimistic UI
    dispatch(markNotificationRead(id));
    // Then sync with backend
    dispatch(markAsRead(id));
  };

  const handleMarkAllRead = () => {
    // Update locally first for optimistic UI
    dispatch(markAllNotificationsRead());
    // Then sync with backend
    dispatch(markAllAsRead());
  };

  const handleDelete = (id) => {
    // Update locally first for optimistic UI
    dispatch(removeNotification(id));
    // Then sync with backend
    dispatch(deleteNotification(id));
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        {showHeader && (
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
          </div>
        )}
        <div className="divide-y divide-white/5">
          {[...Array(5)].map((_, i) => (
            <NotificationSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      {showHeader && (
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-[#C9A962] text-[#0A1628] text-xs font-bold rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-sm text-[#C9A962] hover:text-[#E8D5A3] font-medium transition-colors flex items-center gap-1"
            >
              <IoCheckmarkDoneCircleOutline className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>
      )}

      <div className={`${maxHeight} overflow-y-auto custom-scrollbar`}>
        {notifications.length > 0 ? (
          <div className="divide-y divide-white/5">
            <AnimatePresence>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <Bell className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No notifications
            </h3>
            <p className="text-sm text-gray-400">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="px-6 py-4 border-t border-white/10 text-center">
          <button className="text-sm text-[#C9A962] hover:text-[#E8D5A3] font-medium transition-colors">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

// Notification Badge Component (for header/nav)
export const NotificationBadge = ({ onClick }) => {
  const unreadCount = useSelector(selectUnreadCount);

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-400 hover:text-white transition-colors"
    >
      <Bell className="w-5 h-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C9A962] text-[#0A1628] text-[10px] font-bold rounded-full flex items-center justify-center">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
};

// Notification Dropdown (for header)
export const NotificationDropdown = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const unreadCount = useSelector(selectUnreadCount);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNotifications());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 top-full mt-2 w-96 bg-[#0A1628] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
    >
      <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">Notifications</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 bg-[#C9A962] text-[#0A1628] text-[10px] font-bold rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.slice(0, 5).map((notification) => {
          const { icon: Icon, bgColor, iconColor } = getNotificationStyle(
            notification.type
          );
          return (
            <div
              key={notification.id}
              className={`px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer ${
                !notification.read ? "bg-[#C9A962]/5" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${bgColor}`}
                >
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      !notification.read ? "text-[#C9A962]" : "text-white"
                    }`}
                  >
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatRelativeTime(notification.time)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3 border-t border-white/10 text-center">
        <button className="text-sm text-[#C9A962] hover:text-[#E8D5A3] font-medium transition-colors">
          View all notifications
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationPanel;
