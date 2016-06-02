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

// Performance optimization to limit number of lookups
let thisUser;
let socketApi;
let socket;

window.socket = socket = window.io.connect('http://localhost:8000');

// Add socket api's
socket.api = socketApi = {};

socketApi.user = thisUser = {
  userID: '',
  image: '',
  name: '',
  bio: '',
  lat: '',
  lng: '',
  available: true,
  coffee: true,
  food: true,
  beer: true,
};

socketApi.isLoggedIn = false;

socketApi.login = function login() {
  (function fbSdk(d, s, id) {
    const js = d.createElement(s); js.id = id;
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};

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
      thisUser.userID = response.authResponse.userID;
      window.FB.api(`/${thisUser.userID}`, (userIdResponse) => {
        thisUser.name = userIdResponse.name;
        window.FB.api(`/${thisUser.userID}/picture?type=large`,
          (imageResponse) => {
            thisUser.image = imageResponse.data.url;
            socketApi.isLoggedIn = true;
            socket.emit('save user to db', thisUser);
          });
      });
    }
  });
};


socketApi.sendToServer = function sendToServer() {
  if (socket.connected && socketApi.isLoggedIn) {
    socket.emit('update one socket user', thisUser, socket.id);
  }
};

socketApi.updateLocation = function updateLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      thisUser.lat = position.coords.latitude;
      thisUser.lng = position.coords.longitude;
    });
  }
};

socketApi.sendMeetingRequest = function sendMeetingRequest(receiverId) {
  if (socket.connected && socketApi.isLoggedIn) {
    socket.emit('send meeting request', socket.id, receiverId);
  }
};

socketApi.confirmMeetingRequest = function confirmMeetingRequest(receiverId) {
  if (socket.connected && socketApi.isLoggedIn) {
    socket.emit('confirm meeting request', socket.id, receiverId);
  }
};

socketApi.rejectMeetingRequest = function rejectMeetingRequest(receiverId) {
  if (socket.connected && socketApi.isLoggedIn) {
    socket.emit('reject meeting request', socket.id, receiverId);
  }
};

socketApi.updateBio = function updateBio(bio) {
  if (socket.connected && socketApi.isLoggedIn) {
    socket.emit('update bio', thisUser.userID, bio);
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
