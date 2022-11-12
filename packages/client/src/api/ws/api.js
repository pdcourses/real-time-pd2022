import socket from "./index.js";

export const wsTest = (data, options) => 
{
    console.log('socket client: wsTest, event: test',data,options);
    socket.emit('test', data, options);
}

export const emitMessage = (room, message) => 
socket.emit('message',room, message);

export const emitJoinToRoom = (room) => socket.emit('join-to-room', room)
