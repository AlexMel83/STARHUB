const knex = require("./../../../config/knex.config.cjs");
const ApiError = require("../../middlewares/exceptions/api-errors.cjs");

class SneakersController {
  async getSneakers(req, res, next) {
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
      return next(ApiError.IntServError(error));
    }
  }

  async getFavoriteSneakers(req, res, next) {
    const user_id = req.user.id;
    const sneakers_id = req.itemId;
    let query = knex("sneakers");
    try {
      query = query.where({ user_id }).where({ sneakers_id });
      const response = await query;
      res.json(response);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async addFavoriteSneakers(req, res, next) {
    const user_id = req.user.id;
    const sneakers_id = req.itemId;
    let query = knex("sneakers");
    try {
      query = query.insert({ user_id, sneakers_id });
      const response = await query;
      res.json(response);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async removeFavoriteSneakers(req, res, next) {
    const user_id = req.user.id;
    const sneakers_id = req.itemId;
    let query = knex("sneakers");
    try {
      query = query.where({ user_id }).where({ sneakers_id });
      const response = await query.del();
      res.json(response);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }
}

module.exports = new SneakersController();