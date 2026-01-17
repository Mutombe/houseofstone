// website/src/redux/slices/notificationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Fetch notifications from backend (recent actions, alerts, etc.)
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/notifications/");
      return response.data;
    } catch (err) {
      // If no notifications endpoint exists, return empty array
      if (err.response?.status === 404) {
        return { results: [], count: 0 };
      }
      return rejectWithValue(
        err.response?.data || { error: "Failed to fetch notifications" }
      );
    }
  }
);

// Mark notification as read
export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      await api.patch(`/notifications/${notificationId}/`, { read: true });
      return notificationId;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Failed to mark as read" });
    }
  }
);

// Mark all notifications as read
export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/notifications/mark_all_read/");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Failed to mark all as read" });
    }
  }
);

// Delete notification
export const deleteNotification = createAsyncThunk(
  "notifications/delete",
  async (notificationId, { rejectWithValue }) => {
    try {
      await api.delete(`/notifications/${notificationId}/`);
      return notificationId;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Failed to delete notification" });
    }
  }
);

// Generate notification from admin stats recent_actions
const generateNotificationsFromActions = (actions) => {
  if (!actions || !Array.isArray(actions)) return [];

  return actions.map((action, index) => ({
    id: `action-${index}-${Date.now()}`,
    type: action.type || "update",
    title: action.title || "Activity Update",
    message: action.description || action.message || "",
    time: action.timestamp || action.time || new Date().toISOString(),
    read: false,
    data: action.data || {},
  }));
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    unreadCount: 0,
    status: "idle",
    error: null,
    lastFetched: null,
  },
  reducers: {
    // Add a new notification (from websocket or frontend events)
    addNotification: (state, action) => {
      const notification = {
        id: action.payload.id || `notif-${Date.now()}`,
        type: action.payload.type || "info",
        title: action.payload.title,
        message: action.payload.message,
        time: action.payload.time || new Date().toISOString(),
        read: false,
        data: action.payload.data || {},
      };
      state.items.unshift(notification);
      state.unreadCount += 1;
    },

    // Mark a notification as read (local only)
    markNotificationRead: (state, action) => {
      const notification = state.items.find((n) => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },

    // Mark all notifications as read (local only)
    markAllNotificationsRead: (state) => {
      state.items.forEach((notification) => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },

    // Remove a notification (local only)
    removeNotification: (state, action) => {
      const index = state.items.findIndex((n) => n.id === action.payload);
      if (index !== -1) {
        if (!state.items[index].read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.items.splice(index, 1);
      }
    },

    // Clear all notifications
    clearAllNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
    },

    // Load notifications from admin stats recent_actions
    loadFromRecentActions: (state, action) => {
      const notifications = generateNotificationsFromActions(action.payload);
      // Merge with existing, avoiding duplicates
      const existingIds = new Set(state.items.map((n) => n.id));
      const newNotifications = notifications.filter((n) => !existingIds.has(n.id));
      state.items = [...newNotifications, ...state.items].slice(0, 50); // Keep max 50
      state.unreadCount = state.items.filter((n) => !n.read).length;
      state.lastFetched = new Date().toISOString();
    },

    // Add demo/sample notifications for testing
    loadDemoNotifications: (state) => {
      const demoNotifications = [
        {
          id: "demo-1",
          type: "lead",
          title: "New Lead Received",
          message: 'John Smith inquired about "Modern Villa in Borrowdale"',
          time: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 min ago
          read: false,
        },
        {
          id: "demo-2",
          type: "property",
          title: "Property Listed",
          message: '"Luxury Apartment in Mt Pleasant" has been listed for $350,000',
          time: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
          read: false,
        },
        {
          id: "demo-3",
          type: "user",
          title: "New User Registration",
          message: "Sarah Johnson registered as a new user",
          time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          read: true,
        },
        {
          id: "demo-4",
          type: "alert",
          title: "Property Expiring Soon",
          message: '"Office Space in CBD" listing expires in 3 days',
          time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
          read: true,
        },
        {
          id: "demo-5",
          type: "update",
          title: "Price Updated",
          message: '"Family Home in Highlands" price reduced to $420,000',
          time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          read: true,
        },
      ];

      state.items = demoNotifications;
      state.unreadCount = demoNotifications.filter((n) => !n.read).length;
      state.lastFetched = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.items = action.payload.results || action.payload;
        state.unreadCount = state.items.filter((n) => !n.read).length;
        state.status = "succeeded";
        state.lastFetched = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || "Failed to fetch notifications";
      })
      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.items.find((n) => n.id === action.payload);
        if (notification && !notification.read) {
          notification.read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      // Mark all as read
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.items.forEach((notification) => {
          notification.read = true;
        });
        state.unreadCount = 0;
      })
      // Delete notification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const index = state.items.findIndex((n) => n.id === action.payload);
        if (index !== -1) {
          if (!state.items[index].read) {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
          state.items.splice(index, 1);
        }
      });
  },
});

export const {
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
  removeNotification,
  clearAllNotifications,
  loadFromRecentActions,
  loadDemoNotifications,
} = notificationSlice.actions;

// Selectors
export const selectAllNotifications = (state) => state.notifications.items;
export const selectUnreadCount = (state) => state.notifications.unreadCount;
export const selectNotificationsStatus = (state) => state.notifications.status;
export const selectNotificationsError = (state) => state.notifications.error;
export const selectUnreadNotifications = (state) =>
  state.notifications.items.filter((n) => !n.read);
export const selectRecentNotifications = (limit = 5) => (state) =>
  state.notifications.items.slice(0, limit);

export default notificationSlice.reducer;
