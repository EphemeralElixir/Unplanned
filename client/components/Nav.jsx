import React from 'react';

const Nav = function Nav() {
  if (window.socket.api.isLoggedIn) {
    return (<div>
      <p> Welcome {window.socket.api.user.name} </p>
    </div>);
  }
  return (
    <div className="header">
      <div className="pure-menu pure-menu-fixed pure-menu-horizontal home-menu">
        <a className="pure-menu-heading" href="/">unplan!</a>
        <span>Welcome {window.socket.api.user.name}</span>
        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            <a href="#">My Profile</a>
          </li>
          <li className="pure-menu-item">
            <a href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
