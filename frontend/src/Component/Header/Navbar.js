import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { GrCart } from "react-icons/gr";
import { logoutUser } from "../../actions/User/useractions";
import { useAlert } from "react-alert";
const Navbar = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);

  const logout = () => {
    dispatch(logoutUser(navigate));
    alert.success("Logged out");
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="nav-heading">
      <li>
        <Link className="links" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="links" to="/Products">
          Products
        </Link>
      </li>

      <li>
        {isAuthenticated ? (
          <>
            <div className="links">
              <div className="divv" onClick={toggleOptions}>
                {user.name.split(" ")[0]}
                <ArrowDropDownOutlinedIcon className="nav-icon" />
                <div className={showOptions ? "options-show" : "options"}>
                  <Link className="link-nav" to={"/profile/me"}>
                    Account
                  </Link>
                  <Link className="link-nav" to={"/orders"}>
                    Orders
                  </Link>
                  <Link className="link-nav">Dashboard</Link>
                  <Link className="link-nav">Cart</Link>
                  <Link className="link-nav" onClick={logout}>
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Link className="links" to="/login">
            Login
          </Link>
        )}
      </li>
      <li>
        <Link className="links" to="/cart">
          <GrCart
            style={{ color: "violet", marginRight: ".3vmax", height: "1em" }}
            values={cartItems.length}
          />
          Cart
        </Link>
      </li>
      <p className="cartlength">{cartItems.length}</p>
    </div>
  );
};

export default Navbar;
