import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import recordsService from './recordsService';

const records = JSON.parse(localStorage.getItem('records'))

const initialState = {
  records: records ? records : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Save record
export const saveRecord = createAsyncThunk('records/saveRecord',
  async (obj, thunkAPI) => {
    try {
      const data = await recordsService.saveRecord(obj.recordData, obj.token);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    };
  }
);

// Get records
export const getRecords = createAsyncThunk('records/getRecords',
  async (token, thunkAPI) => {
    try {
      const data = await recordsService.getRecords(token);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    };
  }
);

export const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    resetRecordsReq: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Save record
      .addCase(saveRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.records.unshift(action.payload.recordData);
      })
      .addCase(saveRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get records
      .addCase(getRecords.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.records = action.payload.records.reverse();
      })
      .addCase(getRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
});

export const {resetRecordsReq} = recordsSlice.actions;
export default recordsSlice.reducer;