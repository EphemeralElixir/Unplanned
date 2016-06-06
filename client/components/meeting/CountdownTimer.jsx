import React from 'react';

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.seconds = 13;
  }

  componentDidMount() {
    setInterval(() => {
      this.seconds--;
      if (this.seconds < 0) {
        this.seconds = 0;
      }
    }, 1000);
  }

  render() {
    return (<div>Seconds Remaining: {this.seconds}</div>);
  }
}

export default CountdownTimer;

CountdownTimer.propTypes = {
  dispatch: React.PropTypes.func,
  meet: React.PropTypes.object,
};
