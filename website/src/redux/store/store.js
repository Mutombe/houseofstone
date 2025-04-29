// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});