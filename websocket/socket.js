let socket = require("socket.io");

const startSocket = (server) => {
  let users = {};
  let onlineUser = [];
  // const httpServer = http.createServer();
  const io = new socket.Server(server, {
    cors: {
      //set
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("connect", (data) => {
      console.log(data, "online emet");
    });

    // new user
    socket.on("newUser", (data) => {
      console.log(data, "new user");
      users[data.userId] = socket.id;
      onlineUser.push(data.userId);
      io.emit("newUser", data);
    });

    // send message
    socket.on("sendMessage", (data) => {
      console.log(data, "send message");
      io.emit("receiveMessage", data);
    });

    // receive message
    socket.on("receiveMessage", (data) => {
      console.log(data, "receive message");
      io.emit("receiveMessage", data);
    });

    //disconnect
    socket.on("disconnect", (data) => {
      console.log(data, "disconnect");
      // io.emit("disconnect", data);
    }); // disconnect
  });
};

module.exports = startSocket;
