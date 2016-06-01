var socket = io.connect('http://localhost:8000');
var activeUsers = {};

var facebookId;
var userProfile = null;
var userSocketId;

//Sender profile will be set only if the user receives a meeting request
var senderProfile = null;
var senderSocketId;

/********** Socket-Client Controllers **********/

// var renderTimer = function (id) {
//   console.log('Wow you are popular, people want to hang out');

//   //Render timer component on acceptance
//   //var profile = activeUsers[id];
// };

// var renderRejection = function (id) {
//   //Render rejection component
//   //var profile = activeUsers[id];
// };

var acceptMeeting = function() {
  socket.emit('lets do it', senderSocketId);
};

var rejectMeeting = function() {
  socket.emit('no thanks', senderSocketId);
};

var sendMeeting = function(receiverId) {
  socket.emit('send meeting', userSocketId, receiverId);
  // renderTimer(receiverId);
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
  // renderTimer(senderSocketId);
};

var notifyNewUserConnection = function() {
  console.log('Connected!');
  userSocketId = socket.id;

  //Give facebook sdk some time to load before emit
  setTimeout(function(){
    facebookId = FB.getUserID();
    socket.emit('new user connection', facebookId);

  }, 3000);
};

var updateAndSave = function(data) {

  if (!userProfile) {
    userProfile = data;

    FB.api('/' + userProfile.facebookId + '/picture?width=9999',
      function(res) {
        userProfile.image = res.data.url;
        updateLocation(userProfile);
      });
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

// socket.on('user said no', renderRejection);
// socket.on('user said yes', renderTimer);
