import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CreateIcon from "@mui/icons-material/Create";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { loaduser, updateProfileuser } from "../../../actions/User/useractions";
import { clearErrors, updatePasswordReset } from "../../../Reducers/ProfileSlice";
const UpdateProfile = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const {isUpdated,loading,error} = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfileuser(myForm));
  };

  const avatarChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (isUpdated) {
        alert.success("Profile Updated Successfully");
        dispatch(loaduser());
        navigate("/profile/me")
        dispatch(updatePasswordReset())
      }
  }, [user,isUpdated,dispatch,error,navigate,alert]);

  return (
    <div className="updateProfile-parent">
      <div className="updateProfilepage">
        <h3>ECOMMERCE</h3>
        <form encType="multipart/form-data" onSubmit={updateProfileSubmit}>
          <div className="updateProfile-inputs">
            <CreateIcon
              className="updateProfile-icons"
              style={{ height: "4.5vh", width: "1.8vw" }}
            />
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter Your Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="updateProfile-inputs">
            <MailOutlineIcon
              className="updateProfile-icons"
              style={{ height: "4.5vh", width: "1.8vw" }}
            />
            <input
              type="Email"
              name="email"
              value={email}
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="updateProfile-inputs">
            <img
              className="updateProfile-img"
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
              onChange={avatarChange}
            />
          </div>
          <input
            className="updateProfile-submit"
            type="Submit"
            value="Update"
            onSubmit={updateProfileSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
