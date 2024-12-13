// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import analyticsReducer from './analyticsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    analytics: analyticsReducer
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;