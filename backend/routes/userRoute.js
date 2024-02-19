const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassWord,
  updateProfile,
  getAllUser,
  updateUserRole,
  getSingleUser,
  deleteUser,
} = require("../controller/userController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/user/create").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forget").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated, updatePassWord);
router.route("/profile/update").put(isAuthenticated, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .delete(isAuthenticated, authorizeRoles("admin"),deleteUser);

module.exports = router;
