const ApiError = require("../middlewares/exceptions/api-errors.cjs");

// eslint-disable-next-line no-unused-vars
module.exports = function (err, req, res, next) {
  console.error("Error middleware called with:", err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ status: err.status, message: err.message, errors: err.errors });
  }
  return res
    .status(500)
    .json({ status: 500, message: "Непередбачувана помилка" });
};
