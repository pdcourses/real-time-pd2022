const {testHandler, messageHandler} = require('./enentHandlers');
const {joinToRooms} = require('./rooms.js');


module.exports.disconnectHandler = (socket) => {
    socket.on('disconnect', function () {
        console.log('A user disconnected');
     });
}


module.exports.connectionHandler = (socket) => {
    socket.broadcast.emit('new-user', socket.id);
    socket.on('send-new-msg', (user, message) => {
        message.owner = socket.id;
        socket.to(user).emit('private-new-msg', message);
    });
    socket.on('get-users', () => {
        socket.clients((error, clients) => {
            const users=[...clients];
            users.push(users.indexOf(socket.id),1);
            socket.emit('get-users', users);
        })
    });
    
}

/*
module.exports.connectionHandler = (socket) => {
    // рукопожатие handshake
    const handshake = socket.handshake;
    console.log('handshake:', handshake);
    joinToRooms(socket);
    socket.on('message', (room, message) => {
        socket.on(room).emit('new-message', room, message);
    });
    socket.on('join-to-room', (room) => {});
    socket.on('test', testHandler);
};
*/