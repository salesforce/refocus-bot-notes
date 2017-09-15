/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * bot.js
 *
 * This is the bot webapp that interacts with the different APIs.
 *
 */

var express = require('express');
var app = express();
var http = require('http');
var env = process.env.NODE_ENV || 'dev';
var config = require('./config.js')[env];
var moment = require('moment');
var sa = require('superagent');

function pollingServer(host, port, path, eventName){
  setInterval(function () {
    var rest_options = {
      host: host,
      port: port,
      path: path,
      method: 'GET'
    };

    var request = http.request(rest_options, function(response) {
      var content = "";

      // Handle data chunks
      response.on('data', function(chunk) {
        content += chunk;
      });

      // Once we're done streaming the response, parse it as json.
      response.on('end', function() {
        var data = JSON.parse(content);
        app.emit('refocus.' + eventName, data);
      });
    });

    // Report errors
    request.on('error', function(error) {
      console.log("Error while calling endpoint.", error);
    });

    request.end();
  }, 5000);
}

function handleEvents(data){
  if(data.length > 0){
    var duration = moment.duration(moment().diff(moment(data[data.length - 1].updatedAt))).asSeconds();
    if(data.length > 0){
      if(duration < 8){
        console.log('Event Found', data[data.length - 1]);
      }
    }
  }
}

function handleActions(data){

  if(data.length > 0){
    const recentAction = data[data.length - 1];
    var duration = moment.duration(moment().diff(moment(recentAction.createdAt))).asSeconds();
    if(duration <= 5){

      /**
       *  Do a check here to see which action is the most so that it
       *  will be carried out and the botAction will be patched.
       */

      if(recentAction.name === 'buttonPressed'){
        // Check if most recent action has been completed yet
        if(!recentAction.response && recentAction.isPending){

          /** 
           *  This is where Action will be carried out (eg send email)
           *  and the correct response is generated based on this.
           */

          const res = {
            response: {statusText:'Action Completed Successfully!!!'},
            isPending: false
          };

          // PATCH botAction with response and isPending
          sa.patch('http://localhost:3000/v1/botActions/' + recentAction.id)
          .send(res)
          .end(function(err, res) {
            //TODO
          });
        }
      }
    }
  }
}

function handleData(data){
  if(data.length > 0){
    var duration = moment.duration(moment().diff(moment(data[data.length - 1].updatedAt))).asSeconds();
    if(data.length > 0){
      if(duration < 8){
        console.log('Data Found', data[data.length - 1]);
      }
    }
  }
}

pollingServer('localhost', '3000', '/v1/events', 'events');
pollingServer('localhost', '3000', '/v1/botActions', 'actions');
pollingServer('localhost', '3000', '/v1/botData', 'data');

app.on('refocus.events', handleEvents);
app.on('refocus.actions', handleActions);
app.on('refocus.data', handleData);

app.use(express.static('web/dist'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/web/dist/index.html');
});

http.Server(app).listen(5000, function(){
  console.log('listening on *:5000');
});