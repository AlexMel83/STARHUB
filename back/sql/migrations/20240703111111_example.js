/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await trx.schema.createTable("users", function (table) {
        table.increments("id").primary().notNullable();
        table.string("email", 100).notNullable().unique().index();
        table.string("password", 100).notNullable();
        table.string("role", 50).defaultTo("user").notNullable();
        table.string("name", 50).nullable();
        table.string("surname", 50).nullable();
        table.string("phone", 50).nullable();
        table.boolean("social_login").defaultTo("false").nullable();
        table.string("facebook_id").unique().nullable();
        table.string("google_id").unique().nullable();
        table.text("picture").nullable();
        table.string("activationlink", 255).nullable().index();
        table.boolean("isactivated").defaultTo("false").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function (knex) {
    const trx = await knex.transaction();
    try {
      await trx.schema.dropTableIfExists("users");
  
      await trx.commit();
    } catch (error) {
      await trx.rollback();
      throw Error({
        error: error,
        message: "Migration for removing tables failed",
      });
    }
  };