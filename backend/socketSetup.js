const socketIO = require("socket.io");

//server initialization
function setupSocket(server) {
  //create a server
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  //listen for new user
  io.on("connection", (socket) => {
    console.log("A user connected".rainbow.bold);

    socket.on("disconnect", () => {
      console.log("A user disconnected".red);
    });
  });

  return io;
}

module.exports = setupSocket;
