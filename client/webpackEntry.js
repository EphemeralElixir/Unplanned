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
// window.socket = socket = window.io.connect('http://macla.local:8000/');
// Add socket api's
socket.api = socketApi = {};

socketApi.user = thisUser = {
  userID: '',
  image: '',
  name: '',
  bio: '',
  phoneNumber: '',
  flagCount: '',
  lat: '',
  lng: '',
  available: true,
  coffee: true,
  food: true,
  beer: true,
};

socketApi.isLoggedIn = false;

// User login button handler -- loads Facebook SDK
socketApi.login = function login() {
  (function fbSdk(d, s, id) {
    const js = d.createElement(s); js.id = id;
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};

// User logout butto handler set isLoggedIn to false
socketApi.logout = function logout() {
  window.socket.api.isLoggedIn = false;
};


// Waits for Facebook API to finish loading with user login and
// then runs this function
window.fbAsyncInit = () => {
  const fb = window.FB;

  // Initializes Facebook SDK with the App ID.
  fb.init({
    appId: '577393235773311',
    xfbml: true,
    version: 'v2.6',
  });

  fb.login((response) => {
    if (response.status === undefined) {
      // do nothing
    } else {
      thisUser.userID = response.authResponse.userID;
      socket.emit('check for existing', thisUser.userID);
      socket.on('is in db', (exists, user) => {
        if (exists) {
          if (user.flagCount > 1) {
            alert('You have been flagged and are no longer able to use unplanned!');
          } else {
            thisUser.name = user.name;
            thisUser.image = user.image;
            thisUser.bio = user.bio;
            thisUser.phoneNumber = user.phoneNumber;
            socketApi.isLoggedIn = true;
          }
        } else {
          fb.api(`/${thisUser.userID}`, (userIdResponse) => {
            thisUser.name = userIdResponse.name; // Set the name
            fb.api(`/${thisUser.userID}/picture?type=large`,
              (imageResponse) => {
                thisUser.image = imageResponse.data.url; // Set the image url
                socket.emit('save user to db', thisUser);
              });
          });
          socketApi.isLoggedIn = true;
        }
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

socketApi.updateBio = function updateBio() {
  if (socket.connected && socketApi.isLoggedIn) {
    socket.emit('update bio', thisUser);
  }
};

let store = configureStore(initialState);

// Initial rendering of App component on the dom
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
