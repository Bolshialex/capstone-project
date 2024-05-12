const connectDb = require("../configs/db");

const loginSchema = {
  loginCustomer: (email, password, callback) => {
    connectDb.query(`SELECT FROM employee WHERE email = '${email}'`, callback);
  },
  findEmployee: (email, callback) => {
    if (!validateEmail(email)) {
      callback(new Error("Invalid email format"));
      return;
    }

    connectDb.query(
      "SELECT * FROM employee WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          callback(error);
          return;
        }

        if (results.length === 0) {
          callback(new Error("Employee not found"));
          return;
        }

        // Successful query
        callback(null, results[0]);
      }
    );
  },
};

module.exports = loginSchema;
