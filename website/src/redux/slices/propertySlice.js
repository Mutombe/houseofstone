import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { propertyAPI } from "../../utils/api";
import api from "./../../utils/api";
import axios from "axios";

// In propertySlice.js
// Update fetchProperties to handle pagination
export const fetchProperties = createAsyncThunk(
  "properties/fetchAll",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const cleanFilters = { ...filters };
      
      // Set default pagination if missing
      if (!cleanFilters.page) cleanFilters.page = 1;
      if (!cleanFilters.page_size) cleanFilters.page_size = 12;
      
      // Remove undefined values
      Object.keys(cleanFilters).forEach(
        (key) => cleanFilters[key] === undefined && delete cleanFilters[key]
      );

      const response = await propertyAPI.getAll(cleanFilters);

      return {
        data: response.data,
        filters: cleanFilters,
        lastFetch: Date.now(),
      };
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status,
        errors: err.response?.data?.errors,
      });
    }
  }
);

export const fetchProperty = createAsyncThunk(
  "properties/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      // Try public endpoint first
      const response = await axios.get(
        `https://houseofstone-backend1.onrender.com/public/properties/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      // If public endpoint fails, try authenticated
      if (err.response?.status === 404 || err.response?.status === 403) {
        try {
          const authResponse = await propertyAPI.getById(id);
          return authResponse.data;
        } catch (authErr) {
          return rejectWithValue({
            message: authErr.response?.data?.message || authErr.message,
            status: authErr.response?.status,
          });
        }
      }
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status,
      });
    }
  }
);

export const fetchPropertiesWithoutPagination = createAsyncThunk(
  "properties/fetchAllNoPagination",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const cleanFilters = { ...filters };
      const response = await propertyAPI.getAllAdmin(cleanFilters);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status,
        errors: err.response?.data?.errors,
      });
    }
  }
);

export const fetchPropertys = createAsyncThunk(
  "properties/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await propertyAPI.getById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status,
      });
    }
  }
);

export const createProperty = createAsyncThunk(
  "properties/create",
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await propertyAPI.create(propertyData);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        errors: err.response?.data?.errors,
        status: err.response?.status,
      });
    }
  }
);

export const updateProperty = createAsyncThunk(
  "properties/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await propertyAPI.update(id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        errors: err.response?.data?.errors,
        status: err.response?.status,
      });
    }
  }
);

export const deleteProperty = createAsyncThunk(
  "properties/delete",
  async (id, { rejectWithValue }) => {
    try {
      await propertyAPI.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status,
      });
    }
  }
);

export const fetchPropertyStats = createAsyncThunk(
  "properties/fetchStats",
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await propertyAPI.getStats(propertyId);
      return { propertyId, stats: response.data };
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || err.message,
        status: err.response?.status,
      });
    }
  }
);

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

const initialState = {
  items: [],
  selectedProperty: null,
  stats: {},
  leads: [],
  leadSources: [],

  // Pagination state
  marketplace: {
    results: [],
    count: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 12,
  },

  // Item states
  adminProperties: [],

  // Loading states
  loading: false,
  itemLoading: {},

  // Status tracking
  status: "idle",

  // Error handling
  error: null,
  itemErrors: {},

  // UI state
  filters: {},
  sortBy: "-created_at",
  
  lastFetch: null,
  lastFilters: null,
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    selectProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },

    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },

    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = {};
      state.marketplace.currentPage = 1;
    },

    updateSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    clearError: (state) => {
      state.error = null;
      state.itemErrors = {};
    },

    optimisticUpdate: (state, action) => {
      const { id, changes } = action.payload;
      const index = state.marketplace.results.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.marketplace.results[index] = { ...state.marketplace.results[index], ...changes };
      }
    },

    resetPropertyState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      // Fetch properties with pagination
      .addCase(fetchProperties.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.error = null;

        // Handle paginated response
        const responseData = action.payload.data;
        
        if (responseData.results) {
          // Paginated response
          state.marketplace = {
            results: responseData.results,
            count: responseData.count,
            currentPage: responseData.current_page || action.payload.filters.page || 1,
            totalPages: Math.ceil(responseData.count / (responseData.page_size || 12)),
            pageSize: responseData.page_size || 12,
          };
          state.items = responseData.results;
        } else {
          // Non-paginated response (backward compatibility)
          state.items = responseData || [];
          state.marketplace.results = responseData || [];
        }
        
        state.lastFetch = action.payload.lastFetch;
        state.lastFilters = action.payload.filters;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
        state.items = [];
        state.marketplace.results = [];
      })
      .addCase(fetchPropertiesWithoutPagination.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertiesWithoutPagination.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.error = null;
        state.adminProperties = action.payload;
      })
      .addCase(fetchPropertiesWithoutPagination.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
        state.adminProperties = [];
      })

      // Fetch single property
      .addCase(fetchProperty.pending, (state, action) => {
        const id = action.meta.arg;
        state.itemLoading[id] = true;
      })
      .addCase(fetchProperty.fulfilled, (state, action) => {
        const property = action.payload;
        state.itemLoading[property.id] = false;

        // Update item in list if it exists
        const index = state.items.findIndex((item) => item.id === property.id);
        if (index !== -1) {
          state.items[index] = property;
        }

        // Set as selected property
        state.selectedProperty = property;
      })
      .addCase(fetchProperty.rejected, (state, action) => {
        const id = action.meta.arg;
        state.itemLoading[id] = false;
        state.itemErrors[id] = action.payload;
      })

      // Create property
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.items.unshift(action.payload); // Add to beginning
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // Update property
      .addCase(updateProperty.pending, (state, action) => {
        const id = action.meta.arg.id;
        state.itemLoading[id] = true;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        const updatedProperty = action.payload;
        state.itemLoading[updatedProperty.id] = false;

        // Update in items array
        const index = state.items.findIndex((p) => p.id === updatedProperty.id);
        if (index !== -1) {
          state.items[index] = updatedProperty;
        }

        // Update selected property if it's the same
        if (state.selectedProperty?.id === updatedProperty.id) {
          state.selectedProperty = updatedProperty;
        }
      })
      .addCase(updateProperty.rejected, (state, action) => {
        const id = action.meta.arg.id;
        state.itemLoading[id] = false;
        state.itemErrors[id] = action.payload;
      })

      // Delete property
      .addCase(deleteProperty.pending, (state, action) => {
        const id = action.meta.arg;
        state.itemLoading[id] = true;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.itemLoading[deletedId] = false;

        // Remove from items array
        state.items = state.items.filter((p) => p.id !== deletedId);

        // Clear selected property if it's the deleted one
        if (state.selectedProperty?.id === deletedId) {
          state.selectedProperty = null;
        }

        // Clear stats for deleted property
        delete state.stats[deletedId];
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        const id = action.meta.arg;
        state.itemLoading[id] = false;
        state.itemErrors[id] = action.payload;
      })

      // Fetch property stats
      .addCase(fetchPropertyStats.pending, (state, action) => {
        const propertyId = action.meta.arg;
        state.itemLoading[`stats_${propertyId}`] = true;
      })
      .addCase(fetchPropertyStats.fulfilled, (state, action) => {
        const { propertyId, stats } = action.payload;
        state.itemLoading[`stats_${propertyId}`] = false;
        state.stats[propertyId] = stats;
      })
      .addCase(fetchPropertyStats.rejected, (state, action) => {
        const propertyId = action.meta.arg;
        state.itemLoading[`stats_${propertyId}`] = false;
        state.itemErrors[`stats_${propertyId}`] = action.payload;
      })
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

// Actions
export const {
  selectProperty,
  clearSelectedProperty,
  updateFilters,
  clearFilters,
  updateSortBy,
  clearError,
  optimisticUpdate,
  resetPropertyState,
} = propertySlice.actions;

// Enhanced selectors with memoization
export const selectPropertyState = (state) => state.properties;

export const selectAllProperties = createSelector(
  [selectPropertyState],
  (properties) => properties.items
);

export const selectPropertiesLoading = createSelector(
  [selectPropertyState],
  (properties) => properties.loading
);

export const selectPropertiesError = createSelector(
  [selectPropertyState],
  (properties) => properties.error
);

export const selectSelectedProperty = createSelector(
  [selectPropertyState],
  (properties) => properties.selectedProperty
);

export const selectPropertyById = createSelector(
  [selectAllProperties, (state, id) => id],
  (properties, id) => properties.find((property) => property.id === id)
);

export const selectPropertiesByType = createSelector(
  [selectAllProperties, (state, type) => type],
  (properties, type) =>
    properties.filter((property) => property.property_type === type)
);

export const selectPropertiesByPriceRange = createSelector(
  [
    selectAllProperties,
    (state, minPrice, maxPrice) => ({ minPrice, maxPrice }),
  ],
  (properties, { minPrice, maxPrice }) =>
    properties.filter(
      (property) => property.price >= minPrice && property.price <= maxPrice
    )
);

export const selectAvailableProperties = createSelector(
  [selectAllProperties],
  (properties) =>
    properties.filter((property) => property.status === "available")
);

export const selectPropertyStats = createSelector(
  [selectPropertyState, (state, propertyId) => propertyId],
  (properties, propertyId) => properties.stats[propertyId]
);

export const selectCurrentFilters = createSelector(
  [selectPropertyState],
  (properties) => properties.filters
);

export const selectSortBy = createSelector(
  [selectPropertyState],
  (properties) => properties.sortBy
);

// Advanced selectors for analytics
export const selectPropertyAnalytics = createSelector(
  [selectAllProperties],
  (properties) => {
    const totalProperties = properties.length;
    const typeDistribution = properties.reduce((acc, property) => {
      acc[property.property_type] = (acc[property.property_type] || 0) + 1;
      return acc;
    }, {});

    const statusDistribution = properties.reduce((acc, property) => {
      acc[property.status] = (acc[property.status] || 0) + 1;
      return acc;
    }, {});

    const averagePrice =
      properties.length > 0
        ? properties.reduce(
            (sum, property) => sum + parseFloat(property.price),
            0
          ) / properties.length
        : 0;

    return {
      totalProperties,
      typeDistribution,
      statusDistribution,
      averagePrice,
    };
  }
);

export const selectRecentProperties = createSelector(
  [selectAllProperties],
  (properties) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return properties
      .filter((property) => new Date(property.created_at) > oneWeekAgo)
      .slice(0, 5);
  }
);

export const selectMarketplace = createSelector(
  [selectPropertyState],
  (properties) => properties.marketplace
);

// Export reducer
export default propertySlice.reducer;