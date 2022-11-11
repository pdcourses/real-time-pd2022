const cors = require('cors');
const http = require('http');
const express = require('express');
const {Server} = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.Server(app);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT,
		() => console.log(`Example app listening on port ${ PORT }!`));

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

const wsHandler = require('./ws');

io.on('connection', wsHandler.connectionHandler);
io.on('disconnect', wsHandler.disconnectHandler);
