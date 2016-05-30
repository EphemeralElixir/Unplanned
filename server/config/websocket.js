//Master list of users to store all users that are currently 'available' to hang out
var activeUsers = {};

var io = function(io) {

  io.on('connection', function(socket) {

    socket.on('updatePosition', function(data) {
      activeUsers[data.id].lat = data.lat;
      socket.broadcast.emit('updateAllClients', activeUser);
    });


  //End io on connection
  });


};

module.exports = {
  activeUsers : activeUsers,
  io: io
};
