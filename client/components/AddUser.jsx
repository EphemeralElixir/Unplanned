import React, { Component } from 'react';
import actions from '../redux/actions.js';

class AddUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
    };
    // use the following binding pattern per airbnb style guide:
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputName: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submit button clicked');
    this.props.dispatch(actions.addUser(66, this.state.inputName));
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="new user's name"
          value={this.state.inputName}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}> Submit </button>
      </div>
    );
  }
}

AddUser.propTypes = {
  dispatch: React.PropTypes.func,
};

export default AddUser;
