import { useNavigate } from "react-router-dom";
import {
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutRequest,
  logoutSuccess,
  registerUserFail,
  registerUserRequest,
  registerUserSuccess,
} from "../../Reducers/UserSlice";
import axios from "axios";
import {
  updatePasswordFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
} from "../../Reducers/ProfileSlice";
import { forgotPasswordFail, forgotPasswordNotSuccess, forgotPasswordRequest, forgotPasswordSuccess, resetPasswordFail, resetPasswordNotSuccess, resetPasswordRequest, resetPasswordSuccess } from "../../Reducers/forgotPasswordSlice";

function login(email, password) {
  return async function reduxthunk(dispatch, getstate) {
    try {
      dispatch(loginRequest());
      const { data } = await axios.post("/api/v1/login", { email, password });
      dispatch(loginSuccess(data.user));
    } catch (error) {
      dispatch(loginFail(error.response.data.message));
    }
  };
}
function registeruser(myForm) {
  return async function reduxthunk(dispatch, getstate) {
    try {
      dispatch(registerUserRequest());
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post("/api/v1/user/create", myForm, config);
      dispatch(registerUserSuccess(data.user));
    } catch (error) {
      console.log(error.response);
      dispatch(registerUserFail(error.response.data.message));
    }
  };
}
function updateProfileuser(myForm) {
  return async function reduxthunk(dispatch, getstate) {
    try {
      dispatch(updateProfileRequest());
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.put(
        "/api/v1/profile/update",
        myForm,
        config
      );
      dispatch(updateProfileSuccess(data.user));
    } catch (error) {
      console.log(error.response);
      dispatch(updateProfileFail(error.response.data.message));
    }
  };
}
function updatePassword(myForm) {
  return async function reduxthunk(dispatch, getstate) {
    try {
      dispatch(updatePasswordRequest());
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.put(
        "/api/v1/password/update",
        myForm,
        config
      );
      dispatch(updatePasswordSuccess(data.user));
    } catch (error) {
      console.log(error.response);
      dispatch(updatePasswordFail(error.response.data.message));
    }
  };
}
function forgetPassword(email) {
  return async function reduxthunk(dispatch, getstate) {
    try {
      dispatch(forgotPasswordRequest())
      const { data }=await axios.post("/api/v1/password/forget", { email });
      if(data.success==="false")
      {
        dispatch(forgotPasswordNotSuccess(data.message))
      }
      dispatch(forgotPasswordSuccess(data.message))
    } catch (error) {
      console.log(error.response);
      dispatch(forgotPasswordFail(error.response.data.message));
    }
  };
}
function resetPassword(myForm,id) {
  return async function reduxthunk(dispatch, getstate) {
    try {
      dispatch(resetPasswordRequest())
      const config = { headers: { "Content-Type": "application/json" } };
      const { data }=await axios.put(`/api/v1/password/reset/${id}`, myForm,config);
      console.log(data);
      dispatch(resetPasswordSuccess(data.message))
    } catch (error) {
      console.log(error.response);
      dispatch(resetPasswordFail(error.response.data.message));
    }
  };
}
function loaduser() {
  return async function reduxthunk(dispatch, getstate) {
    try {
      dispatch(loadUserRequest());
      const { data } = await axios.get("/api/v1/me");
      dispatch(loadUserSuccess(data.user));
    } catch (error) {
      dispatch(loadUserFail(error.response.data.message));
    }
  };
}
function logoutUser(navigate) {
  return async function reduxthunk(dispatch, getstate) {
    try {
      dispatch(logoutRequest());
      await axios.get("/api/v1/logout");
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(logoutFail(error.response.data.message));
    }
  };
}
export {
  login,
  loaduser,
  logoutUser,
  registeruser,
  updateProfileuser,
  updatePassword,
  forgetPassword,
  resetPassword
};
