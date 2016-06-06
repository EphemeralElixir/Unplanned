import React from 'react';
import Testimonial from './Testimonial.jsx';
import Adventure from './Adventure.jsx';
import AboutTheDevelopers from './AboutTheDevelopers.jsx';

const Splash = function Splash() {
  return (
    <div id="Main">
      <div className="splash-container">
        <video autoPlay loop id="bgvid">
          <source src="./assets/fair.mp4" type="video/mp4" />
        </video>
        <div className="splash">
          <h1 className="splash-head">life is: unplanned</h1>
          <p className="splash-subhead">seize the moment</p>
          <p>
            <button
              className="pure-button pure-button-primary"
              onClick={window.socket.api.login}
            >
            Login with Facebook
            </button>
          </p>
        </div>
      </div>
      <div className="content-wrapper" id="Adventure">
        <Adventure />
        <Testimonial />
        <AboutTheDevelopers />
        <div className="footer l-box is-center">
          <p>
            Built with <span className="fa fa-heart" aria-hidden="true" /> at
            Hack Reactor - San Francisco, CA.
          </p>
        </div>
      </div>
    </div>
    );
};


export default Splash;
