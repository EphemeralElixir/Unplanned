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
    return (
      <div id="popover">
        <h1>Lets Meet!</h1>
        <img
          alt={this.props.users[this.props.meet.requesterId].name}
          src={this.props.users[this.props.meet.requesterId].image}
        />
        <img
          alt={this.props.users[this.props.meet.recipientId].name}
          src={this.props.users[this.props.meet.recipientId].image}
        />
        <p>Here's everybody's contact information!</p>
      </div>
    );
  }
}

Accepted.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
  meet: React.PropTypes.object,
};

export default Accepted;
