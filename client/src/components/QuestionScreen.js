import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

class QuestionScreen extends React.Component {
  state = {
    currentRound: 0,
    displayAns: 'none',
    sectionCover: 'none',
    question: 'What is your name?',
    answers: ['Pranab', 'Ravik', 'Anish', 'Sushant'],
    correctAns: 0,
    selectedAnswer: null,
    oppAnswer: null,
    playerScore: 0,
    opponentScore: 0,
    answered: false,
    showCorrectAnswer: false,
    timeLeft: 10
  }

  timer = () => {
    setTimeout(() => {
      if (this.state.timeLeft > 0 && !this.state.answered) {
        this.setState({ timeLeft: this.state.timeLeft - 1 });
        this.timer();
      } else this.showCorrectAnswer();
    }, 1000);
  }

  answerDisplayStatus = key => {
    if (this.state.showCorrectAnswer) {
      if (key === this.state.correctAns) return 'flex'
      else return 'none'
    }
    return 'flex'
  }

  answerBtn = (answer, key) => {
    const { selectedAnswer, oppAnswer, correctAns } = this.state;
    let bg1, bg2, color;

    if (key === selectedAnswer && key === correctAns) {
      bg1 = '#00e676';
      bg2 = '#00c853';
      color = '#fff';
    } else if (key === selectedAnswer && key !== correctAns) {
      bg1 = '#ff3d00';
      bg2 = '#dd2c00';
      color = '#fff';
    } else if (key === oppAnswer && key === correctAns) {
      bg1 = '#00e676';
      bg2 = '#00c853';
      color = '#fff';
    } else if (key === oppAnswer && key !== correctAns) {
      bg1 = '#ff3d00';
      bg2 = '#dd2c00';
      color = '#fff';
    } else if (this.state.showCorrectAnswer) {
      bg1 = '#00e676';
      bg2 = '#00c853';
      color = '#fff';
    } else {
      bg1 = '#fff';
      bg2 = '#eee';
      color = '#000';
    }

    return (
      <AnswerWrapper
        onClick={() => this.handleClick(key)}
        key={key}
        bg1={bg1}
        color={color}
        disp={this.answerDisplayStatus(key)}
      >
        <Player1Selected display={this.state.selectedAnswer === key ? 'block' : 'none'}></Player1Selected>
        <Index bg2={bg2}>{String.fromCharCode(key + 65)}</Index>
        <Answer>{answer}</Answer>
        <Player2Selected display={this.state.oppAnswer === key ? 'block' : 'none'}></Player2Selected>
      </AnswerWrapper>
    )
  }

  handleClick = key => {
    const playerScore = (key === this.state.correctAns) ? this.state.playerScore + 10 + this.state.timeLeft : 0;
    this.setState({
      selectedAnswer: key,
      sectionCover: 'block',
      answered: true,
      playerScore
    });
  }

  showCorrectAnswer = () => { this.setState({ showCorrectAnswer: true }) }

  componentWillMount = () => {
    setTimeout(() => {
      this.setState({ displayAns: 'flex' });
      this.timer();
    }, 2000)
  }

  render = () => (
    <Wrapper>
      <QuestionSection>
        <Header>
          <Player2Wrapper>
            <DisplayImage src='https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png'></DisplayImage>
            <PlayerDataWrapper>
              <PlayerName>Pranab Singh</PlayerName>
              <PlayerTitle>Freshman</PlayerTitle>
              <Score>{this.state.playerScore}</Score>
            </PlayerDataWrapper>
          </Player2Wrapper>
          <Timer>
            <CircularProgressbar
              value={this.state.timeLeft * 10}
              text={`${this.state.timeLeft}`}
              styles={buildStyles({
                pathTransitionDuration: 1,
                textColor: "#9c27b0",
                textSize: "1.8em",
                pathColor: "#9c27b0",
                trailColor: "transparent"
              })}
            />
          </Timer>
          <Player1Wrapper>
            <PlayerDataWrapper>
              <PlayerName>Tushar Maharana</PlayerName>
              <PlayerTitle>Warrior</PlayerTitle>
              <Score>125</Score>
            </PlayerDataWrapper>
            <DisplayImage src='https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png'></DisplayImage>
          </Player1Wrapper>
        </Header>
        <Question>{this.state.question}</Question>
      </QuestionSection>
      <AnswersSection display={this.state.displayAns}>
        {this.state.answers.map((val, index) => this.answerBtn(val, index))}
      </AnswersSection>
      <SectionCover display={this.state.sectionCover}></SectionCover>
    </Wrapper>
  )
}

const mapStateToProps = () => ({
  //
})

export default connect(mapStateToProps)(QuestionScreen)

// STYLED COMPONENTS

const Wrapper = styled.div`
  height: 700px;
  width: 850px;
  border-radius: 30px;
  background: #f6f7fc;
  color: #fff;
  font-family: 'Varela Round', sans-serif;
  overflow: hidden;
`;

const QuestionSection = styled.div`
  height: 400px;
  margin: 10;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    to left bottom,
    #4a148c,
    #9c27b0,
    #e91e63
  );
`;

const Header = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
`;

const Player2Wrapper = styled.div`
  width: 300px;
  display: flex;
  text-align: left;
  justify-content: flex-start;
`;

const Player1Wrapper = styled.div`
  width: 300px;
  display: flex;
  text-align: right;
  justify-content: flex-end;
`;

const DisplayImage = styled.img`
  height: 60px;
  width: 60px;
  object-fit: cover;
  border: 2px solid white;
  border-radius: 50%;
  margin: 20;
`;

const PlayerDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20 0 20 0;
`;

const PlayerName = styled.div`
  font-size: 15px;
  color: #fff;
`;

const PlayerTitle = styled.div`
  font-size: 10px;
  color: #eee;
`;

const Score = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const Timer = styled.div`
  margin: 10;
  padding: 5;
  height: 80px;
  width: 80px;
  background: #fff;
  border-radius: 50%;
`;

const Question = styled.div`
  margin: 80 auto;
  width: 600px;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
`;

const AnswersSection = styled.div`
  margin: 10;
  padding: 20px;
  display: ${props => props.display};
  flex-wrap: wrap;
`;

const FadeIn = keyframes`
  from { opacity: 0}
  to { opacity: 1}
`;

const AnswerWrapper = styled.div`
  height: 80px;
  width: 365px;
  margin: 15;
  background: ${props => props.bg1};
  border-radius: 15px;
  display: flex;
  display: ${props => props.disp}
  animation: ${FadeIn} 1s ease-out;
  cursor: pointer;
  color: ${props => props.color};

  :nth-child(2) {
    background: ${props => props.bg2};
  }
  :hover {
    transition: .2s ease-in-out;
    transform: scale(1.01);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: #fce4ec;
    color: #f50057;
  }
  :hover :nth-child(2) {
    background: #f8bbd0;
  }
`;

const Index = styled.div`
  margin: 15;
  padding: 15;
  height: 50px;
  width: 50px;
  border-radius: 10px;
  background: ${props => props.bg2};
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
`;

const Answer = styled.div`
  margin: auto -70;
  width: 365px;
  text-align: center;
  font-size: 1.3vw;
  font-weight: 600;
`;

const Player1Selected = styled.div`
  position: absolute;
  margin: 30 0 0 -10;
  background: #f6f7fc;
  height: 20px;
  width: 20px;
  border-radius: 50px;
  display: ${props => props.display}
`;

const Player2Selected = styled.div`
  position: absolute;
  margin: 30 0 0 355;
  background: #f6f7fc;
  height: 20px;
  width: 20px;
  border-radius: 50px;
  display: ${props => props.display}
`;

const SectionCover = styled.div`
  margin-top: -690;
  height: 700px;
  width: 850px;
  position: absolute;
  display: ${props => props.display}
`;