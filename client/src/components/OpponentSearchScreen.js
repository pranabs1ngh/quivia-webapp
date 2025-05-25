import React from 'react'
import styled, { keyframes } from 'styled-components'

const OpponentSearchScreen = () => (
  <>
    <audio src='/audio/searching.mp3' autoPlay />
    <audio src='/audio/battle.mp3' />
    <Wrapper>
      <SpinningGlobe>
        <WorldMap src='img/globe-bg.JPG'></WorldMap>
      </SpinningGlobe>
      <SearchText>Searching for opponent
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </SearchText>
    </Wrapper>
  </>
)

export default OpponentSearchScreen;

// STYLED COMPONENTS

const Wrapper = styled.div`
  height: 700px;
  width: 850px;
  border-radius: 30px;
  padding: 25px;
  font-family: 'Varela Round', sans-serif;
  background: -webkit-linear-gradient(
    to left bottom,
    #ff398a,
    #ff6f4d
  );
  background: linear-gradient(
    to left bottom,
    #ff398a,
    #ff6f4d
  );
  display: flex; 
`;

const spin = keyframes`
  0%{margin-left: -1150px}
`;

const WorldMap = styled.img`
  object-fit: cover;
  height: 300px;
  animation: ${spin} 25s linear reverse infinite;
`;

const SpinningGlobe = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin-top: 200;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  height: 300px;
  width: 300px;
  box-shadow: 0px 0px 15px 0px rgba(94,94,94,1);  
  overflow: hidden;
`;

const SearchText = styled.div`
  margin-top: 500;
  margin-left: auto;
  margin-right: auto;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  display: inline-block;
`;