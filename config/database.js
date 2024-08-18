
const pg = require('pg'); // Imports PostgreSQL client library for interacting with PostgreSQL databases.
const Pool = pg.Pool; //Extracts the Pool constructor from the pg module for creating a connection pool to a PostgreSQL database.

// Create a connection pool to a PostgreSQL database
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'nodejsdb',
    password: process.env.DB_PASSWORD || 'newpassword',
    port: process.env.DB_PORT || 5432,
  });

  pool.on('connect', () => {
    console.log('Database connection established successfully.');
  });

module.exports = pool;