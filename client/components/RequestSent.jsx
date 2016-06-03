import React from 'react';
import CountdownTimer from './CountdownTimer.jsx';
import actions from '../redux/actions.js';

class RequestSent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleMeetRequest(recipientId) {
    window.socket.api.rejectMeetingRequest(recipientId, window.socket.id);
    this.props.dispatch(actions.clearMeet());
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
        <button
          alt="cancel"
          className="buttonSendMeetReq"
          // src="https://cdn3.iconfinder.com/data/icons/musthave/128/Remove.png"
          onClick={this.handleMeetRequest.bind(this, this.props.meet.recipientId)}
        >
          Cancel Request
        </button>
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

