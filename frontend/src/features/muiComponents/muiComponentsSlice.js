import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  openDrawer: false,
  openDeleteAccount: false,
  openDelAccConfirm: false,
  openAddRecord: false,
  openCloseConfirm: false
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
    }
  }
});

export const {
  resetMUIComponents,
  changeDrawer,
  changeDeleteAccount,
  changeDelAccConfirm,
  changeAddRecord,
  changeCloseConfirm
} = muiComponentsSlice.actions;
export default muiComponentsSlice.reducer;