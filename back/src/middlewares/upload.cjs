const multer = require("multer");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const fs = require("fs");
const path = require("path");
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
    const {entity, id} = req.body;
    let uploadDir = null;
    if(!entity || !id) {
      uploadDir = path.join(__dirname, `../../${uploadFolder}`);
    } else {
      uploadDir = path.join(__dirname, `../../${uploadFolder}/${entity}-${id}`);
    }
    if(!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    };
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const {entity, id} = req.body;
    let uploadDir = null;
    if(!entity || !id) {
      uploadDir = path.join(__dirname, '../../uploads');
    } else {
      uploadDir = path.join(__dirname, `../../uploads/${entity}-${id}`);
    }
    const filePath = path.join(uploadDir, file.originalname);
    if(fs.existsSync(filePath)) {
      cb(ApiError.BadRequest('File already exists', filePath));
    } else {
      cb(null, file.originalname);
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(ApiError.BadRequest("Wrong image type"));
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
