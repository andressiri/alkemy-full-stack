import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import drawerReducer from '../features/drawer/drawerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    drawer: drawerReducer,
  },
});
