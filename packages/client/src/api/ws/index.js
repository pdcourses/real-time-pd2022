import io from 'socket.io-client';

export const chatSocket = io('ws://localhost:5000/chat');
export const eventsSocket = io('ws://localhost:5000/events');