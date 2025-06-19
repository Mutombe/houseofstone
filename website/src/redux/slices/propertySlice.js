import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const shareProperty = createAsyncThunk(
  "properties/share",
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/properties/${propertyId}/share/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk for retrieving a shared property using token
export const getSharedProperty = createAsyncThunk(
  "properties/getShared",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.get(`/shared-properties/${token}/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchProperties = createAsyncThunk(
  "properties/fetchAll",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await api.get("/properties/", { params: filters });
      console.log("properties", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createProperty = createAsyncThunk(
  "properties/create",
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await api.post("/properties/", propertyData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateProperty = createAsyncThunk(
  "properties/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/properties/${id}/`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteProperty = createAsyncThunk(
  "properties/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/properties/${id}/`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchPropertyStats = createAsyncThunk(
  "property/fetchPropertyStats",
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/properties/${propertyId}/stats/`);
      return { propertyId, stats: response.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchLeads = createAsyncThunk(
  "property/fetchLeads",
  async ({ agent }, { rejectWithValue }) => {
    try {
      const response = await api.get("/property-leads", {
        params: { agent },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchLeadSources = createAsyncThunk(
  "property/fetchLeadSources",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/lead-sources");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createLead = createAsyncThunk(
  "property/createLead",
  async (leadData, { rejectWithValue }) => {
    try {
      const response = await api.post("/property-leads/", leadData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateLead = createAsyncThunk(
  "property/updateLead",
  async ({ id, ...leadData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/property-leads/${id}/`, leadData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteLead = createAsyncThunk(
  "property/deleteLead",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/property-leads/${id}/`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const propertySlice = createSlice({
  name: "properties",
  initialState: {
    items: [],
    leads: [],
    leadSources: [],
    loading: false,
    status: "idle",
    error: null,
    selectedProperty: null,
    stats: {},
  },
  reducers: {
    selectProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("resuts", action.payload.results);
        state.items = action.payload.results || action.payload;
        console.log("less", action.payload);
        console.log("{redux properties}", state.items);
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(fetchPropertyStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPropertyStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = {
          ...state.stats,
          [action.payload.propertyId]: action.payload.stats,
        };
      })
      .addCase(fetchPropertyStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch leads
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch lead sources
      .addCase(fetchLeadSources.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeadSources.fulfilled, (state, action) => {
        state.loading = false;
        state.leadSources = action.payload;
      })
      .addCase(fetchLeadSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create lead
      .addCase(createLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = [action.payload, ...state.leads];
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update lead
      .addCase(updateLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = state.leads.map((lead) =>
          lead.id === action.payload.id ? action.payload : lead
        );
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete lead
      .addCase(deleteLead.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = state.leads.filter((lead) => lead.id !== action.payload);
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectProperty } = propertySlice.actions;
export const selectAllProperties = (state) => state.properties.items;
export default propertySlice.reducer;
