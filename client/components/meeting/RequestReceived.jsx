import React from 'react';
import CountdownTimer from './CountdownTimer.jsx';
import actions from '../../redux/actions.js';

class RequestReceived extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.callOnce = false;
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.meet.acceptedId === undefined) {
        this.handleReject.call(this, this.props.meet.requesterId);
      }
    }, 13000);
  }

  handleReject(requesterId) {
    window.socket.api.rejectMeetingRequest(requesterId);
    this.props.dispatch(actions.clearMeet());
  }

  handleAccept(requesterId) {
    window.socket.api.confirmMeetingRequest(requesterId);
    this.props.dispatch(actions.clearMeet());
    this.props.dispatch(actions.setAccepted(requesterId));
  }

  render() {
    return (
      <div className="popup">
        <h1>Would you like to meet with {this.props.users[this.props.meet.requesterId].name}?</h1>
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
