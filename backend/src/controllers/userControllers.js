const connectDb = require("../configs/db");
const customerSchemas = require("../models/customerModel");
const employeeSchemas = require("../models/employeeModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

connectDb;

const getCustomer = asyncHandler(async (req, res) => {
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
    req.body.phone,
    req.body.email,
    req.body.assigned_agent,
    req.body.is_lead,
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

const updateCustomer = asyncHandler(async (req, res) => {
  const customerId = req.params.id;
  const customerInfo = req.body;
  if (customerInfo.assigned_agent == "") {
    customerInfo.assigned_agent = null;
  }

  customerSchemas.updateCustomer(customerId, customerInfo, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      console.log(err);
      return;
    }
    res.json("Customer Updated");
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

const getEmployee = asyncHandler(async (req, res) => {
  employeeSchemas.getAllUsers((err, emp) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(emp);
  });
});

const createEmployee = asyncHandler(async (req, res) => {
  if (req.user.is_admin) {
    const employeeInfo = [
      req.body.first_name,
      req.body.last_name,
      req.body.user_name,
      req.body.phone,
      req.body.email,
      req.body.is_admin,
      req.body.password,
    ];

    if (
      !employeeInfo[0] ||
      !employeeInfo[1] ||
      !employeeInfo[2] ||
      !employeeInfo[3] ||
      !employeeInfo[4] ||
      !employeeInfo[5] ||
      !employeeInfo[6]
    ) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const newEmployeeInfo = [
      req.body.first_name,
      req.body.last_name,
      req.body.user_name,
      req.body.phone,
      req.body.email,
      req.body.is_admin,
    ];

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employeeInfo[6], salt);
    //check if already registered
    await employeeSchemas.getEmployeeByEmail(employeeInfo[4], (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log(err);
        return;
      }
      if (result.length < 1) {
        //hash password
        employeeSchemas.createEmployee(
          newEmployeeInfo,
          hashedPassword,
          (err, result) => {
            if (err) {
              res.status(500).json({ error: "Internal Server Error" });
              console.log(err);
              return;
            }
            res.status(201).json("Employee Created");
          }
        );
      } else {
        res.status(409).json({ error: "Employee already exists" });
      }
    });
  } else {
    res
      .status(403)
      .json({ error: "You do not have permission to make this change" });
  }
});

const updateEmployee = asyncHandler(async (req, res) => {
  const employeeId = req.params.id;
  const employeeInfo = req.body;
  if (employeeInfo.assigned_agent == "") {
    employeeInfo.assigned_agent = null;
  }
  employeeSchemas.updateEmployee(employeeId, employeeInfo, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    res.json("Employee Updated");
  });
});

const deleteEmployee = asyncHandler(async (req, res) => {
  console.log(req.user);
  if (req.user.is_admin) {
    const employeeId = req.params.id;
    employeeSchemas.deleteEmployee(employeeId, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log(err);
        return;
      }

      res.json(`Employee ${employeeId} deleted`);
    });
  } else {
    res
      .status(403)
      .json({ error: "You do not have permission to make this change" });
  }
});

const getEmployeeById = asyncHandler(async (req, res) => {
  const employeeId = req.params.id;
  employeeSchemas.getEmployeeById(employeeId, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    } else if (result == "") {
      res.json(`This employee does not exist`);
      return;
    }
    res.json(result[0]);
  });
});

const getEmployeesByIdIn = asyncHandler(async (req, res) => {
  const employeeId = req.body;
  employeeSchemas.getEmployeesByIdIn(employeeId, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    } else if (result == "") {
      res.json(`This employee does not exist`);
      return;
    }
    res.json(result);
  });
});

module.exports = {
  getEmployee,
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getCustomer,
  createCustomer,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
  updateEmployee,
  getEmployeesByIdIn,
};
