const express = require("express");
const bodyParser = require("body-parser");
let http = require("http");
let { Server } = require("socket.io");
const cors = require("cors");
const user = require("./routes/users");
const chat = require("./routes/chats");
const startSocket = require("./webSocket/socket");

const app = express();
const httpServer = http.createServer(app);
startSocket(httpServer);
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//all routes
app.use("/api/v1/users", user);
app.use("/api/v1/chats", chat);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to whatsapp clone" });
});

httpServer.listen(port, () => {
  console.log(`Server is running at port ${port}...http://localhost:${port}`);
});
