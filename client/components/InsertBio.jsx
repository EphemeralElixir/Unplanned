import React, { Component }  from 'react';
import actions from '../redux/actions.js'

class InsertBio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bio: ''
    }
  }

  handleChange(event) {
    this.setState({
      bio: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    socket.emit('addBio', userSocketId, this.state.bio);
  }

  render() {
    return (<div>
      <input type="text" value={this.state.bio} onChange={this.handleChange.bind(this)} placeholder="Tell us about yourself"/>
      <button onClick={this.handleSubmit.bind(this)}> Submit </button>
    </div>);
  }
}

export default InsertBio;