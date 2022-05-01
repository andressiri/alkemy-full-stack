import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
//import recordsService from './recordsService';

const initialState = {
  records: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  }
});

export const {reset} = recordsSlice.actions;
export default recordsSlice.reducer;