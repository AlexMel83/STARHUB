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
    await trx.schema.dropTableIfExists("sneakers");
    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw new Error(`Migration rollback failed: ${error.message}`);
  }
};
