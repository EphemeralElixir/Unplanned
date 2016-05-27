var socket = io.connect('http://localhost:8000');

socket.on('roflcopter', function(data) {
  console.log('Server just sent me some information ==>', data);
  socket.emit('client', {my: 'data'});
});
