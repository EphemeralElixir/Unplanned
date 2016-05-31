import React, { Component } from 'react'
import AddUser from './AddUser.jsx';
import UserList from './UserList.jsx';
import Options from './Options.jsx';
import MeetingRequest from './MeetingRequest.jsx';
import { default as Gmap } from './Gmap.jsx';
import { connect } from 'react-redux';
import SocketSend from './SocketSend.jsx';
import SocketReceive from './SocketReceive.jsx';

class App extends React.Component {
  render() {
    return (<div>
    	<p>Hello World</p>
      <AddUser dispatch={this.props.dispatch}/>
      <UserList userList={this.props.users}/>
      <Gmap users={this.props.users}/>
      <Options/>
      <MeetingRequest/>
      <SocketReceive dispatch={this.props.dispatch}/>
      <SocketSend/>

    </div>);
  }
}

// only reaturn the part of the state/store that the component needs
function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(App);