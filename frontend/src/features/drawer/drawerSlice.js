import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  openDrawer: false
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    reset: (state) => {
      state.openDrawer = false;
    },
    changeDrawer: (state) => {
      state.openDrawer = !state.openDrawer;
    } 
  }
});

export const {reset} = drawerSlice.actions;
export const {changeDrawer} = drawerSlice.actions;
export default drawerSlice.reducer;