const knex = require("./../../../config/knex.config.cjs");

const CommentsTable = "comments";
const CommentFields = [
  "id",
  "text",
  "user_id",
  "deal_id",
  "created_at",
  "updated_at",
];

module.exports = {
  async getCommentById(id, trx = knex) {
    try {
        const candidate = await trx(CommentsTable)
        .select(CommentFields)
        .where({id})
        .first();
      return candidate ? candidate : null;
    } catch (error) {
      console.error(error);
      throw error;
    };
  },

  async getCommentByDealId(deal_id, trx = knex) {
    try {
        const candidate = await trx(CommentsTable)
        .select(CommentFields)
        .where({deal_id})
        .first();
      return candidate ? candidate : null;
    } catch (error) {
      console.error(error);
      throw error;
    };
  },

  async getCustomerByUserId(user_id, trx = knex) {
    try {
        const candidate = await trx(CommentsTable)
        .select(CommentFields)
        .where({user_id})
        .first();
      return candidate ? candidate : null;
    } catch (error) {
      console.error(error);
      throw error;
    };
  },

  async getAllComments() {
    try {
        return await knex(CommentsTable).select(CommentFields);
    } catch (error) {
      console.error(error);
      throw error;
    };
  },

  async addComment(payload, trx = knex) {
    try {
      return await trx(CommentsTable).insert(payload).returning(CommentFields);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },


  async editComment(payload, trx=knex) {
    try {
      const [result] = await trx(CommentsTable)
        .where({ id: payload.id })
        .update(payload)
        .returning(CommentFields);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    };
  },

  async deleteComment(id, trx=knex) {
    try {
      await trx(CustomersTable).where({ id }).del();
      return { id };
    } catch (error) {
      console.error(error);
      throw error;
    };
  },
};
