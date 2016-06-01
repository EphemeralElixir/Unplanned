import React from 'react';
import actions from '../redux/actions.js';

class Socket extends React.Component {

  constructor(props) {
    super(props);
    setInterval(this.updateUserList.bind(this), 500);
  }

  updateUserList() {
    this.props.dispatch(actions.updateUserList(window.activeUsers));
  }

  render() {
    return (<div>SocketReceive</div>);
  }
}

export default Socket;
