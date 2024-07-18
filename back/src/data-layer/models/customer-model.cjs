const knex = require("./../../../config/knex.config.cjs");

const CustomersTable = "customers";
const CustomerFields = [
  "id",
  "name",
  "email",
  "avatar_url",
  "from_source",
  "created_at",
  "updated_at",
];

module.exports = {
  async getCustomerById(id, trx = knex) {
    try {
      const candidate = await trx(CustomersTable)
        .select(CustomerFields)
        .where({ id })
        .first();
      return candidate ? candidate : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getCustomerByName(name, trx = knex) {
    try {
      const candidate = await trx(CustomersTable)
        .select(CustomerFields)
        .where({ name })
        .first();
      return candidate ? candidate : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getCustomerByEmail(email, trx = knex) {
    try {
      const candidate = await trx(CustomersTable)
        .select(CustomerFields)
        .where({ email })
        .first();
      return candidate ? candidate : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getAllCustomers() {
    try {
      return await knex(CustomersTable).select(CustomerFields);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async addCustomer(payload, trx = knex) {
    try {
      return await trx(CustomersTable)
        .insert(payload)
        .returning(CustomerFields);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async editCustomer(payload, trx = knex) {
    try {
      const [result] = await trx(CustomersTable)
        .where({ id: payload.id })
        .update(payload)
        .returning(CustomerFields);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async deleteCustomer(id) {
    try {
      await knex(CustomersTable).where({ id }).del();
      return { id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
