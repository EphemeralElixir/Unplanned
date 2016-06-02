import React from 'react';
import CountdownTimer from './CountdownTimer.jsx';

class RequestSent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div id="popover">
        <h1>Waiting on {this.props.users[this.props.meet.recipientId].name} to confirm...</h1>
        <img
          src={this.props.users[this.props.meet.recipientId].image}
          alt={this.props.users[this.props.meet.recipientId].name}
        />
        <p>Bio: {this.props.users[this.props.meet.recipientId].bio}</p>
        <CountdownTimer />
        <img
          alt="cancel"
          src="https://cdn3.iconfinder.com/data/icons/musthave/128/Remove.png"
          onPress={window.socket.api.cancelMeetingRequest}
        />
      </div>
    );
  }
}

RequestSent.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
  meet: React.PropTypes.object,
};

export default RequestSent;

// <div>{this.props.users[this.props.meet.recipientId].name}</div>
