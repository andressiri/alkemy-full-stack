import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import recordsService from './recordsService';

const initialState = {
  records: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  recordsAdditionResult: 0
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

// Update record
export const updateRecord = createAsyncThunk('records/updateRecord',
  async (obj, thunkAPI) => {
    try {
      const data = await recordsService.updateRecord(obj.recordData, obj.token);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    };
  }
);

// Delete record
export const deleteRecord = createAsyncThunk('records/deleteRecord',
  async (obj, thunkAPI) => {
    try {
      const data = await recordsService.deleteRecord(obj.record_uuid, obj.token);
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
    resetRecords: () => initialState,
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
        if (state.records[0] === 'No record to show here') {
          state.records = [action.payload.recordData];
        } else {
          state.records.unshift(action.payload.recordData);
        };

        const incomesSum = state.records.filter((record) => {
          return record.operation_type === 'Income'
        }).reduce((sum, record) => sum + parseFloat(record.amount), 0);

        const outcomesSum = state.records.filter((record) => {
          return record.operation_type === 'Outcome'
        }).reduce((sum, record) => sum + parseFloat(record.amount), 0);

        const finalResult = incomesSum - outcomesSum;
        state.recordsAdditionResult = parseFloat(finalResult).toFixed(2);
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
        if (!action.payload.records[0]) {
          state.records = ['No record to show here'];
          state.message = action.payload.message;
          return;
        };
        state.records = action.payload.records.reverse();
        state.message = action.payload.message;
        
        const incomesSum = state.records.filter((record) => {
          return record.operation_type === 'Income'
        }).reduce((sum, record) => sum + parseFloat(record.amount), 0);

        const outcomesSum = state.records.filter((record) => {
          return record.operation_type === 'Outcome'
        }).reduce((sum, record) => sum + parseFloat(record.amount), 0);
        
        const finalResult = incomesSum - outcomesSum;
        state.recordsAdditionResult = parseFloat(finalResult).toFixed(2);
      })
      .addCase(getRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update record
      .addCase(updateRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        const indexAtRecords = state.records.map(record => {
          return record.record_uuid;
        }).indexOf(action.payload.recordData.record_uuid);
        state.records[indexAtRecords] = action.payload.recordData;
        
        const incomesSum = state.records.filter((record) => {
          return record.operation_type === 'Income'
        }).reduce((sum, record) => sum + parseFloat(record.amount), 0);

        const outcomesSum = state.records.filter((record) => {
          return record.operation_type === 'Outcome'
        }).reduce((sum, record) => sum + parseFloat(record.amount), 0);

        const finalResult = incomesSum - outcomesSum;
        state.recordsAdditionResult = parseFloat(finalResult).toFixed(2);
      })
      .addCase(updateRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete record
      .addCase(deleteRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.records = state.records.filter((record) => {
          return record.record_uuid !== action.payload.record_uuid;
        });

        if (!state.records[0]) {
          state.records = ['No record to show here'];
          state.recordsAdditionResult = 0;
          return;
        };
        
        const incomesSum = state.records.filter((record) => {
          return record.operation_type === 'Income'
        }).reduce((sum, record) => sum + parseFloat(record.amount), 0);

        const outcomesSum = state.records.filter((record) => {
          return record.operation_type === 'Outcome'
        }).reduce((sum, record) => sum + parseFloat(record.amount), 0);

        const finalResult = incomesSum - outcomesSum;
        state.recordsAdditionResult = parseFloat(finalResult).toFixed(2);
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
});

export const {
  resetRecords,
  resetRecordsReq
} = recordsSlice.actions;
export default recordsSlice.reducer;