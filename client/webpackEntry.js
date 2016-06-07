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

// Declare variables that will be used throughout for
// performance optimization by limiting number of lookups
let thisUser;
let socketApi;
let socket;

// Add the socket property to the window object
// so it can be used throughout the client app
// and connect to the socket connection.
// The socket connection is available on window
// via the socket script that's included on index.html
window.socket = socket = window.io.connect('http://localhost:8000');
// window.socket = socket = window.io.connect('http://macla.local:8000/');

// Add socket api's and reduce the number of lookups
// by declaring another variable to reference the same object
socket.api = socketApi = {};

// Define an empty user object on the socketApi property
socketApi.user = thisUser = {
  userID: '',
  image: '',
  name: '',
  bio: '',
  phoneNumber: '',
  lat: '',
  lng: '',
  available: true,
  coffee: true,
  food: true,
  beer: true,
};

// Logout user upon app reload
socketApi.isLoggedIn = false;

// User login button handler -- loads Facebook SDK onto the window object
// and then calls the window.fbAsyncInit() function below to login the user
// at which point fb will ask the user to authenticate the app with the
// requested scope that includes the users' email
socketApi.login = function login() {
  (function fbSdk(d, s, id) {
    const js = d.createElement(s); js.id = id;
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};

// User logout button handler to set isLoggedIn to false
socketApi.logout = function logout() {
  window.socket.api.isLoggedIn = false;
};


// This function runs after the FB API SDK is loaded
window.fbAsyncInit = () => {
  const fb = window.FB;

  // Initializes Facebook SDK with the App ID.
  // You can set up your own on Facebook
  // Your app should have Valid OAuth redirect URIs
  // setup eg. http://localhost:8000/auth/facebook/callback
  fb.init({
    appId: '577393235773311',
    xfbml: true,
    version: 'v2.6',
  });

  // Begin login and handle the response
  fb.login((response) => {
    if (response.status === undefined) {
      // do nothing
    } else {
      thisUser.userID = response.authResponse.userID;
      // Emit an event to the socket listening on the server
      // to check whether this user exists in the db (/server/config/socket.js)
      socket.emit('check for existing', thisUser.userID);
      // Listen for the 'is in db' emission from the socket on the server
      // after checking existing user (emitted by /server/users/userController.js)
      socket.on('is in db', (exists, user) => {
        if (exists) {
          // If user flagCount is greater 0 don't allow user to login
          if (user.flagCount > 0) {
            alert('You have been flagged and are no longer able to use unplanned!');
          } else {
            // populate logged-in user's info on the socketApi
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
                fb.api('/me?fields=email', (data) => {
                  thisUser.email = data.email; // set the user email
                  socket.emit('save user to db', thisUser);
                });
              });
          });
          socketApi.isLoggedIn = true;
        }
      });
    }
  }, { scope: 'email' }, { return_scopes: true });
};

// Socket event emitter for updating current user
// which would then update the entire activeUsers
// object that is emitted to all other users.
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

socketApi.updateBio = function updateBio() {
  if (socket.connected && socketApi.isLoggedIn) {
    socket.emit('update bio', thisUser);
  }
};

// Socket event emitter for sending a meeting request
// from current user to the recipient
socketApi.sendMeetingRequest = function sendMeetingRequest(receiverId) {
  if (socket.connected && socketApi.isLoggedIn) {
    socket.emit('send meeting request', socket.id, receiverId);
  }
};

// Socket event emitter for confirming a meeting request
// The confirmation is received by the socket.js on the
// server which then broadcast the emission only to the
// sender of the original meeting request, which is then
// listened for on the Socket.jsx component which will
// update the redux store using a dispatcher
socketApi.confirmMeetingRequest = function confirmMeetingRequest(receiverId) {
  if (socket.connected && socketApi.isLoggedIn) {
    socket.emit('confirm meeting request', socket.id, receiverId);
  }
};

// Similar flow as above confirmMeetingRequest method
// but this is for meeting rejection.
socketApi.rejectMeetingRequest = function rejectMeetingRequest(receiverId) {
  if (socket.connected && socketApi.isLoggedIn) {
    socket.emit('reject meeting request', socket.id, receiverId);
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
