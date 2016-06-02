const User = require('../users/userModel');
const userHandlers = require('../users/userController');

const socketIO = require('socket.io');

const activeUsers = {};


const makeSocketServer = function socketServer(http) {
  const io = socketIO(http);

  io.on('connection', (socket) => {
    const updateAllUsers = function updateAllUsers() {
      io.emit('update all users', activeUsers);
    };

    const updateActiveUsers = function updateActiveUsers(socketUser, senderId) {
      activeUsers[senderId] = socketUser;
      updateAllUsers();
    };

    setInterval(updateAllUsers, 5000);

<<<<<<< fe6d3bab7137ac3a893dc76bc50ae28c67c70baa
    const disconnect = function disconnect() {
=======
    var disconnect = function() {
>>>>>>> Add 3 test cases for socket connection
      delete activeUsers[socket.id.slice(2)];
      updateAllUsers();
    };

    const saveUserToDb = function saveUserToDb(userObj) {
      userHandlers.loginOrCreate(User, userObj);
    };

    socket.on('update one socket user', updateActiveUsers);
    socket.on('save user to db', saveUserToDb);
    socket.on('refresh users', updateAllUsers);
    socket.on('disconnect', disconnect);

    const sendMeetingRequest = function sendMeetingRequest(senderId, receiverId) {
      socket.broadcast.to(`/#${receiverId}`).emit('receive meeting request', senderId);
    };

    const confirmMeetingRequest = function confirmMeetingRequest(senderId, receiverId) {
      socket.broadcast.to(`/#${receiverId}`).emit('confirm meeting request', senderId);
    };

    const rejectMeetingRequest = function rejectMeetingRequest(senderId, receiverId) {
      socket.broadcast.to(`/#${receiverId}`).emit('reject meeting request', senderId);
    };

<<<<<<< fe6d3bab7137ac3a893dc76bc50ae28c67c70baa
    socket.on('send meeting request', sendMeetingRequest);
    socket.on('confirm meeting request', confirmMeetingRequest);
    socket.on('reject meeting request', rejectMeetingRequest);
=======
    /******** Mocha testing purposes only ********/

    socket.on('echo', function() {
      socket.emit('echo', 'Sockets are alive!'); // Tests connection
    });
>>>>>>> Add 3 test cases for socket connection
  });
};

module.exports = {
  makeSocketServer,
};
