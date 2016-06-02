import React from 'react';
import { render } from 'react-dom';
import configureStore from './redux/store.js';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import './components/Gmap.jsx';

const initialState = {
  users: {},
  meet: {
    recipientId: undefined,
    requesterId: undefined,
    acceptedId: undefined,
  },
  gmap: {
    openedUserId: undefined,
  },
};

window.socket = window.io.connect('http://localhost:8000');

// add socket api's
window.socket.api = {};

window.socket.api.user = {
  userID: '',
  image: '',
  name: '',
  bio: '',
  lat: '',
  lng: '',
};

window.socket.api.isLoggedIn = false;

// populate user

// window.socket.api.login = function login() {
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
      window.socket.api.user.userID = response.authResponse.userID;
      window.FB.api(`/${window.socket.api.user.userID}`, (userIdResponse) => {
        window.socket.api.user.name = userIdResponse.name;
        window.FB.api(`/${window.socket.api.user.userID}/picture?type=large`,
          (imageResponse) => {
            window.socket.api.user.image = imageResponse.data.url;
            window.socket.api.isLoggedIn = true;
            window.socket.emit('save user to db', window.socket.api.user);
          });
      });
    }
  });
  // };
};

window.socket.api.sendToServer = function sendToServer() {
  if (window.socket.connected && window.socket.api.isLoggedIn) {
    window.socket.emit('update one socket user', window.socket.api.user, window.socket.id);
  }
};

window.socket.api.updateLocation = function updateLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      window.socket.api.user.lat = position.coords.latitude;
      window.socket.api.user.lng = position.coords.longitude;
    });
  }
};

window.socket.api.sendMeetingRequest = function sendMeetingRequest(receiverId) {
  if (window.socket.connected && window.socket.api.isLoggedIn) {
    window.socket.emit('send meeting request', window.socket.id, receiverId);
  }
};

window.socket.api.confirmMeetingRequest = function confirmMeetingRequest(receiverId) {
  if (window.socket.connected && window.socket.api.isLoggedIn) {
    window.socket.emit('confirm meeting request', window.socket.id, receiverId);
  }
};

window.socket.api.rejectMeetingRequest = function rejectMeetingRequest(receiverId) {
  if (window.socket.connected && window.socket.api.isLoggedIn) {
    window.socket.emit('reject meeting request', window.socket.id, receiverId);
  }
};

let store = configureStore(initialState);

// start it up by loading the App component on the dom
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
