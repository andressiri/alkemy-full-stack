import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));
const remember = JSON.parse(localStorage.getItem('remember'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  remember: remember ? remember : false,
  temporaryToken: null
};

// Register user
export const register = createAsyncThunk('auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    };
  }
);

// Login user
export const login = createAsyncThunk('auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    };
  }
);

// User logout
export const logout = createAsyncThunk('auth/logout',
  async () => {
    await authService.logout();
  }
);

// Send verification code
export const sendCode = createAsyncThunk('auth/sendCode',
  async (email, thunkAPI) => {
    try {
      const message = await authService.sendCode(email, user);
      return thunkAPI.fulfillWithValue(message);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    };
  }
);

// Check verification code
export const checkCode = createAsyncThunk('auth/checkCode',
  async (code, thunkAPI) => {
    try {
      const message = await authService.checkCode(code, user);
      return thunkAPI.fulfillWithValue(message);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    };
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.userData;
        state.remember = action.payload.remember;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.remember = false;
      })
      // Send verification code
      .addCase(sendCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(sendCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Check verification code
      .addCase(checkCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        // if not user logged a temporary token will be obtained to change the password
        if (action.payload.token) {
          state.temporaryToken = action.payload.token;
        };  
      })
      .addCase(checkCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
  }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;