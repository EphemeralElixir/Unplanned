// Required modules to access database and socket.io methods
const userHandlers = require('../users/userController');
const socketIO = require('socket.io');

/*
* In order to maintain a real-time storage of all users that
* are currently online at one time, we use a "master"
* activeUsers object. Every connected and online user data is
* stored here, using their unique socket ID as the properties.
*
* The server will continue to update this object and push it out
* to all connected clients to render onto the individual maps.
*/
const activeUsers = {};

// Start the socket connection server-side
const makeSocketServer = function socketServer(http) {
  const io = socketIO(http);

  io.on('connection', (socket) => {
    // Helper function that broadcasts to all clients the current state
    // of the activeUsers object
    const updateAllUsers = function updateAllUsers() {
      io.emit('update all users', activeUsers);
    };

    // Helper function that updates activeUsers on new user connection
    const updateActiveUsers = function updateActiveUsers(socketUser, senderId) {
      activeUsers[senderId] = socketUser;
      updateAllUsers();
    };

    // Helper function that will emit user data from from the database,
    // to the client. The listener is in client/webpackEntry.js on line 82.
    const checkExisting = function checkExisting(userID) {
      userHandlers.checkExisting(userID, socket);
    };

    // Helper function that updates activeUsers when a user disconnect s
    const removeUser = function removeUser() {
      // We need to slice here because the client is emitting the socket ID with
      // a '/#' at the beginning (thats the syntax to emit to single clients)
      delete activeUsers[socket.id.slice(2)];
      updateAllUsers();
    };

    // Database callback handlers
    socket.on('save user to db', userHandlers.create);
    socket.on('update bio', userHandlers.updateBio);
    socket.on('check for existing', checkExisting);

    // Active Users callback handlers
    socket.on('update one socket user', updateActiveUsers);
    socket.on('refresh users', updateAllUsers);
    socket.on('disconnect', removeUser);

    // Push the updated activeUsers object every 2 seconds
    // to all connected clients for real-time update
    setInterval(updateAllUsers, 2000);

    // Helper functions so the server can redirect meeting requests
    const sendMeetingRequest = function sendMeetingRequest(senderId, receiverId) {
      socket.broadcast.to(`/#${receiverId}`).emit('receive meeting request', senderId);
    };

    const confirmMeetingRequest = function confirmMeetingRequest(senderId, receiverId) {
      socket.broadcast.to(`/#${receiverId}`).emit('confirm meeting request', senderId);
    };

    const rejectMeetingRequest = function rejectMeetingRequest(senderId, receiverId) {
      socket.broadcast.to(`/#${receiverId}`).emit('reject meeting request', senderId);
    };

    // Meeting request callback handlers
    socket.on('send meeting request', sendMeetingRequest);
    socket.on('confirm meeting request', confirmMeetingRequest);
    socket.on('reject meeting request', rejectMeetingRequest);

    // Test callback handlers for mocha
    socket.on('echo', () => {
      socket.emit('echo', 'Sockets are alive!');
    });
  });
};

module.exports = {
  makeSocketServer,
};
