const fetch = require('node-fetch');

const rooms = [];

const findRoom = term => rooms.findIndex(room => room.id.startsWith(term));

const searchForRoom = (topic, id) => {
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].id.startsWith(topic) && rooms[i].player_1.id !== id && rooms[i].length < 2)
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
    socket.on('search_room', ({ topic, id }) => {
      const index = searchForRoom(topic, id);
      if (index + 1)
        socket.emit('room_found', rooms[index].id);
      else socket.emit('room_not_found', null);
    })

    socket.on('create_room', room => {
      socket.join(room.id);
      room.player_1.socketID = socket.id;
      rooms.push(room);
    });

    socket.on('join', async ({ roomID, player2 }) => {
      socket.join(roomID);

      const index = findRoom(roomID);
      player2.socketID = socket.id;
      rooms[index].player_2 = player2;
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

    socket.on('answered', ({ socketID, selectedAnswer, playerScore }) => {
      io.to(socketID).emit('oppAnswered', { selectedAnswer, playerScore });
    })

    socket.on('rematch', socketID => {
      io.to(socketID).emit('rematch');
    })

    socket.on('disconnect', () => {
      io.emit('opponentDisconnected');
      const index = rooms.findIndex(user => user.player_1.socketID || user.player_2.socketID === socket.id);
      if (index + 1) rooms.splice(index, 1);
    })
  })
};

module.exports = socket;