var io = require('socket.io-client');
var expect = require('chai').expect;
var socketUrl = 'http://localhost:8000';
var options = {
  transports: ['websocket'],
  'reconnection delay': 0,
  'reopen delay': 0,
  'force new connection' : true
};

describe('Socket Server Connections', function() {

  var socket;
  var activeUsers = null;
  var testUser = {
    'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/11265620_10205540926036559_4941610271170781610_n.jpg?oh=7332acab5536d15448f7529eb77963d4&oe=57CFFD27',
    'userID': '10208148188096481',
    'name': 'Tai Huynh',
  };

  beforeEach(function(done) {
    activeUsers = {};

    socket = io.connect(socketUrl, options);

    socket.on('connect', function() {
      console.log('Look, it works!');
      done();
    });

    socket.on('disconnect', function() {
      console.log('Disconnected....');
    });
  });

  afterEach(function(done) {
    activeUsers = null;

    if (socket.connected) {
      console.log('Disconnecting after each/');
      socket.disconnect();
    } else {
      console.log('No connection to break');
    }
    done();
  })

  it('should update a new user to active users object', function(done) {

    socket.emit('update one socket user', testUser, socket.id);
    socket.on('update success', function(data) {

      expect(data[socket.id]).to.deep.equal(testUser);
      done();
    });
  });

  it('should update all users', function(done) {
    socket.emit('updateOne')

    socket.emit('refresh users');
    socket.on('update all users', function(data) {

    })

  });

});
