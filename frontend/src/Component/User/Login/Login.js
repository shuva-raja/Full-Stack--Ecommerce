import React, { useState, useEffect } from "react";
import "./Login.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/User/useractions";
import { useAlert } from "react-alert";
import { clearErrors } from "../../../Reducers/UserSlice";
import loginback from "../../Image-Footer/loginback.png";
const Login = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.user);
  const [loginEmail, setloginEmail] = useState("");
  const [password, setpassword] = useState("");
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, password));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      alert.success("Login Success");
      navigate("/profile/me");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  return (
    <div className="login-parent"style={{backgroundImage: `url(${loginback})`,backgroundSize:'cover'}}>
      <div className="loginpage">
        <h3>ECOMMERCE</h3>
        <form onSubmit={loginSubmit}>
          <div className="login-inputs">
            <MailOutlineIcon
              className="login-icons"
              style={{ height: "4.5vh", width: "1.8vw" }}
            />
            <input
              type="text"
              value={loginEmail}
              placeholder="Email"
              onChange={(e) => setloginEmail(e.target.value)}
            />
          </div>
          <div className="login-inputs">
            <LockOpenIcon
              className="login-icons"
              style={{ height: "4.5vh", width: "1.8vw" }}
            />
            <input
              type="Password"
              value={password}
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <input className="login-submit" type="Submit" value="Login" />
        </form>
        <Link className="forget-pass" to="/forgetpassword">
          Forget Passord?
        </Link>
        <p>New to Ecommerce?</p>
        <Link className="create-new" to="/register">
          Create New Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
