const rooms = ['room1', 'room2'];

module.exports.joinToRooms = (socket) => {
    rooms.forEach( (r) => {
        socket.join(r);
    });
}