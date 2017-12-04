import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';
import CarBody from './../images/lowrider/SVG/body.svg';
import CarWheel from './../images/lowrider/SVG/wheel.svg';

const rotate360 = keyframes`
	from {transform: rotate(0deg);}
	to {transform: rotate(-360deg);}
`;

const backBodyAnimation = keyframes`
	from {transform: translateY(0px) rotateZ(0);}
	to {transform: translateY(-1px) rotateZ(0.1deg);}
`;

const frontBodyAnimation = keyframes`
	0% {transform: rotateZ(0);}
	50% {transform: rotateZ(0.5deg);}
	100% {transform: rotateZ(0deg);}
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	transform: translateY(190px);
`;

const LowRider = styled.div`
  min-width: 300px;
  position: relative;
`;

const BodyFrontOrigin = styled.div`
  transform-origin: 10% 50%;
  animation: ${frontBodyAnimation} 1s cubic-bezier(.42,0,.58,1) infinite;
`;

const Body = styled.img`
  width: 100%;
  transform-origin: 75% 50%;
  animation: ${backBodyAnimation} 0.3s cubic-bezier(.42,0,.58,1) alternate infinite;
`;


const Wheel = styled.img`
  width: 15%;
  position: absolute;
  z-index: -1;
  bottom: -15%;
  animation: ${rotate360} 2s linear infinite;
`;

const FrontWheel = Wheel.extend`
  left: 8%;
`;

const BackWheel = Wheel.extend`
  right: 20%;
`;

export default class Lowrider extends Component {
  render() {
    return <Container>
      <LowRider>
        <BodyFrontOrigin>
          <Body src={CarBody}/>
        </BodyFrontOrigin>
        <FrontWheel src={CarWheel}/>
        <BackWheel src={CarWheel}/>
      </LowRider>
    </Container>
  }
}