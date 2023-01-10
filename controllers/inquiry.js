const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Inquiry = require("../models/Inquiry");

// @desc        Get all Inquiries
// @route       GET api/v1/inquiry
// @access      Private
exports.getInquiry = asyncHandler(async (req, res, next) => {
  const inquiries = await Inquiry.find();

  res.status(200).json({
    status: 200,
    success: true,
    msg: "All Inquiry data fetched successfully!",
    data: inquiries,
  });
});

// @desc        Get Single Inquiry by ID
// @route       GET api/v1/inquiry/:id
// @access      Private
exports.getInquiryById = asyncHandler(async (req, res, next) => {
  const singleInquiry = await Inquiry.findById(req.params.id);

  if (!singleInquiry)
    return next(
      new ErrorResponse(`Inquiry with id ${req.params.id} not found!`, 404)
    );

  res.status(200).json({
    success: true,
    msg: `Inquiry is fetched successfully!`,
    data: singleInquiry,
  });
});

// @desc        Create Inquiry
// @route       POST api/v1/inquiry
// @access      Private
exports.createInquiry = asyncHandler(async (req, res, next) => {
  const inquiry = await Inquiry.create(req.body);

  res.status(201).json({
    success: true,
    msg: "Inquiry created successfully!",
    data: inquiry,
  });
});

// @desc        Delete Inquiry
// @route       DELETE api/v1/inquiry/:id
// @access      Private
exports.deleteInquiry = asyncHandler(async (req, res, next) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

  if (!inquiry)
    return next(
      new ErrorResponse(`Inquiry with id ${req.params.id} not found!`, 404)
    );
  res.status(200).json({
    success: true,
    msg: `Inquiry deleted successfully!`,
  });
});
