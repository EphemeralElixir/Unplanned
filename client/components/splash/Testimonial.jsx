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
            "I'm what most people would describe as an introvert, and I often overthink
            meeting new people. Unplanned has made it really easy for me to get coffee
            or drinks whenever I feel like it AND have some company along with it!"
          </p>
          <em>-Leo A.</em>
          <p>
            "I love meeting new people! I met Jessica through unplanned and realized that
            we had a scary amount of things in common. She's my bestie, and I love hanging
            out with her.
          </p>
          <em>-Jennifer M.</em>
        </div>
      </div>
    </div>
    );
};


export default Testimonial;
