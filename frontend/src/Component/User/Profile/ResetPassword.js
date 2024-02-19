import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import LockIcon from "@mui/icons-material/Lock";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { loaduser, resetPassword } from "../../../actions/User/useractions";
import { clearErrors } from "../../../Reducers/forgotPasswordSlice";
const ResetPassword = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, isUpdated, error} = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setpassword] = useState("");
  const [confirmpassword, setComfirmPassword] = useState("");

  const resetpasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmpassword", confirmpassword);
    dispatch(resetPassword(myForm, id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");
      setComfirmPassword("")
      setpassword("")
      navigate("/login")
    }
  }, [dispatch, error, alert, isUpdated,navigate]);

  return loading ? (
    <Loader />
  ) : (
    <div className="resetPassword-parent">
      <div className="resetPasswordpage">
        <h3>ECOMMERCE</h3>
        <form onSubmit={resetpasswordSubmit}>
          <div className="resetPassword-inputs">
            <LockIcon
              className="resetPassword-icons"
              style={{ height: "4.5vh", width: "1.8vw" }}
            />
            <input
              type="Password"
              value={password}
              placeholder="Enter New Password"
              required
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="resetPassword-inputs">
            <LockIcon
              className="resetPassword-icons"
              style={{ height: "4.5vh", width: "1.8vw" }}
            />
            <input
              type="Password"
              value={confirmpassword}
              placeholder="Confirm Password"
              required
              onChange={(e) => setComfirmPassword(e.target.value)}
            />
          </div>
          <input
            className="resetPassword-submit"
            type="Submit"
            value="Reset Password"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
