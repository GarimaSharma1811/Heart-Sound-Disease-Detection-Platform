const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const uploadPath = "src/uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    cb(null, uuid() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "audio/wav" ||
    file.originalname.toLowerCase().endsWith(".wav")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only WAV files are allowed"));
  }
};

module.exports = multer({
  storage,
  fileFilter,
});