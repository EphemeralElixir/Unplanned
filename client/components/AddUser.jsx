import React, { Component } from 'react';

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

	render() {
		return (<div>
		  <input
				  type="text"
				  placeholder="new user's name"
				  value={this.state.inputName}
				  onChange={this.handleChange.bind(this)}
				/>
			<button> Submit </button>

		</div>);
	}
}

export default AddUser;