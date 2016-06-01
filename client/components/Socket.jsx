import React from 'react'
import actions from '../redux/actions.js'

class Socket extends React.Component {

	constructor(props) {
		super(props);
		this.socket = io.connect('http://localhost:8000');

		this.socketUser = {
			userID: '',
			picture: '',
			name: '',
			bio: '',
			lat: '',
			lng: ''
		};

		this.isLoggedIn = false;
  

		window.FB.login(function(response) {
			var that = this;
			if (response.status === undefined) {

			} else {
				that.socketUser.userID = response.authResponse.userID;
				window.FB.api('/' + that.socketUser.userID, function(response) {
					that.socketUser.name = response.name;
					FB.api('/' + that.socketUser.userID + '/picture?type=large', function(response) {
						that.socketUser.picture = response.data.url;
						that.isLoggedIn = true;
					});
				});
			}
		}.bind(this));
	}

	componentDidMount() {
		setInterval(this.sendToServer.bind(this), 3000);
		setInterval(this.updateLocation.bind(this), 3000);
		this.socket.on('update all users', this.updateUserList.bind(this));
	}

	sendToServer() {
		if (this.socket.connected && this.isLoggedIn) {
			this.socket.emit('update one socket user', this.socketUser, this.socket.id);
		}
	}

	updateLocation() {
		var that = this;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				that.socketUser.lat = position.coords.latitude;
				that.socketUser.lng = position.coords.longitude;
			});
		}
	};

	updateUserList(activeUsers) {
		this.props.dispatch(actions.updateUserList(activeUsers));
	}

	render() {
		return (<div>
			Socket loaded
			</div>);
	}

}

export default Socket;