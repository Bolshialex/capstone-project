const connectDb = require("../configs/db");

const employeeSchemas = {
  getAllUsers: (callback) => {
    connectDb.query("SELECT * FROM employee", callback);
  },
  getEmployeeById: (employeeId, callback) => {
    const query = "SELECT * FROM employee WHERE id = ?";
    const values = [employeeId];
    connectDb.query(query, values, callback);
  },
  createEmployee: (registrationInfo, hashedPassword, callback) => {
    const query =
      "INSERT INTO employee (first_name, last_name, user_name, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [...registrationInfo, hashedPassword];
    connectDb.query(query, values, callback);
  },
  updateEmployee: (callback) => {
    //Leave update for later
  },
  deleteEmployee: (employeeId, callback) => {
    const query = "DELETE FROM employee WHERE id = ?";
    const values = [employeeId];
    connectDb.query(query, values, callback);
  },
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

module.exports = employeeSchemas;
