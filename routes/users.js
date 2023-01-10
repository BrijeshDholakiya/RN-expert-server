const express = require("express");

const { register, signin } = require("../controllers/user");

const route = express.Router();

route.route("/register").post(register);
route.route("/signin").post(signin);

module.exports = route;
