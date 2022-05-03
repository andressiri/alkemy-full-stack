import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

// Get state from localStorage
const user = JSON.parse(localStorage.getItem('user'));
const remember = JSON.parse(localStorage.getItem('remember'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  remember: remember ? remember : false,
  temporaryToken: null,
  userVerificationRequired: false,
  passwordChangeRequired: false,
  accountDeleteRequired: false
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
  async (obj, thunkAPI) => {
    try {
      const message = await authService.sendCode(obj.email, obj.token);
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
      const response = await authService.checkCode(code);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    };
  }
);

// Change user password
export const changePassword = createAsyncThunk('auth/changePassword',
  async (obj, thunkAPI) => {
    try {
      return await authService.changePassword(obj.password, obj.temporaryToken);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    };
  }
);

// Change user name
export const changeName = createAsyncThunk('auth/changeName',
  async (obj, thunkAPI) => {
    try {
      const message = await authService.changeName(obj.name, obj.token);
      return thunkAPI.fulfillWithValue(message);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    };
  }
);

// Delete Account
export const deleteAccount = createAsyncThunk('auth/deleteAccount',
  async (obj, thunkAPI) => {
    try {
      const data = await authService.deleteAccount(obj.password, obj.temporaryToken, obj.user);
      return thunkAPI.fulfillWithValue(data.message);
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
    resetAuth: () => initialState,
    resetAuthReq: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    resetToken: (state) => {
      state.temporaryToken = null;
    },
    requireVerification: (state) => {
      state.passwordChangeRequired = false;
      state.accountDeleteRequired = false;
      state.userVerificationRequired = true;
    },
    changeVerificationStatus: (state) => {
      state.user = {
        ...user,
        verified: true
      };
    },
    requirePasswordChange: (state) => {
      state.userVerificationRequired = false;
      state.accountDeleteRequired = false;
      state.passwordChangeRequired = true;
    },
    requireAccountDelete: (state) => {
      state.userVerificationRequired = false;
      state.passwordChangeRequired = false;
      state.accountDeleteRequired = true;
    },
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
        state.message = action.payload.message;
        state.temporaryToken = action.payload.token;
        if (user) state.user = {...user, verified: true};
        state.isSuccess = true;
      })
      .addCase(checkCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Change password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Change Name
      .addCase(changeName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(changeName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete account
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
});

export const {
  resetAuth,
  resetAuthReq,
  resetToken,
  requireVerification,
  changeVerificationStatus,
  requirePasswordChange,
  requireAccountDelete,
} = authSlice.actions;
export default authSlice.reducer;