import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { storeGameName } from '../actions';

class GamePlay extends React.Component {

  socketURL = 'http://localhost:5000/'
  socket = io.connect(this.socketURL);

  componentWillMount = () => {
    if (this.props.game) {
      const { key, topic } = this.props.game;
      const socket = this.socket;

      socket.emit('searchRoom', topic);

      socket.on('roomFound', room => {
        socket.emit('join', room);
        this.props.storeGameName({ key, topic, socketRoomID: room });
        console.log(`Room found: ${room}`);
      })

      socket.on('roomNotFound', () => {
        const room = {
          id: topic + '_' + Math.round(Math.random() * 100000),
          length: 1
        };
        socket.emit('createRoom', room);
        this.props.storeGameName({ key, topic, socketRoomID: room.id });
      })
    } else this.props.history.push('/');
  }

  render = () => (
    <div>Gameplay</div>
  )
};

const mapStateToProps = state => {
  return { game: state.game };
}

export default connect(mapStateToProps, { storeGameName })(GamePlay);