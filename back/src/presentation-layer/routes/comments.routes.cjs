const commentController = require("../controllers/comment-controller.cjs");
const { body, query } = require("express-validator");
const authMiddleware = require("../../middlewares/auth-middleware.cjs");
const validateMiddleware = require("../../middlewares/validate-middleware.cjs");

const validateComment = [
  body("id")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Поле "id" має бути числом'),
  body("text")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Поле "text" має бути рядком'),
  body("deal_id")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Поле "deal_id" має бути числом'),
  body("user_id")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('Поле "user_id" має бути числом'),
];

module.exports = function (app) {
  app.get(
    "/comments",
    query("id")
      .optional({ checkFalsy: true })
      .isNumeric()
      .withMessage('Поле "id" має бути числом'),
    commentController.getComments,
  );

  app.post(
    "/comments",
    authMiddleware,
    validateComment,
    validateMiddleware,
    commentController.addComment,
  );

  app.put(
    "/comments",
    validateComment,
    body("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
    commentController.editComment,
  );

  app.delete(
    "/comments",
    authMiddleware,
    query("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
    commentController.deleteComment,
  );
};
