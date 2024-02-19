import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
  message: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfileRequest(state) {
      state.loading = true;
    },
    updatePasswordRequest(state) {
      state.loading = true;
    },
    updateUserRequest(state) {
      state.loading = true;
    },
    deleteUserRequest(state) {
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateUserSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    deleteUserSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload.success;
      state.message = action.payload.message;
    },
    updateProfileFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileReset(state) {
      state.isUpdated = false;
    },
    updatePasswordReset(state) {
      state.isUpdated = false;
    },
    updateUserReset(state) {
      state.isUpdated = false;
    },
    deleteUserReset(state) {
      state.isDeleted = false;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const {
  updateProfileRequest,
  updatePasswordRequest,
  updateUserRequest,
  deleteUserRequest,
  updateProfileSuccess,
  updatePasswordSuccess,
  updateUserSuccess,
  deleteUserSuccess,
  updateProfileFail,
  updatePasswordFail,
  updateUserFail,
  deleteUserFail,
  updateProfileReset,
  updatePasswordReset,
  updateUserReset,
  deleteUserReset,
  clearErrors,
} = profileSlice.actions;

export default profileSlice.reducer;
