import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import styled from 'styled-components';

const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'pink'];
const text = ['HOLLA', 'HAPPY', 'BIRTHDAY', 'LILL', 'DIRTY 30', 'LIT', 'CRUNK', 'FLEEK', 'YUGH', 'AW YEAH', 'BIG PIMPIN', 'HOE FA SHO', 'KILLIN IT', 'CLERB', 'FAM', 'BACK IT UP', 'TWERK', ''];

const Canvas = styled.canvas.attrs({width: '100%'})`
  height: 100vh;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: rotate3d(1, 0, 0, 180deg);
  mix-blend-mode: multiply;
`;

const Canvas2 = styled.canvas.attrs({width: '100%'})`
  height: 100vh;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: rotate3d(1, 0, 0, 180deg) translateX(51vw);
  mix-blend-mode: multiply;
`;

const Container = styled.div`
  background: blue;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Text = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;  
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 290px;
  font-family: helvetica;
  font-weight: 800;
  mix-blend-mode: hue;
  color: blue;
  line-height: 1;
  text-align: center;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      text: text[0]
    }
  }

  componentDidMount() {
    const {canvasEl, containerEl} = this;
    canvasEl.width = containerEl.offsetWidth;
    this.play();

    setInterval(() => {
      const color = colors[Math.floor(Math.random()*colors.length)];
      containerEl.style.backgroundColor = color;
      const newtext = text[Math.floor(Math.random()*text.length)];
      this.setState({text: newtext});
    }, 500);


    // const unsplash = new Unsplash({
    //   applicationId: "95d353e9d56c0ca2a16b17543dc776f28964c7d68f729eb1567172c54b1bdcc4",
    //   secret: "90b9ae622cb0779c953941aba547d3aebdd7f95fa0f60effb26ee107d49a6781",
    // });
    //
    // unsplash.photos.getRandomPhoto()
    //   .then(toJson)
    //   .then(json => {
    //     const img = json.links.html;
    //     this.setState({img})
    //   });
  }

  play = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const channels = devices.filter(d => d.label === 'Default');
    const context = new AudioContext();
    const analyser = context.createAnalyser();
    const stream = await navigator.mediaDevices.getUserMedia({audio: {deviceId: channels[0]}});
    const source = context.createMediaStreamSource(stream);
    source.connect(analyser);
    //source.connect(context.destination);
    analyser.fftSize = 32;
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    const {frequencyBinCount} = analyser;
    const renderFrame = () => {
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(frequencyData);
      this.draw(frequencyData, frequencyBinCount);
    };
    renderFrame();
  };

  draw = (frequencyData, frequencyBinCount) => {
    const {canvasEl, canvasEl2, containerEl} = this;
    const color = colors[Math.floor(Math.random()*colors.length)];
    const color2 = colors[Math.floor(Math.random()*colors.length)];
    canvasEl.width = containerEl.offsetWidth;
    canvasEl2.width = containerEl.offsetWidth;
    const WIDTH = canvasEl.offsetWidth;
    const HEIGHT = canvasEl.offsetHeight;
    const ctx = canvasEl.getContext('2d');
    const ctx2 = canvasEl2.getContext('2d');
    const barWidth = 6;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx2.clearRect(0, 0, WIDTH, HEIGHT);
    //canvasEl.style.opacity = Math.round(Math.random());
    //canvasEl2.style.opacity = Math.round(Math.random());
    let x = 0;
    for(let i = 0; i < frequencyBinCount; i++) {
      const barHeight = frequencyData[i]/2;
      ctx.fillStyle = color;
      ctx.fillRect(x,0,barWidth,barHeight);
      ctx2.fillStyle = color2;
      ctx2.fillRect(x,0,barWidth,barHeight);
      x += barWidth + 10  ;
    }
  };

  render() {
    return <Container innerRef={containerEl => this.containerEl = containerEl}>
      <Text>
        <div>{this.state.text}</div>
      </Text>
      <Canvas innerRef={el => this.canvasEl = el} />
      <Canvas2 innerRef={el => this.canvasEl2 = el} />
    </Container>
  }
}

export default App;
