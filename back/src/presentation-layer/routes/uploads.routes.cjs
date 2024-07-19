const { body, query } = require("express-validator");
const authMiddleware = require("../../middlewares/auth-middleware.cjs");
const validateMiddleware = require("../../middlewares/validate-middleware.cjs");
const uploadMiddleware = require("../../middlewares/upload.cjs");
const fs = require("fs").promises;
const path = require("path");
const ApiError = require("../../middlewares/exceptions/api-errors.cjs");

const BASE_PATH = path.resolve(__dirname, "..", "..", "..", "..");

async function deleteFile(filePath) {
  const fullPath = path.join(BASE_PATH, filePath);
  try {
    await fs.unlink(fullPath);
    console.error(`Successfully deleted ${fullPath}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`File ${fullPath} doesn't exist, skipping delete.`);
    } else {
      console.error(`Error deleting file ${fullPath}:`, error);
      throw error;
    }
  }
}

module.exports = function (app) {
  app.post("/upload", uploadMiddleware, (req, res) => {
    const fileInfo = res.locals.uploadedFile;
    res.status(200).json({
      message: fileInfo.message,
      file: fileInfo,
    });
  });

  app.delete("/delete-file", async (req, res) => {
    const { filePath } = req.body;
    try {
      await deleteFile(filePath);
      res.status(200).json({ message: "File successfully deleted" });
    } catch (error) {
      console.error("Error in delete-file route:", error);
      res
        .status(500)
        .json({ error: "Failed to delete file", details: error.message });
    }
  });
};
