import React from 'react';
// import actions from '../redux/actions.js';
import RequestReceived from './RequestReceived.jsx';
import RequestSent from './RequestSent.jsx';
import Accepted from './Accepted.jsx';
import Rejected from './Rejected.jsx';

class Popover extends React.Component {
  // setup an accepted property on state.
  // listener should look for a change from null to true/false (see below)
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 5,
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
      // emit cancel or reject back to the server
      clearInterval(this.interval);
    }
    return this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
  }

  render() {
    if (this.props.meet.send && this.state.secondsRemaining > 0) {
      return (
        <RequestSent
          users={this.props.users}
          meet={this.props.meet}
          dispatch={this.props.dispatch}
        />
      );
    } else if (this.props.meet.receive && this.state.secondsRemaining > 0) {
      return (
        <RequestReceived
          users={this.props.users}
          meet={this.props.meet}
          dispatch={this.props.dispatch}
        />
        );
    } else if (this.props.meet.accept && this.state.secondsRemaining > 0) {
      return (
        <Accepted
          users={this.props.users}
          meet={this.props.meet}
          dispatch={this.props.dispatch}
        />
      );
    } else if (this.props.meet.reject && this.state.secondsRemaining > 0) {
      return (
        <Rejected users={this.props.users} />
        );
    }
    return (null);
  }
}

Popover.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
  meet: React.PropTypes.object,
};

export default Popover;
