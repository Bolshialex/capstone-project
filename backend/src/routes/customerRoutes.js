const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/tokenValidation");

const userControllers = require("../controllers/userControllers");

router
  .get("/", checkToken, userControllers.getCustomer)
  .post("/", checkToken, userControllers.createCustomer);

//Leave update for later

router
  .delete("/:id", checkToken, userControllers.deleteCustomer)
  .get("/:id", checkToken, userControllers.getCustomerById)
  .put("/:id", checkToken, userControllers.updateCustomer);

module.exports = router;
