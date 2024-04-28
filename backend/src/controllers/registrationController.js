const connectDb = require("../configs/db");
const registrationSchema = require("../models/registrationModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

connectDb;

const registerCustomer = asyncHandler(async (req, res) => {
  const customerInfo = [
    req.body.first_name,
    req.body.last_name,
    req.body.user_name,
    req.body.phone,
    req.body.email,
    req.body.password,
  ];

  if (
    (!customerInfo[0],
    !customerInfo[1],
    !customerInfo[2],
    !customerInfo[3],
    !customerInfo[4],
    !customerInfo[5])
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if already registered
  const customerExists = await registrationSchema.findCustomer(
    customerInfo[4],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log(err);
        return;
      } else if (result == "") {
        return false;
      }
      return true;
    }
  );

  if (customerExists) {
    res.status(400);
    throw new Error("Customer already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(customerInfo[5], salt);

  registrationSchema.registerCustomer(
    customerInfo,
    hashedPassword,
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        console.log(err);
        return;
      }
      res.status(201).json("Customer Created");
    }
  );
});

module.exports = { registerCustomer };
