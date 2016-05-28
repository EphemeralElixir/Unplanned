var socket = io.connect('http://localhost:8000');
var activeUsers = {};

socket.on('roflcopter', function(data) {

  console.log('Server just sent me some information ==>', data);
  socket.emit('client', {my: 'data'});
});



socket.on('addUser', function(newActiveUsers) {
  activeUsers = newActiveUsers;
})
