const customerController = require("../controllers/customer-controller.cjs");
const { body, query } = require("express-validator");
const authMiddleware = require("../../middlewares/auth-middleware.cjs");
const validateMiddleware = require("../../middlewares/validate-middleware.cjs");
const uploadMiddleware = require("../../middlewares/upload.cjs");

const validateCustomer = [
  body("id")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Поле "id" має бути числом'),
  body("name")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Поле "name" має бути рядком'),
  body("email")
    .notEmpty()
    .isEmail()
    .isAscii()
    .withMessage('Поле "email" має формат email@email.ua'),
  body("from_source")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Поле "from_source" має бути рядком'),
];

module.exports = function (app) {
  app.get(
    "/customers",
    query("id")
      .optional({ checkFalsy: true })
      .isNumeric()
      .withMessage('Поле "id" має бути числом'),
    customerController.getCustomers,
  );

  app.post(
    "/customers",
    validateCustomer,
    validateMiddleware,
    uploadMiddleware,
    customerController.addCustomer,
  );

  app.put(
    "/customers",
    validateCustomer,
    body("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
    customerController.editCustomer,
  );

  app.delete(
    "/customers",
    authMiddleware,
    query("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
    customerController.deleteCustomer,
  );
};
