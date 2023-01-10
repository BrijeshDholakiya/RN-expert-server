const express = require("express");
const { authorize, protect } = require("../middlewares/auth");

const {
  createService,
  deleteService,
  getService,
  getServices,
  updateService,
} = require("../controllers/service");

const router = express.Router();

router.route("/").get(getServices).post(protect, authorize(), createService);

router
  .route("/:id")
  .get(getService)
  .put(protect, authorize(), updateService)
  .delete(protect, authorize(), deleteService);

module.exports = router;
