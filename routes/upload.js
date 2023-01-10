const express = require("express");

const { uploadImage } = require("../controllers/upload");
const { authorize, protect } = require("../middlewares/auth");

const route = express.Router();

route.route("/image").post(protect, authorize(), uploadImage);

module.exports = route;
