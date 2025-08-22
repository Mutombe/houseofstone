import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { propertyAPI } from "../../utils/api";
import api from "./../../utils/api";

// Async thunks with enhanced error handling and caching
export const fetchProperties = createAsyncThunk(
  "properties/fetchAll",
  async (filters = {}, { rejectWithValue, getState }) => {
    try {
      const { properties } = getState();
      const { pagination } = properties;

      // Extract pagination parameters
      const page = filters.page || pagination.page || 1;
      const pageSize = filters.page_size || pagination.pageSize || 20;

      // Create unique cache key including pagination parameters
      const cacheKey = JSON.stringify({
        ...filters,
        page,
        page_size: pageSize,
        ordering: pagination.sortBy,
      });

      // Check if we can use cached data
      if (
        properties.lastCacheKey === cacheKey &&
        properties.items.length > 0 &&
        Date.now() - properties.lastFetch < 30000
      ) {
        return { fromCache: true };
      }

      // Prepare API request parameters
      const params = {
        ...filters,
        page,
        page_size: pageSize,
        ordering: pagination.sortBy,
      };

      // Remove undefined values
      Object.keys(params).forEach(
        (key) => params[key] === undefined && delete params[key]
      );

      // Make API request
      const response = await propertyAPI.getAll(params);

      return {
        ...response.data,
        page,
        pageSize,
        lastFetch: Date.now(),
        lastCacheKey: cacheKey,
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

// Initial state with better organization
const initialState = {
  items: [],
  selectedProperty: null,
  stats: {},
  leads: [],
  leadSources: [],

  // Loading states
  loading: false,
  itemLoading: {},

  // Status tracking
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'

  // Error handling
  error: null,
  itemErrors: {},

  // Pagination
  pagination: {
    page: 1,
    pageSize: 20,
    totalPages: 1,
    totalCount: 0,
    hasNext: false,
    hasPrevious: false,
    sortBy: "-created_at", // Default sort
  },

  // Caching
  lastFetch: null,
  lastFilters: null,

  // UI state
  filters: {},
  sortBy: "-created_at",
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
    },

    updateSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    clearError: (state) => {
      state.error = null;
      state.itemErrors = {};
    },

    // Optimistic updates
    optimisticUpdate: (state, action) => {
      const { id, changes } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...changes };
      }
    },

    updatePageSize: (state, action) => {
      state.pagination.pageSize = action.payload;
      state.pagination.page = 1; // Reset to first page
    },

    // Reset state
    resetPropertyState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      // Fetch properties
      .addCase(fetchProperties.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      // In extraReducers
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.error = null;

        if (action.payload.fromCache) return;

        // Fix: Use 'results' instead of 'data' for paginated response

        const results = action.payload.results || action.payload;
        const count = action.payload.count || results.length;
        const next = action.payload.next;
        const previous = action.payload.previous;

        state.items = results || [];
        state.lastFetch = action.payload.lastFetch;
        state.lastCacheKey = action.payload.lastCacheKey;

        // Update pagination state
        state.pagination = {
          page: action.payload.page,
          pageSize: action.payload.pageSize,
          totalPages: Math.ceil(count / action.payload.pageSize),
          totalCount: count,
          hasNext: !!next,
          hasPrevious: !!previous,
          sortBy: state.pagination.sortBy,
        };
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
        state.items = [];
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
        state.pagination.totalCount += 1;
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
        state.pagination.totalCount = Math.max(
          0,
          state.pagination.totalCount - 1
        );

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
  updatePagination,
  updatePageSize,
  resetPage,
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

export const selectPaginationInfo = createSelector(
  [selectPropertyState],
  (properties) => properties.pagination
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

// Export reducer
export default propertySlice.reducer;
