import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class ResultScreen extends React.Component {
  render = () => (
    <Wrapper>
      <ResultWrapper>
        <Result> YOU WIN </Result>
        <PlayerData>
          <Player1Wrapper>
            <UpperPart>
              <Score1>100</Score1>
              <DisplayImage1 src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'></DisplayImage1>
            </UpperPart>
            <PlayerName1>Pranab Singh</PlayerName1>
            <PlayerTitle>Freshman</PlayerTitle>
            <PlayerLevel>Level 5</PlayerLevel>
          </Player1Wrapper>
          <MidText>VS</MidText>
          <Player2Wrapper>
            <UpperPart>
              <DisplayImage2 src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'></DisplayImage2>
              <Score2>120</Score2>
            </UpperPart>
            <PlayerName2>Tushar Maharana</PlayerName2>
            <PlayerTitle>Warrior</PlayerTitle>
            <PlayerLevel>Level 10</PlayerLevel>
          </Player2Wrapper>
        </PlayerData>

        <Button>Rematch</Button>
        <Button>Another Game</Button>
      </ResultWrapper>
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  // player_1: state.players.player_1,
  // player_2: state.players.player_1
});

export default connect(mapStateToProps)(ResultScreen);

// STYLED COMPONENTS

const Wrapper = styled.div`
  height: 768px;
  width: 956px;
  border-radius: 30px;
  font-family: 'Varela Round', sans-serif;
  color: white;
  background: linear-gradient(
    to left bottom,
    #f50057,
    #ff1744,
    #f44336,
    #ff6f00
  );
  display: flex;
  flex-direction: column;
`;

const ResultWrapper = styled.div`
  margin: auto;
  height: 80%;
  width: 70%;
  border-radius: 30px;
  background: rgb(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
`;

const Result = styled.div`
  height: 60px;  
  font-size: 48px;
  font-weight: 800;
  color: #fff;
  margin: 20 auto;
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
  color: red;
  margin: auto;
`;

const Score2 = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #00e676;
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
  color: grey;
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
  border: 5px solid #ff1744;
`;

const DisplayImage2 = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid #00e676;
`;

const PlayerName1 = styled.div`
  font-size: 1.5rem;
  margin-top: 20;
  font-weight: bold;
  color: #ff1744;
`;

const PlayerName2 = styled.div`
  font-size: 1.5rem;
  margin-top: 20;
  font-weight: bold;
  color: #00e676;
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