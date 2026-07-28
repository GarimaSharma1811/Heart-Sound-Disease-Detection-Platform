const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  downloadReport,
} = require("../controllers/reportController");

router.get(
  "/:id/report",
  auth,
  downloadReport
);

module.exports = router;