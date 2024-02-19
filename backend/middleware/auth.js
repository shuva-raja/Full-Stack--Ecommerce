const User = require("../models/userModel");
const Errorhandler = require("../util/Errorhandler");
const { asyncErrorhandler } = require("./catchasyncError");
const jwt = require("jsonwebtoken");
exports.isAuthenticated = asyncErrorhandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Errorhandler("login to Access", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);
  console.log(typeof(req.user.id));
  next();
});
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Errorhandler(`${req.user.role} is not allowed to access`),
        401
      );
    }
    next();
  };
};
