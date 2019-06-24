const rooms = [];
const socketRoomMap = [];

const findRoom = term => rooms.findIndex(room => room.id.startsWith(term));

const socket = io => {
  io.on('connection', socket => {
    console.log('New User Connected...');

    socket.on('search_room', topic => {
      const index = findRoom(topic);
      if (index + 1 && rooms[index].length < 2)
        socket.emit('room_found', rooms[index].id);
      else socket.emit('room_not_found', null);
    })

    socket.on('create_room', room => {
      socket.join(room.id);
      rooms.push(room);
      socketRoomMap.push({ socketID: socket.id, roomID: room.id });
    });

    socket.on('join', ({ roomID, player2 }) => {
      socket.join(roomID);

      const index = findRoom(roomID);
      rooms[index].player_2 = player2;
      rooms[index].length++;

      socketRoomMap.push({ socketID: socket.id, roomID: roomID });
      io.to(roomID).emit('opponent_found', rooms[index]);
    })

    socket.on('disconnect', () => {
      const mapIndex = socketRoomMap.findIndex(user => user.socketID === socket.id);
      if (mapIndex + 1) {
        const roomID = socketRoomMap[mapIndex].roomID;
        const roomIndex = findRoom(roomID);

        socketRoomMap.splice(mapIndex, 1);
        rooms.splice(roomIndex, 1);
      }
    })
  })
};

module.exports = socket;