const axios = require('axios');

const rooms = [];
const socketRoomMap = [];

const findRoom = term => rooms.findIndex(room => room.id.startsWith(term));
const searchForRoom = term => {
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].id.startsWith(term) && rooms[i].length < 2)
      return i
  }
  return -1;
};

const socket = io => {
  io.on('connection', socket => {
    console.log('New User Connected...');

    socket.on('search_room', topic => {
      const index = searchForRoom(topic);
      if (index + 1)
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

    socket.on('send_questions', async roomID => {
      const index = findRoom(roomID);

      const questions = await axios.get(`https://opentdb.com/api.php?amount=7&category=${rooms[index].key}&type=multiple`);
      io.to(roomID).emit('receive_questions', questions);
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