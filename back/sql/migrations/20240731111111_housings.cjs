/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const trx = await knex.transaction();
  try {
    await knex.schema.createTable("housings", function (table) {
      table.increments("id").primary().notNullable();
      table
        .enu("type", [
          "квартира",
          "будинок",
          "кімната",
          "гараж",
          "земельна ділянка",
          "комерційна нерухомість",
        ])
        .notNullable()
        .defaultTo("квартира");
      table.integer("room_number").notNullable();
      table.integer("floor").defaultTo(1);
      table.integer("floors").defaultTo(1);
      table.integer("area").notNullable();
      table.integer("area_housing");
      table.integer("area_kitchen");
      table
        .enu("status", [
          "здається",
          "продається",
          "забраньовано",
          "здано",
          "не опубліковано",
          "не актуально",
        ])
        .notNullable()
        .defaultTo("не опубліковано");
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
      table.index(["type", "status"]);
    });

    await knex.schema.createTable("housing_addresses", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table.string("address").notNullable();
      table.string("formatted_address");
      table.specificType("location", "geography(POINT, 4326)").nullable();
      table.string("residential_complex");
      table.string("state").notNullable();
      table.string("city").notNullable().index();
      table.string("strite").notNullable();
      table.string("building_number").notNullable();
      table.boolean("building_number_show");
      table.string("appartment_number");
      table.boolean("appartment_number_show");
      table.unique(["id", "housing_id"]);
    });

    await knex.schema.createTable("housing_details", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table.string("year_built");
      table.enu("wall_type", [
        "з цегли",
        "з силікатної цегли",
        "з панелей",
        "з піноблоку",
        "моноліт",
        "з ракушняку",
        "монолітно-цегяний",
        "монолітно-блоковий",
        "з дерева та цегли",
        "з газобетону",
        "з газоблоку",
        "з СІП",
        "з залізобетону",
        "з натурального брусу",
      ]);
      table.enu("repair", [
        "дизайнерський ремонт",
        "євроремонт",
        "хороший",
        "косметичний ремонт",
        "задовільний",
        "потребує ремонту/ремонт не завершений/без ремонту",
        "чорнова штукатурка",
        "без оздоблювальних робіт",
        "стиль loft",
      ]);
      table.enu("insulation", [
        "зовнішнє",
        "внутрішнє",
        "зовнішє і внутрішнє",
        "без утеплення",
      ]);
      table.enu("heating", [
        "централізоване",
        "автономна котельня",
        "індивідуальне газове",
        "індивідуальне електричне",
        "твердопаливний котел",
        "двоконтурний котел",
        "одноконтурний котел",
        "повітряне",
        "тепловий насос",
        "без опалення",
      ]);
      table.enu("hot_water", [
        "централізоване",
        "бойлер",
        "колонка",
        "котел",
        "не має",
      ]);
      table.integer("ceiling_height");
      table.boolean("elevator");
      table.boolean("bomb_shelter");
      table.boolean("furnished");
      table.boolean("refrigerator");
      table.boolean("washer");
      table.boolean("microwave");
      table.boolean("gas");
      table.boolean("internet");
      table.boolean("tv");
      table.boolean("air_conditioning");
      table.boolean("dishwasher");
      table.boolean("bath");
      table.boolean("garage");
      table.string("utilities");
      table.string("view");
      table.string("description");
      table.string("offer_type");
      table.string("lease_conditions");
      table.unique(["id", "housing_id"]);
    });

    await knex.schema.createTable("housing_conditions", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table.boolean("no_smoking");
      table.boolean("no_children");
      table.boolean("for_children");
      table.boolean("no_pets");
      table.boolean("with_pets");
      table.boolean("maybe_one_month");
      table.unique(["id", "housing_id"]);
    });

    await knex.schema.createTable(
      "housing_when_no_electricity",
      function (table) {
        table.increments("id").primary().notNullable();
        table
          .integer("housing_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("housings")
          .onDelete("CASCADE");
        table.boolean("gas_works");
        table.boolean("backup_power");
        table.boolean("heating_works");
        table.boolean("water_supply");
        table.boolean("elevator_works");
        table.boolean("internet_works");
        table.unique(["id", "housing_id"]);
      },
    );

    await knex.schema.createTable(
      "housing_planning_features",
      function (table) {
        table.increments("id").primary().notNullable();
        table
          .integer("housing_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("housings")
          .onDelete("CASCADE");
        table.enu("bathroom", [
          "роздільний санвузол",
          "суміжний санвузол",
          "2 санвузли",
          "3 санвузли",
          "більше 3 санвузлів",
        ]);
        table.boolean("panoramic_windows");
        table.boolean("with_terrace");
        table.boolean("floor_heating");
        table.boolean("kitchen_studio");
        table.boolean("multi_level");
        table.boolean("with_mansard");
        table.boolean("balcony_loggia");
        table.boolean("penthouse");
        table.unique(["id", "housing_id"]);
      },
    );

    await knex.schema.createTable("housing_infrastructures", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table.string("transport");
      table.string("school");
      table.string("parking");
      table.string("hospital");
      table.string("store");
      table.string("recreation");
      table.string("other");
      table.unique(["id", "housing_id"]);
    });

    await knex.schema.createTable("housing_security", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table.boolean("alarm");
      table.boolean("code_lock");
      table.boolean("intercom");
      table.boolean("video_intercom");
      table.boolean("CCTV_floor");
      table.boolean("CCTV_territory");
      table.boolean("fire_protection");
      table.boolean("bars_windows");
      table.boolean("window_protective_shutters");
      table.boolean("door_protective_shutters");
      table.boolean("armored_door");
      table.boolean("guard");
      table.boolean("concierge");
      table.unique(["id", "housing_id"]);
    });

    await knex.schema.createTable("housing_photos", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table.text("photo_url").notNullable();
      table.string("description");
    });

    await knex.schema.createTable("housing_owners", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    });

    await knex.schema.createTable(
      "housing_owners_representatives",
      function (table) {
        table.increments("id").primary().notNullable();
        table
          .integer("housing_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("housings")
          .onDelete("CASCADE");
        table
          .integer("user_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
      },
    );

    await knex.schema.createTable("housing_tenants", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    });

    await knex.schema.createTable("housing_leases", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table
        .integer("owner_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table
        .integer("tenant_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table.date("start_date").notNullable();
      table.date("end_date").nullable();
      table.text("lease_terms").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    });

    await knex.schema.createTable("housing_price_history", function (table) {
      table.increments("id").primary();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table.decimal("rental_price", 10, 2).notNullable();
      table.enu("currency", ["UAH", "USD", "EUR"]).notNullable();
      table.string("comment");
      table.timestamp("changed_at").defaultTo(knex.fn.now()).notNullable();
    });

    await knex.schema.createTable("housing_messages", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.text("content").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    });

    await knex.schema.createTable("housing_reservations", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamp("start_date").notNullable();
      table.timestamp("end_date").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    });

    await knex.schema.createTable("housing_reviews", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.integer("rating").notNullable();
      table.text("comment").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    });

    await knex.schema.createTable("housing_advertisements", function (table) {
      table.increments("id").primary().notNullable();
      table
        .integer("housing_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("housings")
        .onDelete("CASCADE");
      table.string("platform").notNullable();
      table.string("url").notNullable();
      table.text("comment").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
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
    await trx.schema.dropTableIfExists("housing_addresses");
    await trx.schema.dropTableIfExists("housing_details");
    await trx.schema.dropTableIfExists("housing_infrastructures");
    await trx.schema.dropTableIfExists("housing_photos");
    await trx.schema.dropTableIfExists("housing_owners");
    await trx.schema.dropTableIfExists("housing_owners_representatives");
    await trx.schema.dropTableIfExists("housing_tenants");
    await trx.schema.dropTableIfExists("housing_leases");
    await trx.schema.dropTableIfExists("housing_messages");
    await trx.schema.dropTableIfExists("housing_reservations");
    await trx.schema.dropTableIfExists("housing_reviews");
    await trx.schema.dropTableIfExists("housing_price_history");
    await trx.schema.dropTableIfExists("housings");

    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw new Error(`Migration rollback failed: ${error.message}`);
  }
};
