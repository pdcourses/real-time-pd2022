const { default: socket } = require('../../../client/src/api/ws');
const {testHandler, messageHandler} = require('./enentHandlers');
const {joinToRooms} = require('./rooms.js');


module.exports.disconnectHandler = (socket) => {
    socket.on('disconnect', function () {
        console.log('A user disconnected');
     });
}

module.exports.connectionHandler = (socket) => {
    // рукопожатие handshake
    const handshake = socket.handshake;
    console.log('handshake:', handshake);

    joinToRooms(socket);

    socket.on('message', (room, message) => {
        socket.on(room).emit('new_message', room, message);
    });

    socket.on('join-to-room', (room) => {});
    
    socket.on('test', testHandler);
};