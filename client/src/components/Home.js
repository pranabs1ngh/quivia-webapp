import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { fetchUser, storeGameData } from '../actions';

class Home extends React.Component {
  state = { user: false }

  names = ['GK', 'Books', 'Film', 'Music', 'Television', 'Games', 'Science', 'Computers', 'Maths', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Comics', 'Gadgets'];
  topicNo = [9, 10, 11, 12, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  splitName = name => name = name ? name.split(' ') : '';

  percentage = data => {
    if (data) {
      const percentage = Math.round(((data.won / (data.won + data.lost)) * 100));
      if (percentage) return percentage;
      else return 0;
    }
  }

  topicCards = (topicName, topicNo) => (
    <TopicCard onClick={() => this.onCardClick(topicNo, topicName)} key={topicNo}>
      <TopicImg src={`/img/topic-${topicNo}.png`}></TopicImg>
      <TopicTitle>{topicName}</TopicTitle>
    </TopicCard>
  )

  onCardClick = (key, topic) => {
    this.props.storeGameData({ key, topic, round: 1, socketRoomID: null });
    this.props.history.push('/gameplay');
  };

  signOut = () => {
    axios.get('/api/user/signout')
      .then(res => {
        if (!res.data.auth) this.props.history.push('/user/signin');
      })
  }

  componentWillMount = async () => {
    await this.props.fetchUser();
    if (this.props.user) this.setState({ user: true });
    else this.props.history.push('/user/signin');
  }

  render = () => {
    if (!this.state.user) return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    else return (
      <>
        <audio src='/audio/searching.mp3' />
        <Wrapper>
          <DashboardShadow></DashboardShadow>
          <DashboardBG src='img/dashboard-bg.png'></DashboardBG>
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
              <Level>Level {this.props.user.level}</Level>
            </NamespaceData>
            <ProgressData>
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
            </ProgressData>
            <SignOut onClick={this.signOut} >
              <i className="fa fa-power-off fa-lg" aria-hidden="true"></i>
            </SignOut>
          </Dashboard>

          <Topics>
            <TopicHeading>Topics</TopicHeading>
            <TopicBoard>{this.names.map((name, index) => this.topicCards(name, this.topicNo[index]))}</TopicBoard>
          </Topics>
        </Wrapper>
      </>
    );
  };
};

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { fetchUser, storeGameData })(Home);


// STYLED COMPONENTS

const Wrapper = styled.div`
  overflow: hidden;
  width: 956px;
  padding: 25px;
  height: 768px;
  font-family: 'Varela Round', sans-serif;
  display: flex;
  @media (max-height: 768px) {
    height: 750px;
  }
`;

const DashboardShadow = styled.div`
  position: absolute;
  margin: 115 0 0 14;
  border-bottom-left-radius: 35px;
  border-top-left-radius: 180px;
  border-bottom-right-radius: 35px;
  border-top-right-radius: 35px;
  box-shadow: 0px 0px 15px 0px rgba(94,94,94,1);  
  height: 500px;
  width: 359px;
  z-index: 2;
`;

const DashboardBG = styled.img`
  position: absolute;
  margin: 115 0 0 -125;
  z-index: 2;
`;


const Dashboard = styled.div`
  margin-top: 115px;
  z-index: 3;
`;

const Logo = styled.img`
  width: 100px;
  margin: 30px 10px 10px 245px;
`;

const Title = styled.div`
  margin: 40 0 0 -20;
  border-radius: 35px;
  height: 50px;
  width: 120px;
  background: #fff;
  padding: 16px;
  text-align: center;
  font-size: 15px;
`;

const ProfilePic = styled.img`
  margin: -55 0 60 145;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  object-fit: cover;
`;

const Namespace = styled.img`
  margin: -175 0 0 255;
  float: right;
  width: 150px;  
`;

const NamespaceData = styled.div`
  margin: -150 25 0 0;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: right;
`;

const Surname = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

const Level = styled.div`
  margin-top: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ProgressData = styled.div`
  margin: 40 0 0 30;
  width: 320px;
`;

const Progress = styled.div`
  margin: 20 0 0 0;
`;

const ProgressHeading = styled.div`
  color: #fff;
  font-weight: bold;
  margin: 10px;
`;

const ProgressBar = styled.div`
  height: 30px;
  background: #fff;
  padding: 7px;
  border-radius: 0.65rem;
`;

const ProgressBarStriped = styled.div`  
  height: 1rem;
  border-radius: 0.45rem;
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
  margin: 25 0 0 285;
  cursor: pointer;

  :hover {
    padding-right: 12px;
    transition: .2s ease-in-out;
    transform: scale(1.05);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const Topics = styled.div`
  margin: 15 0 15 -95;
  border-radius: 30px;
  padding: 15 15 15 95;
  background-color: #f6f7fc;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 100%;
  z-index: 1;
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
  @media (max-height: 768px) {
    height: 90px;
    width: 90px;
  }
`;

const TopicImg = styled.img`
  height: 60px;
  width: 60px;
  @media (max-height: 768px) {
    height: 55px;
    width: 55px;
  }
`;

const TopicTitle = styled.h5`
  margin-top: 5px;
`;