/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const trx = await knex.transaction();
  try {
    await trx.schema.createTable("users", function (table) {
      table.increments("id").primary().notNullable();
      table.string("email", 100).nullable().unique().index();
      table.string("password", 100).nullable();
      table.string("role", 50).defaultTo("user").notNullable();
      table.string("name", 50).nullable();
      table.string("surname", 50).nullable();
      table.string("phone", 50).nullable();
      table.boolean("social_login").defaultTo(false).nullable();
      table.string("facebook_id").unique().nullable();
      table.string("google_id").unique().nullable();
      table.text("picture").nullable();
      table.string("activationlink", 255).nullable().index();
      table.boolean("isactivated").defaultTo(false).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    });
    await trx.schema.createTable("tokens", function (table) {
      table.increments("id").primary().notNullable().unique();
      table.integer("user_id").notNullable().index();
      table.text("refreshtoken").notNullable().index();
      table.timestamp("exp_token").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    });
    await trx.schema.createTable("customers", function (table) {
      table.increments("id").primary().notNullable();
      table.string("name", 50).notNullable();
      table.string("email", 100).notNullable();
      table
        .string("avatar_url")
        .nullable()
        .defaultTo(
          "https://cloud.appwrite.io/v1/storage/buckets/storage/files/avatar/view?project=668181210001356c2833&mode=admin",
        );
      table.string("from_source", 100).nullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    });
    await trx.schema.createTable("deals", function (table) {
      table.increments("id").primary().notNullable();
      table.string("name", 50).notNullable();
      table.integer("price").notNullable();
      table
        .enu("status", [
          "todo",
          "to-be-agreed",
          "in-progress",
          "produced",
          "done",
        ])
        .notNullable()
        .defaultTo("todo");
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
      table.integer("customer_id").unsigned().notNullable();
      table
        .foreign("customer_id")
        .references("customers.id")
        .onDelete("CASCADE");
    });
    await trx.schema.createTable("comments", function (table) {
      table.increments("id").primary().notNullable();
      table.text("text").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
      table.integer("deal_id").notNullable();
      table.foreign("deal_id").references("deals.id").onDelete("CASCADE");
      table.integer("user_id").notNullable();
      table.foreign("user_id").references("users.id").onDelete("CASCADE");
    });
    await trx.commit();
  } catch (error) {
    console.error(error);
    await trx.rollback();
    throw Error("Failed migration");
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const trx = await knex.transaction();
  try {
    await trx.schema.dropTableIfExists("users");
    await trx.schema.dropTableIfExists("tokens");
    await trx.schema.dropTableIfExists("customers");
    await trx.schema.dropTableIfExists("deals");
    await trx.schema.dropTableIfExists("comments");
    await trx.commit();
  } catch (error) {
    throw Error({
      error: error,
      message: "Migration for removing tables failed",
    });
  }
};
