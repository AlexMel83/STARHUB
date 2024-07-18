const knex = require("./../../../config/knex.config.cjs");
const customerModel = require("./customer-model.cjs");

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
      const deal = await trx(DealsTable)
        .select(DealFields)
        .where({ id })
        .first();
      if (deal) {
        deal.customer = await customerModel.getCustomerById(deal.customer_id);
      }
      return deal ? deal : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getDealsByCustomerId(customer_id, trx = knex) {
    try {
      const response = await trx(DealsTable)
        .select(DealFields)
        .where({ customer_id })
        .first();
      return response ? response : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getAllDeals(trx = knex) {
    try {
      const deals = await trx(DealsTable).select(DealFields);
      const dealsWithCustomers = await Promise.all(
        deals.map(async (deal) => {
          deal.customer = await customerModel.getCustomerById(deal.customer_id);
          return deal;
        }),
      );
      return dealsWithCustomers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async addDeal(payload, trx = knex) {
    try {
      return await trx(DealsTable).insert(payload).returning(DealFields);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async editDeal(payload, trx = knex) {
    try {
      const [result] = await trx(DealsTable)
        .where({ id: payload.id })
        .update(payload)
        .returning(DealFields);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async deleteDeal(id, trx = knex) {
    try {
      await trx(DealsTable).where({ id }).del();
      return { id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
