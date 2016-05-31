var socket = io.connect('http://localhost:8000');
var activeUsers = {};
var userProfile = null;
//Sender profile will be set only if the user receives a meeting request
var senderProfile = null;
var senderId = null;

/********** Socket-Client Controllers **********/

var renderTimerComponent = function (userId) {
  console.log('Wow you are popular, people want to hang out');

  //Render timer component on acceptance
  //var profile = activeUsers[userId];
};

var renderRejectionComponent = function (userId) {
  //Render rejection component
  //var profile = activeUsers[userId];
};

var acceptMeetingRequest = function() {
  socket.emit('lets do it', senderId);
  renderTimerComponent(senderId);
};

var rejectMeetingRequest = function() {
  socket.emit('no thanks', senderId);
};

var sendMeetingRequest = function(receiverId) {
  socket.emit('request meeting', socket.id, receiverId);
};

var updateUserLocation = function(userProfile) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      userProfile.lat = position.coords.latitude;
      userProfile.lng = position.coords.longitude;
      socket.emit('update new user coords', userProfile, socket.id);
    });
  }
};


/******** Socket-Client Event Handlers *********/

var inboundRequestHandler = function(userId) {
  console.log('Look! Inbound request is here');
  senderProfile = activeUsers[userId];
  senderId = userId;
};

var notifyNewUserConnection = function() {
  console.log('Connected!');
  socket.emit('new user connection');
};

var saveNewUser = function(data) {
  if (!userProfile) {
    userProfile = data;
    updateUserLocation(userProfile);
  }
};

var updateAllUserData = function(data) {
  activeUsers = data;
};


/******** Socket-Client Event Listeners ********/

socket.on('connect', notifyNewUserConnection);
socket.on('save new user', saveNewUser);
socket.on('update all users', updateAllUserData);
socket.on('lets meet', inboundRequestHandler);

socket.on('user said no', renderRejectionComponent);
socket.on('user said yes', renderTimerComponent);
