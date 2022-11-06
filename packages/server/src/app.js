const cors = require('cors');
const http = require('http');
const express = require('express');
const {Server} = require('socket.io');

const corsOpt = {
  origin: '*',
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: true
};

const app = express();
//app.use(cors({corsOpt}));

const httpServer = http.Server(app);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT,
		() => console.log(`Example app listening on port ${ PORT }!`));

const io = new Server(httpServer, {corsOpt});

const wsHandler = require('./ws');

io.on('connection', wsHandler.connectionHandler);
io.on('disconnect', wsHandler.disconnectHandler);
