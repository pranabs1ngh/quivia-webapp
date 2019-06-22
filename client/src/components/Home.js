import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { fetchUser } from '../actions';

const Wrapper = styled.div`
  overflow: hidden;
  width: 956px;
  padding: 25px;
  height: 768px;
  font-family: 'Varela Round', sans-serif;
  z-index: 2;
  display: flex;
`;

const Dashboard = styled.div`
  width: 60%;
  background: -webkit-linear-gradient(
    to left bottom,
    #e91e63,
    #ff5722
  );
  background: linear-gradient(
    to left bottom,
    #e91e63,
    #ff5722
  );
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 15px;
  border-top-left-radius: 25%;
  height: 550px;
  margin-top: 75px;
  z-index: 4;
`;

const Logo = styled.img`
  width: 100px;
  margin: 30px 10px 10px 250px;
`;

const Title = styled.div`
  margin: 25px 0 0 -25px;
  border-radius: 35px;
  height: 50px;
  width: 120px;
  background: #fff;
  padding: 16px;
  text-align: center;
  font-size: 15px;
  z-index: 5;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-left: 132px;
  margin-top: -50;
  margin-bottom: 60px;
  object-fit: cover;
  z-index: 5;
`;

const Namespace = styled.img`
  width: 150px;
  float: right;
  margin-right: -25px;
  margin-top: -70px;
  z-index: 5;
`;

const NamespaceData = styled.div`
  position: absolute;
  width: 150px;
  margin-left: 205px;
  margin-top: -150px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: right;
`;

const Surname = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

const Progress = styled.div`
  margin: 20px;
  color: #fff;
  font-weight: bold;
`;

const ProgressHeading = styled.div`
  margin: 10px;
`;

const ProgressBar = styled.div`
  height: 30px;
  background: #fff;
  padding: 7px;
  border-radius: 10px;
`;

const ProgressBarStriped = styled.div`
  display: -ms-flexbox;
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  border-radius: 0.35rem;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  width: ${props => props.width}%;
  background-size: 1rem 1rem;
  background-color: #ff5722 !important;
`;

const SignOut = styled.div`
  background: #fff;
  border-radius: 20px;
  border-top-left-radius: 35px;
  height: 70px;
  width: 65px;
  padding: 28px 10px 25px 23px;
  color: black;
  margin-top: 35px;
  margin-left: 275px;
  cursor: pointer;

  :hover {
    padding-right: 12px;
    transition: .2s ease-in-out;
    transform: scale(1.05);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const Topics = styled.div`
  margin: 15px 0 15px -75px;
  border-radius: 10px;
  padding: 15px 15px 15px 115px;
  background-color: #f6f7fc;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 100%;
  z-index: 3;
`;

const TopicHeading = styled.div`
  margin-top: 10px; 
  margin-bottom: 7px; 
  margin-left: 20px;
  font-size: 2rem;
  font-weight: bold;
  display: inline-block;
`;

const TopicBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 5px;
`;

const TopicCard = styled.div`
  height: 95px;
  width: 95px;
  padding: 10px;
  margin: 12px;
  background: #fff;
  border-radius: 20px;
  text-align: center;

  :hover {
    transition: .2s ease-in-out;
    transform: scale(1.05);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
  }
`;

const TopicImg = styled.img`
  height: 60px;
  width: 60px;
`;

const TopicTitle = styled.h5`
  margin-top: 5px;
`;

class Home extends React.Component {
  splitName = name => name = name ? name.split(' ') : '';

  names = ['GK', 'Books', 'Film', 'Music', 'Television', 'Games', 'Science', 'Compuers', 'Maths', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Comics', 'Gadgets'];
  topicNo = [9, 10, 11, 12, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  percentage = data => {
    if (data) {
      const percentage = Math.round(((data.won / (data.won + data.lost)) * 100));
      if (percentage) return percentage;
      else return 100;
    }
  }

  topicCards = (topicName, topicNo) => {
    return (
      <TopicCard>
        <TopicImg src={`/img/topic-${topicNo}.png`}></TopicImg>
        <TopicTitle>{topicName}</TopicTitle>
      </TopicCard>
    );
  }

  signOut = () => {
    axios.get('/api/user/signout')
      .then(res => {
        if (!res.data.auth) this.props.history.push('/user/signin');
      })
  }

  componentWillMount = async () => {
    await this.props.fetchUser();

    if (!this.props.user) this.props.history.push('/user/signin');
  }

  render = () => {
    return (
      <Wrapper>
        <Dashboard>
          <Logo src="img/logo.png" alt="profile-pic"></Logo>
          <Title><h4>{this.props.user.title}</h4></Title>
          <ProfilePic src={this.props.user.displayImage}></ProfilePic>
          <Namespace src="img/namespace-bg.png"></Namespace>
          <NamespaceData>
            {this.splitName(this.props.user.name)[0]}
            <br></br>
            <Surname>
              {this.splitName(this.props.user.name)[1]}
            </Surname>
          </NamespaceData>
          <Progress>
            <ProgressHeading>Games Won: {this.percentage(this.props.user.noOfGamesPlayed)}%</ProgressHeading>
            <ProgressBar>
              <ProgressBarStriped width={this.percentage(this.props.user.noOfGamesPlayed)}></ProgressBarStriped>
            </ProgressBar>
          </Progress>
          <Progress>
            <ProgressHeading>Accuracy: {this.percentage(this.props.user.noOfQuestionsPlayed)}%</ProgressHeading>
            <ProgressBar>
              <ProgressBarStriped width={this.percentage(this.props.user.noOfQuestionsPlayed)}></ProgressBarStriped>
            </ProgressBar>
          </Progress>
          <SignOut onClick={this.signOut} >
            <i className="fa fa-power-off fa-lg" aria-hidden="true"></i>
          </SignOut>
        </Dashboard>

        <Topics>
          <TopicHeading>Topics</TopicHeading>
          <TopicBoard>{this.names.map((name, index) => this.topicCards(name, this.topicNo[index]))}</TopicBoard>
        </Topics>
      </Wrapper>
    );
  };
};

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { fetchUser })(Home);