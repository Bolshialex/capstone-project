const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/tokenValidation");
const userControllers = require("../controllers/userControllers");

router
  .get("/", checkToken, userControllers.getEmployee)
  .post("/", checkToken, userControllers.createEmployee);

//Leave update for later

router
  .delete("/:id", checkToken, userControllers.deleteEmployee)
  .get("/:id", checkToken, userControllers.getEmployeeById)
  .put("/:id", checkToken, userControllers.updateEmployee);

router.get("/groupEmp", checkToken, userControllers.getEmployeesByIdIn);
module.exports = router;
