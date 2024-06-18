const connectDb = require("../configs/db");
const employeeSchema = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

connectDb;

const loginEmployee = (req, res) => {
  const { email, password } = req.body;
  employeeSchema.getEmployeeByEmail(email, async (err, result) => {
    try {
      if (result.length > 0) {
        const employee = result[0];
        const isPasswordValid = await bcrypt.compare(
          password,
          employee.password
        );

        if (isPasswordValid) {
          const accessToken = generateAccessToken(
            employee.id,
            employee.is_admin
          );

          res.cookie("accessToken", accessToken, {
            secure: true,
            sameSite: "Strict",
          });

          return res.json({
            id: employee.id,
            name: employee.first_name,
            email: employee.email,
            is_admin: employee.is_admin,
            token: accessToken,
          });
        }
      }
      res.status(400).json({ error: "Invalid credentials" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

const generateAccessToken = (id, is_admin) => {
  return jwt.sign({ id, is_admin }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXP,
  });
};

module.exports = { loginEmployee };
