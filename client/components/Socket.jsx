import React from 'react'

class Socket extends React.Component {

	constructor(props) {
		super(props);
		this.socket = io.connect('http://localhost:8000');
		
		this.socketUsers = {};

		this.socketUser = {
			userID: '',
			picture: '',
			name: '',
			bio: ''
		};


		window.FB.login(function(response) {
			var that = this;
			if (response.status === undefined) {

			} else {
				console.log('settin it');
				that.socketUser.userID = response.authResponse.userID;
				window.FB.api('/' + that.socketUser.userID, function(response) {
					that.socketUser.name = response.name;
					FB.api('/' + that.socketUser.userID + '/picture?type=large', function(response) {
						that.socketUser.picture = response.data.url;
						console.log('final!!!!!!!!!', that.socketUser);
					});
				});
			}
		}.bind(this));
	}

	componentDidMount() {
		setTimeout(sendToServer.bind(this), 500);
	}

	sendToServer() {
		this.socket.
	}



	render() {
		return (<div>
			Socket loaded
			</div>);
	}

}

export default Socket;