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
    try {
      const favoriteSneakers = await knex("sneakers")
        .join(
          "favorite_sneakers",
          "sneakers.id",
          "=",
          "favorite_sneakers.sneakers_id",
        )
        .where("favorite_sneakers.user_id", user_id)
        .select("sneakers.*");

      res.json(favoriteSneakers);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async addFavoriteSneakers(req, res, next) {
    const user_id = req.user.id;
    const sneakers_id = req.query.id;
    let query = knex("favorite_sneakers");
    try {
      query = query.insert({ user_id, sneakers_id });
      const response = await query;
      res.json(response);
    } catch (error) {
      if (error.code === "23505") {
        res.json("sneakers already exist in favorite_sneakers");
      }
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async removeFavoriteSneakers(req, res, next) {
    const user_id = req.user.id;
    const sneakers_id = req.query.id;
    let query = knex("favorite_sneakers");
    try {
      query = query.where({ user_id }).where({ sneakers_id });
      const response = await query.del();
      res.json(response);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async getOrderSneakers(req, res, next) {
    const user_id = req.user.id;
    const order_id = req.query.id;

    try {
      let query = knex("orders")
        .join("order_items", "orders.id", "=", "order_items.order_id")
        .join("sneakers", "order_items.sneakers_id", "=", "sneakers.id")
        .where("orders.user_id", user_id)
        .select(
          "orders.id as order_id",
          "orders.created_at",
          "orders.updated_at",
          "sneakers.id as sneakers_id",
          "sneakers.title",
          "sneakers.imageUrl",
          "order_items.price as order_price",
        );

      if (order_id) {
        query = query.andWhere("orders.id", order_id);
      }

      const rawOrderSneakers = await query;

      // Group by orders
      const groupedOrders = rawOrderSneakers.reduce((acc, item) => {
        const order = acc.find((o) => o.order_id === item.order_id);
        if (order) {
          order.sneakers.push({
            sneakers_id: item.sneakers_id,
            title: item.title,
            imageUrl: item.imageUrl,
            order_price: item.order_price,
            quantity: item.quantity,
          });
        } else {
          acc.push({
            order_id: item.order_id,
            created_at: item.created_at,
            updated_at: item.updated_at,
            sneakers: [
              {
                sneakers_id: item.sneakers_id,
                title: item.title,
                imageUrl: item.imageUrl,
                order_price: item.order_price,
                quantity: item.quantity,
              },
            ],
          });
        }
        return acc;
      }, []);

      res.json(groupedOrders);
    } catch (error) {
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async createOrder(req, res, next) {
    const user_id = req.user.id;
    const { sneakers } = req.body;
    if (!user_id || !sneakers || !Array.isArray(sneakers)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const trx = await knex.transaction();
    try {
      const [order_id] = await trx("orders")
        .insert({ user_id })
        .returning("id");

      const orderItems = sneakers.map((sneaker) => {
        return {
          order_id: order_id.id,
          sneakers_id: sneaker.id,
          price: sneaker.price,
          quantity: sneaker?.quantity ? parseInt(sneaker.quantity, 10) : 1,
        };
      });
      await trx("order_items").insert(orderItems);

      await trx.commit();

      res.status(201).json({ message: "Order created successfully", order_id });
    } catch (error) {
      await trx.rollback();
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async editOrder(req, res, next) {
    const { order_id } = req.params;
    const { user_id, sneakers } = req.body; // Предполагается, что в теле запроса есть user_id и массив sneakers

    if (!order_id || !user_id || !sneakers || !Array.isArray(sneakers)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const trx = await knex.transaction();
    try {
      await trx("orders").where({ id: order_id }).update({ user_id });

      await trx("order_items").where({ order_id }).del();

      const orderItems = sneakers.map((sneaker) => ({
        order_id,
        sneakers_id: sneaker.id,
        price: sneaker.price,
        quantity: sneaker.quantity,
      }));
      await trx("order_items").insert(orderItems);

      await trx.commit();

      res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
      await trx.rollback();
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }

  async deleteOrder(req, res, next) {
    const { order_id } = req.params;

    if (!order_id) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const trx = await knex.transaction();
    try {
      await trx("order_items").where({ order_id }).del();

      await trx("orders").where({ id: order_id }).del();

      await trx.commit();

      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      await trx.rollback();
      console.error(error);
      return next(ApiError.IntServError(error));
    }
  }
}

module.exports = new SneakersController();
