var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});

socket.emit();

socket.on('', function () {
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/ui.html');
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});