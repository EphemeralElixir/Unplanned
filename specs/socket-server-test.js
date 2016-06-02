var io = require('socket.io-client');
var expect = require('chai').expect;
var socketUrl = 'http://localhost:8000';
var options = {
  transports: ['websocket'],
  'reconnection delay': 0,
  'reopen delay': 0,
  'force new connection' : true
};

describe('Websocket Test Suite', function() {
  this.timeout(3000);

  var socket;
  var socket2;
  var activeUsers = null;
  var testUser1 = null;
  var testUser2 = null;

  beforeEach(function(done) {
    activeUsers = {};
    testUser1 = {
        'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/11265620_10205540926036559_4941610271170781610_n.jpg?oh=7332acab5536d15448f7529eb77963d4&oe=57CFFD27',
        'userID': '10208148188096481',
        'name': 'Tai Huynh',
      };

      testUser2 = {
        'image' : 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/12439013_1696533990605368_7084115367090611688_n.jpg?oh=fc74587fc31354a54a7e8616ccebf388&oe=57E1C3CA',
        'userID' : '1752840011641432',
        'name' : 'Leo Adelstein'
      };

    socket = io.connect(socketUrl, options);
    socket2 = io.connect(socketUrl, options);

    socket.on('connect', function() {

    });

    socket2.on('connect', function() {
      done();
    });

    socket.on('disconnect', function() {
      // console.log('Ending socket connection...');
    });
  });

  afterEach(function(done) {
    activeUsers = null;
    testUser1 = null;
    testUser2 = null;
    testUser3 = null;

    if (socket.connected) {
      socket.disconnect();
      done();
    }

    if (socket2.connected) {
      socket2.disconnect();
    }
  });


  describe('Live sockets', function() {
    it('should communicate to server', function(done) {
      socket.emit('echo', 'Sockets are alive!');

      socket.once('echo', function(message) {
        expect(message).to.equal('Sockets are alive!');
        done();
      });
    });
  });


  describe('Update active users list', function() {
    it('should store a new user to activeUsers object using their socket id as the key', function(done) {
      socket.emit('update one socket user', testUser1, socket.id);
      socket.on('update all users', function(data) {
        expect(data[socket.id]).to.deep.equal(testUser1);
        done();
      });
    });


    it('should refresh all users when a new user connects', function(done) {
      var testObj = {}
      testObj[socket.id] = testUser1;
      testObj[socket2.id] = testUser2;

      socket.emit('update one socket user', testUser1, socket.id);
      socket.on('update all users', function(data) {
        expect(data[socket.id]).to.deep.equal(testUser1);

        socket.emit('update one socket user', testUser2, socket2.id);
        socket.on('update all users', function(data) {
          activeUsers = data;
          expect(activeUsers).to.deep.equal(testObj);
          done();
        });
      });
    });


    xit('should refresh all users when a user disconnects', function(done) {


    });
  });
});
