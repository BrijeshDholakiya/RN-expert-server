const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err }; // Copying err object
  error.message = err.message;
  console.log(err.stack.red);

  // mongoose bad objectId
  if (err.name === "CastError") {
    const message = `Resource with id ${err.value} not found!`;
    error = new ErrorResponse(message, 404);
  }

  // mongoose duplicate value error
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)?.map((val) => val?.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
