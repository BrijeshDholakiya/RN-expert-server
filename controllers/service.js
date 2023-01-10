const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Service = require("../models/Service");

// @desc        Get all Services
// @route       GET api/v1/Services
// @access      Public
exports.getServices = asyncHandler(async (req, res, next) => {
  const Services = await Service.find();

  res.status(200).json({
    status: 200,
    success: true,
    msg: "All Services data fetched successfully!",
    data: Services,
  });
});

// @desc        Get Single Service by ID
// @route       GET api/v1/Services/:id
// @access      Public
exports.getService = asyncHandler(async (req, res, next) => {
  // try {
  const Services = await Service.findById(req.params.id);

  if (!Services)
    return next(
      new ErrorResponse(`Service with id ${req.params.id} not found!`, 404)
    );

  res.status(200).json({
    success: true,
    msg: `Service is fetched successfully!`,
    data: Services,
  });
  // } catch (error) {
  //   next(error);
  // }
});

// @desc        Create Service
// @route       POST api/v1/Services
// @access      Private
exports.createService = asyncHandler(async (req, res, next) => {
  const Services = await Service.create(req.body);

  res.status(201).json({
    success: true,
    msg: "Service created successfully!",
    data: Services,
  });
});

// @desc        Update Service
// @route       PUT api/v1/Services/:id
// @access      Private
exports.updateService = asyncHandler(async (req, res, next) => {
  const Services = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!Services)
    return next(
      new ErrorResponse(`Service with id ${req.params.id} not found!`, 404)
    );
  res.status(201).json({
    success: true,
    msg: "Service updated successfully!",
    data: Services,
  });
});

// @desc        Delete Service
// @route       DELETE api/v1/Services/:id
// @access      Private
exports.deleteService = asyncHandler(async (req, res, next) => {
  const Services = await Service.findByIdAndDelete(req.params.id);

  if (!Services)
    return next(
      new ErrorResponse(`Service with id ${req.params.id} not found!`, 404)
    );
  res.status(200).json({
    success: true,
    msg: `Service is deleted successfully!`,
  });
});
