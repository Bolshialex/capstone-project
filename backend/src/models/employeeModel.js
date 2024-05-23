const connectDb = require("../configs/db");

const employeeSchemas = {
  //gets all employees
  //
  getAllUsers: (callback) => {
    connectDb.query("SELECT * FROM employee", callback);
  },
  //gets employee by id
  //
  getEmployeeById: (employeeId, callback) => {
    const query = "SELECT * FROM employee WHERE id = ?";
    const values = [employeeId];
    connectDb.query(query, values, callback);
  },
  //creates an employee
  //
  createEmployee: (registrationInfo, hashedPassword, callback) => {
    const query =
      "INSERT INTO employee (first_name, last_name, user_name, phone, email, is_admin, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [...registrationInfo, hashedPassword];
    connectDb.query(query, values, callback);
  },
  //updates an employee
  //
  updateEmployee: (callback) => {
    //Leave update for later
  },
  //deletes an employee
  //
  deleteEmployee: (employeeId, callback) => {
    const query = "DELETE FROM employee WHERE id = ?";
    const values = [employeeId];
    connectDb.query(query, values, callback);
  },
  //logs in an employee, might not need this
  //
  loginEmployee: (email, password, callback) => {
    const query = "SELECT * FROM employee WHERE email = ? AND password = ?";
    const values = [email, password];
    connectDb.query(query, values, callback);
  },
  //gets and employee by the email
  //
  getEmployeeByEmail: (email, callback) => {
    const query = "SELECT * FROM employee WHERE email LIKE ?";
    const values = [email];
    connectDb.query(query, values, callback);
  },
};

module.exports = employeeSchemas;
