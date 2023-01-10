const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");

exports.uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.image;
  //Make sure the image is  photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Generating timestamp for unique image name
  const dateObj = new Date();
  const utcEpochSeconds =
    dateObj.getTime() + dateObj.getTimezoneOffset() * 60000;

  //create custom filename
  file.name = `photo_${utcEpochSeconds}_${file.name}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    const resetUrl = `http://localhost:5000/uploads/${file.name}`;
    res.status(200).json({ success: true, data: resetUrl });
  });
});
