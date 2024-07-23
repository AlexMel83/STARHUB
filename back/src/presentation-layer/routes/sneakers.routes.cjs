const knex = require("./../../../config/knex.config.cjs");
const { body, query } = require("express-validator");
const authMiddleware = require("../../middlewares/auth-middleware.cjs");
const validateMiddleware = require("../../middlewares/validate-middleware.cjs");

module.exports = function (app) {
  app.get("/sneakers", async (req, res) => {
    let sneakers = [];
    try {
      if (req?.query?.price) {
        sneakers = await knex("sneakers").where("price", "=", req.query.price);
      } else if (req?.query?.title) {
        sneakers = await knex("sneakers").where(
          "title",
          "like",
          `%${req.query.title}%`,
        );
      } else if (req?.query?.sortBy) {
        let sortBy = req.query.sortBy;
        if (sortBy === "price") {
          sneakers = await knex("sneakers").orderBy("price");
        } else if (sortBy === "-price") {
          sneakers = await knex("sneakers").orderBy("price", "desc");
        } else if (sortBy === "title") {
          sneakers = await knex("sneakers").orderBy("title");
        }
      } else {
        sneakers = await knex("sneakers");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch sneakers" });
    }
    res.json(sneakers);
  });
};
