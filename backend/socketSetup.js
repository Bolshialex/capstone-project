const socketIO = require("socket.io");

function setupSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected".rainbow.bold);

    socket.on("disconnect", () => {
      console.log("A user disconnected".red);
    });
  });

  return io;
}

module.exports = setupSocket;
