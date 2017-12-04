import React, { Component } from 'react';
import Lowrider from './components/lowrider';
import styled, {keyframes} from 'styled-components';
import background from './images/lowrider/bg.png';

const bgPosition = keyframes`
	from {background-position: 0vw 0%;}
	to {background-position: 94.85vw 0%;}
`;

const Background = styled.div`
  background-image: url(${background});
  background-repeat-y: no-repeat;
  background-repeat-x: repeat;
  animation: ${bgPosition} 10s linear infinite;
  min-height: 300px;
  position: relative;
  z-index: -2;
`;



class App extends Component {
  render() {
    return (
      <div>
        <Background>
        <Lowrider/>
        </Background>
      </div>
    );
  }
}

export default App;
