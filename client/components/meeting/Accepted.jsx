import React from 'react';
import actions from '../../redux/actions.js';

class Accepted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


    window.peer.api.callSomeone = function callSomeone(peerName) {
      navigator.getUserMedia({ video: true, audio: true }, (stream) => {
        const call = window.peer.api.user.call(peerName, stream);
        call.on('stream', (remoteStream) => {
          document.getElementById('PeerStream').src = URL.createObjectURL(remoteStream);
        });
      }, () => {
        alert('Failed to get local stream');
      });
    };

    window.peer.api.user.on('call', (call) => {
      navigator.getUserMedia({ video: true, audio: true }, (stream) => {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', (remoteStream) => {
          document.getElementById('PeerStream').src = URL.createObjectURL(remoteStream);
        });
      }, () => {
        alert('Failed to get local stream');
      });
    });

    if (this.props.users[this.props.meet.acceptedId].userID < window.socket.api.user.userID) {
      window.peer.api.callSomeone(this.props.users[this.props.meet.acceptedId].name);
    }
  }

  handleHangUp() {
    this.props.dispatch(actions.clearMeet());
  }

  render() {
    return (
      <div className="popup">
        <h1>Lets Meet!</h1>
        <p>Your meeting with {this.props.users[this.props.meet.acceptedId].name} is confirmed!</p>
        <div id="Peer">
          <video
            id="PeerStream"
            autoPlay="true"
            height="300"
            width="300"
          ></video>
          <button
            className="buttonSendMeetReq"
            onClick={this.handleHangUp.bind(this)}
          >
            HangUp
          </button>
        </div>
      </div>
    );
  }
}

Accepted.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
  meet: React.PropTypes.object,
};

export default Accepted;
