const connectDb = require("../configs/db");

const employeeSchemas = {
  getAllUsers: (callback) => {
    connectDb.query("SELECT * FROM employee", callback);
  },
  getEmployeeById: (employeeId, callback) => {
    connectDb.query(
      `SELECT * FROM employee WHERE id = ${employeeId}`,
      callback
    );
  },
  createEmployee: (employee, callback) => {
    connectDb.query(
      `INSERT INTO employee (first_name, last_name, user_name, phone, email, password) VALUES ('${employee[0]}', '${employee[1]}', '${employee[2]}', '${employee[3]}', '${employee[4]}', '${employee[5]}')`,
      callback
    );
  },
  updateEmployee: (callback) => {
    //Leave update for later
  },
  deleteEmployee: (employeeId, callback) => {
    connectDb.query(`DELETE FROM employee WHERE id = ${employeeId}`, callback);
  },
};

module.exports = employeeSchemas;
