//Master list of users to store all users that are currently 'available' to hang out
var activeUsers = {};
var user = {};

var io = function(io) {

  io.on('connection', function(socket) {
    var socketId = null;
    var receiverId = null;

    /********** Socket-Server Controllers **********/

    var updateAllUsers = function() {
      io.emit('update all users', activeUsers);
    };


    /******** Socket-Server Event Handlers *********/

    var sendRejection = function(senderId) {
      socket.to(senderId).emit('user said no', socketId);
      receiverId = null;
    };

    var sendConfirmation = function(senderId) {
      socket.to(senderId).emit('user said yes', socketId);
      receiverId = null;
    };

    var outboundRequestHandler = function(senderId, receiveId) {
      receiverId = receiveId;
      socket.to(receiverId).emit('lets meet', senderId);
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

    var sendNewUserData = function() {
      socket.emit('save new user', user.current);
    };


    /******** Socket-Server Event Listeners ********/

    socket.on('new user connection', sendNewUserData);
    socket.on('update new user coords', refreshAllUserData);
    socket.on('disconnect', refreshAfterDisconnect);

    socket.on('request meeting', outboundRequestHandler);
    socket.on('no thanks', sendRejection);
    socket.on('lets do it', sendConfirmation);


  });
};

module.exports = {
  activeUsers : activeUsers,
  user: user,
  io: io
};
