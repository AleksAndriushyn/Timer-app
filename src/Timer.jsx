import React from 'react';
import prettyMilliseconds from 'pretty-ms';
import { Observable, timer } from 'rxjs';

class Timer extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        time: 0,
        isOn: false,
        start: 0
      }
      this.startTimer = this.startTimer.bind(this)
      this.stopTimer = this.stopTimer.bind(this)
      this.waitTimer = this.waitTimer.bind(this)
      this.resetTimer = this.resetTimer.bind(this)
    }

    startTimer() {
      this.setState({
        isOn: true,
        time: this.state.time,
        start: Date.now() - this.state.time
      })
      this.timer = setInterval(() => this.setState({
        time: Date.now() - this.state.start
      }), 1000);
    }

    waitTimer() {
        this.setState({isOn: false})
        clearInterval(this.timer)
    }

    stopTimer() {
        this.setState({time: 0, isOn: false})
        clearInterval(this.timer)
    }

    resetTimer() {
        clearInterval(this.timer)
        this.setState({
            isOn: false,
            time: 0
          })
          this.timer = setInterval(() => this.setState({
            time: this.state.time + 1000
          }), 1000)
    }

    render() {
      let start = (this.state.time == 0) ?
        <button onClick={this.startTimer}>start</button> :
        null
      let stop = (this.state.time == 0 || !this.state.isOn) ?
        null :
        <button onClick={this.stopTimer}>stop</button>
      let wait = (this.state.time == 0 || !this.state.isOn) ?
        null :
        <button onClick={this.waitTimer}>wait</button>
      let resume = (this.state.time == 0 || this.state.isOn) ?
        null :
        <button onClick={this.startTimer}>resume</button>
      let reset = (this.state.time == 0 || this.state.isOn) ?
        null :
        <button onClick={this.resetTimer}>reset</button>
      return(
        <div>
          <h3>timer: {prettyMilliseconds(this.state.time)}</h3>
          {start}
          {resume}
          {stop}
          {wait}
          {reset}
        </div>
      )
    }
  }


export default Timer;