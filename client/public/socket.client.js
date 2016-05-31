var socket = io.connect('http://localhost:8000');
var activeUsers = {};
var user = null;


/****** Socket-Client Event Handlers *******/

var updateUserLocation = function(user) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      user.lat = position.coords.latitude;
      user.lng = position.coords.longitude;
      socket.emit('update new user coords', user);
    });
  }
};

var notifyNewUserConnection = function() {
  console.log('Connected!');
  socket.emit('new user connection');
};

var saveNewUser = function(data) {
  if (!user) {
    user = data;
    updateUserLocation(user);
  }
};

var updateAllUserData = function(data) {
  activeUsers = data;
};



var inboundRequestHandler = function(userId) {

};

/****** Socket-Client Event Listeners ******/

socket.on('connect', notifyNewUserConnection);
socket.on('save new user', saveNewUser);
socket.on('update all users', updateAllUserData);

socket.on('lets meet', inboundRequestHandler);


