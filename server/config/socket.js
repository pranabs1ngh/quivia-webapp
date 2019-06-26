const fetch = require('node-fetch');

const rooms = [];

const findRoom = term => rooms.findIndex(room => room.id.startsWith(term));

const searchForRoom = term => {
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].id.startsWith(term) && rooms[i].length < 2)
      return i
  }
  return -1;
};

const getQuestions = async index => {
  try {
    const questions = await fetch(`https://opentdb.com/api.php?amount=7&category=${rooms[index].key}&type=multiple`);
    const questionsJSON = await questions.json();
    return questionsJSON;
  } catch (err) {
    console.log(err);
  }
}

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
      room.player_1_socketID = socket.id;
      rooms.push(room);
    });

    socket.on('join', async ({ roomID, player2 }) => {
      socket.join(roomID);

      const index = findRoom(roomID);
      rooms[index].player_2 = player2;
      rooms[index].player_2_socketID = socket.id;
      rooms[index].length++;

      const { player_1, player_2 } = rooms[index];
      io.to(roomID).emit('opponent_found', { player_1, player_2 });

      const questions = await getQuestions(index);
      io.to(roomID).emit('receive_questions', questions);
    })

    socket.on('send_questions', async roomID => {
      const index = findRoom(roomID);
      const questions = await getQuestions(index);
      io.to(roomID).emit('receive_questions', questions);
    })

    socket.on('disconnect', () => {
      const index = rooms.findIndex(user => user.player_1_socketID || user.player_2_socketID === socket.id);
      if (index + 1) rooms.splice(index, 1);
      console.log('User disconnected.')
    })
  })
};

module.exports = socket;