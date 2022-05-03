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
  conceptFilter: '',
  typeFilter: '',
  categoryFilter: ''
};

export const muiComponentsSlice = createSlice({
  name: 'muiComponents',
  initialState,
  reducers: {
    resetMUIComponents: () => initialState,
    resetMUIDialogs: (state) => {
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
    updateConceptFilter: (state, action) => {
      state.conceptFilter = action.payload;
    },
    updateTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
      if (action.payload === 'None') state.typeFilter = '';
    },
    updateCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    resetFilters: (state) => {
      state.conceptFilter = ''
      state.typeFilter = '';
      state.categoryFilter = '';
    },
  }
});

export const {
  resetMUIComponents,
  resetMUIDialogs,
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
  updateConceptFilter,
  updateTypeFilter,
  updateCategoryFilter,
  resetFilters
} = muiComponentsSlice.actions;
export default muiComponentsSlice.reducer;