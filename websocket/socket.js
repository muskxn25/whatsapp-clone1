let socket = require("socket.io");
const db = require("../models");
const Chat = db.chat_model;

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
      // console.log(data, "new user");
      users[data.userId] = socket.id;
      onlineUser.push(data.userId);
      io.emit("newUser", data);
    });

    // send message
    socket.on("sendMessage", async (data) => {
      // io.emit("receiveMessage", data);
      socket.broadcast.emit("receiveMessage", data);

      let { sender_id, receiver_id, message } = data;

      try {
        await Chat.create({
          sender_id,
          receiver_id,
          message,
        });
      } catch (error) {
        console.log(error);
      }
    });

    // receive message
    // socket.on("receiveMessage", (data) => {
    //   console.log(data, "receive message");
    //   io.emit("receiveMessage", data);
    // });

    //disconnect
    socket.on("disconnect", (data) => {
      // console.log(data, "disconnect");
      // io.emit("disconnect", data);
    }); // disconnect
  });
};

module.exports = startSocket;
