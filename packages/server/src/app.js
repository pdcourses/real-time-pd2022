const cors = require('cors');
const http = require('http');
const express = require('express');
const {Server} = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser);

const httpServer = http.Server(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

const wsHandler = require('./ws');

//io.on('connection', wsHandler.connectionHandler);
//io.on('disconnect', wsHandler.disconnectHandler);

io.on('connection', function connectionH (socket) {
  socket.broadcast.emit('new-user', socket.id);
    socket.on('send-new-msg', (user, message) => {
        message.owner = socket.id;
        socket.to(user).emit('private-new-msg', message);
    });
    socket.on('get-users', () => {
        io.clients((error, clients) => {
            const users=[...clients];
            users.push(users.indexOf(socket.id),1);
            socket.emit('get-users', users);
        })
    });
    io.on('disconnect', (error) => {
      console.log('reason:', error);
    });
});


const PORT = process.env.PORT || 5000;

httpServer.listen(PORT,
		() => console.log(`Example app listening on port ${ PORT }!`));