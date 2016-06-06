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
      <div className="popup">
        <h1>Waiting on {this.props.users[this.props.meet.recipientId].name} to confirm...</h1>
        <img
          src={this.props.users[this.props.meet.recipientId].image}
          alt={this.props.users[this.props.meet.recipientId].name}
        />
        <p>Bio: {this.props.users[this.props.meet.recipientId].bio}</p>

        <CountdownTimer
          meet={this.props.meet}
          dispatch={this.props.dispatch}
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
