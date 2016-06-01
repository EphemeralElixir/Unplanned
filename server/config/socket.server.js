//Master list of users to store all users that are currently 'available' to hang out
var activeUsers = {};

var io = function(io) {

  io.on('connection', function(socket) {
    // var socketId = null;
    // var receiverId = null;

    /********** Socket-Server Controllers **********/

    var updateAllUsers = function() {
      io.emit('update all users', activeUsers);
    };

    var updateActiveUsers = function (socketUser, socketID) {
      activeUsers[socketID] = socketUser;
    };

    setInterval(updateAllUsers, 3000);

    var disconnect = function() {
      delete activeUsers[socket.id.slice(2)];
      updateAllUsers();
    }
    /******** Socket-Server Event Handlers *********/

    // var sendRejection = function(senderId) {
    //   socket.broadcast.to('/#' + senderId).emit('user said no', socketId);
    //   receiverId = null;
    // };

    // var sendConfirmation = function(senderId) {
    //   socket.broadcast.to('/#' + senderId).emit('user said yes', socketId);
    //   receiverId = null;
    // };

    // var deliverMeetingRequest = function(senderId, receiveId) {
    //   receiverId = receiveId;
    //   socket.broadcast.to('/#' + receiverId).emit('lets meet', senderId);
    // };

    // var refreshOnConnect = function(userData, id) {
    //   socketId = id;
    //   activeUsers[socketId] = userData;
    //   updateAllUsers();
    // };

    // var refreshOnDisconnect = function() {
    //   delete activeUsers[socketId];
    //   updateAllUsers();
    // };

    // var sendToGetCoords = function() {
    //   socket.emit('get coordinates', user.current);
    // };


    /******** Socket-Server Event Listeners ********/

    socket.on('update one socket user', updateActiveUsers);
    socket.on('disconnect', disconnect);

    // socket.on('new user connection', sendToGetCoords);
    // socket.on('update user coords', refreshOnConnect);

    // socket.on('send meeting', deliverMeetingRequest);
    // socket.on('no thanks', sendRejection);
    // socket.on('lets do it', sendConfirmation);


  });
};

module.exports = {
  activeUsers : activeUsers,
  io: io
};
