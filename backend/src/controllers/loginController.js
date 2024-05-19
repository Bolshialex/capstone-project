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
          // const refreshToken = generateRefreshToken(
          //   employee.id,
          //   employee.is_admin
          // );
          const accessToken = generateAccessToken(
            employee.id,
            employee.is_admin
          );

          res.cookie("accessToken", accessToken, {
            secure: true,
            sameSite: "Strict",
          });

          // res.cookie("refreshToken", refreshToken, {
          //   httpOnly: true,
          //   secure: true,
          //   sameSite: "Strict",
          // });

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

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken == null) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = generateAccessToken({
      id: user.id,
      is_admin: user.is_admin,
    });
    const newRefreshToken = generateRefreshToken({
      id: user.id,
      is_admin: user.is_admin,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.json({ accessToken: newAccessToken });
  });
};

const generateAccessToken = (id, is_admin) => {
  return jwt.sign({ id, is_admin }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXP,
  });
};

const generateRefreshToken = (id, is_admin) => {
  return jwt.sign(
    { id: id, is_admin: is_admin },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXP }
  );
};

module.exports = { loginEmployee, refreshToken };
