import React from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import { storePlayersData } from '../actions'

class QuestionScreen extends React.Component {
  state = {
    currentRound: 0,
    displayAns: 'none',
    sectionCover: 'none',
    question: '',
    answers: [],
    correctAns: null,
    selectedAnswer: null,
    playerScore: 0,
    oppAnswer: null,
    oppAnswerSt: null,
    oppScore: 0,
    answered: false,
    numOfPlayersAns: null,
    showCorrectAnswer: false,
    timeLeft: 10
  }

  timer = () => {
    setTimeout(() => {
      if (this.state.timeLeft > 0 && !this.state.answered) {
        this.setState({ timeLeft: this.state.timeLeft - 1 });
        this.timer();
      } else if (this.state.timeLeft === 0) this.showAnswers();
    }, 1000);
  }

  botAnswer = () => {
    const time = Math.round(Math.random() * 4) + 3;
    setTimeout(() => {
      const random = Math.round(Math.random() * 10);
      const numOfPlayersAns = this.state.numOfPlayersAns + 1;

      let ans, score;
      if (random >= 5) {
        ans = this.state.correctAns;
        score = this.state.oppScore + 10 + time;
      } else {
        ans = Math.round(Math.random() * 4);
        if (ans === this.state.correctAns) score = this.state.oppScore + 10 + time;
        else score = this.state.oppScore;
      }

      this.setState({ oppAnswerSt: ans, oppScore: score, numOfPlayersAns })
      this.showAnswers();
    }, time * 1000);
  }

  sendAnswer = () => {
    const socket = this.props.socket;
    const { selectedAnswer, playerScore } = this.state;
    socket.emit('answered', ({ selectedAnswer, playerScore }));
  }

  receiveAnswer = () => {
    const socket = this.props.socket;
    socket.on('receiveAnswer', ({ selectedAnswer, playerScore }) => {
      const num = this.state.numOfPlayersAns + 1;
      this.setState({ oppAnswerSt: selectedAnswer, numOfPlayersAns: num, oppScore: playerScore });
      this.showAnswers();
    })
  }

  showAnswers = () => {
    console.log(this.state.numOfPlayersAns);
    if (this.state.numOfPlayersAns === 2) {
      this.setState({ oppAnswer: this.state.oppAnswerSt });
      setTimeout(() => {
        this.setState({ showCorrectAnswer: true });
        this.renderNextScreen();
      }, 500);
    }
  }

  decodeEscapeChars = key => {
    key = key.replace('&quot;', '"');
    key = key.replace('&quot;', '"');
    key = key.replace('&ldquo;', '"');
    key = key.replace('&ldquo;', '"');
    key = key.replace('&rdquo;', '"');
    key = key.replace('&rdquo;', '"');
    key = key.replace('&#039;', "'");
    key = key.replace('&#039;', "'");
    key = key.replace('&oacute;', 'Ó');
    key = key.replace('&uuml;', 'Ü');
    key = key.replace('&aring;', 'Å');
    key = key.replace('&ouml;', 'Ö');
    key = key.replace('&auml;', 'Ä');
    return key;
  }

  arrangeOptions = (correctAns, incorrectAns) => {
    let answers = ['', '', '', ''];
    let random = Math.round(Math.random() * 4);
    if (random === 4) random--;

    correctAns = this.decodeEscapeChars(correctAns);
    answers[random] = correctAns;

    let pointer = 0;
    incorrectAns.forEach(element => {
      element = this.decodeEscapeChars(element);
      if (pointer === random) pointer++;
      answers[pointer] = element;
      pointer++;
    });

    this.setState({ answers })
    this.setState({ correctAns: random });
  }

  answerVisibilityStatus = key => {
    if (this.state.showCorrectAnswer) {
      if (key === this.state.correctAns) return 'visible'
      else return 'hidden'
    }
    return 'visible'
  }

  handleClick = key => {
    const playerScore = (key === this.state.correctAns) ? this.state.playerScore + 10 + this.state.timeLeft : 0;
    const numOfPlayersAns = this.state.numOfPlayersAns + 1;
    this.setState({
      selectedAnswer: key,
      sectionCover: 'block',
      answered: true,
      playerScore,
      numOfPlayersAns
    });

    setTimeout(() => {
      this.showAnswers();
    }, 500);
  }

  returnColors = type => {
    switch (type) {
      case 'correct':
        return { bg1: '#00e676', bg2: '#00c853', color: '#fff' }
      case 'incorrect':
        return { bg1: '#ff3d00', bg2: '#dd2c00', color: '#fff' }
      default:
        return { bg1: '#fff', bg2: '#eee', color: '#000' }
    }
  }

  answerBtn = (answer, key) => {
    const { selectedAnswer, oppAnswer, correctAns } = this.state;
    let colors;

    if (key === selectedAnswer && key === correctAns) colors = this.returnColors('correct')
    else if (key === selectedAnswer && key !== correctAns) colors = this.returnColors('incorrect')
    else if (key === oppAnswer && key === correctAns) colors = this.returnColors('correct')
    else if (key === oppAnswer && key !== correctAns) colors = this.returnColors('incorrect')
    else if (this.state.showCorrectAnswer) colors = this.returnColors('correct')
    else colors = this.returnColors()

    const { bg1, bg2, color } = colors;

    return (
      <AnswerWrapper
        onClick={() => this.handleClick(key)}
        key={key}
        bg1={bg1}
        color={color}
        vis={this.answerVisibilityStatus(key)}
      >
        <Player1Selected display={this.state.selectedAnswer === key ? 'block' : 'none'}></Player1Selected>
        <Index bg2={bg2}>{String.fromCharCode(key + 65)}</Index>
        <Answer>{answer}</Answer>
        <Player2Selected display={this.state.oppAnswer === key ? 'block' : 'none'}></Player2Selected>
      </AnswerWrapper>
    )
  }

  renderNextScreen = () => {
    setTimeout(() => {
      if (this.props.game.round === 6) this.props.updateScreen('questionScreen')
      else this.props.updateRound();
    }, 1000);
  }

  componentWillMount = () => {
    let { question, correct_answer, incorrect_answers } = this.props.questions[this.props.game.round];

    question = this.decodeEscapeChars(question);
    this.setState({ question, numOfPlayersAns: 0 });

    this.arrangeOptions(correct_answer, incorrect_answers);

    setTimeout(() => {
      this.setState({ displayAns: 'flex' });
      this.timer();

      if (this.props.player_2.title === 'BOT') this.botAnswer();
      else this.receiveAnswer();
    }, 2000)
  }

  render = () => (
    <Wrapper>
      <QuestionSection>
        <Header>
          <Player1Wrapper>
            <DisplayImage src={this.props.player_1.displayImage}></DisplayImage>
            <PlayerDataWrapper>
              <PlayerName>{this.props.player_1.name}</PlayerName>
              <PlayerTitle>{this.props.player_1.title}</PlayerTitle>
              <Score>{this.state.playerScore}</Score>
            </PlayerDataWrapper>
          </Player1Wrapper>
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
          <Player2Wrapper>
            <PlayerDataWrapper>
              <PlayerName>{this.props.player_2.name}</PlayerName>
              <PlayerTitle>{this.props.player_2.title}</PlayerTitle>
              <Score>{this.state.oppScore}</Score>
            </PlayerDataWrapper>
            <DisplayImage src={this.props.player_2.displayImage}></DisplayImage>
          </Player2Wrapper>
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

const mapStateToProps = (state, ownProps) => ({
  game: state.game,
  socket: ownProps.socket,
  updateRound: ownProps.updateRound,
  updateScreen: ownProps.updateScreen,
  player_1: state.players.player_1,
  player_2: state.players.player_2,
  questions: state.questions
})

export default connect(mapStateToProps, { storePlayersData })(QuestionScreen)

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

const Player1Wrapper = styled.div`
  width: 300px;
  display: flex;
  text-align: left;
  justify-content: flex-start;
`;

const Player2Wrapper = styled.div`
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
  font-size: 1.8rem;
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
  visibility: ${props => props.vis}
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
  font-size: 1.5rem;
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