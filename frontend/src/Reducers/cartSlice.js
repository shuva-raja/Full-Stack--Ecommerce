import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  shippingInfo: {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.id === isItemExist.id ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeCartItem(state, action) {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
    saveShippingInfos(state, action) {
      state.shippingInfo = action.payload;
    },
  },
});

export const { addToCart, removeCartItem, saveShippingInfos } = cartSlice.actions;

export default cartSlice.reducer;
