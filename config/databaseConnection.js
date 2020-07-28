var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

var connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: "",
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

module.exports = connection;
