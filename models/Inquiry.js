const mongosse = require("mongoose");

const inquirySchema = new mongosse.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter a email"],
  },
  phone_no: {
    type: String,
    required: [true, "Please Enter a phone no."],
  },
  description: {
    type: String,
    required: [true, "Please Enter a description"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongosse.model("Inquiry", inquirySchema);
