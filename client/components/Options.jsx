import React, { Component } from 'react';

class Options extends Component {

  constructor(props) {
    super(props);
    this.user = window.socket.api.user;
  }

  toggleOption(optionType) {
    this.user[optionType] = !this.user[optionType];
  }

  render() {
    const availStyle = this.user.available ? 'pure-button pure-button-active' : 'pure-button';
    const coffeeStyle = this.user.coffee ? 'pure-button pure-button-active' : 'pure-button';
    const foodStyle = this.user.food ? 'pure-button pure-button-active' : 'pure-button';
    const beerStyle = this.user.beer ? 'pure-button pure-button-active' : 'pure-button';
    return (
      <div>
        <button
          value="available" className={availStyle}
          onClick={this.toggleOption.bind(this, 'available')}
        >
          {this.user.available ? 'Available' : 'Unavailable'}
        </button>
        <button
          value="coffee" className={coffeeStyle}
          onClick={this.toggleOption.bind(this, 'coffee')}
        >
          <i className="fa fa-coffee" aria-hidden="true"></i>
          {' '}Coffee
        </button>
        <button
          value="food" className={foodStyle}
          onClick={this.toggleOption.bind(this, 'food')}
        >
          <i className="fa fa-cutlery" aria-hidden="true"></i>
          {' '}Food
        </button>
        <button
          value="beer" className={beerStyle}
          onClick={this.toggleOption.bind(this, 'beer')}
        >
          <i className="fa fa-beer" aria-hidden="true"></i>
          {' '}Beer
        </button>
      </div>
    );
  }
}

export default Options;
