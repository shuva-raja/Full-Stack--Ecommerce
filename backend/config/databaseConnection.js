const mongoose = require("mongoose");
const mongoConnect = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`connected with ${data.connection.host}`);
  });
};
module.exports = mongoConnect;
