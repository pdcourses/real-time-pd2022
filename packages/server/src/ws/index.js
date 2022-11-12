const {testHandler, messageHandler} = require('./enentHandlers');

module.exports.disconnectHandler = (socket) => {
    socket.on('disconnect', function () {
        console.log('A user disconnected');
     });
}

module.exports.connectionHandler = (socket) => {
    // рукопожатие handshake
    const handshake = socket.handshake;
    console.log('handshake:', handshake);

    socket.on('test', testHandler);
    socket.on('message', messageHandler);
};