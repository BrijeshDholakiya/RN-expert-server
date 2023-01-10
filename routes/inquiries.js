const express = require("express");
const { authorize, protect } = require("../middlewares/auth");

const {
  createInquiry,
  getInquiry,
  getInquiryById,
  deleteInquiry,
} = require("../controllers/inquiry");

const router = express.Router();
router.use(protect, authorize());

router.route("/").get(getInquiry).post(createInquiry);
router.route("/:id").get(getInquiryById).delete(deleteInquiry);

module.exports = router;
