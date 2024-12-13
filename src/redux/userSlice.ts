import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../services/userService';
import { User } from '../types/user';

export interface UserState {
  users: User[];
  selectedUser: User | null;
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  total: 0,
  page: 1,
  pageSize: 5,
  loading: false,
  error: null
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, pageSize, searchTerm }: { 
    page?: number, 
    pageSize?: number, 
    searchTerm?: string 
  } = {}, { rejectWithValue }) => {
    try {
      return await userService.getUsers(page, pageSize, searchTerm);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Fetch users failed');
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await userService.getUserById(userId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Fetch user details failed');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      await userService.deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Delete user failed');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.payload);
        state.total -= 1;
        if (state.users.length === 0 && state.page > 1) {
          state.page -= 1;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default userSlice.reducer;