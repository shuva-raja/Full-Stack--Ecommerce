import React, { useEffect, useState } from "react";
import "./ForgetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../../actions/User/useractions";
import { clearErrors } from "../../../Reducers/forgotPasswordSlice";
import SendIcon from '@mui/icons-material/Send';
const ForgetPassword = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const{isUpdated,error,message}=useSelector(state=>state.forgotPassword)
  const [email, setEmail] = useState("");
  const forgotpassSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
    setTimeout(() => {
        setIsButtonDisabled(true);
      }, 4000);
      setIsButtonDisabled(false)
  };
  useEffect(() => {
    if(error){
        alert.error(error)
        dispatch(clearErrors())
    }
    if(isUpdated){
        alert.success(message)
    }
  }, [dispatch,alert,error,isUpdated,message])
  

  return (
    <div className="forgotpass-parent">
      <div className="forgotpasspage">
        <h3>ECOMMERCE</h3>
        <form onSubmit={forgotpassSubmit}>
          <div className="forgotpass-inputs">
            <MailOutlineIcon
              className="forgotpass-icons"
              style={{ height: "4.5vh", width: "1.8vw" }}
            />
            <input
              type="Email"
              name="email"
              value={email}
              placeholder="Enter Your Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            className="forgotpass-submit"
            type="Submit"
            value="Send Mail"
            disabled={isButtonDisabled}
          />
          
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
