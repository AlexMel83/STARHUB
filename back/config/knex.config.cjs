const knex = require("knex");

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;
let db;

try {
  db = knex({
    client: "pg",
    connection: {
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
    },
  });

  // check connection to DB
  db.raw('SELECT 1')
    .then(() => {
      console.log('Connected to the database successfully!');
    })
    .catch((err) => {
      console.error('Failed to connect to the database:', err.message);
      if (err.code === 'ECONNREFUSED') {
        console.error('Connection refused. Please check your database server.');
      }
      // close connection
      db.destroy();
    });
} catch (error) {
  console.error('Error initializing database connection:', error.message);
  throw error;
}

module.exports = db;