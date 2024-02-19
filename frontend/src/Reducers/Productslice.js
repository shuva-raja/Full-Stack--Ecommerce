import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  error: null,
  loading: false,
  productCount:0,
};
const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    loadProducts:(state, action) =>{
      state.loading = true;
      state.products = [];
      state.error = null;
    },
    addProducts:(state, action)=> {
      state.loading = false;
      state.products = action.payload.product;
      state.count=action.payload.count
      state.resultperpage=action.payload.resultperpage
      
    },
    errorProducts:(state, action)=> {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors:(state, action) =>{
      state.loading = false;
      state.error = null;
    },
  },
});
export const { loadProducts, addProducts, errorProducts,clearErrors } =
  ProductSlice.actions;
export default ProductSlice.reducer;
