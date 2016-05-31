var socket = io.connect('http://localhost:8000');
var activeUsers = {};
var user = null;

/****** Socket-Client Event Handlers *******/

var refreshAllData = function() {
  socket.emit('refresh on new user', socket.id);
};

var initializeData = function(data) {
  //Set user only if it hasn't been set to avoid overwriting to other users id when they connect
  if (!user) {
    user = data.newUser;
  }
  activeUsers = data.allUsers;
};


/****** Socket-Client Event Listeners ******/

socket.on('connect', refreshAllData);
socket.on('update all users', initializeData);


