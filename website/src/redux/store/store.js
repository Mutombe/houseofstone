// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import interactionsReducer from '../slices/interactionsSlice';
import propertyReducer from '../slices/propertySlice';
import adminReducer from '../slices/adminSlice';
import agentReducer from '../slices/agentSlice';
import userReducer from '../slices/userSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    interactions: interactionsReducer, 
    properties: propertyReducer,
    admin: adminReducer,
    agent: agentReducer,
    user: userReducer,
  },
});