const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

const {
  predictHeartSound,
  getHistory,
  deletePrediction,
} = require("../controllers/predictionController");

router.post(
  "/",
  auth,
  upload.single("audio"),
  predictHeartSound
);

router.get(
  "/",
  auth,
  getHistory
);

router.delete(
  "/:id",
  auth,
  deletePrediction
);

module.exports = router;