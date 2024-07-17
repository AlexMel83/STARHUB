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
  "image/x-icon",
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
      uploadDir = path.join(__dirname, `../../${uploadFolder}`);
    } else {
      uploadDir = path.join(__dirname, `../../${uploadFolder}/${entity}-${id}`);
    }
    const filePath = path.join(uploadDir, fileName);
    if (fs.existsSync(filePath)) {
      const relativePath = path.relative(path.join(__dirname, '../..'), filePath);
      req.fileExists = true;
      req.existingFilePath = relativePath.replace(/\\/g, '/');
      cb(null, fileName);
    } else {
      cb(null, fileName);
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(ApiError.BadRequest("Wrong image type"));
  };
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

// Создаем middleware функцию
const uploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(ApiError.BadRequest(err.message));
    } else if (err) {
      return next(ApiError.BadRequest(err.message));
    }
    if (!req.file && !req.fileExists) {
      return next(ApiError.BadRequest('No file uploaded'));
    }
    const {entity, id} = req.body;
    let uploadDir = null;
    if (!id || !entity) {
      uploadDir = '/uploads/';
    } else {
      uploadDir = `/uploads/${entity}-${id}/`;
    }
    let filePath, fileUrl;
    if (req.fileExists) {
      filePath = req.existingFilePath;
    } else {
      filePath = uploadDir + req.file.filename;
    }
    filePath = filePath.replace(/^\//, '');
    fileUrl = `${req.protocol}://${req.get('host')}/${filePath}`;
    res.locals.uploadedFile = {
      url: fileUrl,
      path: filePath,
      filename: req.file ? req.file.filename : path.basename(filePath),
      mimetype: req.file ? req.file.mimetype : null,
      size: req.file ? req.file.size : null,
      message: req.fileExists ? 'File already exists' : 'File uploaded successfully'
    };
    next();
  });
};

module.exports = uploadMiddleware;