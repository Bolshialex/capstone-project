const connectDb = require("../configs/db");

const customerSchemas = {
  //gets all customers
  getAllUsers: (callback) => {
    connectDb.query("SELECT * FROM customer", callback);
  },
  //gets a customer by id
  getCustomerById: (employeeId, callback) => {
    connectDb.query(
      `SELECT * FROM customer WHERE id = ?`,
      [employeeId],
      callback
    );
  },
  //creates a customer
  createCustomer: (customerInfo, callback) => {
    const query = `INSERT INTO customer (first_name, last_name, phone, email, assigned_agent, is_lead) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [...customerInfo];

    connectDb.query(query, values, callback);
  },
  //updates a customer
  updateCustomer: (customerId, customerInfo, callback) => {
    const query = `UPDATE customer SET first_name = ?, last_name = ?, phone = ?, email = ?, assigned_agent = ?, is_lead = ? WHERE id = ?`;
    const values = [
      customerInfo.first_name,
      customerInfo.last_name,
      customerInfo.phone,
      customerInfo.email,
      customerInfo.assigned_agent,
      customerInfo.is_lead,
      customerId,
    ];

    connectDb.query(query, values, callback);
  },
  //deletes a customer
  deleteCustomer: (customerId, callback) => {
    const query = "UPDATE customer SET is_active = 0 WHERE id = ?";
    const values = [customerId];
    connectDb.query(query, values, callback);
  },
  //gets all customers by agent
  getCustomerByAgent: (agentId, callback) => {
    const query = "SELECT * customer WHERE assigned_agent = ?";
    const values = [agentId];
    connectDb.query(query, values, callback);
  },
};

module.exports = customerSchemas;
