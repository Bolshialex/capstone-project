const express = require("express");
require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT;
const connectDb = require("./src/configs/db.js");
const server = express();
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use("/employee", require("./src/routes/employeeRoutes"));
server.use("/customer", require("./src/routes/customerRoutes"));
server.use("/meeting", require("./src/routes/meetingRoutes.js"));
server.use("/register", require("./src/routes/registrationRoutes.js"));
server.use("/login", require("./src/routes/loginRoutes.js"));

connectDb;

server.listen(port, () => {
  console.log(`Server listening at port: ${port}`.magenta);
});
