const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const error = require("./middleware/error");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//product route
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute=require("./routes/paymentRoute")
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);
app.use(error);
module.exports = app;
