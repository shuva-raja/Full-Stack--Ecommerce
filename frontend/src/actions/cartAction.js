import axios from "axios";
import {
  addToCart,
  removeCartItem,
  saveShippingInfos,
} from "../Reducers/cartSlice";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  const payload = {
    id: data.product._id,
    name: data.product.name,
    price: data.product.price,
    image: data.product.images[0].url,
    stock: data.product.Stock,
    quantity,
  };
  dispatch(addToCart(payload));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch(removeCartItem(id));

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch(saveShippingInfos(data));

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
