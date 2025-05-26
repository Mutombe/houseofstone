import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Fetch all agents with optional filters
export const fetchAgents = createAsyncThunk(
  'agents/fetchAll',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/agents/', { params: filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch a single agent by ID
export const fetchAgentById = createAsyncThunk(
  'agents/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/agents/${id}/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create a new agent
export const createAgent = createAsyncThunk(
  'agents/create',
  async (agentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/agents/', agentData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update an existing agent
export const updateAgent = createAsyncThunk(
  'agents/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/agents/${id}/`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete/deactivate an agent
export const deleteAgent = createAsyncThunk(
  'agents/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/agents/${id}/`);
      return { id, message: response.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Activate an agent
export const activateAgent = createAsyncThunk(
  'agents/activate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/agents/${id}/activate/`);
      return { id, message: response.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Deactivate an agent
export const deactivateAgent = createAsyncThunk(
  'agents/deactivate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/agents/${id}/deactivate/`);
      return { id, message: response.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch active agents only
export const fetchActiveAgents = createAsyncThunk(
  'agents/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/agents/active/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch inactive agents only
export const fetchInactiveAgents = createAsyncThunk(
  'agents/fetchInactive',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/agents/inactive/');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch agents by position
export const fetchAgentsByPosition = createAsyncThunk(
  'agents/fetchByPosition',
  async (position, { rejectWithValue }) => {
    try {
      const response = await api.get(`/agents/by_position/?position=${position}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch agents by branch
export const fetchAgentsByBranch = createAsyncThunk(
  'agents/fetchByBranch',
  async (branch, { rejectWithValue }) => {
    try {
      const response = await api.get(`/agents/by_branch/?branch=${branch}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch agent's properties
export const fetchAgentProperties = createAsyncThunk(
  'agents/fetchProperties',
  async (agentId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/agents/${agentId}/properties/`);
      return { agentId, properties: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch agent statistics
export const fetchAgentStats = createAsyncThunk(
  'agents/fetchStats',
  async (agentId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/agents/${agentId}/stats/`);
      return { agentId, stats: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Initial state
const initialState = {
  agents: [],
  selectedAgent: null,
  agentProperties: {},
  agentStats: {},
  activeAgents: [],
  inactiveAgents: [],
  loading: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    position: '',
    branch: '',
    is_active: null,
    search: ''
  }
};

// Agent slice
const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    // Select an agent
    selectAgent: (state, action) => {
      state.selectedAgent = action.payload;
    },
    
    // Clear selected agent
    clearSelectedAgent: (state) => {
      state.selectedAgent = null;
    },
    
    // Set filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    // Clear filters
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Reset state
    resetAgentState: (state) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all agents
      .addCase(fetchAgents.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.agents = action.payload.results || action.payload;
        state.error = null;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch agent by ID
      .addCase(fetchAgentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAgentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAgent = action.payload;
        state.error = null;
      })
      .addCase(fetchAgentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create agent
      .addCase(createAgent.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(createAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.agents.unshift(action.payload);
        state.error = null;
      })
      .addCase(createAgent.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Update agent
      .addCase(updateAgent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAgent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.agents.findIndex(agent => agent.id === action.payload.id);
        if (index !== -1) {
          state.agents[index] = action.payload;
        }
        if (state.selectedAgent?.id === action.payload.id) {
          state.selectedAgent = action.payload;
        }
        state.error = null;
      })
      .addCase(updateAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete/deactivate agent
      .addCase(deleteAgent.fulfilled, (state, action) => {
        const { id } = action.payload;
        const index = state.agents.findIndex(agent => agent.id === id);
        if (index !== -1) {
          state.agents[index].is_active = false;
        }
        if (state.selectedAgent?.id === id) {
          state.selectedAgent.is_active = false;
        }
      })
      
      // Activate agent
      .addCase(activateAgent.fulfilled, (state, action) => {
        const { id } = action.payload;
        const index = state.agents.findIndex(agent => agent.id === id);
        if (index !== -1) {
          state.agents[index].is_active = true;
        }
        if (state.selectedAgent?.id === id) {
          state.selectedAgent.is_active = true;
        }
      })
      
      // Deactivate agent
      .addCase(deactivateAgent.fulfilled, (state, action) => {
        const { id } = action.payload;
        const index = state.agents.findIndex(agent => agent.id === id);
        if (index !== -1) {
          state.agents[index].is_active = false;
        }
        if (state.selectedAgent?.id === id) {
          state.selectedAgent.is_active = false;
        }
      })
      
      // Fetch active agents
      .addCase(fetchActiveAgents.fulfilled, (state, action) => {
        state.activeAgents = action.payload;
      })
      
      // Fetch inactive agents
      .addCase(fetchInactiveAgents.fulfilled, (state, action) => {
        state.inactiveAgents = action.payload;
      })
      
      // Fetch agent properties
      .addCase(fetchAgentProperties.fulfilled, (state, action) => {
        const { agentId, properties } = action.payload;
        state.agentProperties[agentId] = properties;
      })
      
      // Fetch agent stats
      .addCase(fetchAgentStats.fulfilled, (state, action) => {
        const { agentId, stats } = action.payload;
        state.agentStats[agentId] = stats;
      });
  }
});

// Export actions
export const {
  selectAgent,
  clearSelectedAgent,
  setFilters,
  clearFilters,
  clearError,
  resetAgentState
} = agentSlice.actions;

// Export selectors
export const selectAllAgents = (state) => state.agents.agents;
export const selectSelectedAgent = (state) => state.agents.selectedAgent;
export const selectAgentLoading = (state) => state.agents.loading;
export const selectAgentStatus = (state) => state.agents.status;
export const selectAgentError = (state) => state.agents.error;
export const selectAgentFilters = (state) => state.agents.filters;
export const selectActiveAgents = (state) => state.agents.activeAgents;
export const selectInactiveAgents = (state) => state.agents.inactiveAgents;
export const selectAgentProperties = (agentId) => (state) => state.agents.agentProperties[agentId];
export const selectAgentStats = (agentId) => (state) => state.agents.agentStats[agentId];

// Export reducer
export default agentSlice.reducer;