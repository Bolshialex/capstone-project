const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/tokenValidation");
const {
  getEmployeeInfo,
  createEmployeeInfo,
  deleteEmployee,
  getEmployeeById,
} = require("../controllers/employeeController");

router.get("/", getEmployeeInfo).post("/", checkToken, createEmployeeInfo);

//Leave update for later

router
  .delete("/:id", checkToken, deleteEmployee)
  .get("/:id", checkToken, getEmployeeById);

module.exports = router;
