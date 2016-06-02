import React from 'react';
import CountdownTimer from './CountdownTimer.jsx';

class RequestReceived extends React.Component {
  // setup an accepted property on state.
  // listener should look for a change from null to true/false (see below)
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props.users, this.props.meet);
    // need to have a countdown here
    if (this.props.users[this.props.meet.requesterId]) {
      return (
        <div id="request-recieved">
          <h1>Do you want to meet?</h1>
          <img
            alt={this.props.users[this.props.meet.requesterId].name}
            src={this.props.users[this.props.meet.requesterId].pic}
          />
          <div>{this.props.users[this.props.meet.requesterId].name}</div>
          <CountdownTimer />
          <img
            alt="Accept"
            src="http://infoling.org/infoling2/img/colorful-stickers-icons-set/png/128x128/accept.png"
            onPress={() =>
            window.socket.api.acceptMeetingRequest}
          />
          <img
            alt="Reject"
            src="https://cdn3.iconfinder.com/data/icons/musthave/128/Remove.png"
            onPress={() =>
            window.socket.api.rejectMeetingRequest}
          />
        </div>
      );
    }
    return (
      <div>
        <h1>Meeting requested, but requesterID undefined</h1>
      </div>
    );
  }
}

RequestReceived.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
  meet: React.PropTypes.object,
};

export default RequestReceived;
