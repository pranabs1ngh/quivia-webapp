const rooms = [];
const socketRoomMap = [];

const findRoom = term => rooms.findIndex(room => room.id.startsWith(term));

const socket = io => {
  io.on('connection', socket => {
    console.log('New User Connected...');

    socket.on('searchRoom', topic => {
      const index = findRoom(topic);
      if (index + 1 && rooms[index].length < 2)
        socket.emit('roomFound', rooms[index].id);
      else socket.emit('roomNotFound', null);
    })

    socket.on('createRoom', room => {
      socket.join(room.id);
      rooms.push(room);
      socketRoomMap.push({ socketID: socket.id, roomID: room.id });
    });

    socket.on('join', roomID => {
      socket.join(roomID);
      const index = findRoom(roomID);
      rooms[index].length++;
      socketRoomMap.push({ socketID: socket.id, roomID: roomID });
    })

    socket.on('disconnect', () => {
      const mapIndex = socketRoomMap.findIndex(user => user.socketID === socket.id);
      const roomID = socketRoomMap[mapIndex].roomID;
      const roomIndex = findRoom(roomID);

      socketRoomMap.splice(mapIndex, 1);
      rooms.splice(roomIndex, 1);
    })

  })
};

module.exports = socket;