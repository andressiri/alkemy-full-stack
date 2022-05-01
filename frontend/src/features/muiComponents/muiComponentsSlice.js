import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  openDrawer: false,
  openDeleteAccount: false,
  openDelAccConfirm: false,
  openAddRecord: false,
  openCloseConfirm: false,
  addRecordFormState: {
    concept: '',
    amount: 0,
    date: new Date(),
    operationType: '',
    category: ''
  }
};

// Change AddRecordFormState with data sent
const prepareAddRecordState = (value, name) => {

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
    changeCloseConfirm: (state) => {
      state.openCloseConfirm = !state.openCloseConfirm;
    },
    updateAddRecordState: (state, action) => {
      state.addRecordFormState = action.payload;
    },
    resetAddRecordState: (state) => {
      state.addRecordFormState = {
        concept: '',
        amount: 0,
        date: new Date(),
        operationType: '',
        category: ''
      };
    }
  }
});

export const {
  resetMUIComponents,
  changeDrawer,
  changeDeleteAccount,
  changeDelAccConfirm,
  changeAddRecord,
  changeCloseConfirm,
  updateAddRecordState,
  resetAddRecordState
} = muiComponentsSlice.actions;
export default muiComponentsSlice.reducer;