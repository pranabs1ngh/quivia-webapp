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
    player_1_score: 0,
    player_2_score: 0,
    numOfCorrAns: 0,
    oppConnected: true,
    searchScreen: false,
    playersScreen: false,
    roundScreen: false,
    questionScreen: false
  }

  socket = io.connect();

  waitForOpponent = () => {
    setTimeout(() => {
      if (!this.props.players) {
        const { name, title, level, displayImage } = this.props.user;
        const player_1 = { name, title, level, displayImage, score: 0 };
        const player_2 = {
          name: faker.name.findName(),
          title: `BOT`,
          level: Math.round(Math.random() * 20),
          displayImage: faker.image.avatar(),
          score: 0
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
    })
  }

  searchForOpponent = () => {
    const { key, topic, round } = this.props.game;
    const { id, name, title, level, displayImage } = this.props.user;

    const socket = this.socket;

    socket.emit('search_room', { topic, id });

    socket.on('room_found', roomID => {
      const player2 = { id, name, title, level, displayImage, socketID: null }
      socket.emit('join', { roomID, player2 });
      this.props.storeGameData({ key, topic, round, socketRoomID: roomID });
    })

    socket.on('room_not_found', () => {
      const room = {
        id: topic + '_' + unique(),
        key,
        player_1: { id, name, title, level, displayImage, socketID: null },
        player_2: null,
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
    if (this.state.roundScreen) {
      let { key, topic, round, socketRoomID } = this.props.game;
      round += 1;
      this.props.storeGameData({ key, topic, round, socketRoomID });
      this.setState({ roundScreen: false });
    }
  }

  updateScreen = key => { this.setState({ [key]: true }) }

  updateScore = (score1, score2) => { this.setState({ player_1_score: score1, player_2_score: score2 }) }

  updateCorrAns = () => { this.setState({ numOfCorrAns: this.state.numOfCorrAns + 1 }) }

  rematch = send => {
    this.getQuestions(send);
    this.setState({
      player_1_score: 0,
      player_2_score: 0,
      numOfCorrAns: 0,
      playersScreen: false,
      roundScreen: false,
      questionScreen: false
    });
    let { key, topic, round, socketRoomID } = this.props.game;
    round = 1;
    this.props.storeGameData({ key, topic, round, socketRoomID });
  }

  componentDidMount = () => {
    this.socket.on('opponentDisconnected', () => { this.setState({ questionScreen: true, oppConnected: false }) });
  }

  componentWillMount = () => {
    if (!this.props.game) this.props.history.push('/');
    if (this.props.game && !this.props.players) this.searchForOpponent();
  }

  gameplay = () => {
    if (!this.state.roundScreen)
      return <RoundScreen
        topicKey={this.props.game.key}
        topicName={this.props.game.topic}
        round={this.props.game.round}
        updateScreen={this.updateScreen}
      />
    else if (!this.state.questionScreen)
      return <QuestionScreen
        socket={this.socket}
        score1={this.state.player_1_score}
        score2={this.state.player_2_score}
        updateCorrAns={this.updateCorrAns}
        updateScore={this.updateScore}
        updateRound={this.updateRound}
        updateScreen={this.updateScreen}
      />
  }

  render = () => {
    if (!this.state.searchScreen) return <OpponentSearchScreen />
    else if (!this.state.playersScreen) return <PvPScreen
      updateScreen={this.updateScreen}
      updateRound={this.updateRound}
    />
    else if (this.state.questionScreen) return <ResultScreen
      socket={this.socket}
      history={this.props.history}
      oppConnected={this.state.oppConnected}
      score1={this.state.player_1_score}
      score2={this.state.player_2_score}
      numOfCorrAns={this.state.numOfCorrAns}
      rematch={this.rematch}
    />;
    else return (
      <>
        <audio src='/audio/gameplay.mp3' autoPlay />
        {this.gameplay()}
      </>
    )
  }
};

const mapStateToProps = state => {
  return { game: state.game, user: state.user, players: state.players };
}

export default connect(mapStateToProps, { storeGameData, storePlayersData, storeQuestions })(GamePlay);