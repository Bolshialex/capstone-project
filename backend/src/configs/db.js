const mysql = require("mysql2");

//make async
const connectDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "alex123",
  database: "capstonedb",
});

module.exports = connectDb;
