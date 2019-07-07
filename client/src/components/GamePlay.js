import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import faker from 'faker'
import unique from 'unique-string'
import { storeGameData, storePlayersData, storeQuestions } from '../actions'

import OpponentSearchScreen from './OpponentSearchScreen'
import PvPScreen from './PvPScreen'
import RoundScreen from './RoundScreen'
import QuestionScreen from './QuestionScreen'
import ResultScreen from './ResultScreen'

class GamePlay extends React.Component {

  state = {
    searchScreen: false,
    playersScreen: false,
    roundScreen: false,
    questionScreen: false
  }

  socketURL = 'http://localhost:5000/';
  socket = io.connect(this.socketURL);

  waitForOpponent = () => {
    setTimeout(() => {
      if (!this.props.players) {
        const { name, title, level, displayImage } = this.props.user;
        const player_1 = { name, title, level, displayImage };
        const player_2 = {
          name: faker.name.findName(),
          title: `BOT`,
          displayImage: faker.image.avatar(),
          level: Math.round(Math.random() * 20)
        };
        this.props.storePlayersData({ player_1, player_2 });
        this.setState({ searchScreen: true });
        this.getQuestions(true);
      }
    }, 5000);
  }

  getQuestions = send => {
    if (send) this.socket.emit('send_questions', this.props.game.socketRoomID);
    this.socket.on('receive_questions', questions => {
      const q = questions.results.map(({ question, correct_answer, incorrect_answers }) =>
        ({ question, correct_answer, incorrect_answers }));
      this.props.storeQuestions(q);
      if (this.props.players.player_2.title === 'BOT') this.socket.disconnect();
    })
  }

  searchForOpponent = () => {
    const { key, topic, round } = this.props.game;
    const { name, title, level, displayImage } = this.props.user;

    const socket = this.socket;

    socket.emit('search_room', topic);

    socket.on('room_found', roomID => {
      const player2 = { name, title, level, displayImage, score: 0 }
      socket.emit('join', { roomID, player2 });
      this.props.storeGameData({ key, topic, round, socketRoomID: roomID });
    })

    socket.on('room_not_found', () => {
      const room = {
        id: topic + '_' + unique(),
        key,
        player_1: { name, title, level, displayImage, score: 0 },
        player_2: null,
        player_1_socketID: null,
        player_2_socketID: null,
        length: 1
      };
      socket.emit('create_room', room);
      this.props.storeGameData({ key, topic, round, socketRoomID: room.id });
      this.waitForOpponent();
    })

    socket.on('opponent_found', ({ player_1, player_2 }) => {
      if (name === player_1.name) this.props.storePlayersData({ player_1, player_2 })
      else this.props.storePlayersData({ player_1: player_2, player_2: player_1 })
      this.setState({ searchScreen: true });
      this.getQuestions(false);
    })
  }

  updateRound = () => {
    let { key, topic, round, socketRoomID } = this.props.game;
    round += 1;
    this.props.storeGameData({ key, topic, round, socketRoomID });
    this.setState({ roundScreen: false });
  }

  changeDisplay = key => { this.setState({ [key]: true }) }

  componentWillMount = () => {
    if (!this.props.game) this.props.history.push('/');
    if (this.props.game && !this.props.players) this.searchForOpponent();
  }

  render = () => {
    if (!this.state.searchScreen) return <OpponentSearchScreen />
    else if (!this.state.playersScreen) return <PvPScreen updateScreen={this.changeDisplay} updateRound={this.updateRound} />
    else if (!this.state.roundScreen)
      return <RoundScreen
        topicKey={this.props.game.key}
        topicName={this.props.game.topic}
        round={this.props.game.round}
        updateScreen={this.changeDisplay}
      />
    else if (!this.state.questionScreen)
      return <QuestionScreen
        socket={this.socket}
        updateScreen={this.updateScreen}
        updateRound={this.updateRound}
      />
    else return <ResultScreen />;
  }
};

const mapStateToProps = state => {
  return { game: state.game, user: state.user, players: state.players };
}

export default connect(mapStateToProps, { storeGameData, storePlayersData, storeQuestions })(GamePlay);