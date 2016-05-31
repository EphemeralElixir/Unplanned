import React from 'react';
import actions from '../redux/actions.js';

class SocketReceive extends React.Component {

  constructor(props) {
    super(props);
    this.updateUserList.bind(this)();
    setInterval(this.updateUserList.bind(this), 5000);
  }
  
  updateUserList() {
    this.props.dispatch(actions.updateUserList(window.activeUsers));
  }

	render() {
		return (<div>SocketReceive</div>);
	}
}

export default SocketReceive;
