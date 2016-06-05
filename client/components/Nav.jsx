import React from 'react';

// These navigation links display only on the main splash page
const SplashNav = function splashNav() {
  return (
    <div>
      <li className="pure-menu-item">
        <a href="#">Main</a>
      </li>
      <li className="pure-menu-item">
        <a href="#Adventure">Adventure</a>
      </li>
      <li className="pure-menu-item">
        <a href="#Testimonial">Testimonial</a>
      </li>
      <li className="pure-menu-item">
        <a href="#About">About the Developers</a>
      </li>
    </div>
  );
};

// These navigation links display only inside the app (after login)
const MainAppNav = function MainAppNav() {
  return (
    <div>
      <li className="pure-menu-item">
        <a
          href="#" onClick={window.showProfile}
        >My Profile</a>
      </li>
      <li className="pure-menu-item">
        <a href="#" onClick={window.socket.api.logout}>Logout</a>
      </li>
    </div>
  );
};

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
          {window.socket.api.isLoggedIn ?
            <MainAppNav /> :
            <SplashNav />
          }
        </ul>
      </div>
    </div>
  );
};

export default Nav;
