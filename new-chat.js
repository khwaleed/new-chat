var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(__dirname + '/www'));
app.get('/', function(req, res){
   res.sendFile(path.join(__dirname, '../www', 'index.html'));
});

io.on('connection', function(socket){
	io.on('connection', function(socket){
		console.log('a user connected');
		socket.on('disconnect', function(){
		console.log('user disconnected');
		});
		});

	socket.on('join:room', function(data){
		var room_name = data.room_name;
		socket.join(room_name);
		console.log('a user connected'+room_name);
	});


	socket.on('leave:room', function(msg){
		msg.text = msg.user + ' has left the room';
		socket.leave(msg.room);
		socket.in(msg.room).emit('message', msg);
	});


	socket.on('send:message', function(msg){
		socket.in(msg.room).emit('message', msg);
	});


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
