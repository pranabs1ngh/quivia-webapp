import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { storeGameName, storeSocket } from '../actions';

class GamePlay extends React.Component {

  socketURL = 'http://localhost:5000/'
  socket = io.connect(this.socketURL);

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
          id: topic + '_' + Math.round(Math.random() * 100000),
          player_1: { name, title, displayImage },
          player_2: null,
          length: 1
        };
        socket.emit('create_room', room);
        this.props.storeGameName({ key, topic, socketRoomID: room.id });
      })

      socket.on('opponent_found', roomData => {
        console.log('Opponent Found: ');
        console.log(roomData);
      })



    } else this.props.history.push('/');
  }

  render = () => (
    <div>Gameplay</div>
  )
};

const mapStateToProps = state => {
  return { game: state.game, user: state.user };
}

export default connect(mapStateToProps, { storeGameName, storeSocket })(GamePlay);