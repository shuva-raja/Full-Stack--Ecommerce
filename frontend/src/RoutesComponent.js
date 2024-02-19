// RoutesComponent.js
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Component/Header/Navbar";
import Footer from "./Component/Footer/Footer";
import Home from "./Component/Home/Home";

import "./RoutesComponent.css";
import SingleProductDetails from "./Component/SingleProductDetails/SingleProductDetails";
import Products from "./Component/Home/Products";
import Login from "./Component/User/Login/Login";
import Register from "./Component/User/Registration/Register";
import { useDispatch, useSelector } from "react-redux";
import { loaduser } from "./actions/User/useractions";
import Profile from "./Component/User/Profile/Profile";
import ProtectedRoute from "./Component/Route/ProtectedRoute";
import UpdateProfile from "./Component/User/Profile/UpdateProfile";
import UpdatePassword from "./Component/User/Profile/UpdatePassword";
import ForgetPassword from "./Component/User/Profile/ForgetPassword";
import ResetPassword from "./Component/User/Profile/ResetPassword";
import Cart from "./Component/cart/Cart";
import Shipping from "./Component/cart/stepper/Shipping";
import ConfirmOrder from "./Component/cart/stepper/ConfirmOrder";
import Payment from "./Component/cart/stepper/Payment";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Success from "./Component/cart/stepper/Success";
function RoutesComponent() {
  const dispatch = useDispatch();

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isShippingpage = location.pathname === "/shipping";
  const isConfirmOrderPage = location.pathname === "/order/confirm";
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
    console.log(stripeApiKey);
  }
  useEffect(() => {
    dispatch(loaduser());
    const fetchData = async () => {
      await getStripeApiKey();
    };
    fetchData(); // No need for await here
  }, [dispatch]);

  return (
    <div className="route-container">
      {!(
        isLoginPage ||
        isRegisterPage ||
        isConfirmOrderPage ||
        isShippingpage
      ) && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/me" element={<Profile />} />
        <Route path="/me/edit" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route
          path="/process/payment"
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment stripeApiKey={stripeApiKey} />
            </Elements>
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/api/v1/password/reset/:id" element={<ResetPassword />} />
        <Route path="/product/:id" element={<SingleProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
      </Routes>
      {!(
        isLoginPage ||
        isRegisterPage ||
        isConfirmOrderPage ||
        isShippingpage
      ) && <Footer />}
    </div>
  );
}

export default RoutesComponent;
