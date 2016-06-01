import React from 'react';
import actions from '../redux/actions.js';

class Socket extends React.Component {

  constructor(props) {
    super(props);
    window.socket = window.io.connect('http://localhost:8000');

    window.socketUser = {
      userID: '',
      image: '',
      name: '',
      bio: '',
      lat: '',
      lng: '',
    };

    window.isLoggedIn = false;

    // populate socketUser
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '577393235773311',
        xfbml: true,
        version: 'v2.6',
      });

      window.FB.login((response) => {
        if (response.status === undefined) {
          // do nothing
        } else {
          window.socketUser.userID = response.authResponse.userID;
          window.FB.api(`/${window.socketUser.userID}`, (userIdResponse) => {
            window.socketUser.name = userIdResponse.name;
            window.FB.api(`/${window.socketUser.userID}/picture?type=large`, (imageResponse) => {
              window.socketUser.image = imageResponse.data.url;
              window.isLoggedIn = true;
              window.socket.emit('save user to db', window.socketUser);
            });
          });
        }
      });
    };

    // api's
    window.socket.api = {};

    window.socket.api.sendToServer = function sendToServer() {
      if (window.socket.connected && window.isLoggedIn) {
        window.socket.emit('update one socket user', window.socketUser, window.socket.id);
      }
    };

    window.socket.api.updateLocation = function updateLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          window.socketUser.lat = position.coords.latitude;
          window.socketUser.lng = position.coords.longitude;
        });
      }
    };

    window.socket.api.sendMeetingRequest = function sendMeetingRequest(receiverId) {
      if (window.socket.connected && window.isLoggedIn) {
        window.socket.emit('send meeting request', window.socket.id, receiverId);
      }
    };

    window.socket.api.confirmMeetingRequest = function confirmMeetingRequest(receiverId) {
      if (window.socket.connected && window.isLoggedIn) {
        window.socket.emit('confirm meeting request', window.socket.id, receiverId);
      }
    };

    window.socket.api.rejectMeetingRequest = function rejectMeetingRequest(receiverId) {
      if (window.socket.connected && window.isLoggedIn) {
        window.socket.emit('reject meeting request', window.socket.id, receiverId);
      }
    };
  }

  componentDidMount() {
    setInterval(window.socket.api.sendToServer, 5000);
    setInterval(window.socket.api.updateLocation, 5000);

    window.socket.on('update all users', this.updateUserList.bind(this));
    // window.socket.on('receive meeting request', this.setRecipientID.bind(this));
    // window.socket.on('confirm meeting request', this.setRequestorID.bind(this));
    // window.socket.on('reject meeting request', this.setAcceptedID.bind(this));
  }

  updateUserList(activeUsers) {
    this.props.dispatch(actions.updateUserList(activeUsers));
  }

  render() {
    return (<div>
      Socket loaded
    </div>);
  }

}

Socket.propTypes = {
  dispatch: React.PropTypes.func,
};

export default Socket;
