<<<<<<< 758e49cda3bc49247a8cfd8c88c0f84b5999b46e
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
=======
import { default as React } from 'react';
import { default as Gmap } from './Gmap.jsx';


class App extends React.Component {
  render() {
    return (
      <div>
        <div>Hello World</div>
        <div>
          <Gmap />
        </div>
      </div>
    )
>>>>>>> (refactor) use es6 import instead of require
  }
}


export default App;