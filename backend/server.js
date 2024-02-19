const app = require("./app");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const mongoConnect = require("./config/databaseConnection");
process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" }); //path depends when importing app from other module
mongoConnect();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const server = app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}`);
});
process.on("unhandledRejection", (err) => {
  console.log(`ERROR:${err.message}`);
  console.log("shutting down ");
  server.close(() => {
    process.exit(1);
  });
});
