import React, { Component } from 'react';
import actions from '../redux/actions.js'

class AddUser extends Component {

	constructor(props) {
		super(props);
		this.state = {
			inputName: ''
		}
	}

	handleChange(event) {
		this.setState({
			inputName: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log('submit button clicked');
		this.props.dispatch(actions.addUser(66, this.state.inputName));
	}

	render() {
		return (<div>
		  <input
				  type="text"
				  placeholder="new user's name"
				  value={this.state.inputName}
				  onChange={this.handleChange.bind(this)}
				/>
			<button onClick={this.handleSubmit.bind(this)}> Submit </button>

		</div>);
	}
}

export default AddUser;
