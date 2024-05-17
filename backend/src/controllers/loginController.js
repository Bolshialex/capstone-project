const connectDb = require("../configs/db");
const employeeSchema = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

connectDb;

const loginEmployee = (req, res) => {
  const { email, password } = req.body;

  employeeSchema.getEmployeeByEmail(email, async (err, result) => {
    try {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        const employee = result[0];
        const isPasswordValid = await bcrypt.compare(
          password,
          employee.password
        );

        if (isPasswordValid) {
          return res.json({
            id: employee.id,
            name: employee.first_name,
            email: employee.email,
            ii_admin: employee.is_admin,
            token: generateToken(employee.id, employee.is_admin),
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

const generateToken = (id, is_admin) => {
  return jwt.sign({ id: id, is_admin: is_admin }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { loginEmployee };
