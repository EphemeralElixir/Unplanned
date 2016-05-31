import React, { Component } from 'react';

class UserList extends Component {

	render() {
		return (<div> 
			<ul>
			  {Object.keys(this.props.userList).map((key) => {
			  	return <li key={key}>{this.props.userList[key].name}</li>;
			  }
			  )}
			</ul>
		</div>);
	}
}

export default UserList;