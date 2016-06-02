import React from 'react';
import AddUser from './AddUser.jsx';
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
    <AddUser dispatch={props.dispatch} />
    <UserList userList={props.users} />
    <Gmap
      users={props.users} dispatch={props.dispatch}
      gmap={props.gmap}
    />
    <Options />
<<<<<<< 0556dc874cf6a06b7a6eeda0b49bdb04e93de486
    <Popover
      users={props.users}
      meet={props.meet}
      dispatch={props.dispatch}
    />
    <InsertBio />
=======
    <Popover dipatch={props} />
    <InsertBio/>
>>>>>>> interim commit, still working on popover
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
