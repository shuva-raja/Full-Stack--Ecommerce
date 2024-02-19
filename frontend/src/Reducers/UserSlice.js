import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  loading: false,
  isAuthenticated: false,
  error: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: state => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    registerUserRequest: state => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    registerUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    loadUserRequest: state => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutRequest: state => {
      state.loading = true;
    },
    logoutSuccess: state => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: state => {
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  clearErrors,logoutRequest
} = UserSlice.actions;

export default UserSlice.reducer;
