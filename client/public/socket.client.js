var socket = io.connect('http://localhost:8000');
var activeUsers = {};
var userProfile = null;
var userSocketId;
//Sender profile will be set only if the user receives a meeting request
var senderProfile = null;
var senderSocketId;

/********** Socket-Client Controllers **********/

var renderTimer = function (id) {
  console.log('Wow you are popular, people want to hang out');

  //Render timer component on acceptance
  //var profile = activeUsers[id];
};

var renderRejection = function (id) {
  //Render rejection component
  //var profile = activeUsers[id];
};

var acceptMeeting = function() {
  socket.emit('lets do it', senderSocketId);
  renderTimerComponent(senderSocketId);
};

var rejectMeeting = function() {
  socket.emit('no thanks', senderSocketId);
};

var sendMeeting = function(receiverId) {
  socket.emit('send meeting', userSocketId, receiverId);
};

var updateLocation = function(userProfile) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      userProfile.lat = position.coords.latitude;
      userProfile.lng = position.coords.longitude;
      socket.emit('update user coords', userProfile, userSocketId);
    });
  }
};


/******** Socket-Client Event Handlers *********/

var handleMeetingRequest = function(id) {
  console.log('Look! Inbound request is here');
  senderProfile = activeUsers[id];
  senderSocketId = id;
};

var notifyNewUserConnection = function() {
  console.log('Connected!');
  userSocketId = socket.id;
  socket.emit('new user connection');
};

var updateAndSave = function(data) {
  if (!userProfile) {
    userProfile = data;
    updateLocation(userProfile);
  }
};

var updateAllUserData = function(data) {
  activeUsers = data;
};


/******** Socket-Client Event Listeners ********/

socket.on('connect', notifyNewUserConnection);
socket.on('get coordinates', updateAndSave);
socket.on('update all users', updateAllUserData);
socket.on('lets meet', handleMeetingRequest);

socket.on('user said no', renderRejection);
socket.on('user said yes', renderTimer);
