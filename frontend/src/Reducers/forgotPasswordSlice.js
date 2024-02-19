import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  message: null,
  success: null,
  isUpdated: false,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordNotSuccess(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordNotSuccess(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated=false
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.isUpdated = true;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.success = action.payload;
      state.isUpdated = true;
    },
    forgotPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const {
  forgotPasswordRequest,
  resetPasswordRequest,
  forgotPasswordSuccess,
  resetPasswordSuccess,
  forgotPasswordFail,
  resetPasswordFail,
  clearErrors,
  forgotPasswordNotSuccess,
  resetPasswordNotSuccess,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
