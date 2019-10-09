import React from 'react'
import styled from 'styled-components'

export default props => {

  setTimeout(() => { props.updateScreen('roundScreen') }, 1500)

  return (
    <Wrapper>
      <RoundInfo>
        <TopicWrapper>
          <TopicImage src={`/img/topic-${props.topicKey}.png`}></TopicImage>
        </TopicWrapper>
        <TopicName>{props.topicName.toUpperCase()}</TopicName>
        <RoundNumber>ROUND {props.round}</RoundNumber>
        <RoundLeft>{props.round} OF 7</RoundLeft>
      </RoundInfo>
    </Wrapper>
  )
}

// STYLED COMPONENTS

const Wrapper = styled.div`
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
`;

const RoundInfo = styled.div`  
  width: 500px;
  height: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const TopicWrapper = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin: 0 auto;
  background: linear-gradient(
    to right,
    #ae259e,
    #df1d6f
  );
`;

const TopicImage = styled.img`
  position: absolute;
  height: 180px;
  width: 180px;
  border-radius: 50%;
  margin: 10;
  z-index: 4;
`;

const TopicName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 20 auto;
`;

const RoundNumber = styled.div`
  font-size: 3rem;
  margin: 20 auto;
`;

const RoundLeft = styled.div`
  font-size: 1.5rem;
  margin: 0 auto;
`;