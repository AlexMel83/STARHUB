/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const trx = await knex.transaction();
  try {
    await trx.schema.createTable("sneakers", function (table) {
      table.increments("id").primary().notNullable();
      table.string("title", 100).nullable().index();
      table.integer("price", 100).nullable();
      table.string("imageUrl", 50).nullable();
    });
    await trx.schema.createTable("favorite_sneakers", function (table) {
      table.increments("id").primary().notNullable();
      table.integer("user_id").notNullable();
      table.integer("sneakers_id").notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .foreign("sneakers_id")
        .references("id")
        .inTable("sneakers")
        .onDelete("CASCADE");
      table.unique(["user_id", "sneakers_id"]);
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
    await trx.schema.dropTableIfExists("favorite_sneakers");
    await trx.schema.dropTableIfExists("sneakers");
    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw new Error(`Migration rollback failed: ${error.message}`);
  }
};
