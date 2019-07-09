import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

class PVPComponent extends React.Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.updateScreen('playersScreen');
      this.props.updateRound();
    }, 5000)
  }

  render = () => (
    <Wrapper>
      <UpperBlock>
        <Player1Wrapper>
          <DisplayImage src={this.props.player_1.displayImage}></DisplayImage>
          <PlayerDataWrapper>
            <PlayerName>{this.props.player_1.name}</PlayerName>
            <PlayerTitle>{this.props.player_1.title}</PlayerTitle>
            <PlayerLevel>Level {this.props.player_1.level}</PlayerLevel>
          </PlayerDataWrapper>
        </Player1Wrapper>
      </UpperBlock>
      <PlayersDivider>
        <TopicWrapper>
          <TopicImage src={`/img/topic-${this.props.topicKey}.png`}></TopicImage>
        </TopicWrapper>
      </PlayersDivider>
      <LowerBlock>
        <Player2Wrapper>
          <PlayerDataWrapper>
            <PlayerName>{this.props.player_2.name}</PlayerName>
            <PlayerTitle>{this.props.player_2.title}</PlayerTitle>
            <PlayerLevel>Level {this.props.player_2.level}</PlayerLevel>
          </PlayerDataWrapper>
          <DisplayImage src={this.props.player_2.displayImage}></DisplayImage>
        </Player2Wrapper>
      </LowerBlock>
    </Wrapper>
  )
}

const mapStateToProps = (state, ownProps) => ({
  updateScreen: ownProps.updateScreen,
  topicKey: state.game.key,
  player_1: state.players.player_1,
  player_2: state.players.player_2
});

export default connect(mapStateToProps)(PVPComponent);

// STYLED COMPONENTS

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 1;  
  height: 700px;
  width: 850px;
  border-radius: 30px;
  font-family: 'Varela Round', sans-serif;
  color: white;
  background: linear-gradient(
    to left bottom,
    #4a148c,
    #9c27b0,
    #e91e63,
    #ff1744
  );
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const slideDown = keyframes`
  0% {
    transform: translateY(-380px);
  }
  100% {
    transform: translateY(0);
  }
`;

const UpperBlock = styled.div`
  height: 340px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 2;
  animation: ${slideDown} 0.4s;
`;

const slideUp = keyframes`
  0% {
    transform: translateY(380px);
  }
  100% {
    transform: translateY(0);
  }
`;

const LowerBlock = styled.div`
  height: 100%;
  height: 340px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 2;  
  animation: ${slideUp} 0.4s;
`;

const PlayersDivider = styled.div`  
  width: 968px;
  height: 20px;
  background: linear-gradient(
    to right,
    #4a148c,
    #9c27b0,
    #e91e63,
    #ff1744
  );
`;

const scaleAnimation = keyframes`
  0% {
    transform: scale(0.7);
  }
  10% {
    transform: scale(1);
  }
  20% {
    transform: scale(0.7);
  }
  30% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.7);
  }
  50% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.7);
  }
  70% {
    transform: scale(1);
  }
  80% {
    transform: scale(0.7);
  }
  90% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.7);
  }
`;

const TopicWrapper = styled.div`
  position: absolute;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin: -90 325;
  background: linear-gradient(
    to right,
    #ae259e,
    #df1d6f
  );
  z-index: 4;
  animation: ${scaleAnimation} 8s ease-out;
`;

const TopicImage = styled.img`
  position: absolute;
  height: 180px;
  width: 180px;
  border-radius: 50%;
  margin: 10;
  z-index: 4;
`;

const Player1Wrapper = styled.div`
  position: absolute;
  height: 180px;
  margin: 60 200;
  display: flex;
  z-index: 5;
`;

const Player2Wrapper = styled.div`
  position: absolute;
  height: 180px;
  z-index: 5;
  display: flex;
  margin: 140 0 0 250;
  text-align: right;
`;

const PlayerDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const DisplayImage = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
  border: 2px solid white;
  border-radius: 50%;
  margin: 20;
`;

const PlayerName = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const PlayerTitle = styled.div`
  font-size: 1rem;
`;

const PlayerLevel = styled.div`
  font-size: 1rem;
`;