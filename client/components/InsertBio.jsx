import React, { Component } from 'react';
// import actions from '../redux/actions.js';

class InsertBio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bio: '',
    };
  }

  handleChange(event) {
    this.setState({
      bio: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    window.socket.emit('addBio', window.userSocketId, this.state.bio);
  }

  render() {
    return (<div>
      <h1>Tell us about yourself</h1>
      <input
        type="text" v
        alue={this.state.bio}
        onChange={this.handleChange.bind(this)}
        placeholder="Tell us about yourself"
      />
      <button
        onClick={this.handleSubmit.bind(this)}
      > Submit </button>
    </div>);
  }
}

export default InsertBio;
