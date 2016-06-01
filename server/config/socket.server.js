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

    const updateActiveUsers = function updateActiveUsers(socketUser, socketID) {
      activeUsers[socketID] = socketUser;
    };

    setInterval(updateAllUsers, 5000);

    const disconnect = function disconnect() {
      delete activeUsers[socket.id.slice(2)];
      updateAllUsers();
    };

    const saveUserToDb = function saveUserToDb(userObj) {
      userHandlers.loginOrCreate(User, userObj);
    };

    socket.on('update one socket user', updateActiveUsers);
    socket.on('save user to db', saveUserToDb);
    socket.on('disconnect', disconnect);

    const sendMeetingRequest = function sendMeetingRequest(senderID, receiverID) {
      socket.broadcast.to(`/#${receiverID}`).emit('receive meeting request', senderID);
    };

    const confirmMeetingRequest = function confirmMeetingRequest(senderID, receiverID) {
      socket.broadcast.to(`/#${receiverID}`).emit('confirm meeting request', senderID);
    };

    const rejectMeetingRequest = function rejectMeetingRequest(senderID, receiverID) {
      socket.broadcast.to(`/#${receiverID}`).emit('reject meeting request', senderID);
    };

    socket.on('send meeting request', sendMeetingRequest);
    socket.on('confirm meeting request', confirmMeetingRequest);
    socket.on('reject meeting request', rejectMeetingRequest);
  });
};

module.exports = {
  makeSocketServer,
};
