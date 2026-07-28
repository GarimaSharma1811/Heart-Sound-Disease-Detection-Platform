const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

const {
  predictHeartSound,
  getHistory,
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

module.exports = router;