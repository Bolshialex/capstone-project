const express = require("express");
const router = express.Router();
const {
  getEmployeeInfo,
  createEmployeeInfo,
  deleteEmployee,
  getEmployeeById,
} = require("../controllers/employeeController");

router.get("/", getEmployeeInfo).post("/", createEmployeeInfo);

//Leave update for later

router.delete("/:id", deleteEmployee).get("/:id", getEmployeeById);

module.exports = router;
