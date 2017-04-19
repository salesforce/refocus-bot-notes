var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io-client');
var WarRoom = 'http://localhost:3000';
var socket = io.connect('http://localhost:3000', {reconnect: true});

var bot_identifier = 'WarRoom_Bot';

var actions =
	{
		[
			{
				name: 'Function1',
				parameters: [
					{
						name: 'firstParameter',
						type: 'Integer',
						required: true
					},
					{
						name: 'secondParameter',
						type: 'String',
						required: false
					}
				]
			}
		]
	};

var variables =
	{
		[
			{
				name: 'DropDown',
				type: 'Picklist String',
				type: ['Select1', 'Select2', 'Select3'],
				value: 'Select1'
			}
		]
	};


socket.emit('Events', bot_identifier, WarRoom, null, bot_identifier + 'is conneted', actions, variables);

socket.on('Events', function (from, to, session, message, actionsJSON, variablesJSON) {
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
            for(variablesJSON){
                //get variables
                socket.emit('Events', bot_identifier, WarRoom, room, bot_identifier + 'is conneted', actions, variables);
            }
        }else if(message === 'Request Variable Update'){
            for(variablesJSON){
                //update variables
                socket.emit('Events', bot_identifier, WarRoom, room, bot_identifier + 'is conneted', actions, variables);
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