const Errorhandler = require("../util/Errorhandler");

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal Server Error";
  if (err.name === "CastError") {
    const message = `Resource not found..due to invalid ${err.path}`;
    err = new Errorhandler(message, 400);
  }
  if (err.code === 11000) {
    const message = "Email already exists";
    err=new Errorhandler(message,404)
  }
  if(err.name==="JsonWebTokenError"){
    const message="Token is Invalid ,Try again"
    err=new Errorhandler(message,404)
  }
  if(err.name==="TokenExpireError"){
    const message="Token is Expired ,Try again"
    err=new Errorhandler(message,404)
  }
  res.status(err.statuscode).json({
    success: false,
    message: err.stack,
  });
};
