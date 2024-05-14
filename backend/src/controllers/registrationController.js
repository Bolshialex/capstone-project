const connectDb = require("../configs/db");
const employeeSchema = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

connectDb;

const registerEmployee = asyncHandler(async (req, res) => {
  const employeeInfo = [
    req.body.first_name,
    req.body.last_name,
    req.body.user_name,
    req.body.phone,
    req.body.email,
    req.body.password,
  ];

  if (
    !employeeInfo[0] ||
    !employeeInfo[1] ||
    !employeeInfo[2] ||
    !employeeInfo[3] ||
    !employeeInfo[4] ||
    !employeeInfo[5]
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(employeeInfo[5], salt);
  //check if already registered
  await employeeSchema.getEmployeeByEmail(employeeInfo[4], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    if (result == "") {
      //hash password

      employeeSchema.createEmployee(
        employeeInfo,
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
      res.status(400).json({ error: "Employee already exists" });
    }
  });
});

module.exports = { registerEmployee };
