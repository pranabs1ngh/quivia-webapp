import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class QuizScreen extends React.Component {
  // 1. All Questions will come from redux state  ******
  // 2. Keep question data in component state     ******
  // 3. An object named currentRound will store the question and answers in sequence to view
  //    and the currect answer                    ******
  // 4. A function will take questions from redux state and arrange the answers randomly
  //    and update the component's state          ******
  // 5. render questions() will render question & after 3s the answers
  //    and will call BOTAnswers() or recieve answers from socket
  //    based on player 2
  // 6. Timer will get updated from component state             ******
  //    A timer function will update timer value every second   ******
  // 7. A function will calculate Score, store score in component state, emit score to opponent
  // 8. A function will accept opponents score and update state
  // 9. componentWillMount will call RESULTS page if all questions get answered
  // 10. A function will call the results page if opponent leaves the game
  // 11. A state value will keep track if question number page is shown or not,
  //     if not it will be rendered first

  state = {
    currentRound: 0,
    question: '',
    answers: [],
    playerScore: 0,
    opponentScore: 0,
    timer: 10
  }

  socket = this.props.socket;

  timer = () => {
    while (this.state.timer > 0) {
      setTimeout(() => {
        this.setState(state => ({ timer: state.timer - 1 }));
      }, 1000);
    }
    // renderResultScreen();
  }

  arrangeOptions = (correctAns, incorrectAns) => {
    let answers = ['', '', '', ''];
    const random = Math.round(Math.random() * 4);
    answers[random] = correctAns;
    let pointer = 0;
    incorrectAns.forEach(element => {
      if (pointer == random) pointer++;
      answers[pointer] = element;
      pointer++;
    });

    this.setState({ answers })
    this.setState({ correctAns: random });
  }

  calculateScore = ans => {
    if (this.state.currentRound === 6 && ans == this.state.quizData.correctAns)
      this.setState(state => ({ playerScore: state.playerScore + 20 + (state.timer * 2) }));
    else if (ans == this.state.quizData.correctAns) this.setState(state => ({ playerScore: state.playerScore + 10 + state.timer }));
  }

  componentWillMount = () => {
    const { question, correct_answer, incorrect_answers } = this.props.questions[this.state.currentRound];
    this.setState({ question });
    this.arrangeOptions(correct_answer, incorrect_answers);
  }

  render = () => { }
}

mapStateToProps = state => ({
  socket: state.socket,
  player_1: state.players.player_1,
  player_2: state.players.player_2,
  questions: state.questions
})

export default connect(mapStateToProps)(QuizScreen);