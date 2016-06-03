import React from 'react';
import UserList from './UserList.jsx';
import Options from './Options.jsx';
import Popover from './Popover.jsx';
import InsertBio from './InsertBio.jsx';
import Nav from './Nav.jsx';

import { default as Gmap } from './Gmap.jsx';
import { connect } from 'react-redux';
import Socket from './Socket.jsx';

const App = (props) => (
  <div>
    <Nav />
    <Options />
    <Gmap
      users={props.users} dispatch={props.dispatch}
      gmap={props.gmap}
    />
    <Popover
      users={props.users}
      meet={props.meet}
      dispatch={props.dispatch}
    />
    <InsertBio />
    <UserList userList={props.users} />
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
