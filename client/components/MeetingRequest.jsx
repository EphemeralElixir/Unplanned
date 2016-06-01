import React from 'react';
import CountdownTimer from './CountdownTimer.jsx';

class MeetingRequest extends React.Component {
  //setup an accepted property on state.
  //listener should look for a change from null to true/false (see below)
  constructor(props) {
    super(props);
    this.state = {
      accepted: null,
    }
  }

  render () {
    return (
      <div>
      <img src='http://zblogged.com/wp-content/uploads/2015/11/17.jpg' />
      <div>JOHN APPLESEED</div>  
      <CountdownTimer />  
      <img src='./lib/accept.png' onPress={() => this.setState({accepted: true})} /> 
      <img src='./lib/reject.png' onPress={() => this.setState({accepted: false})} />
      </div>
    )
  }
}

export default MeetingRequest;