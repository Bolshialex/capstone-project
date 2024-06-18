const express = require("express");
require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const rateLimit = require("express-rate-limit");
const connectDb = require("./src/configs/db.js");
const setupSocket = require("./socketSetup.js");

connectDb;

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);

const server = http.createServer(app);

const io = setupSocket(server);

module.exports = io;

app.use("/employee", require("./src/routes/employeeRoutes"));
app.use("/customer", require("./src/routes/customerRoutes"));
app.use("/meeting", require("./src/routes/meetingRoutes.js"));
app.use("/register", require("./src/routes/registrationRoutes.js"));
app.use("/login", require("./src/routes/loginRoutes.js"));
app.use("/refresh", require("./src/routes/refreshRoutes.js"));
app.use("/message", require("./src/routes/messageRoutes.js"));
app.use("/chat", require("./src/routes/chatRoutes.js"));
app.use("/notification", require("./src/routes/notificationRoutes.js"));
app.use("/conversation", require("./src/routes/conversationRoutes.js"));

// Start the server
server.listen(port, () => {
  console.log(`Server listening at port: ${port}`.rainbow.bold);
});
