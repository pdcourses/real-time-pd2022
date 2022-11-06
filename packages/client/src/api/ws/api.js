import socket from "./index.js";

export const wsTest = (data, options) => 
socket.emit('test', data, options);

/*
export const wsMessage = (data, options) => 
socket.emit('message', data, options);
*/