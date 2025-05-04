import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchAdminStats = createAsyncThunk(
  'admin/stats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/dashboard/admin/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
});

export const manageUsers = createAsyncThunk(
  'admin/manageUsers',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/users/${userData.id}/`, userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: {},
    users: [],
    logs: [],
    status: 'idle',
    error: null
  },
  reducers: {
    selectProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(manageUsers.fulfilled, (state, action) => {
        state.users = state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        );
      });
  }
});

export const { actions, reducer } = adminSlice;
export const { selectProperty } = actions;