/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const trx = await knex.transaction();
  try {
    await trx.schema.createTable("housings", function (table) {
      table.increments("id").primary().notNullable().unique();
      table.string("housing_name");
      table.string("address").notNullable();
      table.string("formatted_address");
      table.specificType("location", "geography(POINT, 4326)").nullable();
      table.text("housing_photo");
      table.text("description");
      table.integer("room_number").notNullable();
      table.integer("area").notNullable();
      table.integer("area_housing");
      table.integer("area_kitchen");
      table.integer("floor");
      table.integer("floors");
      table.text("advantages");
      table.integer("year_built");
      table.integer("rental_price").notNullable();
      table.text("features_planning");
      table.string("wall_type");
      table.string("heating");
      table.string("offer_type");
      table.string("lease_conditions");
      table.string("status").notNullable();
      table.boolean("published").notNullable().defaultTo(false);
      table.integer("owner");
      table.integer("tenant");
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
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
    await trx.schema.dropTableIfExists("housings");

    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw new Error(`Migration rollback failed: ${error.message}`);
  }
};
