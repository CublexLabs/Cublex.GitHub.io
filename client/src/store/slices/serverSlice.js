import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchServerStatus = createAsyncThunk(
  'server/fetchStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/server/status');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch server status');
    }
  }
);

export const fetchServerFeatures = createAsyncThunk(
  'server/fetchFeatures',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/server/features');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch features');
    }
  }
);

export const fetchCommunityStats = createAsyncThunk(
  'server/fetchCommunity',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/server/community');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch community stats');
    }
  }
);

export const fetchOnlinePlayers = createAsyncThunk(
  'server/fetchPlayers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/server/players');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch players');
    }
  }
);

export const fetchServerTimeline = createAsyncThunk(
  'server/fetchTimeline',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/server/timeline');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch timeline');
    }
  }
);

const initialState = {
  status: {
    name: 'Cublex',
    version: '1.21.6',
    status: 'offline',
    onlinePlayers: 0,
    maxPlayers: 500,
    uptime: '0%',
    ip: 'play.cublex.com',
    port: 25565,
  },
  features: [],
  community: {
    totalPlayers: 0,
    activePlayers: 0,
    discordMembers: 0,
    twitterFollowers: 0,
    youtubeSubscribers: 0,
    tiktokFollowers: 0,
    eventsThisMonth: 0,
    totalPlaytime: '0 hours',
  },
  players: [],
  timeline: [],
  isLoading: false,
  error: null,
};

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updatePlayerCount: (state, action) => {
      state.status.onlinePlayers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch server status
      .addCase(fetchServerStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServerStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
        state.error = null;
      })
      .addCase(fetchServerStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch features
      .addCase(fetchServerFeatures.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServerFeatures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.features = action.payload.features;
        state.error = null;
      })
      .addCase(fetchServerFeatures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch community stats
      .addCase(fetchCommunityStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommunityStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.community = action.payload;
        state.error = null;
      })
      .addCase(fetchCommunityStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch players
      .addCase(fetchOnlinePlayers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOnlinePlayers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.players = action.payload.players;
        state.error = null;
      })
      .addCase(fetchOnlinePlayers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch timeline
      .addCase(fetchServerTimeline.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServerTimeline.fulfilled, (state, action) => {
        state.isLoading = false;
        state.timeline = action.payload.timeline;
        state.error = null;
      })
      .addCase(fetchServerTimeline.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, updatePlayerCount } = serverSlice.actions;
export default serverSlice.reducer; 