const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/tokenValidation");
const {
  getCustomerInfo,
  createCustomer,
  deleteCustomer,
  getCustomerById,
} = require("../controllers/customerControllers");

router
  .get("/", checkToken, getCustomerInfo)
  .post("/", checkToken, createCustomer);

//Leave update for later

router
  .delete("/:id", checkToken, deleteCustomer)
  .get("/:id", checkToken, getCustomerById);

module.exports = router;
