var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io-client');
var WarRoom = 'http://localhost:3000';
var socket = io.connect('http://localhost:3000', {reconnect: true});

var bot_identifier = 'WarRoom_Bot';
var actions;
var context;

socket.emit('Events', bot_identifier, WarRoom, null, bot_identifier + 'is connected', actions, context);

socket.on('Events', function (from, to, session, message, actionsJSON, contextJSON) {
	if(to === bot_identifier){
		if(message === 'Request new session'){
			var room = session;
			var botSession = ; //create new session
            socket.emit('Events', bot_identifier, WarRoom, session, bot_identifier + 'performed' + action.name, null, null);
        }else if(message === 'Request Action'){
            for(var action : actionsJSON){
                //do actions
                if(action.name === 'Function1'){

                }
                socket.emit('Events', bot_identifier, WarRoom, room, bot_identifier + 'performed' + action.name, null, null);
            }
        }else if(message === 'Request Variable'){
            for(contextJSON){
                //get context
                socket.emit('Events', bot_identifier, WarRoom, room, bot_identifier + 'is connected', actions, context);
            }
        }else if(message === 'Request Variable Update'){
            for(contextJSON){
                //update context
                socket.emit('Events', bot_identifier, WarRoom, room, bot_identifier + 'is connected', actions, context);
            }
        }
	}
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/ui.html');
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});