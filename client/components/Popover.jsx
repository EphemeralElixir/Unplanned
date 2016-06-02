import React from 'react';
import actions from '../redux/actions.js';
import RequestRecieved from './RequestRecieved.jsx'
import RequestSent from './RequestSent.jsx'
import CountdownTimer from './CountdownTimer.jsx';


class Popover extends React.Component {
  // setup an accepted property on state.
  // listener should look for a change from null to true/false (see below)
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 5,
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    if (this.state.secondsRemaining <= 1) {
      clearInterval(this.interval);
    }
    return this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
  }

  render () {
    if (this.props.meet.send && !this.state.timeout) {
      return (
        <div id='request-sent'>
          <h1>Request Sent</h1> 
          <img src={this.props.userList[key].pic}/>
          <div>{this.props.userList[key].name}</div>  
          <CountdownTimer />
          <img src='./lib/reject.png' onPress={() => this.setState({accepted: false})} />
        </div>
      )
    } else if (this.props.meet.recieve && !this.state.timeout) {
      return (
        <div id='request-recieved'>
          <h1>Do you want to meet?</h1> 
          <img src={this.props.userList[this.props.meet.send].pic}/>
          <div>{this.props.userList[key].name}</div>  
          <CountdownTimer />  
          <img src='./lib/accept.png' onPress={() => this.setState({accepted: true})} /> 
          <img src='./lib/reject.png' onPress={() => this.setState({accepted: false})} />          
        </div>
        )
    } else if (this.props.meet.accept $$ !this.state.timeout) {
      return (
        <div id='meeting-accepted'>
          <h1>Lets Meet!</h1> 
          <img src={this.props.userList[this.props.meet.send].pic}/>
          <img src={this.props.userList[this.props.meet.send].pic}/>   
          <div>{this.props.userList[key].name}</div>
        </div>
      )
    } 
    return (null);
  }
}

Popover.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
  meet: React.PropTypes.object,
};

export default Popover;
