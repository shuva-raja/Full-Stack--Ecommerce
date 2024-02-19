import { configureStore } from "@reduxjs/toolkit";
import Productslice from "./Reducers/Productslice";
import SingleProductSlice from "./Reducers/SingleProductSlice";
import UserSlice from "./Reducers/UserSlice";
import ProfileSlice from "./Reducers/ProfileSlice";
import forgotPasswordSlice from "./Reducers/forgotPasswordSlice";
import cartSlice from "./Reducers/cartSlice";
// Retrieve cartItems and shippingInfo from localStorage
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const shippingInfo = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {};
const store = configureStore({
  reducer: {
    Product: Productslice,
    SingleProduct: SingleProductSlice,
    user: UserSlice,
    profile: ProfileSlice,
    forgotPassword: forgotPasswordSlice,
    cart: cartSlice,
  },
  preloadedState: {
    cart: {
      cartItems: cartItems,
      shippingInfo: shippingInfo,
    },
  },
});
export default store;
