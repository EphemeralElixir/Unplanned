//Master list of users to store all users that are currently 'available' to hang out
var activeUsers = {};
var user = {};

var io = function(io) {

  io.on('connection', function(socket) {
    var socketId;

    /****** Socket-Server Event Handlers *******/
    var updateAllUsers = function() {
      io.emit('update all users', activeUsers);
    };

    var sendNewUserData = function() {
      socket.emit('save new user', user.current);
    };

    var refreshAllUserData = function(userData, id) {
      socketId = id;
      activeUsers[socketId] = userData;
      updateAllUsers();
    };

    var refreshAfterDisconnect = function() {
      delete activeUsers[socketId];
      updateAllUsers();
    };

    var outboundRequestHandler = function(userId) {
      socket.to(userId).emit('lets meet', socketId);
    };


    /****** Socket-Server Event Listeners ******/

    socket.on('new user connection', sendNewUserData);
    socket.on('update new user coords', refreshAllUserData);
    socket.on('disconnect', refreshAfterDisconnect);

    socket.on('request meeting', outboundRequestHandler);


  });
};

module.exports = {
  activeUsers : activeUsers,
  user: user,
  io: io
};
