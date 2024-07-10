const { validationResult } = require("express-validator");
const ApiError = require("../middlewares/exceptions/api-errors.cjs");

module.exports = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(ApiError.BadRequest("Validation error", errors.array()));
  }
  next();
};
