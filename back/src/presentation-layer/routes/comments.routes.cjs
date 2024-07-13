const commentController = require("../controllers/comment-controller.cjs");
const { body, param, query } = require("express-validator");
const authMiddleware = require("../../middlewares/auth-middleware.cjs");
const validateMiddleware = require("../../middlewares/validate-middleware.cjs");
const ApiError = require("../../middlewares/exceptions/api-errors.cjs");

const validateComment = [
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
  body("avatar_url")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Поле "avatar_url" має бути рядком'),
  body("from_source")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Поле "from_source" має бути рядком'),
];

module.exports = function (app) {
  app.get(
    "/comments",
    query("id").optional({ checkFalsy: true }).isNumeric().withMessage('Поле "id" має бути числом'),
    commentController.getComment,
  );

  app.post(
    "/comments", 
    validateComment, 
    validateMiddleware, 
    commentController.addComment
  );

  app.put(
    "/comments", 
    validateComment,
    body("id").notEmpty().withMessage("Id is required"),
    validateMiddleware, 
    commentController.editComment
  );

  app.delete(
    "/comments",
    authMiddleware,
    query("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
   commentController.deleteComment,
  );
};
