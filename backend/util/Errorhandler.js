class Errorhandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
    //not clear understanding of the underlined line
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = Errorhandler;
