const knex = require("./../../../config/knex.config.cjs");
const { body, query } = require("express-validator");
const authMiddleware = require("../../middlewares/auth-middleware.cjs");
const validateMiddleware = require("../../middlewares/validate-middleware.cjs");

module.exports = function (app) {
  app.get("/sneakers", async (req, res) => {
    let query = knex("sneakers");
    try {
      if (req.query.price) {
        query = query.where("price", "=", req.query.price);
      }
      if (req.query.title) {
        const searchTerm = decodeURIComponent(req.query.title);
        query = query.whereRaw("LOWER(title) LIKE LOWER(?)", [
          `%${searchTerm}%`,
        ]);
      }
      if (req.query.sortBy) {
        let sortBy = req.query.sortBy;
        if (sortBy === "price") {
          query = query.orderBy("price", "asc");
        } else if (sortBy === "-price") {
          query = query.orderBy("price", "desc");
        } else if (sortBy === "title") {
          query = query.orderBy("title", "asc");
        }
      }
      const sneakers = await query;
      res.json(sneakers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch sneakers" });
    }
  });
};
