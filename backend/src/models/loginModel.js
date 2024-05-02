const connectDb = require("../configs/db");

const loginSchema = {
  loginCustomer: (email, password, callback) => {
    connectDb.query(`SELECT FROM employee WHERE email = '${email}'`, callback);
  },
  findEmployee: (email, callback) => {
    connectDb.query(
      `SELECT * FROM employee WHERE email LIKE '${email}'`,
      callback
    );
  },
};

module.exports = loginSchema;
