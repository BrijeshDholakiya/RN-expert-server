const mongosse = require("mongoose");

const serviceSchema = new mongosse.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a name"],
  },
  logo: {
    type: String,
    required: [true, "Please Upload Logo"],
  },
  features: [
    {
      type: String,
      required: [true, "Please Enter Features"],
    },
  ],
  description: {
    type: String,
    required: [true, "Please Enter a Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Valid Price"],
    default: 0,
  },
  actual_price: {
    type: Number,
    required: [true, "Please Enter Valid Actual Price"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongosse.model("Service", serviceSchema);
