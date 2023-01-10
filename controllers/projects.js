const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Project = require("../models/Project");

// @desc        Get all Projects
// @route       GET api/v1/projects
// @access      Public
exports.getProjects = asyncHandler(async (req, res, next) => {
  const Projects = await Project.find();

  res.status(200).json({
    status: 200,
    success: true,
    msg: "All Projects data fetched successfully!",
    result: Projects,
  });
});

// @desc        Get Single Project by ID
// @route       GET api/v1/project/:id
// @access      Public
exports.getProject = asyncHandler(async (req, res, next) => {
  const Projects = await Project.findOne({ slug: req.params.id });

  if (!Projects)
    return next(
      new ErrorResponse(`Project with id ${req.params.id} not found!`, 404)
    );

  res.status(200).json({
    status: 200,
    success: true,
    msg: `Project is fetched successfully!`,
    result: Projects,
  });
});

// @desc        Get Single Project by Slug
// @route       GET api/v1/projects/:slug
// @access      Public
exports.getProjectBySlug = asyncHandler(async (req, res, next) => {
  // const Projects = await Project.findById(req.params.slug);
  const Projects = await Project.findOne({ slug: req.params.slug });

  if (!Projects)
    return next(
      new ErrorResponse(`Project with id ${req.params.slug} not found!`, 404)
    );

  res.status(200).json({
    status: 200,
    success: true,
    msg: `Project is fetched successfully!`,
    result: Projects,
  });
});

// @desc        Create Project
// @route       POST api/v1/projects
// @access      Private
exports.createProject = asyncHandler(async (req, res, next) => {
  const Projects = await Project.create(req.body);

  res.status(201).json({
    success: true,
    msg: "Project created successfully!",
    data: Projects,
  });
});

// @desc        Update Project
// @route       PUT api/v1/projects/:id
// @access      Private
exports.updateProject = asyncHandler(async (req, res, next) => {
  const Projects = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!Projects)
    return next(
      new ErrorResponse(`Projects with id ${req.params.id} not found!`, 404)
    );
  res.status(201).json({
    success: true,
    msg: "Project updated successfully!",
    data: Projects,
  });
});

// @desc        Delete Project
// @route       DELETE api/v1/projects/:id
// @access      Private
exports.deleteProject = asyncHandler(async (req, res, next) => {
  const Projects = await Project.findByIdAndDelete(req.params.id);

  if (!Projects)
    return next(
      new ErrorResponse(`Project with id ${req.params.id} not found!`, 404)
    );
  res.status(200).json({
    success: true,
    msg: `Project is deleted successfully!`,
  });
});
