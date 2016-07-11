import React from 'react';

const AboutTheDevelopers = function AboutTheDevelopers() {
  return (
    <div id="About" className="content">
      <h1 className="content-head is-center">About the original developers</h1>
      <br />
      <div className="pure-g">
        <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4 is-center">
          <img
            className="pure-img-responsive"
            alt="File Icons"
            width="250"
            src="/assets/img/sepehr.png"
          />
          <div className="l-box">
            <h3>Sepehr Vakili</h3>
          </div>
        </div>

        <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4 is-center">
          <img
            className="pure-img-responsive is-center"
            alt="File Icons"
            width="250"
            src="/assets/img/tai.png"
          />
          <div className="l-box">
            <h3>Tai Huynh</h3>
          </div>
        </div>

        <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4 is-center">
          <img
            className="pure-img-responsive is-center"
            alt="File Icons"
            width="250"
            src="/assets/img/leo.png"
          />
          <div className="l-box">
            <h3>Leo Adelstein</h3>
          </div>
        </div>

        <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4 is-center">
          <img
            className="pure-img-responsive is-center"
            alt="File Icons"
            width="250"
            src="/assets/img/shane.png"
          />
          <div className="l-box">
            <h3>Shane Hubbell</h3>
          </div>
        </div>
      </div>
    </div>
    );
};


export default AboutTheDevelopers;

