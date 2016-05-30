import React, { Component } from 'react'
import AddUser from './AddUser.jsx';
import UserList from './UserList.jsx';
import Options from './Options.jsx';
import { default as Gmap } from './Gmap.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
    	 <p>Hello World</p>
        <AddUser/>
        <UserList/>
        <Gmap />
        <Options />
      </div>
    );
  }
}

export default App;