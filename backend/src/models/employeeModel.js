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
