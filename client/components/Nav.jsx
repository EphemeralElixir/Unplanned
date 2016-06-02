import React from 'react';

const Nav = function Nav() {
  if (window.socket.api.isLoggedIn) {
    return (<div>
      <p> Welcome {window.socket.api.user.name} </p>
    </div>);
  }
  return (<div>
    <button type="button" onClick={window.socket.api.login}>Login with facebook </button>
  </div>);
};

export default Nav;
