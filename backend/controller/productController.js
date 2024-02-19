const { asyncErrorhandler } = require("../middleware/catchasyncError");
const Product = require("../models/productModel");
const Errorhandler = require("../util/Errorhandler");
const apiFeatures = require("../util/apiFeatures");
//get all product
exports.getAllProduct = asyncErrorhandler(async (req, res, next) => {
  let resultperpage = 5;
  const apiFeature1 = new apiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let product = await apiFeature1.query;
  let count = product.length;

  // Create a new query instance for pagination
  const apiFeature2 = new apiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);
  product = await apiFeature2.query;

  res.status(200).json({
    success: true,
    product,
    count,
    resultperpage,
  });
});
//create a product --admin
exports.createProduct = asyncErrorhandler(async (req, res) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});
//update a Product --admin
exports.updateProduct = asyncErrorhandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Product not found", 404));
    // return res.json({ message: "product not found" });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});
//delete a Product --admin

exports.deleteProduct = asyncErrorhandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
    // return res.status(404).json({ message: "Product not found" });
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
//getsingleproduct
exports.getProductDetails = asyncErrorhandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
//create/update PRODUCT REVIEWS
exports.createProductReview = asyncErrorhandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const reviewData = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id)
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(reviewData);
    product.numOfReviews = product.reviews.length;
  }
  let total = 0;
  product.reviews.forEach((rev) => {
    total += rev.rating;
  });
  let avg;
  product.ratings = total / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
// Get All Reviews of a product
exports.getProductReviews = asyncErrorhandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
// Delete Review
exports.deleteReview = asyncErrorhandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.params.id,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
