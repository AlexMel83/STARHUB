const ApiError = require("../middlewares/exceptions/api-errors.cjs");

// eslint-disable-next-line no-unused-vars
module.exports = function (err, req, res, _) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Непередбачувана помилка" });
};
