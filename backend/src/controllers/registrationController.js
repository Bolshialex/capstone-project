const connectDb = require("../configs/db");
const employeeSchemas = require("../models/employeeModel");
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
  const newEmployeeInfo = [
    req.body.first_name,
    req.body.last_name,
    req.body.user_name,
    req.body.phone,
    req.body.email,
  ];

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(employeeInfo[5], salt);
  //check if already registered
  await employeeSchemas.getEmployeeByEmail(employeeInfo[4], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    if (result == "") {
      //hash password

      employeeSchemas.createEmployee(
        newEmployeeInfo,
        hashedPassword,
        (err, result) => {
          if (err) {
            res.status(500).json({ error: "Internal Server Error" });
            console.log(err);
            return;
          } else {
            employeeSchemas.getEmployeeById(result.insertId, (err, result) => {
              if (err) {
                res.status(500).json({ error: "Internal Server Error" });
                console.log(err);
                return;
              }
              res.status(201).json({
                id: result[0].id,
                first_name: result[0].first_name,
                email: result[0].email,
                is_admin: employee.is_admin,
                token: generateToken(employee.id, employee.is_admin),
              });
            });
          }
        }
      );
    } else {
      res.status(400).json({ error: "Employee already exists" });
    }
  });
});

const generateToken = (id, is_admin) => {
  return jwt.sign({ id: id, is_admin: is_admin }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { registerEmployee };
