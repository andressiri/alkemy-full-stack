import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  openDrawer: false,
  openDeleteAccount: false,
  openDelAccConfirm: false,
  openAddRecord: false,
  openEditRecord: false,
  openCloseConfirm: false,
  openDeleteRecordConfirm: false,
  recordFormState: {
    concept: '',
    amount: 0,
    date: new Date().toString(),
    operationType: '',
    category: ''
  },
  recordSelected: '',
  filters: {
    conceptFilter: 'None',
    typeFilter: 'None',
    categoryFilter: 'None'
  }
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
      state.openDeleteRecordConfirm = false;
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
    changeDeleteRecordConfirm: (state) => {
      state.openDeleteRecordConfirm = !state.openDeleteRecordConfirm;
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
    updateFilters: (state, action) => {
      state.filters = action.payload;
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
  changeDeleteRecordConfirm,
  updateRecordFormState,
  resetRecordFormState,
  updateRecordSelected,
  updateFilters
} = muiComponentsSlice.actions;
export default muiComponentsSlice.reducer;