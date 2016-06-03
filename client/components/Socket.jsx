import React from 'react';
import actions from '../redux/actions.js';

class Socket extends React.Component {

  componentDidMount() {
    // Performance optimization
    const socketClient = window.socket;
    const sendToServer = socketClient.api.sendToServer;
    const updateLocation = socketClient.api.updateLocation;

    setInterval(sendToServer, 5000);
    setInterval(updateLocation, 5000);

    // Listens for update then changes local state
    socketClient.on('update all users', this.updateUserList.bind(this));

    // Listens for meeting requests and updates the component's state depending on decision
    socketClient.on('receive meeting request', this.receivedMeetingRequest.bind(this));
    socketClient.on('confirm meeting request', this.receivedConfirmation.bind(this));
    socketClient.on('reject meeting request', this.receivedRejection.bind(this));
  }

  updateUserList(activeUsers) {
    this.props.dispatch(actions.updateUserList(activeUsers));
  }

  receivedMeetingRequest(requesterId) {
    // alert('this guy requested me');
    this.props.dispatch(actions.clearMeet());
    this.props.dispatch(actions.setRequester(requesterId));
  }

  receivedConfirmation(acceptedId) {
    // alert('this guy confirmed me', acceptedId);
    this.props.dispatch(actions.clearMeet());
    this.props.dispatch(actions.setAccepted(acceptedId));
  }

  receivedRejection() {
    // alert('i got rejected');
    this.props.dispatch(actions.clearMeet());
  }
  render() {
    return (<div>

    </div>);
  }
}

Socket.propTypes = {
  dispatch: React.PropTypes.func,
};

export default Socket;
