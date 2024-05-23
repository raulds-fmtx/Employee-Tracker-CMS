const { Pool } = require("pg");

// Create connection to employee_db
const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "employee_db",
  password: "password",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
