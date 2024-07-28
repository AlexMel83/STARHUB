const { query, body } = require("express-validator");
const authMiddleware = require("../../middlewares/auth-middleware.cjs");
const validateMiddleware = require("../../middlewares/validate-middleware.cjs");
const sneakersController = require("../controllers/sneakers-controller.cjs");

const validateFavorite = [
  query("id")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Поле "id" має бути числом'),
  query("userId")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Поле "userId" має бути числом'),
  query("itemId")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Поле "itemId" має бути числом'),
];

const validateOrder = [
  body("sneakers").isArray().withMessage('Поле "sneakers" має бути масивом'),
  body("sneakers.*.id").isNumeric().withMessage('Поле "id" має бути числом'),
  body("sneakers.*.price")
    .isNumeric()
    .withMessage('Поле "price" має бути числом'),
  body("sneakers.*.quantity")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Поле "quantity" має бути числом'),
];

module.exports = function (app) {
  app.get("/sneakers", sneakersController.getSneakers);

  app.get(
    "/favoriteSneakers",
    authMiddleware,
    validateFavorite,
    validateMiddleware,
    sneakersController.getFavoriteSneakers,
  );

  app.post(
    "/favoriteSneakers",
    authMiddleware,
    query("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
    sneakersController.addFavoriteSneakers,
  );

  app.delete(
    "/favoriteSneakers",
    authMiddleware,
    query("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
    sneakersController.removeFavoriteSneakers,
  );

  app.get(
    "/orderSneakers",
    authMiddleware,
    validateMiddleware,
    sneakersController.getOrderSneakers,
  );

  app.post(
    "/orderSneakers",
    authMiddleware,
    validateOrder,
    validateMiddleware,
    sneakersController.createOrder,
  );

  app.put(
    "/orderSneakers",
    authMiddleware,
    query("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
    sneakersController.editOrder,
  );

  app.del(
    "/orderSneakers",
    authMiddleware,
    query("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
    sneakersController.deleteOrder,
  );
};
