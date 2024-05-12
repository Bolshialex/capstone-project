const connectDb = require("../configs/db");

const customerSchemas = {
  getAllUsers: (callback) => {
    connectDb.query("SELECT * FROM customer", callback);
  },
  getCustomerById: (employeeId, callback) => {
    connectDb.query(
      `SELECT * FROM customer WHERE id = ?`,
      [employeeId],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        callback(null, results);
      }
    );
  },
  createCustomer: (customerInfo, callback) => {
    const query = `INSERT INTO customer (first_name, last_name, user_name, phone, email) VALUES (?, ?, ?, ?, ?)`;
    const values = [...customerInfo];

    connectDb.query(query, values, callback);
  },
  updateCustomer: (callback) => {
    //Leave update for later
  },
  deleteCustomer: (customerId, callback) => {
    const query = "DELETE FROM customer WHERE id = ?";
    const values = [customerId];
    connectDb.query(query, values, callback);
  },
};

module.exports = customerSchemas;
