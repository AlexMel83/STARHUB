const knex = require("./../../../config/knex.config.cjs");
const { body, query } = require("express-validator");
const authMiddleware = require("../../middlewares/auth-middleware.cjs");
const validateMiddleware = require("../../middlewares/validate-middleware.cjs");

module.exports = function (app) {
  app.get("/sneakers", async (req, res) => {
    try {
      const sneakers = await knex("sneakers");
      res.json(sneakers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch sneakers" });
    }
  });
};
