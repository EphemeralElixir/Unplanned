import React from 'react';
import AddUser from './AddUser.jsx';
import UserList from './UserList.jsx';
import Options from './Options.jsx';
import MeetingRequest from './MeetingRequest.jsx';
import { default as Gmap } from './Gmap.jsx';
import { connect } from 'react-redux';
import Socket from './Socket.jsx';

const App = (props) => (
  <div>
    <p>Hello World</p>
    <AddUser dispatch={props.dispatch} />
    <UserList userList={props.users} />
    <Gmap
      users={props.users} dispatch={props.dispatch}
      gmap={props.gmap}
    />
    <Options />
    <MeetingRequest />
    <Socket dispatch={props.dispatch} />
  </div>
);

// only return the part of the state/store that the component needs
function mapStateToProps(state) {
  return state;
}

App.propTypes = {
  dispatch: React.PropTypes.func,
  users: React.PropTypes.object,
  meet: React.PropTypes.object,
  gmap: React.PropTypes.object,
};

export default connect(mapStateToProps)(App);
