const express = require("express");
require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIO = require("socket.io");
const rateLimit = require("express-rate-limit");
const connectDb = require("./src/configs/db.js");
const messageService = require("./src/service/messageService.js");

// Connect to the database
connectDb;

const port = process.env.PORT || 3000;
const server = express();

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Add rate limiter middleware
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests from this IP, please try again after 15 minutes",
// });
//server.use(limiter);

// Routes
server.use("/employee", require("./src/routes/employeeRoutes"));
server.use("/customer", require("./src/routes/customerRoutes"));
server.use("/meeting", require("./src/routes/meetingRoutes.js"));
server.use("/register", require("./src/routes/registrationRoutes.js"));
server.use("/login", require("./src/routes/loginRoutes.js"));
server.use("/refresh", require("./src/routes/refreshRoutes.js"));
server.use("/message", require("./src/routes/messageRoutes.js"));
server.use("/chat", require("./src/routes/chatRoutes.js"));
server.use("/conversation", require("./src/routes/conversationRoutes.js"));

// Start the server
server.listen(port, () => {
  console.log(`Server listening at port: ${port}`.magenta);
});
