import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import faker from 'faker';
import unique from 'unique-string';
import { storeGameName, storeSocket, storePlayers } from '../actions';

class GamePlay extends React.Component {

  socketURL = 'http://localhost:5000/'
  socket = io.connect(this.socketURL);

  waitForOpponent = () => {
    setTimeout(() => {
      if (!this.props.players) {
        const { name, title, displayImage } = this.props.user;
        const player_1 = { name, title, displayImage };
        const player_2 = {
          name: faker.name.findName(),
          title: `BOT`,
          displayImage: faker.image.avatar()
        };
        this.props.storePlayers({ player_1, player_2 });
        this.getQuestions(true);
      }
    }, 5000);
  }

  getQuestions = send => {
    if (send) this.socket.emit('send_questions', this.props.game.socketRoomID);
    this.socket.on('receive_questions', questions => {
      console.log(questions);
      if (this.props.players.player_2.title === 'BOT') this.socket.disconnect();
    })
  }

  componentWillMount = () => {
    if (this.props.game) {
      const { key, topic } = this.props.game;
      const { name, title, displayImage } = this.props.user;

      const socket = this.socket;
      this.props.storeSocket({ socket: this.socket });

      socket.emit('search_room', topic);

      socket.on('room_found', roomID => {
        const player2 = { name, title, displayImage }
        socket.emit('join', { roomID, player2 });
        this.props.storeGameName({ key, topic, socketRoomID: roomID });
      })

      socket.on('room_not_found', () => {
        const room = {
          id: topic + '_' + unique(),
          key,
          player_1: { name, title, displayImage },
          player_2: null,
          player_1_socketID: null,
          player_2_socketID: null,
          length: 1
        };
        socket.emit('create_room', room);
        this.props.storeGameName({ key, topic, socketRoomID: room.id });
        this.waitForOpponent();
      })

      socket.on('opponent_found', ({ player_1, player_2 }) => {
        this.props.storePlayers({ player_1, player_2 });
        this.getQuestions(false);
      })
    } else this.props.history.push('/');
  }

  render = () => (
    <div>Gameplay</div>
  )
};

const mapStateToProps = state => {
  return { game: state.game, user: state.user, players: state.players };
}

export default connect(mapStateToProps, { storeGameName, storeSocket, storePlayers })(GamePlay);