import React from 'react';
// import actions from '../redux/actions.js';
import Accepted from './Accepted.jsx';
import Rejected from './Rejected.jsx';
import RequestRecieved from './RequestRecieved.jsx';
import RequestSent from './RequestSent.jsx';
import actions from '../redux/actions.js';

class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // secondsRemaining: 20,
    };
  }

  startTimeOut() {
    setTimeout(
      () => this.props.dispatch(actions.clearMeet()).bind(this), 20000);
  }

  render() {
    if (this.props.meet.recipientId !== undefined) {
      // this.startTimeOut();
      return (
        <div>
          REQUEST SENT
          <RequestSent
            meet={this.props.meet}
            users={this.props.users}
            dispatch={this.props.dispatch}
          />
          <p>
            recipientId: {this.props.meet.recipientId}
            requesterId: {this.props.meet.requesterId}
            acceptedId: {this.props.meet.acceptedId}
          </p>
        </div>
      );
    }
    if (this.props.meet.requesterId !== undefined) {
      // this.startTimeOut();
      return (
        <div>
          REQUEST RECIEVED
          <RequestRecieved
            meet={this.props.meet}
            users={this.props.users}
            dispatch={this.props.dispatch}
          />
          <p>
            recipientId: {this.props.meet.recipientId}
            requesterId: {this.props.meet.requesterId}
            acceptedId: {this.props.meet.acceptedId}
          </p>
        </div>
      );
    }
    if (this.props.meet.acceptedId !== undefined) {
      // this.startTimeOut();
      return (
        <div>
          ACCEPTED
          <Accepted />
          <p>
            recipientId: {this.props.meet.recipientId}
            requesterId: {this.props.meet.requesterId}
            acceptedId: {this.props.meet.acceptedId}
          </p>
        </div>
      );
    }
    if (this.props.meet.reject) {
      this.startTimeOut();
      return (
        <Rejected />
      );
    }
    return null;
  }
}

Popover.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
  meet: React.PropTypes.object,
};

export default Popover;
