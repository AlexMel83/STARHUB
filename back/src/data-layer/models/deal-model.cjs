const knex = require("./../../../config/knex.config.cjs");

const DealsTable = "deals";
const DealFields = [
  "id",
  "name",
  "price",
  "status",
  "customer_id",
  "created_at",
  "updated_at",
];

module.exports = {
  async getDealById(id, trx = knex) {
    try {
        const candidate = await knex(DealsTable)
        .select(DealFields)
        .where("id", "=", id)
        .first();
      return candidate ? candidate : null;
    } catch (error) {
      console.error(error);
      throw error;
    };
  },

  async getDealsByCustomerId(customer_id, trx = knex) {
    try {
        const response = await knex(DealsTable)
        .select(DealFields)
        .where({customer_id})
        .first();
      return response ? response : null;
    } catch (error) {
      console.error(error);
      throw error;
    };
  },

  async getAllDeals() {
    try {
        return await knex(DealsTable).select(DealFields);
    } catch (error) {
      console.error(error);
      throw error;
    };
  },

  async addDeal(payload, trx = knex) {
    try {
      return await trx(DealsTable).insert(payload).returning(DealFields);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },


  async editDeal(payload) {
    try {
      const [result] = await knex(DealsTable)
        .where({ id: payload.id })
        .update(payload)
        .returning(DealFields);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    };
  },

  async deleteDeal(id) {
    try {
      await knex(DealsTable).where({ id }).del();
      return { id };
    } catch (error) {
      console.error(error);
      throw error;
    };
  },
};
