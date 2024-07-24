const { query } = require("express-validator");
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
};
