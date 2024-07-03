const multer = require("multer");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const fs = require("fs");
const path = require("path");
const { createHash } = require("crypto");
const ApiError = require("../exceptions/api-errors");

dayjs.extend(utc);

const allowedFileTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
];
const uploadFolder = "uploads";

fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const hash = createHash("md5").update(file.originalname).digest("hex");
    const folder1 = hash.slice(-2);
    const folder2 = hash.slice(-4, -2);
    const destinationPath = path.join(uploadFolder, folder1, folder2);
    fs.mkdirSync(destinationPath, { recursive: true });
    cb(null, destinationPath);
  },
  filename(req, file, cb) {
    const date = dayjs().utc().format("YYYYMMDD-HHmmss_SSS");
    cb(null, `${date}-${file.originalname}`);
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
