const cors = require("cors");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser);

const httpServer = http.Server(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const wsHandler = require("./ws");

const chat = io
  .of("/chat")
  .on("connection", function connectionHandler(socket) {
    socket.broadcast.emit("new-user", socket.id);
    socket.on("send-message", (to, message) => {
      message.owner = socket.id;
      socket.to(to).emit("private-message", message);
    });

    socket.on("get-users", () => {
      const clients = io.of("/chat").sockets;
	  //console.log('clients::::::', clients);
      const users = [...clients];
      users.forEach((u, i) => u.splice(1));
      socket.emit("get-users", users);
    });

    socket.on("disconnect", () => {
      chat.emit("user-leave", socket.id);
    });
  });

const serverEvent = io.of("/events").on("connecton", function (socket) {});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
