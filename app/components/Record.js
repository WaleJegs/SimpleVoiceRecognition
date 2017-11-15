import React, { Component } from 'react';
import axios from 'axios';
import Recorder from 'recorder-js'


export default class Recorder1 extends Component{
  constructor(){
    super()
    this.state = {
      prediction: 'PENDING',
      recorder: new Recorder(new (window.AudioContext || window.webkitAudioContext)()),
      blob: null,
      isRecording: false,
      male: false,
      female: false
    }
    this.onClickStart = this.onClickStart.bind(this)
    this.onClickStop = this.onClickStop.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    navigator.mediaDevices.getUserMedia({audio: true})
    .then(stream => this.state.recorder.init(stream))
    .catch(err => console.log('Uh oh... unable to get stream...', err));
  }

  render(){
  let prediction = this.state.prediction;
  let imageDiv = {backgroundColor: 'black', width: 1400, height: 350, margin: 20, borderRadius: 15}
  let image = {width: 1350, height: 200, margin: 20, borderRadius: 15}
  return (
  <div id="center">
    <h1> Simple Voice Recognition</h1>
    <div id="clean center" >
      <div>
        <div style={ imageDiv } >
          { this.state.isRecording ? <img style = {image} src="https://media1.tenor.com/images/822ea9756d47313cb96bf160f8841944/tenor.gif?itemid=5538914" /> : null}
        </div>
      </div>

      <div id="smooth">
        <div id="eles">
          <button id="btn" onClick = {this.onClickStart}> Start Recording </button>
          <button id="btn" onClick = {this.onClickStop}> Stop Recording </button>
        </div>
        <div id="eles">
          <form>
            <input type="checkbox" value={this.state.female} onChange={this.handleChange} name="female" /> <span id="gender"> FEMALE </span> <br /> <br /> <br /> <br />
            <input type="checkbox" value={this.state.male} onChange={this.handleChange} name="male" /> <span id="gender"> MALE </span>
          </form>
        </div>
        <div id="eles">
          <span id="gender">Prediction: {prediction}</span> <br />
          <span id="gender"> Actual: { this.state.female && !this.state.male ? 'FEMALE'  : null} {this.state.male && !this.state.female ? 'MALE' : null} </span>
        </div>
      </div>
    </div>
  </div>)
  }

  onClickStart(){
    this.state.recorder.start()
    .then(() => {
      this.setState({isRecording: true})
      console.log('recording....')
    })
    .catch(error => console.error(error))
  }

  onClickStop(){
    this.state.recorder.stop()
    .then(({blob, buffer}) => {
      this.setState({blob, isRecording: false})
      console.log('recording stop')
      console.log(blob)
        axios.post('/api/convert', blob)
        .then(output => {
          console.log(output)
          this.setState({prediction: output.data.toUpperCase()})
        })
      Recorder.download(blob, 'cozywaved93overload')
    });
  }

  handleSubmit(evt){
    evt.preventDefault()
    this.setState({male: evt.target.male.value, female: evt.target.female.value})
  }

  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
}
