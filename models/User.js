const mongosse = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongosse.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter a email"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please Enter a Password"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: [true, "Please Enter a role"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongosse.model("User", userSchema);
