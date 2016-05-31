//Master list of users to store all users that are currently 'available' to hang out
var activeUsers = {};
var user = {};

var io = function(io) {

  io.on('connection', function(socket) {

    /****** Socket-Server Event Handlers *******/

    var sendNewUserData = function() {
      socket.emit('save new user', user.current);
    };

    var refreshAllUserData = function(userData, socketId) {
      activeUsers[socketId] = userData;
      io.emit('update all users', activeUsers);
    };

    var outboundRequestHandler = function(userId) {
      socket.to(userId).emit('lets meet', socket.id);
    };


    /****** Socket-Server Event Listeners ******/

    socket.on('new user connection', sendNewUserData);
    socket.on('update new user coords', refreshAllUserData)


    socket.on('request meeting', outboundRequestHandler);


  });
};

module.exports = {
  activeUsers : activeUsers,
  user: user,
  io: io
};
