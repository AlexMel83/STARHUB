require("dotenv").config({
  path: "./../../.env",
});

/**
 * @type {Object.<string, import('knex').Knex.Config>}
 */
console.log("Loaded environment variables:");
console.log(`POSTGRES_HOST: ${process.env.POSTGRES_HOST}`);
console.log(`POSTGRES_PORT: ${process.env.POSTGRES_PORT}`);
console.log(`POSTGRES_USER: ${process.env.POSTGRES_USER}`);
console.log(
  `POSTGRES_PASSWORD: ${process.env.POSTGRES_PASSWORD ? "****" : "undefined"}`,
);
console.log(`POSTGRES_DB: ${process.env.POSTGRES_DB}`);
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      debug: true,
    },
    pool: { min: 0, max: 7 },
    seeds: {
      directory: "./seeds/development",
    },
  },
};
