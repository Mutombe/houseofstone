import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchAdminStats = createAsyncThunk(
  'admin/stats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/dashboard/admin/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: 'Failed to fetch stats' });
    }
  }
);

export const fetchPropertyStats = createAsyncThunk(
  'admin/propertyStats',
  async ({ propertyId, days = 30 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/property-stats/${propertyId}/?days=${days}`);
      return { propertyId, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: 'Failed to fetch property stats' });
    }
  }
);

export const manageUsers = createAsyncThunk(
  'admin/manageUsers',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/users/${userData.id}/`, userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: 'Failed to update user' });
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/users/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: 'Failed to fetch users' });
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: {
      total_views: 0,
      total_inquiries: 0,
      total_favorites: 0,
      total_shares: 0,
      stats_last_7_days: [],
      trends: {
        views: 0,
        inquiries: 0,
        favorites: 0,
        shares: 0,
      },
      popular_properties: [],
      total_users: 0,
      active_listings: 0,
      pending_listings: 0,
      popular_locations: [],
      recent_actions: [],
      user_growth: [],
    },
    propertyStats: {},
    users: [],
    logs: [],
    selectedProperty: null,
    status: 'idle',
    statsStatus: 'idle',
    usersStatus: 'idle',
    error: null,
  },
  reducers: {
    selectProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearPropertyStats: (state, action) => {
      if (action.payload) {
        delete state.propertyStats[action.payload];
      } else {
        state.propertyStats = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Admin Stats
      .addCase(fetchAdminStats.pending, (state) => {
        state.statsStatus = 'loading';
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.statsStatus = 'succeeded';
        state.error = null;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.statsStatus = 'failed';
        state.error = action.payload?.error || 'Failed to fetch stats';
      })
      // Property Stats
      .addCase(fetchPropertyStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPropertyStats.fulfilled, (state, action) => {
        state.propertyStats[action.payload.propertyId] = action.payload.data;
        state.status = 'succeeded';
      })
      .addCase(fetchPropertyStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.error || 'Failed to fetch property stats';
      })
      // Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.usersStatus = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.results || action.payload;
        state.usersStatus = 'succeeded';
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.usersStatus = 'failed';
        state.error = action.payload?.error || 'Failed to fetch users';
      })
      .addCase(manageUsers.fulfilled, (state, action) => {
        state.users = state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
      });
  },
});

export const { selectProperty, clearError, clearPropertyStats } = adminSlice.actions;

// Selectors
export const selectAdminStats = (state) => state.admin.stats;
export const selectAdminStatsStatus = (state) => state.admin.statsStatus;
export const selectPropertyStatsById = (propertyId) => (state) =>
  state.admin.propertyStats[propertyId];
export const selectAllUsers = (state) => state.admin.users;
export const selectUsersStatus = (state) => state.admin.usersStatus;
export const selectAdminError = (state) => state.admin.error;

export default adminSlice.reducer;