var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io-client');
var env = process.env.NODE_ENV || 'dev';
var config = require('./config.js')[env];
var warRoom = config.warRoomUrl;
var socket = io.connect(warRoom, { reconnect: true });

var bot_identifier = 'WarRoom_Bot';
var BOT_ACTIONS = require('./actions.json');
var BOT_CONTEXTS = require('./context.json');

var room;

socket.emit('Events', bot_identifier, warRoom, null, bot_identifier + 'is connected', BOT_ACTIONS, BOT_CONTEXTS);

socket.on('Events', function (from, to, session, message, actionsJSON, contextJSON) {
	if(to === bot_identifier){
    switch (message) {
      case 'Request new session':
        room = session;
        socket.emit('Events', bot_identifier, warRoom, session, bot_identifier + 'performed', null, null);
        break;
      case 'Request Action':
        for(let action of actionsJSON.actions){
            //do actions
            if(action.name === 'Function1'){
              // perform actions
            }
            socket.emit('Events', bot_identifier, warRoom, room, bot_identifier + 'performed' + action.name, null, null);
        }
        break;
      case 'Request Variable':
        for(let context of contextJSON.context){
            //get context
            var getContext = null; //getContext() function developed here
            socket.emit('Events', bot_identifier, warRoom, room, bot_identifier + 'is connected', null, getContext);
        }
        break;
      case 'Request Variable Update':
        for(let context of contextJSON.context){
            //update context
        }
        break;
      default:
        console.log('I don\'t know what to do :[');
    }
  }
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/ui.html');
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});