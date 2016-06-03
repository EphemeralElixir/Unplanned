import React from 'react';
import Accepted from './Accepted.jsx';
import Rejected from './Rejected.jsx';
import RequestRecieved from './RequestRecieved.jsx';
import RequestSent from './RequestSent.jsx';

class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // secondsRemaining: 20,
    };
  }

  render() {
    if (this.props.meet.recipientId !== undefined) {
      return (
        <div>
          <RequestSent
            meet={this.props.meet}
            users={this.props.users}
            dispatch={this.props.dispatch}
          />
        </div>
      );
    }
    if (this.props.meet.requesterId !== undefined) {
      return (
        <div>
          <RequestRecieved
            meet={this.props.meet}
            users={this.props.users}
            dispatch={this.props.dispatch}
          />
        </div>
      );
    }
    if (this.props.meet.acceptedId !== undefined) {
      return (
        <div>
          <Accepted
            meet={this.props.meet}
            users={this.props.users}
            dispatch={this.props.dispatch}
          />
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
