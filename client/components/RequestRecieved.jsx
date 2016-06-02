import React from 'react';
import actions from '../redux/actions.js';

import Socket from './Socket.jsx';

class RequestReceived extends React.Component {
  // setup an accepted property on state.
  // listener should look for a change from null to true/false (see below)
  constructor(props) {
    super(props);
    this.state = {
      accepted: null,
    };
  }

  //Render will show popover ONLY if meetingRequested is true
  render () {
    if (this.props.meetingRequested) {
      return (
        <div id='meeting-request'>
          <img src={this.props.userList[key].pic}/>
          <div>{this.props.userList[key].pic}</div>  
          <CountdownTimer />  
          <img src='./lib/accept.png' onPress={() => this.setState({accepted: true})} /> 
          <img src='./lib/reject.png' onPress={() => this.setState({accepted: false})} />
        </div>
      )
    } else {
      return null
    }
  }
}

export default RequestReceived;
