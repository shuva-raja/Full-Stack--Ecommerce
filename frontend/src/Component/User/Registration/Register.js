import React, { useEffect, useState } from "react";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CreateIcon from "@mui/icons-material/Create";
import { registeruser } from "../../../actions/User/useractions";
import { useAlert } from "react-alert";
import { clearErrors } from "../../../Reducers/UserSlice";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("./Profile.png");
  const [avatar, setAvatar] = useState("");
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("password", user.password);
    myForm.set("avatar", avatar);

    dispatch(registeruser(myForm));
  };

  const registerDatachange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.success("Account Created");
      navigate("/profile/me");
    }
  }, [error, isAuthenticated, alert, navigate, dispatch]);

  return (
    <div className="register-parent">
      <div className="registerpage">
        <h3>ECOMMERCE</h3>
        <form encType="multipart/form-data" onSubmit={registerSubmit}>
          <div className="register-inputs">
            <CreateIcon
              className="register-icons"
              style={{ height: "4.5vh", width: "1.8vw" }}
            />
            <input
              type="text"
              name="name"
              value={user.name}
              placeholder="Enter Your Name"
              required
              onChange={registerDatachange}
            />
          </div>
          <div className="register-inputs">
            <MailOutlineIcon
              className="register-icons"
              style={{ height: "4.5vh", width: "1.8vw" }}
            />
            <input
              type="Email"
              name="email"
              value={user.email}
              placeholder="Email"
              required
              onChange={registerDatachange}
            />
          </div>
          <div className="register-inputs">
            <LockOpenIcon
              className="register-icons"
              style={{ height: "4.5vh", width: "1.8vw" }}
            />
            <input
              type="Password"
              name="password"
              value={user.password}
              placeholder="Password"
              required
              onChange={registerDatachange}
            />
          </div>
          <div className="register-inputs">
            <img
              className="register-img"
              style={{
                height: "4.2vh",
                maxWidth: "3vw",
                marginLeft: "2%",
                borderRight: "1px solid",
              }}
              src={avatarPreview}
              alt="Avatar Preview"
            />

            <input
              type="file"
              name="avatar"
              accept="image/*"
              placeholder="Select Image"
              onChange={registerDatachange}
            />
          </div>
          <input className="register-submit" type="Submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default Register;
