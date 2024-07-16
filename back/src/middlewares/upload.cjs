const multer = require("multer");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const fs = require("fs");
const path = require("path");
const { createHash } = require("crypto");
const ApiError = require("../middlewares/exceptions/api-errors.cjs");

dayjs.extend(utc);

const allowedFileTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
];
const uploadFolder = "uploads";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadDir = path.join(__dirname, "../../uploads");
    if(!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    };
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError.BadRequest("Wrong image type"));
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

module.exports = multer({
  storage,
  fileFilter,
  limits,
});
