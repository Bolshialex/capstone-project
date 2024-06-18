const connectDb = require("../configs/db");

const employeeSchemas = {
  //gets all employees
  getAllUsers: (callback) => {
    connectDb.query("SELECT * FROM employee", callback);
  },
  //gets an employee by id
  getEmployeeById: (employeeId, callback) => {
    const query = "SELECT * FROM employee WHERE id = ?";
    const values = [employeeId];
    connectDb.query(query, values, callback);
  },
  //creates an employee
  createEmployee: (registrationInfo, hashedPassword, callback) => {
    const query =
      "INSERT INTO employee (first_name, last_name, user_name, phone, email, is_admin, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [...registrationInfo, hashedPassword];
    connectDb.query(query, values, callback);
  },
  //updates an employee
  updateEmployee: (employeeId, employeeInfo, callback) => {
    const query = `UPDATE employee SET first_name = ?, last_name = ?, user_name = ?, phone = ?, email = ?, is_admin = ? WHERE id = ?`;
    const values = [
      employeeInfo.first_name,
      employeeInfo.last_name,
      employeeInfo.user_name,
      employeeInfo.phone,
      employeeInfo.email,
      employeeInfo.is_admin,
      employeeId,
    ];
    connectDb.query(query, values, callback);
  },
  //deletes an employee
  deleteEmployee: (employeeId, callback) => {
    const deleteQuery = "UPDATE employee SET is_active = 0 WHERE id = ?";
    const updateQuery =
      "UPDATE customer SET assigned_agent = null WHERE assigned_agent = ?";
    const deleteValues = [employeeId];
    const updateValues = [employeeId];
    connectDb.query(deleteQuery, deleteValues, (deleteErr, deleteResult) => {
      if (deleteErr) {
        return callback(deleteErr);
      }

      connectDb.query(updateQuery, updateValues, (updateErr, updateResult) => {
        if (updateErr) {
          return callback(updateErr);
        }

        callback(null, deleteResult);
      });
    });
  },
  //login an employee
  loginEmployee: (email, password, callback) => {
    const query = "SELECT * FROM employee WHERE email = ? AND password = ?";
    const values = [email, password];
    connectDb.query(query, values, callback);
  },
  //get employee by email
  getEmployeeByEmail: (email, callback) => {
    const query = "SELECT * FROM employee WHERE email LIKE ?";
    const values = [email];
    connectDb.query(query, values, callback);
  },
  getEmployeesByIdIn: (employeeId, callback) => {
    const query = "SELECT * FROM employee WHERE id IN (?)";
    const values = [employeeId];
    connectDb.query(query, values, callback);
  },
};

module.exports = employeeSchemas;
