import * as React from 'react';
import { Component } from 'react';

interface State {
  state: 'waiting' | 'now' | 'ready';
  message: string;
  result: number[];
  color: 'aqua' | 'red' | 'green';
}

class ResponseCheck extends Component<{}, State> {
  state: State = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
    color: 'aqua',
  };
  timeout: number | null = null;
  startTime: number | null = null;
  endTime: number | null = null;

  onClickScreen = () => {
    const { state } = this.state;
    if (state === 'waiting') {
      this.timeout = window.setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭',
          color: 'green',
        });
        this.startTime = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000);
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.',
        color: 'red',
      });
    } else if (state === 'ready') {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
        color: 'aqua',
      });
    } else if (state === 'now') {
      this.endTime = new Date().getTime();
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요.',
          result: [...prevState.result, this.endTime! - this.startTime!],
          color: 'aqua',
        };
      });
    }
  };

  onReset = () => {
    this.setState({ result: [] });
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
    );
  };

  render() {
    const { state, message, color } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
          <div style={{ width: '300px', height: '300px', background: color }} />
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck;
