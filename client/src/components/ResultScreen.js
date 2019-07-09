import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { storeGameData, storePlayersData } from '../actions'

class ResultScreen extends React.Component {
  state = {
    result: null,
    player_1_color: null,
    player_2_color: null,
    oppConnected: true
  }

  rematchBtn = () => {
    if (this.state.oppConnected) return <Button onClick={this.rematch}>Rematch</Button>
    else return <ButtonDisabled>Opponent Disconnected</ButtonDisabled>
  }

  rematch = () => {
    if (this.props.player_2.title !== 'BOT')
      this.props.socket.emit('rematch', this.props.player_2.socketID);
    this.props.rematch(true);
  }

  anotherGame = () => {
    this.props.socket.disconnect();
    this.props.storeGameData(null);
    this.props.storePlayersData(null);
    this.props.history.push('/');
  }

  componentDidMount = () => {
    this.props.socket.on('rematch', () => { this.props.rematch(false) });
    this.props.socket.on('opponentDisconnected', () => { this.setState({ oppConnected: false }) });
  }

  componentWillMount = () => {
    if (this.props.score1 > this.props.score2)
      this.setState({ result: 'YOU WIN', player_1_color: '#00e676', player_2_color: '#ff5722' })
    else if (this.props.score1 < this.props.score2)
      this.setState({ result: 'YOU LOSE', player_1_color: '#ff5722', player_2_color: '#00e676' })
    else
      this.setState({ result: 'MATCH DRAW', player_1_color: '#00e676', player_2_color: '#00e676' })
  }

  render = () => (
    <Wrapper>
      <Result>{this.state.result}</Result>
      <PlayerData>
        <Player1Wrapper>
          <UpperPart>
            <Score1 color={this.state.player_1_color} >{this.props.score1}</Score1>
            <DisplayImage1 src={this.props.player_1.displayImage} color={this.state.player_1_color}></DisplayImage1>
          </UpperPart>
          <Player1Name color={this.state.player_1_color}>{this.props.player_1.name}</Player1Name>
          <PlayerTitle>{this.props.player_1.title}</PlayerTitle>
          <PlayerLevel>Level {this.props.player_1.level}</PlayerLevel>
        </Player1Wrapper>
        <MidText>VS</MidText>
        <Player2Wrapper>
          <UpperPart>
            <DisplayImage2 src={this.props.player_2.displayImage} color={this.state.player_2_color}></DisplayImage2>
            <Score2 color={this.state.player_2_color}>{this.props.score2}</Score2>
          </UpperPart>
          <Player2Name color={this.state.player_2_color}>{this.props.player_2.name}</Player2Name>
          <PlayerTitle>{this.props.player_2.title}</PlayerTitle>
          <PlayerLevel>Level {this.props.player_2.level}</PlayerLevel>
        </Player2Wrapper>
      </PlayerData>

      {this.rematchBtn()}
      <Button onClick={this.anotherGame}>Another Game</Button>
    </Wrapper>
  )
}

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  socket: ownProps.socket,
  score1: ownProps.score1,
  score2: ownProps.score2,
  player_1: state.players.player_1,
  player_2: state.players.player_2,
  rematch: ownProps.rematch
});

export default connect(mapStateToProps, { storeGameData, storePlayersData })(ResultScreen);

// STYLED COMPONENTS

const Wrapper = styled.div`
  margin: auto;
  height: 700px;
  width: 850px;
  border-radius: 30px;
  background-image: linear-gradient(to left bottom, #4a148c, #880e4f );
  display: flex;
  flex-direction: column;
  font-family: 'Varela Round', sans-serif;
  color: white;
`;

const Result = styled.div`
  height: 60px;  
  font-size: 48px;
  font-weight: 800;
  color: #fff;
  margin: 20 auto;
  background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);
  -webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

const PlayerData = styled.div`
  display: flex;
  width: 500;
  margin: 10 auto;
`;

const UpperPart = styled.div`
  display: flex;
`;

const Score1 = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.color};
  margin: auto;
`;

const Score2 = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.color};
  margin: auto;
`;

const Player1Wrapper = styled.div`
  width: 225px;
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const MidText = styled.div`
  margin: auto;
  width: 50px;
  text-align: center;
  color: #e0e0e0;
`;

const Player2Wrapper = styled.div`
  width: 225px;
  display: flex;
  flex-direction: column
`;

const DisplayImage1 = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid ${props => props.color};
`;

const DisplayImage2 = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid ${props => props.color};
`;

const Player1Name = styled.div`
  font-size: 1.5rem;
  margin-top: 20;
  font-weight: bold;
  color: ${props => props.color};
`;

const Player2Name = styled.div`
  font-size: 1.5rem;
  margin-top: 20;
  font-weight: bold;
  color: ${props => props.color};
`;

const PlayerTitle = styled.div`
  font-size: 1rem;
`;

const PlayerLevel = styled.div`
  font-size: 0.8rem;
`;

const Button = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 30px;
  width: 200px;
  text-align: center;
  border-radius: 30px;
  background: #fff;
  color: #000;
  margin: 40 auto 0 auto;

  :hover {
    transition: 0.2s ease-in-out;
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const ButtonDisabled = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 30px;
  width: 200px;
  text-align: center;
  border-radius: 30px;
  background: #bdbdbd;
  color: #000;
  margin: 40 auto 0 auto;
`;