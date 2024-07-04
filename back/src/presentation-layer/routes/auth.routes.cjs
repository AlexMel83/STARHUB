const userController = require("../controllers/user-controller.cjs");
const socialLoginService = require("../../services/social-login-service.cjs");
const { body, param, query } = require("express-validator");
const authMiddleware = require("../../middlewares/auth-middleware.cjs");
const phoneRegex = /^380\d{9}$/;
const validateMiddleware = require("../../middlewares/validate-middleware.cjs");
const ApiError = require("../../exceptions/api-errors.cjs");

const validateUser = [
  body("email")
    .notEmpty()
    .isEmail()
    .isAscii()
    .withMessage('Поле "email" має формат email@email.ua'),
  body("password")
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ min: 4, max: 32 }),
  body("name")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Поле "name" має бути рядком'),
  body("surname")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Поле "surname" має бути рядком'),
  body("phone")
    .optional({ checkFalsy: true })
    .matches(phoneRegex)
    .withMessage('Поле "phone" має формат 3801234567'),
  body("role")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Поле "role" має бути рядком'),
];

module.exports = function (app) {
  app.post(
    "/registration",
    validateUser,
    validateMiddleware,
    userController.registration,
  );

  app.post("/login", validateUser, validateMiddleware, userController.login);

  app.post("/logout", userController.logout);
  app.get("/activate/:link", userController.activate);
  app.get("/refresh", userController.refresh);
  app.get(
    "/users",
    authMiddleware,
    // query("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
    userController.getUser,
  );

  app.put(
    "/users",
    authMiddleware,
    validateUser,
    body("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
    userController.editUser,
  );

  app.delete(
    "/users/:user_id",
    authMiddleware,
    param("user_id").exists().isNumeric(),
    validateMiddleware,
    userController.deleteUser,
  );

  app.get("/social-login/:provider", async (req, res, next) => {
    try {
      const provider = req.params.provider;
      const { url, codeVerifier } =
        await socialLoginService.generateAuthUrl(provider);
      req.session.codeVerifier = codeVerifier;
      res.json({ url });
    } catch (e) {
      next(e);
    }
  });

  app.get("/social-login/:provider/callback", async (req, res) => {
    const provider = req.params.provider;
    const code = req.query.code;
    const codeVerifier = req.session.codeVerifier;
    if (!code || !codeVerifier) {
      return res.json(ApiError.BadRequest("Invalid code or code verifier"));
    }
    await socialLoginService.handleCallback(provider, code, codeVerifier, res);
  });

  app.post("/auth-user/:link", async (req, res) => {
    const authLink = req.params.link;
    await socialLoginService.getAuthUser(authLink, res);
  });
};
