import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/recommendations/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
});

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      });
  }
});

export const { actions, reducer } = recommendationSlice;
export const { selectProperty } = actions;