const {testHandler} = require('./enentHandlers');

module.exports.disconnectHandler = (socket) => {
    socket.on('disconnect', function () {
        console.log('A user disconnected');
     });
}

module.exports.connectionHandler = (socket) => {

    socket.on('test', testHandler);

};