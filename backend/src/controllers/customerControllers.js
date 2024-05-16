const connectDb = require("../configs/db");
const customerSchemas = require("../models/customerModel");
const asyncHandler = require("express-async-handler");

connectDb;

const getCustomerInfo = asyncHandler(async (req, res) => {
  customerSchemas.getAllUsers((err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(result);
  });
});

const createCustomer = asyncHandler(async (req, res) => {
  const customerInfo = [
    req.body.first_name,
    req.body.last_name,
    req.body.user_name,
    req.body.phone,
    req.body.email,
    req.body.password,
  ];
  customerSchemas.createCustomer(customerInfo, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    res.json("Customer Created");
  });
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.id;

  customerSchemas.deleteCustomer(customerId, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    res.json(`Customer ${customerId} deleted`);
  });
});

const getCustomerById = asyncHandler(async (req, res) => {
  const customerId = req.params.id;

  customerSchemas.getCustomerById(customerId, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    } else if (result == "") {
      res.json(`This customer does not exist`);
      return;
    }
    res.json(result[0]);
  });
});

module.exports = {
  getCustomerInfo,
  createCustomer,
  deleteCustomer,
  getCustomerById,
};
