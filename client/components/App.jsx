import React, { Component } from 'react'
import AddUser from './AddUser.jsx';
import UserList from './UserList.jsx';

class App extends React.Component {
  render() {
    return (<div>
    	<p>Hello World</p>
      <AddUser/>
      <UserList/>
    </div>);
  }
}


export default App;