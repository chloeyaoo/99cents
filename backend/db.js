// const { Pool } = require('pg');
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'appreciation',
//   // password: 'your_password',
//   port: 5432,
// });

// module.exports = pool;

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Use this to avoid SSL issues on Render
  },
});

module.exports = pool;
