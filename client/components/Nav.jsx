import React from 'react';

const Nav = function Nav() {
  return (
    <div className="header">
      <div className="pure-menu pure-menu-fixed pure-menu-horizontal home-menu">
        <a className="pure-menu-heading" href="/">
          <img className="logo" alt="" src="./assets/img/logo-sm.png" />
          Unplanned
        </a>
          {window.socket.api.isLoggedIn ?
            <span>Welcome {window.socket.api.user.name}</span> :
            null
          }
        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            {window.socket.api.isLoggedIn ?
              <a
                href="#" onClick={window.showProfile}
              >My Profile</a> :
              <div></div>
            }
          </li>
          <li className="pure-menu-item">
            {window.socket.api.isLoggedIn ?
              <a href="#" onClick={window.socket.api.logout}>Logout</a> :
              null
            }
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
