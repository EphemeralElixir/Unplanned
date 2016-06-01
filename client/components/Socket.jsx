import React from 'react';
import actions from '../redux/actions.js';

class Socket extends React.Component {

  constructor(props) {
    super(props);
    this.socket = window.io.connect('http://localhost:8000');
    this.socketUser = {
      userID: '',
      image: '',
      name: '',
      bio: '',
      lat: '',
      lng: '',
    };

    this.isLoggedIn = false;

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
          this.socketUser.userID = response.authResponse.userID;
          window.FB.api(`/${this.socketUser.userID}`, (userIdResponse) => {
            this.socketUser.name = userIdResponse.name;
            window.FB.api(`/${this.socketUser.userID}/picture?type=large`, (imageResponse) => {
              this.socketUser.image = imageResponse.data.url;
              this.isLoggedIn = true;
              this.socket.emit('save user to db', this.socketUser);
            });
          });
        }
      });
    };
  }

  componentDidMount() {
    setInterval(this.sendToServer.bind(this), 3000);
    setInterval(this.updateLocation.bind(this), 10000);
    this.socket.on('update all users', this.updateUserList.bind(this));
  }

  sendToServer() {
    if (this.socket.connected && this.isLoggedIn) {
      this.socket.emit('update one socket user', this.socketUser, this.socket.id);
    }
  }

  updateLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.socketUser.lat = position.coords.latitude;
        this.socketUser.lng = position.coords.longitude;
      });
    }
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
