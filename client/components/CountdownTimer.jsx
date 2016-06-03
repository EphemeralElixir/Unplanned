import React from 'react';

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 30,
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    if (this.state.secondsRemaining <= 1) {
      clearInterval(this.interval);
    }
    return this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
  }

  render() {
    return (<div>Seconds Remaining: {this.state.secondsRemaining}</div>);
  }
}

export default CountdownTimer;
