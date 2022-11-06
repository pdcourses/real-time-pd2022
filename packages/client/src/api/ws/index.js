import io from 'socket.io-client';
const socket = io('ws://127.0.0.1:5000/', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});
export default socket;