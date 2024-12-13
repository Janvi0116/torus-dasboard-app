// src/redux/slices/analyticsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { analyticsService } from '../services/analyticsService';
import { RootState } from './store';
import { DateRange } from '../types/analytics';

export interface AnalyticsState {
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
  registrationTrend: Array<{month: string, count: number}>;
  usersByRegion: Array<{region: string, count: number}>;
  loading: boolean;
  error: string | null;
  filters: {
    dateRange: {
      startDate: string;
      endDate: string;
    };
    selectedRegions: string[];
  };
  availableRegions: string[];
}

const initialState: AnalyticsState = {
  totalUsers: 0,
  activeUsers: 0,
  deletedUsers: 0,
  registrationTrend: [],
  usersByRegion: [],
  loading: false,
  error: null,
  filters: {
    dateRange: {
      startDate: new Date(new Date().getFullYear(), 0, 1).toISOString(), // Start of current year
      endDate: new Date().toISOString()
    },
    selectedRegions: [] // Empty means all regions
  },
  availableRegions: ['North', 'South', 'East', 'West', 'Central']
};

export const fetchOverviewMetrics = createAsyncThunk(
  'analytics/fetchOverviewMetrics',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { dateRange, selectedRegions } = state.analytics.filters;
      return await analyticsService.getOverviewMetrics(dateRange, selectedRegions);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Fetch overview metrics failed');
    }
  }
);

export const fetchRegistrationTrend = createAsyncThunk(
  'analytics/fetchRegistrationTrend',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { dateRange, selectedRegions } = state.analytics.filters;
      return await analyticsService.getRegistrationTrend(dateRange, selectedRegions);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Fetch registration trend failed');
    }
  }
);

export const fetchUsersByRegion = createAsyncThunk(
  'analytics/fetchUsersByRegion',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { dateRange, selectedRegions } = state.analytics.filters;
      return await analyticsService.getUsersByRegion(dateRange, selectedRegions);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Fetch users by region failed');
    }
  }
);

export const setDateRange = createAsyncThunk(
  'analytics/setDateRange',
  async (dateRange: DateRange, { dispatch }) => {
    dispatch(analyticsSlice.actions.updateDateRange(dateRange));
    return dispatch(fetchAllAnalytics());
  }
);

export const setSelectedRegions = createAsyncThunk(
  'analytics/setSelectedRegions',
  async (regions: string[], { dispatch }) => {
    dispatch(analyticsSlice.actions.updateSelectedRegions(regions));
    return dispatch(fetchAllAnalytics());
  }
);

export const fetchAllAnalytics = createAsyncThunk(
  'analytics/fetchAllAnalytics',
  async (_, { dispatch }) => {
    try {
      await Promise.all([
        dispatch(fetchOverviewMetrics()),
        dispatch(fetchRegistrationTrend()),
        dispatch(fetchUsersByRegion())
      ]);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    updateDateRange: (state, action: PayloadAction<DateRange>) => {
      state.filters.dateRange = action.payload;
    },
    updateSelectedRegions: (state, action: PayloadAction<string[]>) => {
      state.filters.selectedRegions = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverviewMetrics.fulfilled, (state, action) => {
        state.totalUsers = action.payload.totalUsers;
        state.activeUsers = action.payload.activeUsers;
        state.deletedUsers = action.payload.deletedUsers;
      })
      .addCase(fetchRegistrationTrend.fulfilled, (state, action) => {
        state.registrationTrend = action.payload;
      })
      .addCase(fetchUsersByRegion.fulfilled, (state, action) => {
        state.usersByRegion = action.payload;
      });
  }
});

export const { updateDateRange, updateSelectedRegions } = analyticsSlice.actions;
export default analyticsSlice.reducer;