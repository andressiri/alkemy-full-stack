import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import muiComponentsReducer from '../features/muiComponents/muiComponentsSlice';
import recordsReducer from '../features/records/recordsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    muiComponents: muiComponentsReducer,
    records: recordsReducer
  },
});
