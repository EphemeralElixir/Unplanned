import React from 'react';

class Rejected extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div id="request-rejected">
        <h1>Request REJECTED!</h1>
        <img
          src="https://cdn3.iconfinder.com/data/icons/musthave/128/Remove.png"
          alt="Rejected"
        />
      </div>
    );
  }
}

Rejected.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
  meet: React.PropTypes.object,
};

export default Rejected;
