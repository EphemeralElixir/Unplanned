import React from 'react';
<<<<<<< 0556dc874cf6a06b7a6eeda0b49bdb04e93de486
import CountdownTimer from './CountdownTimer.jsx';

class RequestSent extends React.Component {
  // setup an accepted property on state.
  // listener should look for a change from null to true/false (see below)
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    // insert timeout here
    if (this.props.users[this.props.meet.recipientId]) {
      return (
        <div id="meeting-request">
          <h1>Request Sent!</h1>
          <img
            src={this.props.users[this.props.meet.recipientId].pic}
            alt={this.props.users[this.props.meet.recipientId].name}
          />
          <div>{this.props.users[this.props.meet.recipientId].name}</div>
          <CountdownTimer />
          <img
            src="./lib/accept.png"
            alt="accept"
            onPress={window.socket.api.acceptMeetingRequest}
          />
          <img
            src="./lib/reject.png"
            alt="reject"
            onPress={window.socket.api.acceptMeetingRequest}
          />
        </div>
      );
    }
    return <h1>Meeting Requested, but User not defined!</h1>;
  }
}

RequestSent.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
  meet: React.PropTypes.object,
};

export default RequestSent;
=======
import actions from '../redux/actions.js';

import CountdownTimer from './CountdownTimer.jsx';
import Socket from './Socket.jsx';
>>>>>>> interim commit, still working on popover
