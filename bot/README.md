#Structure

Each bot that is created should have the same structure. It doesn't matter what languages you use long as it follows this structure WarRoom should be able to handle it.

* UI - HTML output that can be reached through URI from an iFrame
    * Javascript package provided by WarRoom to help track activity on bot
    * Javascript to allow UI to make calls to WarRoom if needed
* Server - This server should be able to handle socket requests to and from WarRoom
    * Should create Actions JSON to define what WarRoom can do to bot
    * Should create Variable JSON to define what WarRoom can receive from bot
    * Should have a connection established to WarRoom
    * Should have methods to handle all actions that WarRoom send to it
    * Should have methods to handle all variable requests made from WarRoom

#Functionality

WarRoom is unaware of what each bot is capable of doing unless the bot explicitly tells WarRoom. The way the bot tells WarRoom it can do it from two sets of JSON: Actions, Variables. These JSON Structure is below and they give WarRoom the information needed to request action later.

###_Actions JSON_

* name: the name of the function (camelCase)
* parameters: the parameters need to run the function
    * name: name of parameter (camelCase)
    * type: the variable type for the parameter (int, double, time, etc)
    * required: a boolean for whether a parameter is required
```json
{
  "Actions": [
     {
       "name": "<Function Name>",
       "parameters": [
         {
           "name": "<parameter name>",
           "type": "<parameter type>",
           "required": "<true/false>"
        },
        "…",
      ]
     },
     "…",
  ]
}
```
###_Context JSON_

* name: the name of the context variable (camelCase)
* type: the context type for the variable (int, double, time, etc)
* range: the range of values the context variable could be
* value: the value of the context variable
```json
{
  "Context": [
     {
       "name": "<Context variable Name>",
       "type": "<Context variable Type: picklist, int, double, string etc>",
       "range": "<Range values: each item in a pick list, 1-10000 for ints etc>",
       "value": "<Default Value>"
     },
     "…"
  ]
}
```
#Connecting to WarRoom

###_Registering Bot_
Before you can use a bot you need to register it as part of WarRoom accept bot list. To do this you must go to WarRoom > Settings > Add new bot. After completing the bot registration you will receive a <BOT IDENTIFIER> which will be used for all WarRoom activities involving your bot

###_Connecting to WarRoom_
The first thing you must do is establish a connection to WarRoom through your server. This could be done in a multitude of ways below is a Javascript example

var io = require('socket.io-client');
var socket = io.connect('http://WarRoom_URI (http://localhost:3000/)', {reconnect: true});
socket.emit('Events', <BOT IDENTIFIER>, <WarRoom>, <Session ID>, <Message>, <Action JSON>, <Variable JSON>);

This establishes a connection between WarRoom and the bot, and the message lets WarRoom know the basic information about the bot.

###_New bot session_
After being connect to WarRoom you will be listening to all the logs until something is requested from you. One of the first requests that need to be handled is when WarRoom requests a new session of a bot.

Initial Request from WarRoom
('Events', <WarRoom>, <BOT IDENTIFIER>, <WarRoom Room ID>, <Message: Request new session>, null, null)

Sample response your bot should send
('Events', <BOT IDENTIFIER>, <WarRoom>, <Bot Session ID>, <Message: New session>, null, null)

#Bot Logging

* Every action with the bot UI should be handled by our javascript package. So make sure every HTML DOM has a well identifying ID listed
* Every function and variable change should create a Event log like the following
    * ('Events', <BOT IDENTIFIER>, <WarRoom>, <Bot Session ID>, <Message: Function ran>, <Action ran>, null)
    * ('Events', <BOT IDENTIFIER>, <WarRoom>, <Bot Session ID>, <Message: Variable changed>, null, <Variables change>)

#Bot Request Handling

When processing logs all your bot has to do is look at the 2 incoming variable and look for its own identifier. That means there is a request coming to the bot. The message field will give details about the request, and the JSON return will formalize what data or action needs to be taken see below for example

###_Request Examples_
1) WarRoom Sends Request
('Events', <WarRoom>, <BOT IDENTIFIER>, <WarRoom Room ID>, <Message: Request Action>, <Action JSON>, null)

This means WarRoom rules engine has requested an action from our bot. The JSON load that is attach will give the bot all the information to run the action

2) WarRoom Sends Request
('Events', <WarRoom>, <BOT IDENTIFIER>, <WarRoom Room ID>, <Message: Request Variable>, null, <Variable JSON>)
This means WarRoom rules engine has requested an variable from our bot. The JSON load that is attach will give the bot all the information to retrieve the variable

3) WarRoom Sends Request
('Events', <WarRoom>, <BOT IDENTIFIER>, <WarRoom Room ID>, <Message: Request Variable Update>, null, <Variable JSON>)
This means WarRoom rules engine has requested an variable update from our bot. The JSON load that is attach will give the bot all the information to update the variable

###_Request handling_
To handle all the requests a bot should have switch case within the server information that will allow the actions and variables to take place. See example below
```javascript
socket.on('Events', function (from, to, session, message, actions, variables) {
    if(to === '<BOT IDENTIFIER>'){
        if(message === 'Request Action'){
            for(actions){
                //do actions
                ('Events', <BOT IDENTIFIER>, <WarRoom>, <Bot Session ID>, <Message: log>, null, null)
            }
        }else if(message === 'Request Variable'){
            for(variables){
                //get variables
                ('Events', <BOT IDENTIFIER>, <WarRoom>, <Bot Session ID>, <Message: log>, null, null)
            }
        }else if(message === 'Request Variable Update'){
            for(variables){
                //update variables
                ('Events', <BOT IDENTIFIER>, <WarRoom>, <Bot Session ID>, <Message: log>, null, null)
            }
        }
    }
});
```
