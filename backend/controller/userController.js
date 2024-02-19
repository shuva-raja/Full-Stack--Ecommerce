const { asyncErrorhandler } = require("../middleware/catchasyncError");
const User = require("../models/userModel");
const Errorhandler = require("../util/Errorhandler");
const sendToken = require("../util/jwtToken");
const sendMail = require("../util/sendMail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
exports.registerUser = asyncErrorhandler(async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 201, res);
});
exports.loginUser = asyncErrorhandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Errorhandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new Errorhandler("Email or  password is Invalid ", 401));
  }
  passwrodmatched = await user.comparePassword(password);
  if (!passwrodmatched) {
    return next(new Errorhandler("Email or  password is Invalid ", 401));
  }
  sendToken(user, 200, res);
});
//logout user
exports.logout = asyncErrorhandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});
//forgot Password
exports.forgotPassword = asyncErrorhandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new Errorhandler("User does not exist", 404));
  }
  const resetToken = await user.resetTokenPassword();
  await user.save({ validateBeforeSave: false });
  const url = `http://localhost:3000/api/v1/password/reset/${resetToken}`; //${req.get("host")},${req.protocol}
  const message = `this is your password reset token \n\n ${url}\n\n if u have not generated this please ignore this email`;
  try {
    await sendMail({
      subject: "ECOMMERCE PASSOWRD RECOVERY",
      message: message,
      email: user.email,
    });
    res.status(200).json({
      success: true,
      message: `mail sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new Errorhandler(error.message, 404));
  }
});
exports.resetPassword = asyncErrorhandler(async (req, res, next) => {
  const updatedtoken = req.params.token;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(updatedtoken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new Errorhandler("Token have expired", 401));
  }
  if (req.body.password !== req.body.confirmpassword) {
    return next(new Errorhandler("password does not match", 404));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});
exports.getUserDetails = asyncErrorhandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});
//update/change user password
exports.updatePassWord = asyncErrorhandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const passwordMatched = await user.comparePassword(req.body.oldPassword);
  if (!passwordMatched) {
    return next(new Errorhandler("old Password Does Not Match", 404));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Errorhandler("Password Does Not Match", 404));
  }
  user.password = req.body.confirmPassword;
  await user.save();
  sendToken(user, 200, res);
});
//update Profile
exports.updateProfile = asyncErrorhandler(async (req, res, next) => {
  const updatedProfileData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, updatedProfileData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});
///ADMIN ROUTES(USER)
exports.getAllUser = asyncErrorhandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});
//get single user
exports.getSingleUser = asyncErrorhandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Errorhandler("user does not exist", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
//update user role--admin
exports.updateUserRole = asyncErrorhandler(async (req, res, next) => {
  const updatedProfileData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, updatedProfileData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});
//delete user role --admin
exports.deleteUser = asyncErrorhandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Errorhandler("user does not exist", 400));
  }
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "successfully deleted",
  });
});
