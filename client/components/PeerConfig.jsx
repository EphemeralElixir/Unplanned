import React from 'react';

class PeerConfig extends React.Component {
  constructor(props) {
    super(props);
    const Peer = window.Peer;
    window.peer = {};
    window.peer.api = {};
    window.peer.api.user = new Peer(window.socket.api.user.name, { key: window.peerKey });
  }

  render() {
    return (<div></div>);
  }
}

export default PeerConfig;
