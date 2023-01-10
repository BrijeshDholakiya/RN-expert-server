const jwt = require("jsonwebtoken");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.token) {
    token = req.headers.token;
  }

  if (!token) {
    return next(new ErrorResponse(`Please Provide valid Token!`, 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse(`Not Authorized!`, 401));
  }
});

exports.authorize = () => (req, res, next) => {
  if (!["admin"].includes(req.user.role)) {
    return next(
      new ErrorResponse(
        `User role ${req.user.role} is not authorized to access this route`,
        403
      )
    );
  }
  next();
};
