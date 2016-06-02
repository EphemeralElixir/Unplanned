import React, { Component } from 'react';

class Options extends Component {

  toggleOption(optionType) {
    const thisUser = window.socket.api.user;
    console.log('option before====>', thisUser[optionType]);
    thisUser[optionType] = !thisUser[optionType];
    console.log('option after====>', thisUser[optionType]);
  }

  render() {
    return (
      <div>
        <button value="available" onClick={this.toggleOption.bind(this, 'available')}>
          Available
        </button>
        What are you in the mood for?
        <button value="coffee" onClick={this.toggleOption.bind(this, 'coffee')}>
          Coffee
        </button>
        <button value="food" onClick={this.toggleOption.bind(this, 'food')}>
          Food
        </button>
        <button value="beer" onClick={this.toggleOption.bind(this, 'beer')}>
          Beer
        </button>
      </div>
    );
  }
}

export default Options;
