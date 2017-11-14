/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * ./index.js
 *
 * This code handles will listen to refocus and handle any activity
 * that requires the bot server attention.
 */
'use strict';

const express = require('express');
const app = express();
const http = require('http');
const env = process.env.NODE_ENV || 'dev';
const config = require('./config.js')[env];
const PORT = config.port || 5000;
const token = process.env.AUTH_TOKEN;

const install = require('./lib/install.js');
const io = require('socket.io-client');

const bdk = require('./lib/refocus-bdk.js');

bdk.refocusConnect(app, token);

app.on('refocus.events', handleEvents);
app.on('refocus.bot.actions', handleActions);
app.on('refocus.bot.data', handleData);
app.on('refocus.room.settings', handleSettings);

/**
 * When a refocus.events is dispatch it is handled here.
 *
 * @param {Event} event - The most recent event object
 * @return null
 */
function handleEvents(event){
  console.log('Event Activity', event);
}

/**
 * When a refocus.room.settings is dispatch it is handled here.
 *
 * @param {Room} room - Room object that was dispatched
 * @return null
 */
function handleSettings(room){
  console.log('Room Settings Activity', room);
}

/**
 * When a refocus.bot.data is dispatch it is handled here.
 *
 * @param {BotData} data - Bot Data object that was dispatched
 * @return null
 */
function handleData(data){
  console.log('Bot Data Activity', data);
}

/**
 * When a refocus.bot.actions is dispatch it is handled here.
 *
 * @param {BotAction} action - Bot Action object that was dispatched
 * @return null
 */
function handleActions(action){
  console.log('Bot action Activity', action);
}

app.use(express.static('web/dist'));
app.get('/*', function(req, res){
  res.sendFile(__dirname + '/web/dist/index.html');
});

http.Server(app).listen(PORT, function(){
  console.log('listening on: ', PORT);
});
