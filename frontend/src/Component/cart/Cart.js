import React, { useState, useEffect } from "react";
import "./Cart.css";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";
import { removeItemsFromCart } from "../../actions/cartAction";
import Carttotal from "./Carttotal";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setqty] = useState(0);
 const{isAuthenticated}=useSelector(state=>state.user)
  const [totalcartprice, settotalcartprice] = useState(0);
  const { cartItems } = useSelector((state) => state.cart);
  const removecarthandler = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const btnHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    let quantity = 0;
    let totalPrice = 0;

    cartItems.forEach((item) => {
      quantity += item.quantity;
      totalPrice += item.quantity * item.price;
    });

    setqty(quantity);
    settotalcartprice(totalPrice);
  }, [totalcartprice, cartItems]);
  return (
    <>
      <div className="cart-parent">
        <div className="cart-items">
          {cartItems.map((i) => (
            <CartCard data={i} removecarthandler={removecarthandler} />
          ))}
        </div>
        <div className="cart-total">
          <Carttotal qty={qty} totalcartprice={totalcartprice} />
          <button className="placeorderbtn" onClick={btnHandler}>
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
