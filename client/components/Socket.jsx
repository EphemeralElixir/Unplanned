import React from 'react';
import actions from '../redux/actions.js';

class Socket extends React.Component {

  componentDidMount() {
    setInterval(window.socket.api.sendToServer, 5000);
    setInterval(window.socket.api.updateLocation, 5000);


    // change of local state
    window.socket.on('update all users', this.updateUserList.bind(this));
    // change local meeting state
    window.socket.on('receive meeting request', this.receivedMeetingRequest.bind(this));
    window.socket.on('confirm meeting request', this.receivedConfirmation.bind(this));
    window.socket.on('reject meeting request', this.receivedRejection.bind(this));
  }

  updateUserList(activeUsers) {
    this.props.dispatch(actions.updateUserList(activeUsers));
  }

  receivedMeetingRequest(requesterId) {
    alert('this guy requested me');
    this.props.dispatch(actions.clearMeet());
    this.props.dispatch(actions.setRequester(requesterId));
  }

  receivedConfirmation(acceptedId) {
    alert('this guy confirmed me', acceptedId);
    this.props.dispatch(actions.clearMeet());
    this.props.dispatch(actions.setAccepted(acceptedId));
  }

  receivedRejection() {
    alert('i got rejected');
    this.props.dispatch(actions.clearMeet());
  }

  render() {
    return (<div>
      Socket loaded
    </div>);
  }

}

Socket.propTypes = {
  dispatch: React.PropTypes.func,
};

export default Socket;
