import React, { Component } from 'react'
import AddUser from './AddUser.jsx';
import UserList from './UserList.jsx';
import { default as Gmap } from './Gmap.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
    	 <p>Hello World</p>
        <AddUser/>
        <UserList/>
        <Gmap />
      </div>
    );
  }
}

export default App;