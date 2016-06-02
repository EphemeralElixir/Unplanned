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

    const checkExisting = function checkExisting(userID) {
      userHandlers.checkExisting(userID, socket);
    };

    const disconnect = function disconnect() {
      delete activeUsers[socket.id.slice(2)];
      updateAllUsers();
    };

    // Database handlers
    socket.on('save user to db', userHandlers.create);
    socket.on('update bio', userHandlers.updateBio);
    socket.on('check for existing', checkExisting);

    // Active users handlers
    socket.on('update one socket user', updateActiveUsers);
    socket.on('refresh users', updateAllUsers);
    socket.on('disconnect', disconnect);

    setInterval(updateAllUsers, 5000);

    const sendMeetingRequest = function sendMeetingRequest(senderId, receiverId) {
      socket.broadcast.to(`/#${receiverId}`).emit('receive meeting request', senderId);
    };

    const confirmMeetingRequest = function confirmMeetingRequest(senderId, receiverId) {
      socket.broadcast.to(`/#${receiverId}`).emit('confirm meeting request', senderId);
    };

    const rejectMeetingRequest = function rejectMeetingRequest(senderId, receiverId) {
      socket.broadcast.to(`/#${receiverId}`).emit('reject meeting request', senderId);
    };

    // Meeting request handlers
    socket.on('send meeting request', sendMeetingRequest);
    socket.on('confirm meeting request', confirmMeetingRequest);
    socket.on('reject meeting request', rejectMeetingRequest);

    // Test handlers for mocha
    socket.on('echo', () => {
      socket.emit('echo', 'Sockets are alive!');
    });
  });
};

module.exports = {
  makeSocketServer,
};
