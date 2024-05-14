const connectDb = require("../configs/db");

const loginSchema = {
  loginEmployee: (email, password, callback) => {
    const query = "SELECT * FROM employee WHERE email = ? AND password = ?";
    const values = [email, password];
    connectDb.query(query, values, callback);
  },
  getEmployeeByEmail: (email, callback) => {
    const query = "SELECT * FROM employee WHERE email LIKE ?";
    const values = [email];
    connectDb.query(query, values, callback);
  },
};

module.exports = loginSchema;
