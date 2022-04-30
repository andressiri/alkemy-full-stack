import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  openDrawer: false,
  openDeleteAccount: false,
  openDelAccConfirm: false,
};

export const muiComponentsSlice = createSlice({
  name: 'muiComponents',
  initialState,
  reducers: {
    resetMUIComponents: (state) => {
      state.openDrawer = false;
      state.openDeleteAccount = false;
      state.openDelAccConfirm = false;
    },
    changeDrawer: (state) => {
      state.openDrawer = !state.openDrawer;
    },
    changeDeleteAccount: (state) => {
      state.openDeleteAccount = !state.openDeleteAccount;
    },
    changeDelAccConfirm: (state) => {
      state.openDelAccConfirm = !state.openDelAccConfirm;
    }
  }
});

export const {resetMUIComponents} = muiComponentsSlice.actions;
export const {changeDrawer} = muiComponentsSlice.actions;
export const {changeDeleteAccount} = muiComponentsSlice.actions;
export const {changeDelAccConfirm} = muiComponentsSlice.actions;
export default muiComponentsSlice.reducer;