//Master list of users to store all users that are currently 'available' to hang out
var activeUsers = {};
var connectedClients = {}
var user = {};

var io = function(io) {

  io.on('connection', function(socket) {

    /****** Socket-Server Event Handlers *******/

    var sendNewData = function(socketId) {
      activeUsers[socketId] = user.current;

      io.emit('update all users', {
        allUsers: activeUsers,
        newUser: user.current
      });
    };


    /****** Socket-Server Event Listeners ******/

    socket.on('refresh on new user', sendNewData);



  });
};

module.exports = {
  activeUsers : activeUsers,
  user: user,
  io: io
};
