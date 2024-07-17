const customerController = require("../controllers/customer-controller.cjs");
const { body, query } = require("express-validator");
const authMiddleware = require("../../middlewares/auth-middleware.cjs");
const validateMiddleware = require("../../middlewares/validate-middleware.cjs");
const upload = require("../../middlewares/upload.cjs");
const path = require("path");

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
    query("id").optional({ checkFalsy: true }).isNumeric().withMessage('Поле "id" має бути числом'),
    customerController.getCustomers,
  );

  app.post(
    "/customers", 
    validateCustomer, 
    validateMiddleware, 
    upload.single('avatar_url'),
    customerController.addCustomer
  );

  app.put(
    "/customers", 
    validateCustomer,
    body("id").notEmpty().withMessage("Id is required"),
    validateMiddleware, 
    customerController.editCustomer
  );

  app.delete(
    "/customers",
    authMiddleware,
    query("id").notEmpty().withMessage("Id is required"),
    validateMiddleware,
   customerController.deleteCustomer,
  );

  app.post('/upload',
    upload.single('file'), 
    (req, res, next) => {
      const {id, entity} = req.body;
      let uploadDir = null;
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
      if (!id || !entity) {
        uploadDir = path.join(__dirname, `../../uploads/`);
      } else {
        uploadDir = path.join(__dirname, `../../uploads/${entity}-${id}`);
      }
      const filePath = path.relative(path.join(__dirname, '../..'), path.join(uploadDir, req.file.filename));

      res.status(200).json({
        message: 'Upload success',
        filePath: filePath,
      });
  });
};
