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
      secondsRemaining: 20,
    };
  }

  startTimeOut() {
    setTimeout(() => this.props.dispatch(actions.clearMeet()).bind(this), 10000);
  }

  render() {
    if (this.props.meet.recipientId !== undefined) {
      // need to have a time out as well
      this.startTimeOut();
      return (
        <RequestSent
          meet={this.props.meet}
          users={this.props.users}
        />
      );
    } else if (this.props.meet.requesterId !== undefined) {
      this.startTimeOut();
      return (
        <RequestRecieved
          meet={this.props.meet}
          users={this.props.users}
        />
      );
    } else if (this.props.meet.acceptedId !== undefined) {
      this.startTimeOut();
      return (
        <Accepted />
      );
    } else if (this.props.meet.reject) {
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
