const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controller/productController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/products").get(getAllProduct);
router
  .route("/admin/product/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails)
router.route("/review").put(isAuthenticated, createProductReview);
router
  .route("/review/:id")
  .get(getProductReviews)
  .delete(isAuthenticated, deleteReview);
module.exports = router;
