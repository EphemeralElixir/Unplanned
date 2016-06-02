import React from 'react';

class Accepted extends React.Component {
  // setup an accepted property on state.
  // listener should look for a change from null to true/false (see below)
  constructor(props) {
    super(props);
    this.state = {
      // secondsRemaining: 5,
    };
  }

  render() {
    if (this.props.users[this.props.meet.socketId]) {
      return (
        <div id="meeting-accepted">
          <h1>Lets Meet!</h1>
          <img
            alt={this.props.users[this.props.meet.socketId].name}
            src={this.props.users[this.props.meet.socketId].pic}
          />
          <img
            alt={this.props.users[this.props.meet.recipientId].name}
            src={this.props.users[this.props.meet.recipientId].pic}
          />
          <p>Here's {this.props.users[this.props.meet.recipientId].name}'s contact information</p>
          <div>{this.props.users[this.props.meet.send].name}</div>
        </div>
      );
    }
    return <h1>Meeting Accepted, but user undefined</h1>;
  }
}

Accepted.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
  meet: React.PropTypes.object,
};

export default Accepted;
