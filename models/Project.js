const mongoose = require("mongoose");
const slugify = require("slugify");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  image: {
    type: String,
    required: [true, "Please Enter an Image"],
  },
  cover_image: {
    type: String,
    required: [true, "Please Enter a Cover Image"],
  },
  about: {
    type: String,
    required: [true, "Please Enter an About Field"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Description"],
  },
  seo: {
    type: String,
  },
  slug: String,
  features: [
    {
      name: {
        type: String,
        required: [true, "Please Enter Feature Name"],
      },
      text: {
        type: String,
        required: [true, "Please Enter Feature Text"],
      },
      icon: {
        type: String,
        required: [true, "Please Enter Feature Icon"],
      },
    },
  ],
});

//Create Bootcamp slug from the name
projectSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Project", projectSchema);
