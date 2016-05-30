import React, { Component } from 'react';

class Options extends Component {

  constructor(props) {
    super(props);
    this.state = {
      available: false,
      interest: ''
    }
  }

  handleChange(event) {
    this.setState({
      interest: event.target.value
    });
  }

  render() {
    return (<div>
      <button> Available </button>
      <button> Beer </button>
      <button> Coffee </button>
      <button> Dinner </button>
    </div>);
  }
}

export default Options;