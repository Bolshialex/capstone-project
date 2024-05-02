const connectDb = require("../configs/db");
const loginSchema = require("../models/loginModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { get } = require("../routes/loginRoutes");

connectDb;

const loginEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const getEmployee = await loginSchema.findEmployee(email, (err, result) => {
    //const passwordCompare = await bcrypt.compare(password, result[0].password)
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    return result;
  });
  console.log(getEmployee[0]);
});

module.exports = { loginEmployee };
