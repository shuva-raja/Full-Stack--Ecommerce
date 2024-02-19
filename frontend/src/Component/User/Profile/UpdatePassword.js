import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { loaduser, updatePassword } from "../../../actions/User/useractions";
import { clearErrors, updatePasswordReset } from "../../../Reducers/ProfileSlice";
import Loader from "../../Loader/Loader";
const UpdatePassword = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const {error,loading,isUpdated} = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");

  const passwordSubmit = (e) => {
    e.preventDefault();
    
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    if(isUpdated){
        alert.success("Password Updated")
        dispatch(loaduser())
        navigate("/profile/me")
    }
    dispatch(updatePasswordReset())
  }, [alert,error,dispatch,isUpdated,navigate]);

  return (
    loading?(<Loader/>):(<div className="updatePassword-parent">
    <div className="updatePasswordpage">
      <h3>ECOMMERCE</h3>
      <form onSubmit={passwordSubmit}>
        <div className="updatePassword-inputs">
          <LockOpenIcon
            className="updatePassword-icons"
            style={{ height: "4.5vh", width: "1.8vw" }}
          />
          <input
            type="Password"
            value={oldPassword}
            placeholder="Enter Old Password"
            required
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="updatePassword-inputs">
          <LockIcon
            className="updatePassword-icons"
            style={{ height: "4.5vh", width: "1.8vw" }}
          />
          <input
            type="Password"
            value={newPassword}
            placeholder="Enter New Password"
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="updatePassword-inputs">
          <LockIcon
            className="updatePassword-icons"
            style={{ height: "4.5vh", width: "1.8vw" }}
          />
          <input
            type="Password"
            value={confirmPassword}
            placeholder="Confirm Password"
            required
            onChange={(e) => setComfirmPassword(e.target.value)}
          />
        </div>
        <input
          className="updatePassword-submit"
          type="Submit"
          value="Update"
        />
      </form>
    </div>
  </div>)
    
  );
};

export default UpdatePassword;
