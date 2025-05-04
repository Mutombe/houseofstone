import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await api.get('/properties/', { params: filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
});

export const createProperty = createAsyncThunk(
  'properties/create',
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await api.post('/properties/', propertyData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
});

export const updateProperty = createAsyncThunk(
  'properties/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/properties/${id}/`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
});

export const deleteProperty = createAsyncThunk(
  'properties/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/properties/${id}/`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
});

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    selectedProperty: null
  },
  reducers: {
    selectProperty: (state, action) => {
      state.selectedProperty = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  }
});

export const { selectProperty } = propertySlice.actions;
export default propertySlice.reducer;