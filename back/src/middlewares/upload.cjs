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
    const fileName = file.originalname;
    let uploadDir = null;
    if(!entity || !id) {
      uploadDir = path.join(__dirname, '../../uploads');
    } else {
      uploadDir = path.join(__dirname, `../../uploads/${entity}-${id}`);
    }
    const filePath = path.join(uploadDir, fileName);
    if (fs.existsSync(filePath)) {
      const relativePath = path.relative(path.join(__dirname, '../..'), filePath);
      req.fileExists = true;
      req.existingFilePath = relativePath.replace(/\\/g, '/');
      const extension = path.extname(fileName);
      const baseName = path.basename(fileName, extension);
      const newFileName = `${baseName}_${Date.now()}${extension}`;
      cb(null, newFileName);
    } else {
      cb(null, fileName);
    }
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
