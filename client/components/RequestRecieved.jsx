import React from 'react';
import CountdownTimer from './CountdownTimer.jsx';
import actions from '../redux/actions.js';

class RequestReceived extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleReject(requesterId) {
    this.props.dispatch(actions.clearMeet());
    window.socket.api.rejectMeetingRequest(requesterId, window.socket.id)();
  }
  handleAccept(requesterId) {
    this.props.dispatch(actions.clearMeet());
    this.props.dispatch(actions.setAccepted(requesterId));
    window.socket.api.confirmMeetingRequest(window.socket.id, requesterId)();
  }

  render() {
    return (
      <div id="popover">
        <h1>Would you like to meet with {this.props.users[this.props.meet.requesterId].name}</h1>
        <img
          alt={this.props.users[this.props.meet.requesterId].name}
          src={this.props.users[this.props.meet.requesterId].image}
        />
        <CountdownTimer />
        <button
          className="buttonSendMeetReq"
          onClick={this.handleAccept.bind(this, this.props.meet.requesterId)}
        >
          Accept
        </button>
        <button
          className="buttonSendMeetReq"
          onClick={this.handleReject.bind(this, this.props.meet.requesterId)}
        >
          Reject
        </button>
      </div>
    );
  }
}

RequestReceived.propTypes = {
  dispatch: React.PropTypes.func,
  users: React.PropTypes.object,
  meet: React.PropTypes.object,
  gmap: React.PropTypes.object,
};

export default RequestReceived;
