import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: {},
  error: null,
  loading: true,
};
const SingleProductSlice = createSlice({
  name: "SingleProduct",
  initialState,
  reducers: {
    loadSingleProduct: (state, action) => {
      state.loading = true;
      state.product = {};
    },
    addSingleProduct: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    },
    errorSingleProduct: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearSingleProductErrors: (state, action) => {
      state.loading = false;
      state.error = null;
    },
  },
});
export const {
  loadSingleProduct,
  addSingleProduct,
  errorSingleProduct,
  clearSingleProductErrors,
} = SingleProductSlice.actions;
export default SingleProductSlice.reducer;
