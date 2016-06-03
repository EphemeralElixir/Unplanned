import React from 'react';
// import actions from '../redux/actions.js';

class RequestReceived extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div id="popover">
        <h1>Would you like to meet with {this.props.users[this.props.meet.requesterId].name}</h1>
        <img
          alt={this.props.users[this.props.meet.requesterId].name}
          src={this.props.users[this.props.meet.requesterId].image}
        />
        <img
          alt="accept"
          src="http://icons.iconarchive.com/icons/dryicons/simplistica/128/accept-icon.png"
          onPress={window.socket.api.confirmMeetingRequest(this.props.meet.requesterId)}
        />
        <img
          alt="reject"
          src="https://cdn3.iconfinder.com/data/icons/musthave/128/Remove.png"
          onPress={window.socket.api.rejectMeetingRequest(this.props.meet.requesterId)}
        />
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
