const dealController = require("../controllers/deal-controller.cjs");
const { body, param, query } = require("express-validator");
const authMiddleware = require("../../middlewares/auth-middleware.cjs");
const validateMiddleware = require("../../middlewares/validate-middleware.cjs");
const ApiError = require("../../middlewares/exceptions/api-errors.cjs");

const validateDeal = [
  body("id")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Поле "id" має бути числом'),
  body("name")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Поле "name" має бути рядком'),
  body("price")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Поле "price" має бути числом'),
  body("status")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Поле "status" має бути рядком'),
  body("customer_id")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Поле "customer_id" має бути числом'),
  body("customer_name")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Поле "name" має бути рядком'),
  body("customer_email")
    .optional({ checkFalsy: true })
    .isEmail()
    .isAscii()
    .withMessage('Поле "customer_email" має формат email@email.ua'),
];

module.exports = function (app) {
  app.get(
    "/deals",
    query("id")
      .optional({ checkFalsy: true })
      .isNumeric()
      .withMessage('Поле "id" має бути числом'),
    query("customer_id")
      .optional({ checkFalsy: true })
      .isNumeric()
      .withMessage('Поле "customer_id" має бути числом'),
    dealController.getDeals,
  );

  app.post("/deals", validateDeal, validateMiddleware, dealController.addDeal);

  app.put(
    "/deals",
    validateDeal,
    body("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
    dealController.editDeal,
  );

  app.delete(
    "/deals",
    authMiddleware,
    query("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
    dealController.deleteDeal,
  );
};
