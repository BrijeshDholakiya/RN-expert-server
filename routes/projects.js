const express = require("express");
const { authorize, protect } = require("../middlewares/auth");

const {
  getProjects,
  getProject,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects");

const route = express.Router();

route.route("/").get(getProjects).post(protect, authorize(), createProject);

route.route("/:slug").get(getProjectBySlug);
route
  .route("/:id")
  .get(getProject)
  .put(protect, authorize(), updateProject)
  .delete(protect, authorize(), deleteProject);

module.exports = route;
