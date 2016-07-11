import React from 'react';

const Testimonial = function Testimonial() {
  return (
    <div id="Test"><br />
      <div className="ribbon l-box-lrg pure-g">
        <div className="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
          <img
            className="pure-img-responsive people"
            alt="File Icons"
            width="500"
            src="/assets/img/people.jpg"
          />
        </div>
        <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">
          <h2 className="content-head content-head-ribbon">Coffee, food, or beer?</h2>
          <p>
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex"
          </p>
          <em>-John C.</em>
          <p>
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex"
          </p>
          <em>-Jennifer M.</em>
        </div>
      </div>
    </div>
    );
};


export default Testimonial;
