const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/User");

// @desc        Register User
// @route       POST api/v1/user/signup
// @access      Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 201, res);
});

// @desc        Sign in User with email and password
// @route       POST api/v1/user/signin
// @access      Public
exports.signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorResponse(`Please Provide valid credentials!`, 400));

  const user = await User.findOne({ email }).select("+password");

  // check for user
  if (!user) {
    return next(new ErrorResponse(`User not found!`, 401));
  }

  // check for matching password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) return next(new ErrorResponse(`Invalid Credentials!`, 401));
  sendTokenResponse(user, 201, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  res
    .status(statusCode)
    .json({ success: true, status: 200, token, result: user });
};
