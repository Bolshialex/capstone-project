const connectDb = require("../configs/db");
const employeeSchemas = require("../models/employeeModel");
const registerSchemas = require("../models/registerModel");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

connectDb;

const registerEmployee = asyncHandler(async (req, res) => {
  const { first_name, last_name, user_name, phone, email, password, is_admin } =
    req.body;

  if (
    !first_name ||
    !last_name ||
    !user_name ||
    !phone ||
    !email ||
    !password
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // check if employee already exists
  employeeSchemas.getEmployeeByEmail(email, async (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(err);
      return;
    }
    // true if employee does not exist
    if (result.length === 0) {
      // register new employee
      const newEmployeeInfo = [first_name, last_name, user_name, phone, email];

      registerSchemas.registerEmployee(
        newEmployeeInfo,
        hashedPassword,
        (err, result) => {
          if (err) {
            res.status(500).json({ error: "Internal Server Error" });
            console.error(err);
            return;
          }
          res.status(201).json({ message: "Employee created" });
        }
      );
    } else {
      res.status(409).json({ error: "Employee already exists" });
    }
  });
});

module.exports = { registerEmployee };
