import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  openDrawer: false,
  openDeleteAccount: false,
  openDelAccConfirm: false,
  openAddRecord: false,
  openEditRecord: false,
  openCloseConfirm: false,
  recordFormState: {
    concept: '',
    amount: 0,
    date: new Date().toString(),
    operationType: '',
    category: ''
  },
  recordSelected: ''
};

export const muiComponentsSlice = createSlice({
  name: 'muiComponents',
  initialState,
  reducers: {
    resetMUIComponents: (state) => {
      state.openDrawer = false;
      state.openDeleteAccount = false;
      state.openDelAccConfirm = false;
      state.openAddRecord = false;
      state.openEditRecord = false;
      state.openCloseConfirm = false;
    },
    changeDrawer: (state) => {
      state.openDrawer = !state.openDrawer;
    },
    changeDeleteAccount: (state) => {
      state.openDeleteAccount = !state.openDeleteAccount;
    },
    changeDelAccConfirm: (state) => {
      state.openDelAccConfirm = !state.openDelAccConfirm;
    },
    changeAddRecord: (state) => {
      state.openAddRecord = !state.openAddRecord;
    },
    changeEditRecord: (state) => {
      state.openEditRecord = !state.openEditRecord;
    },
    changeCloseConfirm: (state) => {
      state.openCloseConfirm = !state.openCloseConfirm;
    },
    updateRecordFormState: (state, action) => {
      state.recordFormState = action.payload;
    },
    resetRecordFormState: (state) => {
      state.recordFormState = {
        concept: '',
        amount: 0,
        date: new Date().toString(),
        operationType: '',
        category: ''
      };
      state.recordSelected = '';
    },
    updateRecordSelected: (state, action) => {
      state.recordSelected = action.payload;
    },
  }
});

export const {
  resetMUIComponents,
  changeDrawer,
  changeDeleteAccount,
  changeDelAccConfirm,
  changeAddRecord,
  changeEditRecord,
  changeCloseConfirm,
  updateRecordFormState,
  resetRecordFormState,
  updateRecordSelected
} = muiComponentsSlice.actions;
export default muiComponentsSlice.reducer;